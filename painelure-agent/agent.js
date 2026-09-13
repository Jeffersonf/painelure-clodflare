/**
 * PainelURE Monitor Agent
 * Usa o Google Chrome real instalado no PC para evitar travamentos do Chromium baixado.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const CONFIG_FILE = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

let isRealtimeActive = false;
let lastCaptureTime = 0;
let isBusy = false;

// Procura o executavel do Google Chrome da maquina
function getChromePath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined; // fallback para o puppeteer padrao
}

async function sendToServer(buffer, sourceName) {
  const base64Image = buffer.toString('base64');
  const payload = {
    image: 'data:image/jpeg;base64,' + base64Image,
    source: sourceName,
    timestamp: new Date().toISOString()
  };

  const uploadUrl = config.serverUrl.replace(/\/+$/, '') + '/api/monitor/upload';
  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Monitor-Token': config.agentSecretToken || ''
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const sizeKb = (buffer.length / 1024).toFixed(1);
    const mode = isRealtimeActive ? 'TEMPO REAL (10s)' : 'NORMAL (1h)';
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print ${sourceName.toUpperCase()} enviado com sucesso (${sizeKb} KB). Modo: ${mode}`);
  } else {
    console.error('[AGENT] Erro servidor:', res.status, await res.text());
  }
}

async function captureUrl(browser, url, sourceName) {
  if (!url) return;
  console.log(`[AGENT] Acessando ${sourceName}...`);
  let page = null;
  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });
    await page.setBypassCSP(true);
    
    // Tenta carregar com tolerância a links internos intragov
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 35000 });
    } catch (navErr) {
      console.warn(`[AGENT] Aviso navegação ${sourceName}: ${navErr.message}. Tentando capturar mesmo assim...`);
    }

    // Aguarda 4 segundos para renderizar gráficos e tabelas
    await new Promise(r => setTimeout(r, 4000));

    console.log(`[AGENT] Tirando print de ${sourceName}...`);
    const buffer = await page.screenshot({ type: 'jpeg', quality: config.jpegQuality || 75 });
    await sendToServer(buffer, sourceName);
  } catch (err) {
    console.error(`[AGENT] Falha em ${sourceName}:`, err.message);
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

let screenshot = null;
try {
  screenshot = require('screenshot-desktop');
} catch (e) {}

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {}

async function doCaptures() {
  if (isBusy) return;
  isBusy = true;

  try {
    const executablePath = getChromePath();
    console.log('[AGENT] Acessando Zabbix e Meraki em segundo plano (invisível)...');
    
    // Perfil dedicado e persistente para guardar cookies/sessão das contas
    const dedicatedProfile = path.join(require('os').homedir(), '.painelure-chrome-session');
    if (!fs.existsSync(dedicatedProfile)) {
      fs.mkdirSync(dedicatedProfile, { recursive: true });
    }

    const browser = await puppeteer.launch({
      executablePath,
      headless: 'new',
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-background-networking',
        `--user-data-dir=${dedicatedProfile}`,
        '--window-size=1600,900'
      ]
    });

    // Captura separada do Zabbix
    if (config.zabbixUrl) {
      await captureUrl(browser, config.zabbixUrl, 'zabbix');
    }

    // Captura separada do Meraki
    if (config.merakiUrl) {
      await captureUrl(browser, config.merakiUrl, 'meraki');
    }

    lastCaptureTime = Date.now();
    await browser.close().catch(() => {});
  } catch (e) {
    console.error('[AGENT] Erro na captura:', e.message);
  } finally {
    isBusy = false;
  }
}

async function pollServer() {
  try {
    const res = await fetch(config.serverUrl.replace(/\/+$/, '') + '/api/monitor/status');
    if (res.ok) {
      const data = await res.json();
      const wasRt = isRealtimeActive;
      isRealtimeActive = Boolean(data.realtime);
      if (!wasRt && isRealtimeActive) {
        console.log('[AGENT] ⚡ MODO TEMPO REAL ACIONADO! Capturando a cada 10s...');
        doCaptures();
      }
    }
  } catch (e) {}
}

async function runLoginSetup() {
  const dedicatedProfile = path.join(require('os').homedir(), '.painelure-chrome-session');
  console.log('====================================================');
  console.log('  PAINELURE - CONEXÃO DE CONTAS (ZABBIX E MERAKI)    ');
  console.log('====================================================');
  console.log('Abrindo janela do Chrome para você realizar login...');
  console.log('Perfil dedicado:', dedicatedProfile);

  const executablePath = getChromePath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--user-data-dir=${dedicatedProfile}`,
      '--start-maximized'
    ]
  });

  const page1 = (await browser.pages())[0] || (await browser.newPage());
  if (config.zabbixUrl) {
    console.log('[1/2] Abrindo tela do Zabbix...');
    await page1.goto(config.zabbixUrl).catch(() => {});
  }

  if (config.merakiUrl) {
    console.log('[2/2] Abrindo tela do Meraki em nova aba...');
    const page2 = await browser.newPage();
    await page2.goto(config.merakiUrl).catch(() => {});
  }

  console.log('\n----------------------------------------------------');
  console.log('👉 INSTRUÇÃO:');
  console.log('1. Na janela do Chrome que abriu, faça login no Zabbix e no Meraki.');
  console.log('2. Marque a opção de lembrar login se houver.');
  console.log('3. Quando os dois dashboards estiverem abertos e logados:');
  console.log('   Volte aqui neste terminal e aperte ENTER para salvar e fechar!');
  console.log('----------------------------------------------------\n');

  await new Promise(resolve => {
    process.stdin.resume();
    process.stdin.once('data', () => resolve());
  });

  console.log('Salvando sessão e fechando navegador...');
  await browser.close();
  console.log('✅ Sessão salva com sucesso! Agora o robô pode rodar 100% invisível em background.');
  process.exit(0);
}

async function main() {
  if (process.argv.includes('--login')) {
    await runLoginSetup();
    return;
  }

  console.log('==================================================');
  console.log('   PainelURE Monitor Zabbix & Meraki Ativo        ');
  console.log('==================================================');
  
  await doCaptures();

  setInterval(pollServer, config.intervals?.checkRealtimePollMs || 5000);
  setInterval(() => {
    const now = Date.now();
    const interval = isRealtimeActive
      ? (config.intervals?.realtimeCaptureMs || 10000)
      : (config.intervals?.normalCaptureMs || 3600000);
    if (now - lastCaptureTime >= interval) {
      doCaptures();
    }
  }, 2000);
}

main().catch(console.error);

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
    
    // Timeout curto de 15s para nao travar
    await Promise.race([
      page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }),
      new Promise(r => setTimeout(r, 8000))
    ]).catch(e => console.log(`[AGENT] Info: ${e.message}`));

    // Aguarda 3 segundos para renderizar o layout
    await new Promise(r => setTimeout(r, 3000));

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

async function doCaptures() {
  if (isBusy) return;
  isBusy = true;

  try {
    if (screenshot) {
      console.log('[AGENT] Capturando tela do PC (com Meraki e Zabbix abertos)...');
      const imgBuffer = await screenshot({ format: 'jpg' });
      await sendToServer(imgBuffer, 'zabbix-meraki-screen');
      lastCaptureTime = Date.now();
      isBusy = false;
      return;
    }

    // Fallback: caso screenshot-desktop nao esteja disponivel, tenta puppeteer
    const executablePath = getChromePath();
    console.log('[AGENT] Iniciando navegador Chrome rápido...');
    const tempProfile = path.join(require('os').tmpdir(), 'chrome-monitor-profile-' + Date.now());
    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-networking',
        `--user-data-dir=${tempProfile}`,
        '--window-size=1600,900'
      ]
    });

    if (config.zabbixUrl) await captureUrl(browser, config.zabbixUrl, 'zabbix');
    if (config.merakiUrl) await captureUrl(browser, config.merakiUrl, 'meraki');
    lastCaptureTime = Date.now();
    await browser.close().catch(() => {});
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
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

async function main() {
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

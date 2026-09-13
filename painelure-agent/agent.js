/**
 * PainelURE Monitor Agent
 * Robo Headless para capturar telas de dashboards internos (Zabbix / Meraki)
 * e sincronizar com o PainelURE no Cloudflare.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const CONFIG_FILE = path.join(__dirname, 'config.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('[ERRO] Arquivo config.json nao encontrado. Copie config.example.json para config.json.');
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (err) {
    console.error('[ERRO] Falha ao ler config.json:', err.message);
    process.exit(1);
  }
}

const config = loadConfig();

let browser = null;
let page = null;
let isRealtimeActive = false;
let lastCaptureTime = 0;
let isCapturing = false;

async function initBrowser() {
  console.log('[AGENT] Iniciando Chromium Headless com perfil persistido...');
  const userDataDir = path.join(__dirname, '.browser_data');
  browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=' + (config.viewport?.width || 1600) + ',' + (config.viewport?.height || 900)
    ]
  });

  page = await browser.newPage();
  await page.setViewport({
    width: config.viewport?.width || 1600,
    height: config.viewport?.height || 900
  });

  await ensureAuthenticated();
}

async function ensureAuthenticated() {
  try {
    console.log('[AGENT] Acessando URL do dashboard:', config.dashboardUrl);
    await page.goto(config.dashboardUrl, { waitUntil: 'networkidle2', timeout: 45000 });

    if (config.auth?.enabled && config.loginUrl) {
      const currentUrl = page.url();
      const needsLogin = currentUrl.includes('login') || currentUrl.includes('index.php');
      if (needsLogin && config.auth.username && config.auth.password) {
        console.log('[AGENT] Tela de login detectada. Efetuando autenticacao...');
        await page.waitForSelector(config.auth.userInputSelector, { timeout: 10000 });
        await page.type(config.auth.userInputSelector, config.auth.username);
        await page.type(config.auth.passwordInputSelector, config.auth.password);
        await page.click(config.auth.submitButtonSelector);
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
        console.log('[AGENT] Autenticacao realizada com sucesso.');
      }
    }
  } catch (err) {
    console.warn('[AGENT] Alerta na navegacao/login:', err.message);
  }
}

async function captureAndUpload() {
  if (isCapturing) return;
  isCapturing = true;

  try {
    if (!page || page.isClosed()) {
      await initBrowser();
    }

    try {
      await page.reload({ waitUntil: 'networkidle2', timeout: 25000 });
    } catch (e) {
      console.warn('[AGENT] Aviso no reload da pagina:', e.message);
    }

    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: config.jpegQuality || 75
    });

    const base64Image = screenshotBuffer.toString('base64');
    const payload = {
      image: 'data:image/jpeg;base64,' + base64Image,
      source: 'zabbix-ure-agent',
      timestamp: new Date().toISOString(),
      width: config.viewport?.width || 1600,
      height: config.viewport?.height || 900
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
      lastCaptureTime = Date.now();
      const sizeKb = (screenshotBuffer.length / 1024).toFixed(1);
      const modeStr = isRealtimeActive ? 'TEMPO REAL (10s)' : 'NORMAL (1h)';
      console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print enviado com sucesso (${sizeKb} KB). Modo: ${modeStr}`);
    } else {
      console.error('[AGENT] Erro no upload:', res.status, await res.text());
    }
  } catch (err) {
    console.error('[AGENT] Falha na captura/envio:', err.message);
  } finally {
    isCapturing = false;
  }
}

async function pollServerStatus() {
  try {
    const statusUrl = config.serverUrl.replace(/\/+$/, '') + '/api/monitor/status';
    const res = await fetch(statusUrl, {
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      const wasRealtime = isRealtimeActive;
      isRealtimeActive = Boolean(data.realtime);

      if (!wasRealtime && isRealtimeActive) {
        console.log('[AGENT] >> MODO TEMPO REAL ATIVADO PELO USUARIO! Capturas a cada 10s...');
        captureAndUpload();
      } else if (wasRealtime && !isRealtimeActive) {
        console.log('[AGENT] Modo Tempo Real expirou (5 min concluidos). Retornando ao ciclo normal de 1h.');
      }
    }
  } catch (err) {
    // silencia eventuais falhas de rede transitórias
  }
}

async function main() {
  console.log('==================================================');
  console.log('      PainelURE Headless Monitor Agent v1.0       ');
  console.log('==================================================');
  console.log('Servidor:', config.serverUrl);
  console.log('Dashboard Alvo:', config.dashboardUrl);
  console.log('Ciclo Normal:', (config.intervals?.normalCaptureMs || 3600000) / 60000, 'minutos');
  console.log('Ciclo Tempo Real:', (config.intervals?.realtimeCaptureMs || 10000) / 1000, 'segundos');
  console.log('--------------------------------------------------');

  await initBrowser();
  await captureAndUpload();

  setInterval(pollServerStatus, config.intervals?.checkRealtimePollMs || 5000);

  setInterval(() => {
    const now = Date.now();
    const interval = isRealtimeActive
      ? (config.intervals?.realtimeCaptureMs || 10000)
      : (config.intervals?.normalCaptureMs || 3600000);

    if (now - lastCaptureTime >= interval) {
      captureAndUpload();
    }
  }, 2000);
}

main().catch(err => {
  console.error('[AGENT FATAL]', err);
  process.exit(1);
});
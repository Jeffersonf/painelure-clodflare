/**
 * PainelURE Dual Monitor Agent (Meraki + Zabbix)
 * Captura as telas dos dashboards e envia para o PainelURE.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const CONFIG_FILE = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

let browser = null;
let pageMeraki = null;
let pageZabbix = null;
let isRealtimeActive = false;
let lastCaptureTime = 0;
let isCapturing = false;

async function initBrowser() {
  console.log('[AGENT] Conectando navegador para Meraki e Zabbix...');
  const userDataDir = path.join(__dirname, '.browser_data');
  browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1600,900'
    ]
  });

  pageZabbix = await browser.newPage();
  await pageZabbix.setViewport({ width: 1600, height: 900 });

  pageMeraki = await browser.newPage();
  await pageMeraki.setViewport({ width: 1600, height: 900 });

  console.log('[AGENT] Abrindo Zabbix...');
  try {
    await pageZabbix.goto(config.zabbixUrl, { waitUntil: 'networkidle2', timeout: 45000 });
  } catch (e) {
    console.warn('[AGENT] Zabbix timeout/carregando:', e.message);
  }

  console.log('[AGENT] Abrindo Meraki...');
  try {
    await pageMeraki.goto(config.merakiUrl, { waitUntil: 'networkidle2', timeout: 45000 });
  } catch (e) {
    console.warn('[AGENT] Meraki timeout/carregando:', e.message);
  }
}

async function captureAndSend(page, sourceName) {
  if (!page || page.isClosed()) return;
  try {
    try { await page.reload({ waitUntil: 'networkidle2', timeout: 20000 }); } catch (e) {}

    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: config.jpegQuality || 75
    });

    const base64Image = screenshotBuffer.toString('base64');
    const payload = {
      image: 'data:image/jpeg;base64,' + base64Image,
      source: sourceName,
      timestamp: new Date().toISOString()
    };

    const uploadUrl = config.serverUrl.replace(/\/+$/, '') + '/api/monitor/upload';
    await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Monitor-Token': config.agentSecretToken || ''
      },
      body: JSON.stringify(payload)
    });

    const sizeKb = (screenshotBuffer.length / 1024).toFixed(1);
    const mode = isRealtimeActive ? 'TEMPO REAL (10s)' : 'NORMAL (1h)';
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print ${sourceName.toUpperCase()} enviado com sucesso (${sizeKb} KB). Modo: ${mode}`);
  } catch (err) {
    console.error(`[AGENT] Erro ao enviar ${sourceName}:`, err.message);
  }
}

async function doCaptures() {
  if (isCapturing) return;
  isCapturing = true;
  try {
    if (!browser) await initBrowser();
    // Prioriza Zabbix e depois Meraki
    await captureAndSend(pageZabbix, 'zabbix');
    await captureAndSend(pageMeraki, 'meraki');
    lastCaptureTime = Date.now();
  } finally {
    isCapturing = false;
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
  await initBrowser();
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

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
let pageZabbix = null;
let pageMeraki = null;
let isRealtimeActive = false;
let lastCaptureTime = 0;
let isCapturing = false;

async function initBrowser() {
  console.log('[AGENT] Iniciando navegador...');
  
  // Opções leves sem travar em userDataDir
  browser = await puppeteer.launch({
    headless: 'new',
    ignoreHTTPSErrors: true,
    timeout: 60000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--no-first-run',
      '--window-size=1600,900'
    ]
  });

  const zUrl = String(config.zabbixUrl || '').trim();
  const mUrl = String(config.merakiUrl || '').trim();

  if (zUrl) {
    console.log('[AGENT] Abrindo aba Zabbix...');
    pageZabbix = await browser.newPage();
    await pageZabbix.setViewport({ width: 1600, height: 900 });
    pageZabbix.goto(zUrl, { timeout: 30000 }).catch(e => console.warn('[AGENT] Zabbix:', e.message));
  }

  if (mUrl) {
    console.log('[AGENT] Abrindo aba Meraki...');
    pageMeraki = await browser.newPage();
    await pageMeraki.setViewport({ width: 1600, height: 900 });
    pageMeraki.goto(mUrl, { timeout: 30000 }).catch(e => console.warn('[AGENT] Meraki:', e.message));
  }

  // Espera 5 segundos para renderizar a primeira tela
  console.log('[AGENT] Aguardando renderizacao inicial (5s)...');
  await new Promise(r => setTimeout(r, 5000));
}

async function captureAndSend(page, sourceName) {
  if (!page || page.isClosed()) return;
  try {
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
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Monitor-Token': config.agentSecretToken || ''
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const sizeKb = (screenshotBuffer.length / 1024).toFixed(1);
      const mode = isRealtimeActive ? 'TEMPO REAL (10s)' : 'NORMAL (1h)';
      console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print ${sourceName.toUpperCase()} enviado com sucesso (${sizeKb} KB). Modo: ${mode}`);
    } else {
      console.error('[AGENT] Resposta servidor:', res.status, await res.text());
    }
  } catch (err) {
    console.error(`[AGENT] Erro ao capturar ${sourceName}:`, err.message);
  }
}

async function doCaptures() {
  if (isCapturing) return;
  isCapturing = true;
  try {
    if (!browser) await initBrowser();
    if (pageZabbix) await captureAndSend(pageZabbix, 'zabbix');
    if (pageMeraki) await captureAndSend(pageMeraki, 'meraki');
    lastCaptureTime = Date.now();
  } catch (err) {
    console.error('[AGENT] Erro geral:', err.message);
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

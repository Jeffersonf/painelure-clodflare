/**
 * PainelURE Monitor Agent
 * Captura Zabbix e Meraki de forma confiavel e rapida.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const CONFIG_FILE = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

let isRealtimeActive = false;
let lastCaptureTime = 0;
let isBusy = false;

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
  console.log(`[AGENT] Capturando ${sourceName}...`);
  let page = null;
  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 }).catch(e => {
      console.warn(`[AGENT] Aviso ao carregar ${sourceName}: ${e.message}`);
    });
    
    // Pequena pausa para os graficos renderizarem
    await new Promise(r => setTimeout(r, 2000));

    const buffer = await page.screenshot({ type: 'jpeg', quality: config.jpegQuality || 75 });
    await sendToServer(buffer, sourceName);
  } catch (err) {
    console.error(`[AGENT] Falha em ${sourceName}:`, err.message);
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

async function doCaptures() {
  if (isBusy) return;
  isBusy = true;
  let browser = null;
  try {
    console.log('[AGENT] Iniciando Chromium para captura...');
    browser = await puppeteer.launch({
      headless: 'new',
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1600,900'
      ]
    });

    if (config.zabbixUrl) await captureUrl(browser, config.zabbixUrl, 'zabbix');
    if (config.merakiUrl) await captureUrl(browser, config.merakiUrl, 'meraki');
    lastCaptureTime = Date.now();
  } catch (e) {
    console.error('[AGENT] Erro no ciclo de captura:', e.message);
  } finally {
    if (browser) await browser.close().catch(() => {});
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

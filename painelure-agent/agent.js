/**
 * PainelURE Monitor Agent - Captura de Tela + Leitura de Incidentes (Zabbix/Meraki)
 * Tira print da tela do Windows e, se o Chrome estiver aberto com porta de depuração (9222),
 * lê diretamente a lista de escolas em Desastre (Zabbix) e APs Offline (Meraki).
 */

const fs = require('fs');
const path = require('path');
const screenshot = require('screenshot-desktop');

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  // prossegue sem sharp se não estiver compilado
}

let puppeteer = null;
try {
  puppeteer = require('puppeteer-core');
} catch (e) {
  try {
    puppeteer = require('puppeteer');
  } catch (err) {}
}

const CONFIG_FILE = path.join(__dirname, 'config.json');
let config = {};

try {
  config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
} catch (e) {
  console.error('Erro ao ler config.json:', e.message);
}

const SERVER_URL = (config.serverUrl || 'https://painelure-cloudflare-pages.pages.dev').replace(/\/+$/, '');
const TOKEN = config.agentSecretToken || 'ure-monitor-secret-2026';
const JPEG_QUALITY = config.jpegQuality || 70;
const DEBUG_PORT = config.chromeDebugPort || 9222;

let isRealtimeActive = false;
let lastCaptureTime = 0;
let isBusy = false;
let lastAlertsData = null;

/**
 * Conecta via DevTools Protocol ao Chrome aberto na porta 9222 e extrai os incidentes do Zabbix e Meraki
 */
async function scrapeChromeAlerts() {
  if (!puppeteer) return null;
  let browser = null;
  try {
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${DEBUG_PORT}`,
      defaultViewport: null
    });

    const pages = await browser.pages();
    const alerts = {
      zabbix: [],
      meraki: [],
      schoolsMap: {}
    };

    for (const page of pages) {
      const url = page.url() || '';

      // 1. Scraping Zabbix
      if (url.includes('zabbix') || url.includes('problem.view')) {
        try {
          const zabbixProblems = await page.evaluate(() => {
            const list = [];
            const rows = document.querySelectorAll('table.list-table tbody tr, table.problem-table tbody tr, table tbody tr');
            for (const r of rows) {
              const text = r.innerText || '';
              if (/desastre|disaster/i.test(text)) {
                const cols = Array.from(r.querySelectorAll('td')).map(td => td.innerText.trim());
                let schoolName = '';
                for (const c of cols) {
                  if (/EE\s|PEI\s|Escola/i.test(c)) {
                    schoolName = c;
                    break;
                  }
                }
                const timeMatch = text.match(/\b\d{2}:\d{2}:\d{2}\b/);
                const timeStr = timeMatch ? timeMatch[0] : '';
                if (schoolName) {
                  list.push({
                    name: schoolName,
                    time: timeStr,
                    status: 'Desastre',
                    fullText: text.slice(0, 100)
                  });
                }
              }
            }
            return list;
          });

          if (zabbixProblems && zabbixProblems.length > 0) {
            alerts.zabbix = zabbixProblems;
            zabbixProblems.forEach(p => {
              alerts.schoolsMap[p.name] = {
                zabbix: { status: 'Desastre', time: p.time || 'Agora' }
              };
            });
          }
        } catch (zErr) {}
      }

      // 2. Scraping Meraki
      if (url.includes('meraki.com') || url.includes('organization/overview')) {
        try {
          const merakiProblems = await page.evaluate(() => {
            const list = [];
            const rows = document.querySelectorAll('table tbody tr, div[role="row"]');
            for (const r of rows) {
              const text = r.innerText || '';
              const hasRed = Boolean(r.querySelector('.status-red, .offline, .critical, [style*="red"], [style*="#ef4444"], [style*="#d9534f"], [data-status="offline"]'));
              const matchRatio = text.match(/(\d+)\s*\/\s*(\d+)/);
              if (hasRed || /offline|desconectado/i.test(text)) {
                let name = '';
                const cols = Array.from(r.querySelectorAll('td, div[role="cell"]')).map(c => c.innerText.trim());
                for (const c of cols) {
                  if (/EE\s|PEI\s|Escola/i.test(c)) {
                    name = c;
                    break;
                  }
                }
                if (!name && cols.length > 0) name = cols[0];

                let offline = 1;
                let total = 1;
                if (matchRatio) {
                  offline = parseInt(matchRatio[1], 10);
                  total = parseInt(matchRatio[2], 10);
                }

                if (name) {
                  list.push({
                    name,
                    offline,
                    total,
                    hasRedDot: true
                  });
                }
              }
            }
            return list;
          });

          if (merakiProblems && merakiProblems.length > 0) {
            alerts.meraki = merakiProblems;
            merakiProblems.forEach(m => {
              if (!alerts.schoolsMap[m.name]) alerts.schoolsMap[m.name] = {};
              alerts.schoolsMap[m.name].meraki = {
                offline: m.offline,
                total: m.total,
                hasRedDot: true
              };
            });
          }
        } catch (mErr) {}
      }
    }

    browser.disconnect();
    return (alerts.zabbix.length > 0 || alerts.meraki.length > 0) ? alerts : null;
  } catch (err) {
    return null;
  }
}

async function sendToServer(buffer, mimeType = 'image/jpeg', sourceName = 'desktop', alerts = null) {
  const base64Image = buffer.toString('base64');
  const payload = {
    image: `data:${mimeType};base64,` + base64Image,
    source: sourceName,
    timestamp: new Date().toISOString()
  };

  if (alerts) {
    payload.alerts = alerts;
  }

  const uploadUrl = `${SERVER_URL}/api/monitor/upload`;
  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Monitor-Token': TOKEN
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const sizeKb = (buffer.length / 1024).toFixed(1);
    const mode = isRealtimeActive ? '⚡ TEMPO REAL (5s)' : 'NORMAL (1h)';
    const alertInfo = alerts ? ` | Alertas: ${alerts.zabbix?.length || 0} Zabbix, ${alerts.meraki?.length || 0} Meraki` : '';
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print enviado (${sizeKb} KB). Modo: ${mode}${alertInfo}`);
  } else {
    console.error('[AGENT] Erro ao enviar para servidor:', res.status, await res.text());
  }
}

async function captureDesktop() {
  if (isBusy) return;
  isBusy = true;

  try {
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Capturando print da tela...`);
    
    const alerts = await scrapeChromeAlerts();
    if (alerts) {
      lastAlertsData = alerts;
    }

    const rawPng = await screenshot({ format: 'png' });
    let finalBuffer = rawPng;
    let mime = 'image/png';

    if (sharp) {
      try {
        finalBuffer = await sharp(rawPng)
          .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY, progressive: true })
          .toBuffer();
        mime = 'image/jpeg';
      } catch (sharpErr) {
        console.warn('[AGENT] Aviso compressão sharp:', sharpErr.message);
      }
    }

    await sendToServer(finalBuffer, mime, 'both', lastAlertsData);
    lastCaptureTime = Date.now();
  } catch (err) {
    console.error('[AGENT] Erro na captura:', err.message);
  } finally {
    isBusy = false;
  }
}

async function pollServer() {
  try {
    const res = await fetch(`${SERVER_URL}/api/monitor/status`);
    if (res.ok) {
      const data = await res.json();
      const wasRt = isRealtimeActive;
      isRealtimeActive = Boolean(data.realtime);
      if (!wasRt && isRealtimeActive) {
        console.log('[AGENT] ⚡ MODO TEMPO REAL ACIONADO PELO SITE! Capturando...');
        captureDesktop();
      }
    }
  } catch (e) {}
}

async function main() {
  console.log('==================================================');
  console.log('   PainelURE Monitor - Captura de Tela + Alertas  ');
  console.log('   (Zabbix e Meraki no monitor/área de trabalho) ');
  console.log('==================================================');
  console.log('Servidor:', SERVER_URL);
  console.log(`Porta Depuração Chrome: ${DEBUG_PORT}`);
  console.log('Intervalo normal: 1 hora | Tempo real: 5 segundos');
  console.log('Iniciando primeira captura...\n');

  await captureDesktop();

  setInterval(pollServer, config.intervals?.checkRealtimePollMs || 3000);

  setInterval(() => {
    const now = Date.now();
    const interval = isRealtimeActive
      ? (config.intervals?.realtimeCaptureMs || 5000)
      : (config.intervals?.normalCaptureMs || 3600000);

    if (now - lastCaptureTime >= interval) {
      captureDesktop();
    }
  }, 1000);
}

main().catch(console.error);

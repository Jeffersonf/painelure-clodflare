/**
 * PainelURE Monitor Agent - Captura de Tela + Leitura de Incidentes (Zabbix/Meraki)
 * Conecta via porta de depuração do Chrome (9222) para ler os códigos CIE e status em tempo real.
 */

const fs = require('fs');
const path = require('path');
const screenshot = require('screenshot-desktop');

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {}

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

// Mapa oficial de CIE -> Nome da Escola para tradução automática precisa
const CIE_SCHOOL_MAP = {
  '905227': 'PEI EE Idalicio Mendes Lima',
  '049323': 'EE Doutor Antonio Deffune',
  '49323':  'EE Doutor Antonio Deffune',
  '039731': 'PEI EE Professora Celia Vasques Ferrari Duch',
  '39731':  'PEI EE Professora Celia Vasques Ferrari Duch',
  '035348': 'PEI EE Professora Cinira Daniel da Silva',
  '35348':  'PEI EE Professora Cinira Daniel da Silva',
  '915087': 'EE Bairro Ferreira dos Matos',
  '015568': 'PEI EE Professora Francelina Franco',
  '15568':  'PEI EE Professora Francelina Franco',
  '043412': 'EE Professor Gerson de Barros Margarido',
  '43412':  'EE Professor Gerson de Barros Margarido',
  '915075': 'EE Bairro Boa Vista Intervales',
  '015477': 'PEI EE Jeminiano David Muzel',
  '15477':  'PEI EE Jeminiano David Muzel',
  '910077': 'PEI EE Professor Joao Baptista do Amaral Vasconcellos',
  '015519': 'PEI EE Professor Jose Vasques Ferrari',
  '15519':  'PEI EE Professor Jose Vasques Ferrari',
  '015489': 'PEI EE Professora Nicota Soares',
  '15489':  'PEI EE Professora Nicota Soares',
  '015076': 'PEI EE Oscar Kurtz Camargo',
  '15076':  'PEI EE Oscar Kurtz Camargo',
  '015404': 'PEI EE Otavio Ferrari',
  '15404':  'PEI EE Otavio Ferrari',
  '015118': 'PEI EE Padre Arlindo Vieira',
  '15118':  'PEI EE Padre Arlindo Vieira',
  '015222': 'EE Doutor Raul Venturelli',
  '15222':  'EE Doutor Raul Venturelli',
  '915117': 'PEI EE Ricardo Campolim de Almeida Neto',
  '035336': 'EE Professor Silverio Monteiro',
  '35336':  'EE Professor Silverio Monteiro',
  '015428': 'PEI EE Simpliciano Campolim de Almeida',
  '15428':  'PEI EE Simpliciano Campolim de Almeida',
  '926036': 'EE Bairro Turvo dos Almeidas',
  '015544': 'PEI EE Professora Zulmira de Oliveira',
  '15544':  'PEI EE Professora Zulmira de Oliveira'
};

function getSchoolNameByCie(rawCode) {
  if (!rawCode) return null;
  const digits = String(rawCode).replace(/\D/g, '');
  if (CIE_SCHOOL_MAP[digits]) return CIE_SCHOOL_MAP[digits];
  // Tenta sem zeros à esquerda ou com zeros à esquerda (pad 6)
  const trimmed = digits.replace(/^0+/, '');
  if (CIE_SCHOOL_MAP[trimmed]) return CIE_SCHOOL_MAP[trimmed];
  const padded = digits.padStart(6, '0');
  if (CIE_SCHOOL_MAP[padded]) return CIE_SCHOOL_MAP[padded];
  return null;
}

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

    const zabbixMap = new Map();
    const merakiMap = new Map();

    for (const page of pages) {
      const url = page.url() || '';

      // ── 1. SCRAPING ZABBIX ──
      if (url.includes('zabbix') || url.includes('problem.view')) {
        try {
          const rawProblems = await page.evaluate(() => {
            const list = [];
            const rows = document.querySelectorAll('table.list-table tbody tr, table.problem-table tbody tr, table tbody tr');
            for (const r of rows) {
              const text = r.innerText || '';
              // Verifica se a linha indica Severidade "Desastre"
              if (/desastre/i.test(text)) {
                const cells = Array.from(r.querySelectorAll('td')).map(td => td.innerText.trim());
                
                const timeMatch = text.match(/(\d{2}-\d{2}-\d{4}\s+)?\b\d{2}:\d{2}:\d{2}\b/);
                const timeStr = timeMatch ? timeMatch[0] : '';
                
                let hostStr = '';
                for (const c of cells) {
                  const m = c.match(/\b(FW-|RT-|SW-)?(\d{5,6})(-RT|_RT|-sw\d*)?\b/i);
                  if (m) {
                    hostStr = m[2];
                    break;
                  }
                }

                if (hostStr) {
                  list.push({
                    cie: hostStr,
                    time: timeStr,
                    status: 'Desastre'
                  });
                }
              }
            }
            return list;
          });

          rawProblems.forEach(p => {
            const schoolName = getSchoolNameByCie(p.cie) || ('Escola CIE ' + p.cie);
            if (!zabbixMap.has(p.cie)) {
              zabbixMap.set(p.cie, {
                cie: p.cie,
                name: schoolName,
                time: p.time,
                status: 'Desastre'
              });
            }
          });
        } catch (zErr) {
          console.warn('[AGENT] Erro ao ler aba Zabbix:', zErr.message);
        }
      }

      // ── 2. SCRAPING MERAKI ──
      if (url.includes('meraki.com') || url.includes('organization/overview')) {
        try {
          const rawMeraki = await page.evaluate(() => {
            const list = [];
            // O Meraki renderiza tabelas ou divs com role row
            const rows = document.querySelectorAll('tr, [role="row"], div.TableRow, div.table-row');
            
            for (const r of rows) {
              const text = r.innerText || '';
              // Procura por CIE de 5 ou 6 dígitos
              const mCie = text.match(/\b(\d{5,6})\b/);
              if (!mCie) continue;
              const cie = mCie[1];

              // Procura se tem indicativo de offline ou bolinha vermelha
              const hasRed = Boolean(
                r.querySelector('.status-red, .offline, .critical, [style*="red"], [style*="#ef4444"], [style*="#d9534f"]') ||
                r.innerHTML.includes('background-color: rgb(239, 68, 68)') ||
                r.innerHTML.includes('background-color: #ef4444') ||
                r.innerHTML.includes('offline') ||
                r.innerHTML.includes('Status: Alert')
              );

              // Tenta extrair numeros da linha: ex "910077 12 1 Wireless DE_ITAPEVA"
              // onde 12 é devices e 1 é offline
              const tokens = text.split(/[\t\n\r ]+/).filter(Boolean);
              const cieIdx = tokens.indexOf(cie);
              let total = 0;
              let offline = 0;

              if (cieIdx !== -1 && tokens.length > cieIdx + 2) {
                const num1 = parseInt(tokens[cieIdx + 1], 10);
                const num2 = parseInt(tokens[cieIdx + 2], 10);
                if (!isNaN(num1) && num1 >= 0 && num1 < 200) total = num1;
                if (!isNaN(num2) && num2 >= 0 && num2 <= Math.max(total, 50)) offline = num2;
              }

              // Se não achou por token relativo, tenta pelas células diretas (td / role=cell)
              if (total === 0) {
                const cells = Array.from(r.querySelectorAll('td, [role="cell"]')).map(c => c.innerText.trim());
                for (let i = 0; i < cells.length; i++) {
                  if (cells[i] === cie && i + 2 < cells.length) {
                    total = parseInt(cells[i + 1], 10) || 0;
                    offline = parseInt(cells[i + 2], 10) || 0;
                    break;
                  }
                }
              }

              if (offline > 0 || hasRed) {
                list.push({
                  cie,
                  total: Math.max(total, offline, 1),
                  offline: Math.max(offline, 1),
                  hasRedDot: true
                });
              }
            }
            return list;
          });

          rawMeraki.forEach(m => {
            if (!merakiMap.has(m.cie)) {
              const name = getSchoolNameByCie(m.cie) || ('Escola CIE ' + m.cie);
              merakiMap.set(m.cie, {
                cie: m.cie,
                name,
                total: m.total,
                offline: m.offline,
                hasRedDot: m.hasRedDot
              });
            }
          });
        } catch (mErr) {
          console.warn('[AGENT] Erro ao ler aba Meraki:', mErr.message);
        }
      }
    }

    alerts.zabbix = Array.from(zabbixMap.values());
    alerts.meraki = Array.from(merakiMap.values());

    alerts.zabbix.forEach(z => {
      if (!alerts.schoolsMap[z.name]) alerts.schoolsMap[z.name] = {};
      alerts.schoolsMap[z.name].zabbix = { status: 'Desastre', time: z.time || 'Agora' };
    });

    alerts.meraki.forEach(m => {
      if (!alerts.schoolsMap[m.name]) alerts.schoolsMap[m.name] = {};
      alerts.schoolsMap[m.name].meraki = {
        offline: m.offline,
        total: m.total,
        hasRedDot: m.hasRedDot
      };
    });

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
    const alertInfo = alerts ? ` | Identificados: ${alerts.zabbix?.length || 0} Zabbix Desastre, ${alerts.meraki?.length || 0} Meraki Offline` : ' | (Sem alertas)';
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print enviado (${sizeKb} KB). Modo: ${mode}${alertInfo}`);
  } else {
    console.error('[AGENT] Erro ao enviar para servidor:', res.status, await res.text());
  }
}

async function captureDesktop() {
  if (isBusy) return;
  isBusy = true;

  try {
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Lendo abas do Chrome e capturando tela...`);
    
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
      } catch (sharpErr) {}
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
  console.log('   (Zabbix e Meraki - Decodificacao por CIE)     ');
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

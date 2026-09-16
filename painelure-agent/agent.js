/**
 * PainelURE Monitor Agent - Captura de Tela + Leitura de Incidentes (Zabbix/Meraki)
 * Conecta via porta de depuração do Chrome (9222) para ler os códigos CIE e status em tempo real.
 */

const fs = require('fs');
const path = require('path');
const net = require('net');
const { exec } = require('child_process');
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


// ── SISTEMA ANTI-BLOQUEIO DO WINDOWS (KEEP-AWAKE) ──
// Impede que o Windows desligue o monitor ou entre em Lock Screen por inatividade
const VBS_KEEP_AWAKE = path.join(__dirname, '.keep-awake.vbs');
function ensureKeepAwakeScript() {
  if (!fs.existsSync(VBS_KEEP_AWAKE)) {
    fs.writeFileSync(VBS_KEEP_AWAKE, 'Set s = CreateObject("WScript.Shell")\ns.SendKeys "{SCROLLLOCK}"\ns.SendKeys "{SCROLLLOCK}"\n', 'utf8');
  }
}
function triggerKeepAwake() {
  try {
    ensureKeepAwakeScript();
    exec(`cscript //nologo "${VBS_KEEP_AWAKE}"`, () => {});
  } catch(e) {}
}
// Dispara a cada 45 segundos para manter a sessão gráfica ativa
setInterval(triggerKeepAwake, 45000);
triggerKeepAwake();

let isRealtimeActive = false;
let lastCaptureTime = 0;
let isBusy = false;
let lastAlertsData = null;

// Tabela Oficial de DVRs da SEDUC/SP (Aba Itapeva) - 33 Equipamentos Reais
const DVRS_MAP = {
  "EE Doutor Antonio Deffune": [
    {
      "name": "DVR 1",
      "ip": "10.113.9.148",
      "cameras": 16,
      "status": "online"
    }
  ],
  "EE Doutor Raul Venturelli": [
    {
      "name": "DVR 1",
      "ip": "10.109.40.179",
      "cameras": 16,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.109.40.173",
      "cameras": null,
      "status": "offline"
    },
    {
      "name": "DVR 3",
      "ip": "10.109.40.188",
      "cameras": null,
      "status": "online"
    }
  ],
  "EE Bairro Ferreira dos Matos": [
    {
      "name": "DVR 1",
      "ip": "10.121.243.147",
      "cameras": 15,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.121.243.144",
      "cameras": 8,
      "status": "online"
    }
  ],
  "PEI EE Professora Francelina Franco": [
    {
      "name": "DVR 2",
      "ip": "10.119.128.21",
      "cameras": 14,
      "status": "offline"
    },
    {
      "name": "DVR 3",
      "ip": "10.119.128.20",
      "cameras": null,
      "status": "online"
    },
    {
      "name": "DVR 1",
      "ip": "10.119.128.20",
      "cameras": 25,
      "status": "online"
    }
  ],
  "EE Bairro Turvo dos Almeidas": [
    {
      "name": "DVR 1",
      "ip": "10.120.218.20",
      "cameras": 4,
      "status": "online"
    }
  ],
  "EE Professor Silverio Monteiro": [
    {
      "name": "DVR 1",
      "ip": "10.121.245.47",
      "cameras": 9,
      "status": "offline"
    },
    {
      "name": "DVR 2",
      "ip": "10.121.245.48",
      "cameras": 15,
      "status": "offline"
    }
  ],
  "PEI EE Jeminiano David Muzel": [
    {
      "name": "DVR 1",
      "ip": "10.109.41.66",
      "cameras": 36,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.109.41.68",
      "cameras": 13,
      "status": "online"
    }
  ],
  "PEI EE Professora Nicota Soares": [
    {
      "name": "DVR 1",
      "ip": "10.173.46.20",
      "cameras": 16,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.173.46.21",
      "cameras": 18,
      "status": "online"
    },
    {
      "name": "DVR 3",
      "ip": "10.173.46.22",
      "cameras": 16,
      "status": "online"
    }
  ],
  "PEI EE Professora Zulmira de Oliveira": [
    {
      "name": "DVR 1",
      "ip": "10.119.160.148",
      "cameras": 11,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.119.160.149",
      "cameras": 13,
      "status": "online"
    }
  ],
  "PEI EE Idalicio Mendes Lima": [
    {
      "name": "DVR 1",
      "ip": "10.109.41.3",
      "cameras": 15,
      "status": "online"
    }
  ],
  "PEI EE Padre Arlindo Vieira": [
    {
      "name": "DVR 1",
      "ip": "10.109.40.194",
      "cameras": 9,
      "status": "online"
    }
  ],
  "PEI EE Professora Celia Vasques Ferrari Duch": [
    {
      "name": "DVR 1",
      "ip": "10.109.42.226",
      "cameras": 12,
      "status": "online"
    }
  ],
  "PEI EE Professora Cinira Daniel da Silva": [
    {
      "name": "DVR 1",
      "ip": "10.109.41.226",
      "cameras": 10,
      "status": "online"
    }
  ],
  "PEI EE Professor Joao Baptista do Amaral Vasconcellos": [
    {
      "name": "DVR 1",
      "ip": "10.119.127.20",
      "cameras": 15,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.119.127.23",
      "cameras": null,
      "status": "online"
    },
    {
      "name": "DVR 3",
      "ip": "10.119.127.22",
      "cameras": null,
      "status": "online"
    }
  ],
  "PEI EE Professor Jose Vasques Ferrari": [
    {
      "name": "DVR 1",
      "ip": "10.173.48.20",
      "cameras": 16,
      "status": "online"
    }
  ],
  "PEI EE Oscar Kurtz Camargo": [
    {
      "name": "DVR 1",
      "ip": "10.119.161.20",
      "cameras": 9,
      "status": "online"
    }
  ],
  "PEI EE Otavio Ferrari": [
    {
      "name": "DVR 1",
      "ip": "10.119.159.20",
      "cameras": 24,
      "status": "online"
    }
  ],
  "PEI EE Ricardo Campolim de Almeida Neto": [
    {
      "name": "DVR 1",
      "ip": "10.109.42.66",
      "cameras": 9,
      "status": "online"
    }
  ],
  "PEI EE Simpliciano Campolim de Almeida": [
    {
      "name": "DVR 1",
      "ip": "10.121.242.148",
      "cameras": 12,
      "status": "offline"
    }
  ],
  "EE Professor Gerson de Barros Margarido": [
    {
      "name": "DVR 1",
      "ip": "10.109.41.131",
      "cameras": null,
      "status": "online"
    },
    {
      "name": "DVR 2",
      "ip": "10.113.136.20",
      "cameras": null,
      "status": "online"
    }
  ]
};

function execPing(ip, timeoutMs = 1200) {
  return new Promise(resolve => {
    if (!ip || !ip.includes('.')) return resolve({ online: false, reason: 'invalid_ip' });
    const start = Date.now();
    // 2 pings com timeout de 1200ms para links remotos da Intragov
    exec(`ping -n 2 -w ${timeoutMs} ${ip}`, (error, stdout) => {
      const latency = Date.now() - start;
      const text = stdout || '';
      // Verifica se houve perda total
      const isFailed = (/100% de perda|100% loss|Esgotado o tempo|Host de destino inacess/i.test(text)) && !/Resposta de|Reply from/i.test(text);
      const isReply = !isFailed && (/tempo[<=](\d+)ms/i.test(text) || /time[<=](\d+)ms/i.test(text) || /bytes=32/i.test(text));

      if (isReply) {
        const timeMatch = text.match(/(?:tempo|time)[<=](\d+)ms/i);
        const pingTime = timeMatch ? Number(timeMatch[1]) : latency;
        resolve({ online: true, latency: pingTime });
      } else {
        resolve({ online: false, reason: 'unreachable' });
      }
    });
  });
}

let lastDvrCheckTime = 0;
let cachedDvrStatus = null;

async function checkAllDvrs() {
  console.log('[AGENT] 📹 Verificando status dos 33 DVRs reais via PING ICMP (ciclo de 1 hora)...');
  const results = {};
  let total = 0;
  let onlineCount = 0;
  let offlineCount = 0;

  const promises = [];

  for (const [school, dvrList] of Object.entries(DVRS_MAP)) {
    results[school] = [];
    for (const dvr of dvrList) {
      total++;
      const p = execPing(dvr.ip).then(res => {
        const item = {
          name: dvr.name,
          ip: dvr.ip,
          cameras: dvr.cameras,
          status: res.online ? 'online' : 'offline',
          latency: res.latency || null,
          checkedAt: new Date().toISOString()
        };
        if (res.online) onlineCount++;
        else offlineCount++;
        results[school].push(item);
      });
      promises.push(p);
    }
  }

  await Promise.allSettled(promises);

  cachedDvrStatus = {
    updatedAt: new Date().toISOString(),
    summary: {
      total,
      online: onlineCount,
      offline: offlineCount
    },
    schools: results
  };

  lastDvrCheckTime = Date.now();
  console.log(`[AGENT] 📹 PING dos DVRs concluído: ${onlineCount}/${total} ONLINE (${offlineCount} offline).`);
  return cachedDvrStatus;
}


/**
 * Conecta via DevTools Protocol ao Chrome aberto na porta 9222 e extrai os incidentes do Zabbix e Meraki
 */
async function scrapeChromeAlerts() {
  if (!puppeteer) {
    console.warn('[CHROME] ⚠️ Módulo puppeteer não encontrado.');
    return null;
  }
  let browser = null;
  try {
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${DEBUG_PORT}`,
      defaultViewport: null
    });
    console.log(`[CHROME] 🟢 Conectado com sucesso na porta ${DEBUG_PORT}!`);

    const pages = await browser.pages();
    const alerts = {
      zabbix: [],
      meraki: [],
      schoolsMap: {}
    };

    const zabbixMap = new Map();
    const merakiMap = new Map();
    let zabbixPage = null;
    let merakiPage = null;

    for (const page of pages) {
      const url = page.url() || '';
      if (!zabbixPage && (url.includes('zabbix') || url.includes('problem.view'))) {
        zabbixPage = page;
      }
      if (!merakiPage && (url.includes('meraki.com') || url.includes('organization/overview'))) {
        merakiPage = page;
      }

      // ── 1. SCRAPING ZABBIX ──
      if (url.includes('zabbix') || url.includes('problem.view')) {
        try {
          const rawProblems = await page.evaluate(() => {
            const list = [];
            const rows = document.querySelectorAll('table.list-table tbody tr, table.problem-table tbody tr, table tbody tr');
            for (const r of rows) {
              const text = r.innerText || '';
              if (/desastre/i.test(text)) {
                const cells = Array.from(r.querySelectorAll('td')).map(td => td.innerText.trim());
                const timeMatch = text.match(/(\d{2}-\d{2}-\d{4}\s+)?\b\d{2}:\d{2}:\d{2}\b/);
                const timeStr = timeMatch ? timeMatch[0] : '';
                let hostStr = '';
                for (const c of cells) {
                  const m = c.match(/\b(FW-|RT-|SW-)?(\d{5,6})(-RT|_RT|-sw\d*)?\b/i);
                  if (m) { hostStr = m[2]; break; }
                }
                if (hostStr) {
                  let fullHost = hostStr;
                  for (const c of cells) {
                    if (c.includes(hostStr)) { fullHost = c; break; }
                  }
                  list.push({ cie: hostStr, host: fullHost, time: timeStr, status: 'Desastre' });
                }
              }
            }
            return list;
          });

          rawProblems.forEach((p) => {
            const schoolName = getSchoolNameByCie(p.cie) || ('Escola CIE ' + p.cie);
            if (!zabbixMap.has(p.cie)) {
              zabbixMap.set(p.cie, { cie: p.cie, name: schoolName, host: p.host, time: p.time, status: p.status });
            }
          });
        } catch (zErr) {
          console.warn('[CHROME] Erro ao ler aba Zabbix:', zErr.message);
        }
      }

      // ── 2. SCRAPING MERAKI ──
      if (url.includes('meraki.com') || url.includes('organization/overview')) {
        try {
          const rawMeraki = await page.evaluate(() => {
            const list = [];
            const rows = document.querySelectorAll('table tbody tr, .table-row, [role="row"]');
            for (const r of rows) {
              const text = r.innerText || '';
              const matchCie = text.match(/\b\d{5,6}\b/);
              if (!matchCie) continue;
              const cie = matchCie[0];
              const dotEl = r.querySelector('.status-dot--alert, .status-dot--error, [class*="alert"], [class*="offline"], [class*="down"], .badge--danger');
              const hasRedColor = r.querySelector('[style*="rgb(220"], [style*="rgb(239"], [style*="red"]');
              if (!dotEl && !hasRedColor) continue;

              const tokens = text.split(/\s+/);
              const cieIdx = tokens.findIndex(t => t.includes(cie));
              let total = 0;
              let offline = 0;
              if (cieIdx >= 0 && cieIdx + 2 < tokens.length) {
                const num1 = parseInt(tokens[cieIdx + 1], 10);
                const num2 = parseInt(tokens[cieIdx + 2], 10);
                if (!isNaN(num1) && num1 > 0 && num1 < 100) total = num1;
                if (!isNaN(num2) && num2 >= 0 && num2 <= Math.max(total, 50)) offline = num2;
              }
              if (offline > 0) {
                list.push({ cie, total: Math.max(total, offline, 1), offline: offline, hasRedDot: true });
              }
            }
            return list;
          });

          rawMeraki.forEach(m => {
            if (!merakiMap.has(m.cie)) {
              const name = getSchoolNameByCie(m.cie) || ('Escola CIE ' + m.cie);
              merakiMap.set(m.cie, { cie: m.cie, name, total: m.total, offline: m.offline, hasRedDot: m.hasRedDot });
            }
          });
        } catch (mErr) {
          console.warn('[CHROME] Erro ao ler aba Meraki:', mErr.message);
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
      alerts.schoolsMap[m.name].meraki = { offline: m.offline, total: m.total, hasRedDot: m.hasRedDot };
    });

    // ── 3. CAPTURA DE SCREENSHOT DAS ABAS DO CHROME (DIRETO EM JPEG SEM DEPENDER DE SHARP) ──
    let chromeTabsScreenshot = null;
    try {
      if (zabbixPage && merakiPage && sharp) {
        const [shotZabbix, shotMeraki] = await Promise.all([
          zabbixPage.screenshot({ type: 'png', captureBeyondViewport: false }).catch(() => null),
          merakiPage.screenshot({ type: 'png', captureBeyondViewport: false }).catch(() => null)
        ]);

        if (shotZabbix && shotMeraki) {
          const zabbixResized = await sharp(shotZabbix).resize(960, 1080, { fit: 'fill' }).toBuffer();
          const merakiResized = await sharp(shotMeraki).resize(960, 1080, { fit: 'fill' }).toBuffer();

          chromeTabsScreenshot = await sharp({
            create: { width: 1920, height: 1080, channels: 4, background: { r: 10, g: 15, b: 25, alpha: 1 } }
          }).composite([
            { input: zabbixResized, top: 0, left: 0 },
            { input: merakiResized, top: 0, left: 960 }
          ]).jpeg({ quality: JPEG_QUALITY, progressive: true }).toBuffer();
        }
      }

      // Fallback sem sharp: tira print nativo em JPEG direto pelo Chrome da aba disponível!
      if (!chromeTabsScreenshot) {
        const targetPage = zabbixPage || merakiPage;
        if (targetPage) {
          console.log(`[CHROME] 📸 Capturando screenshot nativo da aba: ${targetPage.url().slice(0, 40)}...`);
          chromeTabsScreenshot = await targetPage.screenshot({
            type: 'jpeg',
            quality: JPEG_QUALITY,
            captureBeyondViewport: false
          }).catch(err => {
            console.warn('[CHROME] Falha no screenshot nativo da aba:', err.message);
            return null;
          });
        }
      }
    } catch (tabShotErr) {
      console.warn('[CHROME] Aviso ao capturar abas:', tabShotErr.message);
    }

    browser.disconnect();
    return {
      alerts: (alerts.zabbix.length > 0 || alerts.meraki.length > 0) ? alerts : null,
      chromeTabsScreenshot
    };
  } catch (err) {
    console.warn(`[CHROME] ⚠️ Chrome não respondeu na porta ${DEBUG_PORT} (${err.message}). O agente usará captura física do desktop.`);
    return null;
  }
}

function isRawPngBlack(buffer) {
  if (!buffer || buffer.length < 500) return true;
  // Amostra simples de bytes em buffers PNG/JPEG
  let nonBlack = 0;
  const sampleStep = Math.max(1, Math.floor(buffer.length / 500));
  for (let i = 100; i < buffer.length - 100; i += sampleStep) {
    if (buffer[i] > 25) nonBlack++;
  }
  return nonBlack < 20;
}

function isImageBlack(rawBuffer, width, height, channels = 3) {
  if (!rawBuffer || rawBuffer.length === 0) return true;
  let nonBlackCount = 0;
  const totalPixels = width * height;
  const step = Math.max(1, Math.floor(totalPixels / 600));
  for (let i = 0; i < rawBuffer.length; i += step * channels) {
    const r = rawBuffer[i];
    const g = rawBuffer[i + 1];
    const b = rawBuffer[i + 2];
    if (r > 16 || g > 16 || b > 16) {
      nonBlackCount++;
    }
  }
  return nonBlackCount < 15; // Menos de 15 amostras iluminadas => tela preta/bloqueada
}

async function sendToServer(buffer, mimeType = 'image/jpeg', sourceName = 'desktop', alerts = null) {
  const payload = {
    source: sourceName,
    timestamp: new Date().toISOString()
  };

  if (buffer) {
    const base64Image = buffer.toString('base64');
    payload.image = `data:${mimeType};base64,` + base64Image;
  }

  if (alerts) {
    payload.alerts = alerts;
  }
  if (cachedDvrStatus) {
    payload.dvrs = cachedDvrStatus;
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
    const mode = isRealtimeActive ? '⚡ TEMPO REAL (5s)' : 'NORMAL (1h)';
    const alertInfo = alerts ? ` | Identificados: ${alerts.zabbix?.length || 0} Zabbix Desastre, ${alerts.meraki?.length || 0} Meraki Offline` : ' | (Sem alertas)';
    if (buffer) {
      const sizeKb = (buffer.length / 1024).toFixed(1);
      console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print enviado (${sizeKb} KB). Fonte: ${sourceName} | Modo: ${mode}${alertInfo}`);
    } else {
      console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Status enviado (SEM sobrescrever print anterior). Modo: ${mode}${alertInfo}`);
    }
  } else {
    console.error('[AGENT] Erro ao enviar para servidor:', res.status, await res.text());
  }
}

async function captureDesktop() {
  if (isBusy) return;
  isBusy = true;

  try {
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Capturando status e tela...`);
    
    // 1. Atualiza DVRs se necessário
    if (!cachedDvrStatus || (Date.now() - lastDvrCheckTime > 3600000)) { // Ciclo de 1 hora // Ciclo de 1 hora // Ciclo de 1 hora // Ciclo de 1 hora // Ciclo de 1 hora // Ciclo de 1 hora
      await checkAllDvrs();
    }

    // 2. Extrai alertas das abas do Chrome
    const chromeData = await scrapeChromeAlerts();
    if (chromeData?.alerts) {
      lastAlertsData = chromeData.alerts;
    }

    let finalBuffer = null;
    let mime = 'image/jpeg';
    let sourceName = 'desktop';

    // 3. Tenta captura de tela do desktop físico
    try {
      const rawPng = await screenshot({ format: 'png' });
      if (rawPng) {
        let black = false;
        if (sharp) {
          try {
            const rawPixels = await sharp(rawPng).resize(160, 90).raw().toBuffer({ resolveWithObject: true });
            black = isImageBlack(rawPixels.data, rawPixels.info.width, rawPixels.info.height, rawPixels.info.channels);
          } catch(e) {
            black = isRawPngBlack(rawPng);
          }
        } else {
          black = isRawPngBlack(rawPng);
        }

        if (black) {
          console.warn('[AGENT] ⚠️ Desktop com tela preta detectado (monitor desligado ou Windows bloqueado).');
          if (chromeData?.chromeTabsScreenshot) {
            console.log('[AGENT] 🛡️ Substituindo automaticamente pelo print interno renderizado das abas do Chrome!');
            finalBuffer = chromeData.chromeTabsScreenshot;
            sourceName = 'chrome-headless-tabs';
          } else {
            console.warn('[AGENT] 🛡️ Nenhuma imagem clara disponível. O agente NÃO enviará tela preta para preservar o último print bom!');
            finalBuffer = null;
          }
        } else {
          if (sharp) {
            finalBuffer = await sharp(rawPng)
              .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: JPEG_QUALITY, progressive: true })
              .toBuffer();
          } else {
            finalBuffer = rawPng;
            mime = 'image/png';
          }
        }
      }
    } catch (deskErr) {
      console.warn('[AGENT] Falha na captura do desktop físico:', deskErr.message);
      if (chromeData?.chromeTabsScreenshot) {
        finalBuffer = chromeData.chromeTabsScreenshot;
        sourceName = 'chrome-headless-tabs';
      }
    }

    // Se o desktop falhou ou veio preto e o Chrome forneceu captura
    if (!finalBuffer && chromeData?.chromeTabsScreenshot) {
      finalBuffer = chromeData.chromeTabsScreenshot;
      sourceName = 'chrome-headless-tabs';
    }

    // 4. Envia para o servidor (com ou sem imagem)
    if (finalBuffer) {
      await sendToServer(finalBuffer, mime, sourceName, lastAlertsData);
      lastCaptureTime = Date.now();
    } else {
      // Envia os alertas e DVRs sem imagem, preservando a tela anterior no painel!
      await sendToServer(null, null, 'status-only', lastAlertsData);
      lastCaptureTime = Date.now();
    }
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
  console.log('Intervalo: Captura 1h / DVRs Ping 1h | Tempo real: 5 segundos');
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

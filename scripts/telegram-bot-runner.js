/**
 * Runner Local do Bot Telegram do PainelURE
 * Long Polling — roda no Windows sem IP público ou tunel.
 *
 * Funcionalidades:
 *   - /monitor → busca dados reais Zabbix/Meraki na API Cloudflare e envia
 *                 o print de tela (PNG) via sendPhoto com legenda dos alertas
 *   - /painel   → botão web_app com URL correta (painelure-cloudflare-pages.pages.dev)
 *   - Todos os outros comandos → delegados ao bot-core.js
 */

'use strict';

const fs       = require('fs');
const path     = require('path');
const readline = require('readline');
const botCore  = require('../modules/telegram/bot-core');

const ROOT         = path.resolve(__dirname, '..');
const ENV_FILE     = path.join(ROOT, '.env');
const STORAGE_FILE = path.join(ROOT, 'server', 'storage', 'app-data.json');

// ────────────────────────────────────────────────────────────
// Carregar variáveis do .env
// ────────────────────────────────────────────────────────────
function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) return {};
  const env = {};
  fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/).forEach(line => {
    const clean = line.trim();
    if (!clean || clean.startsWith('#')) return;
    const idx = clean.indexOf('=');
    if (idx === -1) return;
    const k = clean.slice(0, idx).trim();
    const v = clean.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    env[k] = v;
    if (process.env[k] === undefined) process.env[k] = v;
  });
  return env;
}

const envVars    = loadEnv();
let BOT_TOKEN    = process.env.TELEGRAM_BOT_TOKEN || envVars.TELEGRAM_BOT_TOKEN || '';
const PAINEL_URL = process.env.PAINELURE_URL || envVars.PAINELURE_URL || 'https://painelure-cloudflare-pages.pages.dev';
const MONITOR_API = PAINEL_URL.replace(/\/$/, '') + '/api/monitor';

// ────────────────────────────────────────────────────────────
// Prompt de token se não estiver no .env
// ────────────────────────────────────────────────────────────
async function promptToken() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question('\n🔑 Digite o Token do seu Bot do Telegram (@BotFather): ', answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ────────────────────────────────────────────────────────────
// Carregar dados locais (app-data.json)
// ────────────────────────────────────────────────────────────
function loadAppData() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
      return parsed.appData || {};
    }
  } catch (err) {
    console.error('Erro ao ler app-data.json:', err.message);
  }
  return {};
}

// ────────────────────────────────────────────────────────────
// Chamar a API do Telegram (JSON)
// ────────────────────────────────────────────────────────────
async function callTelegram(method, payload = {}) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Telegram [${method}]: ${data.description || 'Falha desconhecida'}`);
  }
  return data.result;
}

// ────────────────────────────────────────────────────────────
// Enviar foto via sendPhoto (FormData nativo)
// ────────────────────────────────────────────────────────────
async function sendPhoto(chatId, imageBuffer, caption) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
  const fd = new FormData();
  fd.append('chat_id', String(chatId));
  fd.append('photo', new Blob([imageBuffer], { type: 'image/png' }), 'monitor.png');
  if (caption) {
    fd.append('caption', caption.slice(0, 1024));
    fd.append('parse_mode', 'HTML');
  }

  const response = await fetch(url, {
    method: 'POST',
    body: fd
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Telegram [sendPhoto]: ${data.description || 'Falha desconhecida'}`);
  }
  return data.result;
}

// ────────────────────────────────────────────────────────────
// Buscar status real do monitor na API Cloudflare
// ────────────────────────────────────────────────────────────
async function fetchMonitorStatus() {
  try {
    const res = await fetch(`${MONITOR_API}/status`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('⚠️ Não foi possível buscar monitor/status:', e.message);
    return null;
  }
}

// ────────────────────────────────────────────────────────────
// Baixar screenshot PNG do agente
// ────────────────────────────────────────────────────────────
async function fetchMonitorImage() {
  try {
    const res = await fetch(`${MONITOR_API}/image`, {
      signal: AbortSignal.timeout(20000)
    });
    if (!res.ok || !res.headers.get('content-type')?.includes('image')) return null;
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  } catch (e) {
    console.warn('⚠️ Não foi possível baixar monitor/image:', e.message);
    return null;
  }
}

// ────────────────────────────────────────────────────────────
// Formatar legenda HTML com dados reais do monitor
// ────────────────────────────────────────────────────────────
function buildMonitorCaption(status) {
  function esc(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (!status) {
    return '📊 <b>Monitor de Rede — PainelURE</b>\n\n⚠️ <i>Não foi possível obter dados do servidor neste momento.</i>';
  }

  const ts = status.lastCaptureAt || status.alertsUpdatedAt || status.timestamp || status.updatedAt;
  const dateStr = ts
    ? new Date(ts).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    : 'N/D';

  let msg = `📊 <b>Monitor de Rede — URE Itapeva</b>\n`;
  msg += `⏱️ <b>Captura:</b> ${esc(dateStr)}\n\n`;

  // Alertas Zabbix
  const zabbixAlerts = status.alerts?.zabbix || status.zabbix?.disasters || status.zabbixAlerts || [];
  if (zabbixAlerts.length > 0) {
    msg += `🔴 <b>Zabbix — Desastres (${zabbixAlerts.length}):</b>\n`;
    zabbixAlerts.slice(0, 5).forEach(a => {
      const host = a.name || a.host || '';
      const since = a.time || a.since || '';
      msg += `• <b>${esc(host)}</b>`;
      if (since) msg += ` <i>(${esc(since)})</i>`;
      msg += '\n';
    });
    if (zabbixAlerts.length > 5) msg += `<i>... e mais ${zabbixAlerts.length - 5} alerta(s).</i>\n`;
    msg += '\n';
  } else {
    msg += `✅ <b>Zabbix:</b> Nenhum desastre ativo.\n\n`;
  }

  // APs Meraki offline
  const merakiAlerts = status.alerts?.meraki || status.meraki?.offlineAPs || status.merakiAlerts || [];
  if (merakiAlerts.length > 0) {
    msg += `📶 <b>Meraki — APs Offline (${merakiAlerts.length} escolas):</b>\n`;
    merakiAlerts.slice(0, 5).forEach(ap => {
      const escola = ap.name || ap.escola || '';
      const offline = ap.offline ?? ap.count ?? '';
      const total = ap.total ? `/${ap.total}` : '';
      msg += `• <b>${esc(escola)}</b>: ${offline}${total} APs off\n`;
    });
    if (merakiAlerts.length > 5) msg += `<i>... e mais ${merakiAlerts.length - 5} escola(s).</i>\n`;
  } else {
    msg += `📶 <b>Meraki:</b> Todos os APs online.\n`;
  }

  const totalProblems = zabbixAlerts.length + merakiAlerts.length;
  msg += totalProblems > 0
    ? `\n⚠️ <b>${totalProblems} problema(s) detectado(s).</b>`
    : `\n🟢 <b>Rede estável — sem problemas detectados.</b>`;

  return msg;
}

// ────────────────────────────────────────────────────────────
// Enviar o relatório do /monitor (foto + legenda, ou só texto)
// ────────────────────────────────────────────────────────────
async function sendMonitorReport(chatId) {
  console.log(`[${new Date().toLocaleTimeString()}] 📊 Buscando dados do monitor para chat ${chatId}...`);
  try {
    await callTelegram('sendChatAction', { chat_id: chatId, action: 'upload_photo' });
  } catch (_) { /* ignora */ }

  const [status, imgBuffer] = await Promise.all([
    fetchMonitorStatus(),
    fetchMonitorImage()
  ]);

  const caption = buildMonitorCaption(status);

  if (imgBuffer && imgBuffer.length > 1000) {
    console.log(`[${new Date().toLocaleTimeString()}] 📷 Enviando print (${Math.round(imgBuffer.length / 1024)} KB)...`);
    try {
      await sendPhoto(chatId, imgBuffer, caption);
      console.log(`[${new Date().toLocaleTimeString()}] ✅ Print do monitor enviado!`);
      return;
    } catch (photoErr) {
      console.warn('⚠️ Erro ao enviar foto, enviando texto:', photoErr.message);
    }
  }

  // Fallback: só texto
  await callTelegram('sendMessage', { chat_id: chatId, text: caption, parse_mode: 'HTML' });
  console.log(`[${new Date().toLocaleTimeString()}] ✅ Resumo do monitor enviado (sem print).`);
}

const SUBSCRIBERS_FILE = path.join(ROOT, 'server', 'storage', 'telegram-subscribers.json');

function saveAppData(appData) {
  try {
    let parsed = { appData: {} };
    if (fs.existsSync(STORAGE_FILE)) {
      parsed = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
    }
    parsed.appData = appData;
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(parsed, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Erro ao salvar app-data.json:', err.message);
    return false;
  }
}

function loadSubscribers() {
  const set = new Set();
  const envAdmin = process.env.TELEGRAM_ADMIN_CHAT_ID || envVars.TELEGRAM_ADMIN_CHAT_ID;
  if (envAdmin) set.add(String(envAdmin));

  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const list = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'));
      if (Array.isArray(list)) list.forEach(id => set.add(String(id)));
    }
  } catch (_) { /* ignora */ }
  return Array.from(set);
}

function addSubscriber(chatId) {
  const subs = new Set(loadSubscribers());
  subs.add(String(chatId));
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(Array.from(subs), null, 2), 'utf8');
    console.log(`[${new Date().toLocaleTimeString()}] 🔔 Chat ${chatId} inscrito nos alertas proativos.`);
  } catch (err) {
    console.error('Erro ao salvar assinantes:', err.message);
  }
}

// ────────────────────────────────────────────────────────────
// Loop do Guardião da Rede (Alertas Proativos em Segundo Plano)
// ────────────────────────────────────────────────────────────
let previousDisasters = new Set();
let previousOfflineAPs = new Set();
let guardianInitialized = false;

async function checkProactiveAlerts() {
  try {
    const status = await fetchMonitorStatus();
    if (!status || !status.alerts) return;

    const currentZabbix = status.alerts.zabbix || [];
    const currentMeraki = status.alerts.meraki || [];

    const curDisasterKeys = new Set(currentZabbix.map(d => d.name || d.host || ''));
    const curMerakiKeys = new Set(currentMeraki.map(m => m.name || m.escola || ''));

    if (!guardianInitialized) {
      previousDisasters = curDisasterKeys;
      previousOfflineAPs = curMerakiKeys;
      guardianInitialized = true;
      console.log(`[${new Date().toLocaleTimeString()}] 🛡️ Guardião da Rede ativo: monitorando ${curDisasterKeys.size} desastre(s) e ${curMerakiKeys.size} AP(s) off.`);
      return;
    }

    const subscribers = loadSubscribers();
    if (!subscribers.length) return;

    // Detectar novos desastres
    const newDisasters = currentZabbix.filter(d => !previousDisasters.has(d.name || d.host || ''));
    // Detectar restabelecimento
    const resolvedDisasters = Array.from(previousDisasters).filter(k => k && !curDisasterKeys.has(k));

    if (newDisasters.length > 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🚨 Queda detectada em ${newDisasters.length} escola(s)! Notificando assinantes...`);
      const imgBuffer = await fetchMonitorImage();

      for (const d of newDisasters) {
        const hostName = d.name || d.host || 'Escola URE';
        const timeStr = d.time || new Date().toLocaleTimeString('pt-BR');
        const alertCaption = `🚨 <b>ALERTA URE — QUEDA DE LINK DETECTADA</b>\n\n` +
          `A unidade <b>${hostName}</b> entrou em estado de <b>Desastre</b> no Zabbix!\n` +
          `⏱️ <b>Detectado:</b> ${timeStr}\n\n` +
          `<i>O print do monitoramento foi capturado e enviado automaticamente pelo Guardião da Rede.</i>`;

        for (const subId of subscribers) {
          try {
            if (imgBuffer && imgBuffer.length > 1000) {
              await sendPhoto(subId, imgBuffer, alertCaption);
            } else {
              await callTelegram('sendMessage', { chat_id: subId, text: alertCaption, parse_mode: 'HTML' });
            }
          } catch (sendErr) {
            console.warn(`Falha ao enviar alerta para ${subId}:`, sendErr.message);
          }
        }
      }
    }

    if (resolvedDisasters.length > 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🟢 Restabelecimento detectado em ${resolvedDisasters.length} escola(s)!`);
      for (const schoolName of resolvedDisasters) {
        const okMsg = `🟢 <b>RESTABELECIDO — REDE NORMALIZADA</b>\n\n` +
          `O link da unidade <b>${schoolName}</b> voltou a responder normalmente no Zabbix!\n` +
          `⏱️ <b>Horário:</b> ${new Date().toLocaleTimeString('pt-BR')}`;

        for (const subId of subscribers) {
          try {
            await callTelegram('sendMessage', { chat_id: subId, text: okMsg, parse_mode: 'HTML' });
          } catch (_) { /* ignora */ }
        }
      }
    }

    previousDisasters = curDisasterKeys;
    previousOfflineAPs = curMerakiKeys;
  } catch (err) {
    console.warn('Erro no ciclo do Guardião da Rede:', err.message);
  }
}

// Iniciar verificação proativa a cada 2 minutos (120000ms)
setInterval(checkProactiveAlerts, 120000);

// ────────────────────────────────────────────────────────────
// Registrar comandos no menu do bot
// ────────────────────────────────────────────────────────────
async function registerBotCommands() {
  try {
    await callTelegram('setMyCommands', {
      commands: [
        { command: 'start',         description: 'Menu principal e status' },
        { command: 'escola',        description: 'Consultar escola, IPs, câmeras e GPS' },
        { command: 'chamados',      description: 'Fila de chamados com botões de baixa' },
        { command: 'novochamado',   description: 'Abrir novo chamado de T.I.' },
        { command: 'carros',        description: 'Agenda da frota e botões de reserva' },
        { command: 'reservarcarro', description: 'Reservar veículo oficial' },
        { command: 'supervisores',  description: 'Lista de supervisores e escolas' },
        { command: 'monitor',       description: 'Status Zabbix/Meraki + print de tela' },
        { command: 'alertas',       description: 'Ativar alertas automáticos de queda' },
        { command: 'painel',        description: 'Abrir o PainelURE no celular (Mini App)' },
        { command: 'ajuda',         description: 'Ver guia completo de comandos' }
      ]
    });
    console.log('✅ Menu de comandos registrado no Telegram!');
  } catch (err) {
    console.warn('⚠️ Não foi possível registrar comandos:', err.message);
  }
}

// ────────────────────────────────────────────────────────────
// Loop de Long Polling
// ────────────────────────────────────────────────────────────
async function startPolling() {
  if (!BOT_TOKEN) {
    console.log('========================================================');
    console.log('🤖 ASSISTENTE TELEGRAM - PAINELURE ITAPEVA');
    console.log('========================================================');
    console.log('Nenhum TELEGRAM_BOT_TOKEN encontrado no arquivo .env.');
    BOT_TOKEN = await promptToken();
    if (!BOT_TOKEN) {
      console.error('❌ Token não informado. Encerrando.');
      process.exit(1);
    }
    try {
      fs.appendFileSync(ENV_FILE, `\nTELEGRAM_BOT_TOKEN=${BOT_TOKEN}\n`);
      console.log('💾 Token salvo automaticamente no .env!');
    } catch (_) { /* ignora */ }
  }

  try {
    const me = await callTelegram('getMe');
    console.log('\n========================================================');
    console.log(`🤖 Bot Conectado: @${me.username} (${me.first_name})`);
    console.log(`🚀 PainelURE URL: ${PAINEL_URL}`);
    console.log(`📡 Monitor API:   ${MONITOR_API}`);
    console.log('🛡️ Guardião da Rede: ativo (alertas proativos a cada 2 min)');
    console.log('📡 Long Polling ativo — Ctrl+C para encerrar.');
    console.log('========================================================\n');
    await registerBotCommands();
    // Executa a primeira checagem de rede imediatamente
    setTimeout(checkProactiveAlerts, 5000);
  } catch (err) {
    console.error('\n❌ Falha ao autenticar com o Telegram:', err.message);
    process.exit(1);
  }

  let offset = 0;

  while (true) {
    try {
      const updates = await callTelegram('getUpdates', {
        offset,
        timeout: 30,
        allowed_updates: ['message', 'callback_query']
      });

      for (const update of updates) {
        offset = update.update_id + 1;

        // callback_query → delegar ao bot-core
        const message = update.message || update.edited_message;
        if (!message) {
          if (update.callback_query) {
            const appData = loadAppData();
            const result = await botCore.handleTelegramUpdate({
              update, appData, painelUrl: PAINEL_URL, monitorStatus: {}
            });

            if (result?.dataMutation) {
              saveAppData(appData);
              console.log(`[${new Date().toLocaleTimeString()}] 💾 Alteração salva em app-data.json: ${result.dataMutation.type}`);
            }

            if (result?.action === 'answer_callback') {
              await callTelegram('answerCallbackQuery', { callback_query_id: result.callback_query_id });
              if (result.reply) await callTelegram('sendMessage', result.reply);
            }
          }
          continue;
        }

        const chatId  = message.chat.id;
        const rawText = String(message.text || '').trim();
        const lower   = rawText.toLowerCase();
        const fromUser = message.from?.username || message.from?.first_name || 'Usuário';

        // /monitor ou botão 📊 Monitor Rede → tratamento com print real
        if (rawText.startsWith('/monitor') || lower === '📊 monitor rede' || lower === 'monitor') {
          await sendMonitorReport(chatId);
          console.log(`[${new Date().toLocaleTimeString()}] → ${fromUser}: ${rawText}`);
          continue;
        }

        // Todos os outros comandos → bot-core
        const appData = loadAppData();
        const result = await botCore.handleTelegramUpdate({
          update,
          appData,
          painelUrl: PAINEL_URL,
          monitorStatus: { active: true, updatedAt: new Date().toISOString() }
        });

        // Registrar assinante de alertas proativos se solicitado
        if (result?.registerSubscriber || result?.action === 'toggle_alerts') {
          addSubscriber(chatId);
        }

        // Se o comando gerou mutação nos dados (novo chamado, conclusão, reserva de carro)
        if (result?.dataMutation) {
          saveAppData(appData);
          console.log(`[${new Date().toLocaleTimeString()}] 💾 Alteração salva em app-data.json: ${result.dataMutation.type}`);
        }

        if (result?.action === 'send_message' && result.reply) {
          await callTelegram('sendMessage', result.reply);
          console.log(`[${new Date().toLocaleTimeString()}] → ${fromUser}: ${rawText}`);
        } else if (result?.action === 'answer_callback') {
          await callTelegram('answerCallbackQuery', { callback_query_id: result.callback_query_id });
          if (result.reply) await callTelegram('sendMessage', result.reply);
        }
      }
    } catch (err) {
      if (err.message.includes('ETIMEDOUT') || err.message.includes('fetch failed')) {
        await new Promise(r => setTimeout(r, 3000));
      } else {
        console.error('Erro no ciclo de polling:', err.message);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }
}

startPolling();

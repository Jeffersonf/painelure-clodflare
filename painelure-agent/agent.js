/**
 * PainelURE Monitor Agent - Modo Print de Tela (Desktop Screenshot)
 * Tira print da tela do Windows (ótimo para deixar aberto numa área de trabalho ou monitor dedicado).
 */

const fs = require('fs');
const path = require('path');
const screenshot = require('screenshot-desktop');

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  // sharp não instalado, prossegue sem ele enviando o print direto
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

let isRealtimeActive = false;
let lastCaptureTime = 0;
let isBusy = false;

async function sendToServer(buffer, mimeType = 'image/jpeg', sourceName = 'desktop') {
  const base64Image = buffer.toString('base64');
  const payload = {
    image: `data:${mimeType};base64,` + base64Image,
    source: sourceName,
    timestamp: new Date().toISOString()
  };

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
    const mode = isRealtimeActive ? '⚡ TEMPO REAL (10s)' : 'NORMAL (1h)';
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Print enviado com sucesso (${sizeKb} KB). Modo: ${mode}`);
  } else {
    console.error('[AGENT] Erro ao enviar para servidor:', res.status, await res.text());
  }
}

async function captureDesktop() {
  if (isBusy) return;
  isBusy = true;

  try {
    console.log(`[AGENT] ${new Date().toLocaleTimeString()} - Capturando print da tela...`);
    
    // Captura o display principal
    const rawPng = await screenshot({ format: 'png' });
    let finalBuffer = rawPng;
    let mime = 'image/png';

    // Se sharp estiver instalado, converte para JPEG comprimido
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

    // Envia para o servidor
    await sendToServer(finalBuffer, mime, 'both');
    
    lastCaptureTime = Date.now();
  } catch (err) {
    console.error('[AGENT] Erro na captura de tela:', err.message);
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
        console.log('[AGENT] ⚡ MODO TEMPO REAL ACIONADO PELO SITE! Capturando agora...');
        captureDesktop();
      }
    }
  } catch (e) {}
}

async function main() {
  console.log('==================================================');
  console.log('   PainelURE Monitor - Modo Captura de Tela       ');
  console.log('   (Deixe o Zabbix e Meraki abertos na tela)      ');
  console.log('==================================================');
  console.log('Servidor:', SERVER_URL);
  console.log('Intervalo normal: 1 hora | Tempo real: 5 segundos');
  console.log('Iniciando primeira captura...\n');

  await captureDesktop();

  // Polling para checar se alguém clicou no botão "Tempo Real" no site (a cada 3s)
  setInterval(pollServer, config.intervals?.checkRealtimePollMs || 3000);

  // Loop de captura periódica
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

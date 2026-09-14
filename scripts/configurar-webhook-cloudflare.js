/**
 * Script para configurar o Webhook do Telegram na Cloudflare
 * Uso: node scripts/configurar-webhook-cloudflare.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT, '.env');

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) return {};
  const env = {};
  fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/).forEach(line => {
    const clean = line.trim();
    if (!clean || clean.startsWith('#')) return;
    const idx = clean.indexOf('=');
    if (idx === -1) return;
    const k = clean.slice(0, idx).trim();
    const v = clean.slice(idx + 1).trim().replace(/^[\"\']|[\"\']$/g, '');
    env[k] = v;
  });
  return env;
}

const env = loadEnv();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || env.TELEGRAM_WEBHOOK_SECRET || 'ure-telegram-secret-2026';
const PAINEL_URL = process.env.PAINELURE_URL || env.PAINELURE_URL || 'https://painelure-cloudflare-pages.pages.dev';
const WEBHOOK_URL = `${PAINEL_URL.replace(/\/$/, '')}/api/telegram/webhook`;

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN não configurado no .env.');
  process.exit(1);
}

async function configureWebhook() {
  console.log('🌐 Configurando Webhook do Telegram para Nuvem 24/7...');
  console.log(`🔗 Webhook URL: ${WEBHOOK_URL}`);

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: WEBHOOK_URL,
      secret_token: WEBHOOK_SECRET,
      allowed_updates: ['message', 'callback_query']
    })
  });

  const data = await res.json();
  if (data.ok) {
    console.log('✅ Webhook registrado com sucesso no Telegram!');
    console.log('📡 O bot agora responderá através do Cloudflare Worker 24h por dia!');
  } else {
    console.error('❌ Falha ao registrar webhook:', data.description);
  }
}

configureWebhook();

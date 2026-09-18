import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputs = [
  path.join(root, '.cloudflare-public'),
  path.join(root, '.cloudflare-worker-public')
];

const files = [
  'index.html',
  'v2.html',
  '404.html',
  'app.js',
  'config.js',
  'styles.css',
  '.nojekyll',
  'favicon.svg',
  'favicon.ico',
  'version.json'
];

const directories = ['assets', 'data', 'modules'];

function copyPublicFiles(output) {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });

  for (const file of files) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
  }

  for (const directory of directories) {
    fs.cpSync(path.join(root, directory), path.join(output, directory), { recursive: true });
  }

  // Copia arquivos do agente para download direto via curl no terminal
  fs.copyFileSync(path.join(root, 'painelure-agent', 'agent.js'), path.join(output, 'agent.js'));
  fs.copyFileSync(path.join(root, 'painelure-agent', 'abrir-chrome-monitor.bat'), path.join(output, 'abrir-chrome-monitor.bat'));

  // Copia rotas v2 e shadcn para Cloudflare Pages
  const v2Dir = path.join(output, 'v2');
  fs.mkdirSync(v2Dir, { recursive: true });
  fs.copyFileSync(path.join(root, 'v2.html'), path.join(v2Dir, 'index.html'));

  const shadcnDir = path.join(output, 'shadcn');
  fs.mkdirSync(shadcnDir, { recursive: true });
  fs.copyFileSync(path.join(root, 'v2.html'), path.join(shadcnDir, 'index.html'));

  // Copia APK atualizado e disponibiliza em /painelure.apk e /apk
  const apkPath = path.join(root, 'painelure.apk');
  if (fs.existsSync(apkPath)) {
    fs.copyFileSync(apkPath, path.join(output, 'painelure.apk'));

    const apkDir = path.join(output, 'apk');
    fs.mkdirSync(apkDir, { recursive: true });
    fs.copyFileSync(apkPath, path.join(apkDir, 'painelure.apk'));

    const apkPageHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Baixando PainelURE APK</title>
  <meta http-equiv="refresh" content="0; url=/painelure.apk">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #0b0f19;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 16px;
    }
    .card {
      background: #111827;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 20px;
      padding: 36px 28px;
      max-width: 440px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    .icon-badge {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: linear-gradient(135deg, #6366f1, #38bdf8);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 20px;
      box-shadow: 0 8px 24px rgba(99,102,241,0.4);
    }
    h1 { font-size: 22px; margin: 0 0 8px 0; font-weight: 800; letter-spacing: -0.5px; }
    p { font-size: 13.5px; color: #94a3b8; line-height: 1.5; margin: 0 0 24px 0; }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #4f46e5;
      color: white;
      padding: 14px 24px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(79,70,229,0.4);
    }
    .btn:hover { background: #4338ca; transform: translateY(-1px); }
    .footer-note {
      margin-top: 18px;
      font-size: 11.5px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-badge">📱</div>
    <h1>PainelURE Oficial</h1>
    <p>O download do aplicativo Android (.apk) começará automaticamente em instantes.</p>
    <a href="/painelure.apk" class="btn" download="painelure.apk">
      <span>📥</span> <strong>Baixar APK Diretamente</strong>
    </a>
    <div class="footer-note">Diretoria Regional de Ensino de Itapeva • SEINTEC / SETEC</div>
  </div>
  <script>
    setTimeout(function() {
      window.location.href = '/painelure.apk';
    }, 400);
  </script>
</body>
</html>`;
    fs.writeFileSync(path.join(apkDir, 'index.html'), apkPageHtml, 'utf8');
  }
}

for (const output of outputs) copyPublicFiles(output);
fs.copyFileSync(
  path.join(root, 'worker', 'index.js'),
  path.join(root, '.cloudflare-public', '_worker.js')
);

console.log(`Cloudflare assets ready: ${outputs.length} targets`);

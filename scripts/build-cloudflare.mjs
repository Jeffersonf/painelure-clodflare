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
  '404.html',
  'app.js',
  'config.js',
  'styles.css',
  '.nojekyll'
];

const directories = ['assets', 'data', 'font', 'modules'];

function copyPublicFiles(output) {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });

  for (const file of files) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
  }

  for (const directory of directories) {
    fs.cpSync(path.join(root, directory), path.join(output, directory), { recursive: true });
  }
}

for (const output of outputs) copyPublicFiles(output);
fs.copyFileSync(
  path.join(root, 'worker', 'index.js'),
  path.join(root, '.cloudflare-public', '_worker.js')
);

console.log(`Cloudflare assets ready: ${outputs.length} targets`);

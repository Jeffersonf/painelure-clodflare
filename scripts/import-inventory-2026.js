/**
 * Script para importar InventarioEquipamentosEscolas (3).csv
 * Atualiza appData.schoolAssets e appData.schoolInventoryMetrics
 */

const fs = require('fs');
const path = require('path');

const csvPath = 'C:\\Users\\jeffe\\Downloads\\InventarioEquipamentosEscolas (3).csv';
const storagePath = path.resolve(__dirname, '..', 'server', 'storage', 'app-data.json');

if (!fs.existsSync(csvPath)) {
  console.error('Arquivo CSV não encontrado em:', csvPath);
  process.exit(1);
}

const store = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
const appData = store.appData || {};
const profiles = appData.schoolProfiles || [];
const schoolNames = profiles.map(p => p.school || p.name);

function normalize(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function matchCanonicalSchool(csvSchool) {
  const normCsv = normalize(csvSchool);
  if (normCsv.includes('diretoria')) return 'Diretoria Itapeva';

  for (const s of schoolNames) {
    const normS = normalize(s);
    if (normS === normCsv || normS.includes(normCsv) || normCsv.includes(normS)) {
      return s;
    }
  }
  if (normCsv.includes('gerson')) return schoolNames.find(s => normalize(s).includes('gerson'));
  if (normCsv.includes('venturelli')) return schoolNames.find(s => normalize(s).includes('venturelli'));
  if (normCsv.includes('francelina')) return schoolNames.find(s => normalize(s).includes('francelina'));
  if (normCsv.includes('idalicio')) return schoolNames.find(s => normalize(s).includes('idalicio'));
  if (normCsv.includes('celia')) return schoolNames.find(s => normalize(s).includes('celia'));
  if (normCsv.includes('cinira')) return schoolNames.find(s => normalize(s).includes('cinira'));
  if (normCsv.includes('deffune')) return schoolNames.find(s => normalize(s).includes('deffune'));
  if (normCsv.includes('silverio')) return schoolNames.find(s => normalize(s).includes('silverio'));
  if (normCsv.includes('oscar')) return schoolNames.find(s => normalize(s).includes('oscar'));
  if (normCsv.includes('otavio')) return schoolNames.find(s => normalize(s).includes('otavio'));
  if (normCsv.includes('arlindo')) return schoolNames.find(s => normalize(s).includes('arlindo'));
  if (normCsv.includes('vasconcellos') || normCsv.includes('vasconcelos')) return schoolNames.find(s => normalize(s).includes('vasconcellos') || normalize(s).includes('vasconcelos'));
  if (normCsv.includes('josevasques')) return schoolNames.find(s => normalize(s).includes('josevasques'));
  if (normCsv.includes('ricardo')) return schoolNames.find(s => normalize(s).includes('ricardo'));
  if (normCsv.includes('simpliciano')) return schoolNames.find(s => normalize(s).includes('simpliciano'));
  if (normCsv.includes('turvo')) return schoolNames.find(s => normalize(s).includes('turvo'));
  if (normCsv.includes('boavista')) return schoolNames.find(s => normalize(s).includes('boavista'));
  if (normCsv.includes('ferreira')) return schoolNames.find(s => normalize(s).includes('ferreira'));
  if (normCsv.includes('nicota')) return schoolNames.find(s => normalize(s).includes('nicota'));
  if (normCsv.includes('zulmira')) return schoolNames.find(s => normalize(s).includes('zulmira'));
  if (normCsv.includes('jeminiano')) return schoolNames.find(s => normalize(s).includes('jeminiano'));

  return csvSchool.trim();
}

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let field = '';

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(field.trim());
      field = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      row.push(field.trim());
      field = '';
      if (row.length > 1 || row[0]) lines.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field || row.length) {
    row.push(field.trim());
    lines.push(row);
  }
  return lines;
}

console.log('Lendo CSV...');
const content = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(content);
console.log(`Total de linhas brutas: ${rows.length}`);

const assets = [];
const metrics = {};

for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const id = r[0]?.trim() || `inv-${i}`;
  const rawSchool = r[1]?.trim();
  if (!rawSchool) continue;

  const school = matchCanonicalSchool(rawSchool);
  const collectedAt = r[2]?.trim() || '';
  const equip = r[3]?.trim() || 'Equipamento';
  const equipInfo = r[4]?.trim() || '';
  const serial = r[5]?.trim() || '';
  const blueMonitor = r[6]?.trim() || '';
  const photo = r[7]?.trim() || '';
  const responsible = r[8]?.trim() || '';
  const rawStatus = r[9]?.trim() || 'Funcionando';
  const patrimony = r[10]?.trim() || '';
  const obs = r[11]?.trim() || '';
  const imei = r[12]?.trim() || '';

  const lowerStatus = rawStatus.toLowerCase();
  let status = 'ok';
  if (lowerStatus.includes('baixa')) status = 'baixa';
  else if (lowerStatus.includes('manuten')) status = 'manutencao';
  else if (lowerStatus.includes('garantia')) status = 'garantia';

  const asset = {
    id: `inventory-${id}`,
    school,
    name: equip,
    sourceName: equipInfo ? `${equip} (${equipInfo})` : equip,
    status,
    notes: [
      obs ? `Obs: ${obs}` : '',
      serial ? `Série: ${serial}` : '',
      patrimony ? `Patrimônio: ${patrimony}` : '',
      imei ? `IMEI: ${imei}` : '',
      responsible ? `Responsável: ${responsible}` : '',
      `Status original: ${rawStatus}`
    ].filter(Boolean).join(' | '),
    sourceId: id,
    collectedAt,
    serial,
    patrimony,
    imei,
    blueMonitor,
    responsible,
    originalStatus: rawStatus,
    observation: obs
  };

  assets.push(asset);

  if (!metrics[school]) {
    metrics[school] = {
      total: 0,
      funcionando: 0,
      baixas: 0,
      manutencao: 0,
      garantia: 0,
      types: {}
    };
  }

  const m = metrics[school];
  m.total++;
  if (status === 'ok') m.funcionando++;
  else if (status === 'baixa') m.baixas++;
  else if (status === 'manutencao') m.manutencao++;
  else if (status === 'garantia') m.garantia++;

  // Categorização de tipo
  let typeKey = equip;
  if (/tablet/i.test(equip)) typeKey = 'Tablets';
  else if (/chromebook/i.test(equip)) typeKey = 'Chromebooks';
  else if (/desktop/i.test(equip)) typeKey = 'Desktops';
  else if (/notebook|n 1110|n 1210|n6440|n8440/i.test(equip)) typeKey = 'Notebooks';
  else if (/celular/i.test(equip)) typeKey = 'Celulares';
  else typeKey = 'Outros';

  if (!m.types[typeKey]) {
    m.types[typeKey] = { total: 0, funcionando: 0, baixas: 0, manutencao: 0, garantia: 0 };
  }
  const t = m.types[typeKey];
  t.total++;
  if (status === 'ok') t.funcionando++;
  else if (status === 'baixa') t.baixas++;
  else if (status === 'manutencao') t.manutencao++;
  else if (status === 'garantia') t.garantia++;
}

console.log(`\nImportação concluída!`);
console.log(`Total de ativos normalizados: ${assets.length}`);
console.log(`Escolas consolidadas: ${Object.keys(metrics).length}`);

// Atualizar storage
appData.schoolAssets = assets;
appData.schoolInventoryMetrics = metrics;
store.appData = appData;
store.updatedAt = new Date().toISOString();

fs.writeFileSync(storagePath, JSON.stringify(store, null, 2), 'utf8');
console.log(`Salvo com sucesso em: ${storagePath}`);

// Exibir resumo
console.log('\n--- Resumo de Escolas ---');
for (const [sch, met] of Object.entries(metrics)) {
  console.log(`• ${sch}: Total=${met.total} | OK=${met.funcionando} | Baixas=${met.baixas} | Manut=${met.manutencao} | Gar=${met.garantia}`);
}

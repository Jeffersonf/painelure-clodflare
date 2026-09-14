/**
 * Bot Core para o WhatsApp do PainelURE
 * Compatível tanto com Node.js quanto Cloudflare Workers
 * Formatação nativa de WhatsApp (*negrito*, _itálico_, blocos ``` para cópia)
 */

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function toWhatsApp(html) {
  if (!html) return '';
  return String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<b>(.*?)<\/b>/gi, '*$1*')
    .replace(/<strong>(.*?)<\/strong>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '_$1_')
    .replace(/<em>(.*?)<\/em>/gi, '_$1_')
    .replace(/<code>(.*?)<\/code>/gi, '$1')
    .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function getWhatsAppMenu(painelUrl = 'https://painelure-cloudflare-pages.pages.dev') {
  return `🤖 *PainelURE - Assistente WhatsApp URE Itapeva*\n\n` +
    `Olá! Como posso ajudar hoje? Digite o *número* ou a *opção*:\n\n` +
    `1️⃣ *Escolas* (digite *1* ou o *nome da escola*, ex: _venturelli_)\n` +
    `2️⃣ *Equipamentos* (digite *2* ou _eq jupira_)\n` +
    `3️⃣ *Texto Chamado SED* (digite *3* ou _chamado demetrio_)\n` +
    `4️⃣ *Fila de Chamados T.I.* (digite *4* ou _chamados_)\n` +
    `5️⃣ *Carros Oficiais* (digite *5* ou _carros_)\n` +
    `6️⃣ *Supervisores* (digite *6* ou _supervisores_)\n` +
    `7️⃣ *Monitor de Rede* (digite *7* ou _monitor_)\n\n` +
    `🌐 *Painel Web:* ${painelUrl}\n\n` +
    `💡 *Dica:* Você pode digitar direto o nome de qualquer escola a qualquer momento!`;
}

function findSchools(query, appData) {
  const q = normalize(query);
  if (!q) return [];
  const networkData = appData.networkData || {};
  const schoolProfiles = appData.schoolProfiles || [];
  const baseSchools = Array.isArray(appData.schools) ? appData.schools.map(s => s.name || s) : [];
  
  const allNames = Array.from(new Set([
    ...baseSchools,
    ...Object.keys(networkData),
    ...schoolProfiles.map(p => p.school || p.name || p.escola || '')
  ])).filter(name => name && name !== 'DIRETORIA');

  return allNames.filter(name => {
    const normName = normalize(name);
    if (normName.includes(q)) return true;
    const net = networkData[name];
    if (net && net.ips && net.ips.some(ip => normalize(ip).includes(q))) return true;
    const prof = schoolProfiles.find(p => normalize(p.school || p.name || p.escola) === normName);
    if (prof) {
      if (normalize(prof.cie || '').includes(q)) return true;
      if (normalize(prof.municipality || prof.municipio || prof.city || '').includes(q)) return true;
      if (normalize(prof.email || '').includes(q)) return true;
    }
    return false;
  });
}

function formatSchoolWhatsApp(schoolName, appData) {
  const normTarget = normalize(schoolName);
  const profile = (appData.schoolProfiles || []).find(p => normalize(p.school || p.name || p.escola) === normTarget) || {};
  const baseSchool = Array.isArray(appData.schools) ? (appData.schools.find(s => normalize(s.name || s) === normTarget) || {}) : {};
  const supervisor = (appData.supervisors || []).find(s => (s.assignedSchools || []).some(sch => normalize(sch) === normTarget));
  
  let cie = profile.cie || baseSchool.cie || '';
  if (!cie && profile.email) {
    const cieMatch = profile.email.match(/^e(\d{5,7})[a-z]?@/i);
    if (cieMatch) cie = cieMatch[1];
  }
  if (!cie && appData.networkData) {
    const net = (appData.networkData || {})[schoolName] || Object.entries(appData.networkData || {}).find(([k]) => normalize(k) === normTarget)?.[1] || {};
    if (net.ips) {
      const cieIp = net.ips.find(i => /cie[:\s]*(\d+)/i.test(i));
      if (cieIp) {
        const m = cieIp.match(/(\d+)/);
        if (m) cie = m[1];
      }
    }
  }

  const inventoryMetrics = (appData.schoolInventoryMetrics || {})[schoolName] || 
                          Object.entries(appData.schoolInventoryMetrics || {}).find(([k]) => normalize(k) === normTarget)?.[1] || {};
  const assets = (appData.schoolAssets || []).filter(a => normalize(a.school || a.escola || '') === normTarget);

  let msg = `🏫 *${schoolName}*\n`;
  const muni = profile.municipality || profile.municipio || profile.city;
  if (muni) msg += `📍 *Município:* ${muni}\n`;
  if (cie) msg += `🏷️ *CIE:* ${cie}\n`;
  const director = profile.director || profile.diretor || baseSchool.director || baseSchool.diretor || '';
  if (director) msg += `👤 *Diretor(a):* ${director}\n`;
  if (profile.phone) msg += `📞 *Telefone:* ${profile.phone}\n`;
  if (profile.email) msg += `✉️ *Email:* ${profile.email}\n`;
  if (supervisor) msg += `👨‍🏫 *Supervisor(a):* ${supervisor.name}\n`;

  // Resumo do Inventário
  msg += `\n💻 *Equipamentos / Ativos:*\n`;
  const totalItems = inventoryMetrics.total || inventoryMetrics.items || assets.length;
  if (totalItems > 0) {
    const func = inventoryMetrics.funcionando !== undefined ? inventoryMetrics.funcionando : assets.filter(a => a.status === 'ok').length;
    const baixas = inventoryMetrics.baixas !== undefined ? inventoryMetrics.baixas : (inventoryMetrics.alerts || assets.filter(a => a.status === 'baixa').length);
    const manut = inventoryMetrics.manutencao || assets.filter(a => a.status === 'manutencao').length;
    const gar = inventoryMetrics.garantia || assets.filter(a => a.status === 'garantia').length;

    msg += `• *Total:* ${totalItems} equipamentos cadastrados\n`;
    const statusParts = [`🟢 *${func}* funcionando`];
    if (baixas > 0) statusParts.push(`🔴 *${baixas}* baixa(s)`);
    if (manut > 0) statusParts.push(`🟡 *${manut}* manutenção`);
    if (gar > 0) statusParts.push(`🛡️ *${gar}* garantia`);
    msg += `• *Situação:* ${statusParts.join(' | ')}\n`;
  } else {
    msg += `• _Inventário em consolidação._\n`;
  }

  // Links GPS
  const query = encodeURIComponent(`${schoolName} ${muni || 'Itapeva'} SP`);
  msg += `\n📍 *Rotas / Navegação:*\n`;
  msg += `• Google Maps: https://www.google.com/maps/search/?api=1&query=${query}\n`;
  msg += `• Waze: https://waze.com/ul?q=${query}&navigate=yes\n`;

  const shortName = schoolName.replace(/^EE\s+(Profª?\.?|Dona|Padre)?\s*/i, '').trim().split(/\s+/)[0];
  msg += `\n💡 *Opções rápidas:*\n`;
  msg += `• Digite *eq ${shortName}* para ver equipamentos detalhados\n`;
  msg += `• Digite *chamado ${shortName}* para copiar texto do chamado SED\n`;

  return msg;
}

function formatSedTicketWhatsApp(targetSchoolName, appData) {
  const normTarget = normalize(targetSchoolName);
  const profile = (appData.schoolProfiles || []).find(p => normalize(p.school || p.name || p.escola) === normTarget) || {};
  const baseSchool = Array.isArray(appData.schools) ? (appData.schools.find(s => normalize(s.name || s) === normTarget) || {}) : {};
  let cie = profile.cie || baseSchool.cie || '';
  if (!cie && profile.email) {
    const cieMatch = profile.email.match(/^e(\d{5,7})[a-z]?@/i);
    if (cieMatch) cie = cieMatch[1];
  }
  const muni = profile.municipality || profile.municipio || profile.city || 'Itapeva';
  const director = profile.director || profile.diretor || baseSchool.director || baseSchool.diretor || 'Não informado';
  const phone = profile.phone || 'Não informado';
  const email = profile.email || 'Não informado';

  return `📋 *Texto Padrão para Chamado SED*\n` +
    `_Toque no bloco abaixo para copiar o texto pronto:_\n\n` +
    '```\n' +
    `Unidade Escolar: ${targetSchoolName}\n` +
    `CIE: ${cie || '---'}\n` +
    `Município: ${muni}\n` +
    `Diretor(a): ${director}\n` +
    `Telefone: ${phone}\n` +
    `E-mail: ${email}\n\n` +
    `Solicitante: Direção / Secretaria\n` +
    `Assunto: [Descreva resumidamente o problema]\n` +
    `Descrição:\n` +
    `[Descreva aqui o defeito, equipamento afetado, localização na escola e teste realizado]\n` +
    '```\n\n' +
    `💡 _Modelo oficial pronto para abertura de ocorrência na SED._`;
}

function formatEquipmentDetailsWhatsApp(schoolName, appData) {
  const normTarget = normalize(schoolName);
  const metrics = (appData.schoolInventoryMetrics || {})[schoolName] || 
                  Object.entries(appData.schoolInventoryMetrics || {}).find(([k]) => normalize(k) === normTarget)?.[1] || {};
  const assets = (appData.schoolAssets || []).filter(a => normalize(a.school || a.escola || '') === normTarget);

  const total = metrics.total || metrics.items || assets.length;
  const func = metrics.funcionando !== undefined ? metrics.funcionando : assets.filter(a => a.status === 'ok').length;
  const baixas = metrics.baixas !== undefined ? metrics.baixas : (metrics.alerts || assets.filter(a => a.status === 'baixa').length);
  const manut = metrics.manutencao || assets.filter(a => a.status === 'manutencao').length;
  const gar = metrics.garantia || assets.filter(a => a.status === 'garantia').length;

  let msg = `💻 *Inventário Detalhado de Equipamentos*\n`;
  msg += `🏫 *${schoolName}*\n\n`;

  msg += `📊 *Visão Geral:*\n`;
  msg += `• *Total no Inventário:* ${total} equipamentos\n`;
  msg += `• 🟢 *Funcionando:* ${func}\n`;
  if (baixas > 0) msg += `• 🔴 *Baixas (avarias/sem conserto):* ${baixas}\n`;
  if (manut > 0) msg += `• 🟡 *Em Manutenção Técnica:* ${manut}\n`;
  if (gar > 0) msg += `• 🛡️ *Acionamento de Garantia:* ${gar}\n`;

  if (metrics.types && Object.keys(metrics.types).length > 0) {
    msg += `\n📦 *Equipamentos por Categoria:*\n`;
    for (const [type, data] of Object.entries(metrics.types)) {
      const parts = [`🟢 ${data.funcionando || 0} OK`];
      if (data.baixas) parts.push(`🔴 ${data.baixas} baixa(s)`);
      if (data.manutencao) parts.push(`🟡 ${data.manutencao} manut.`);
      if (data.garantia) parts.push(`🛡️ ${data.garantia} gar.`);
      msg += `• *${type} (${data.total}):* ${parts.join(', ')}\n`;
    }
  } else if (assets.length > 0) {
    const groups = {};
    for (const a of assets) {
      let t = a.name || 'Outros';
      if (/tablet/i.test(t)) t = 'Tablets';
      else if (/chromebook/i.test(t)) t = 'Chromebooks';
      else if (/desktop/i.test(t)) t = 'Desktops';
      else if (/notebook|n 1110|n 1210|n6440|n8440/i.test(t)) t = 'Notebooks';
      else if (/celular/i.test(t)) t = 'Celulares';
      else t = 'Outros';
      if (!groups[t]) groups[t] = { total: 0, ok: 0, baixa: 0, manut: 0 };
      groups[t].total++;
      if (a.status === 'ok') groups[t].ok++;
      else if (a.status === 'baixa') groups[t].baixa++;
      else groups[t].manut++;
    }
    msg += `\n📦 *Equipamentos por Categoria:*\n`;
    for (const [t, d] of Object.entries(groups)) {
      const parts = [`🟢 ${d.ok} OK`];
      if (d.baixa) parts.push(`🔴 ${d.baixa} baixa(s)`);
      if (d.manut) parts.push(`🟡 ${d.manut} manut.`);
      msg += `• *${t} (${d.total}):* ${parts.join(', ')}\n`;
    }
  }

  const problemItems = assets.filter(a => a.status === 'baixa' || a.status === 'manutencao' || a.status === 'garantia');
  problemItems.sort((a, b) => (b.observation ? 1 : 0) - (a.observation ? 1 : 0));

  if (problemItems.length > 0) {
    msg += `\n⚠️ *Destaques de Ocorrências / Baixas:*\n`;
    problemItems.slice(0, 8).forEach(item => {
      const tag = item.status === 'baixa' ? '🔴 Baixa' : item.status === 'garantia' ? '🛡️ Garantia' : '🟡 Manut.';
      const desc = item.observation || item.originalStatus || 'Avaria registrada';
      const cleanDesc = desc.replace(/^Obs:\s*/i, '').slice(0, 50);
      const sn = item.serial ? `(S/N: ${item.serial})` : '';
      msg += `• [${tag}] *${item.name}* ${sn}: _${cleanDesc}_\n`;
    });
    if (problemItems.length > 8) {
      msg += `_... e mais ${problemItems.length - 8} apontamento(s) no sistema._\n`;
    }
  }

  const shortName = schoolName.replace(/^EE\s+(Profª?\.?|Dona|Padre)?\s*/i, '').trim().split(/\s+/)[0];
  msg += `\n💡 _Digite *chamado ${shortName}* para gerar chamado SED ou *escola ${shortName}* para voltar._`;

  return msg;
}

function formatCallsWhatsApp(appData, query = '') {
  const allCalls = appData.calls || [];
  const q = normalize(query);
  let calls = allCalls.filter(c => !['resolvido', 'fechado', 'concluido'].includes(normalize(c.status || '')));
  if (q && q !== 'todos') {
    calls = calls.filter(c => normalize(c.school || c.escola || '').includes(q) || normalize(c.title || c.descricao || '').includes(q));
  }
  let msg = `🎫 *Fila de Chamados de T.I. - URE Itapeva*\n\n`;
  if (calls.length === 0) {
    return msg + `✅ *Nenhum chamado pendente no momento!*\nTudo em ordem com as escolas monitoradas.`;
  }
  msg += `📊 *Total em aberto:* ${calls.length} chamado(s)\n\n`;
  calls.slice(0, 6).forEach((c, idx) => {
    const school = c.school || c.escola || 'Escola não informada';
    const title = c.title || c.description || c.descricao || c.issue || 'Suporte técnico';
    const status = c.status || 'Pendente';
    const priority = c.priority || c.prioridade || 'Normal';
    const icon = /alta|urgente|critica/i.test(priority) ? '🚨' : '🔹';
    msg += `${icon} *#${idx + 1} - ${school}*\n   📝 ${title}\n   ⚙️ Status: ${status} | Prioridade: ${priority}\n\n`;
  });
  if (calls.length > 6) msg += `_... e mais ${calls.length - 6} chamados na fila._\n\n`;
  msg += `💡 _Para abrir um chamado, digite:_\n*novo chamado <Escola> | <Problema>*`;
  return msg;
}

function formatCarsWhatsApp(appData) {
  const cars = appData.cars || [];
  let msg = `🚗 *Frota de Carros Oficiais - URE Itapeva*\n\n`;
  if (!cars.length) return msg + `ℹ️ _Nenhuma reserva de veículo registrada no sistema._\n`;
  const nowBr = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date());
  msg += `📅 *Hoje:* ${nowBr}\n\n`;
  cars.slice(0, 6).forEach(c => {
    const vehicle = c.vehicle || c.car || c.recurso || 'Carro oficial';
    const date = c.date || c.quando || 'Hoje';
    const time = c.time || c.hora || '--:--';
    const retTime = c.returnTime || c.devolucao || '';
    const requester = c.requester || c.solicitante || c.sector || c.owner || 'Regional';
    const destination = c.destination || c.destino || c.local || c.place || 'Itinerário oficial';
    const status = c.status || c.authorization || 'Reservado';
    msg += `🚘 *${vehicle}*\n   🗓️ ${date} (${time}${retTime ? ` às ${retTime}` : ''})\n   📍 Destino: ${destination}\n   👤 Solicitante: ${requester} [${status}]\n\n`;
  });
  msg += `_Total de ${cars.length} reserva(s) registradas._\n\n`;
  msg += `💡 _Para agendar, digite:_\n*reservar carro <Veiculo> | <Data> | <Destino>*`;
  return msg;
}

function formatSupervisorsWhatsApp(query, appData) {
  const supervisors = appData.supervisors || [];
  const q = normalize(query);
  if (!supervisors.length) return `👨‍🏫 *Supervisão de Ensino*\n\n_Nenhum supervisor cadastrado._`;
  if (q) {
    const match = supervisors.find(s => normalize(s.name).includes(q));
    if (match) {
      let msg = `👨‍🏫 *Supervisor(a): ${match.name}*\n`;
      if (match.email) msg += `📧 Email: ${match.email}\n`;
      if (match.phone) msg += `📱 Telefone: ${match.phone}\n`;
      const schools = match.assignedSchools || [];
      msg += `\n🏫 *Escolas Atribuídas (${schools.length}):*\n`;
      schools.forEach(sch => { msg += `• ${sch}\n`; });
      return msg;
    }
  }
  let msg = `👨‍🏫 *Supervisores de Ensino - URE Itapeva*\n\n`;
  supervisors.slice(0, 10).forEach(s => {
    const count = (s.assignedSchools || []).length;
    msg += `• *${s.name}* (${count} escolas)\n`;
  });
  if (supervisors.length > 10) msg += `\n_... e mais ${supervisors.length - 10} supervisores._\n`;
  msg += `\n💡 _Para ver escolas de um supervisor: digite *supervisor <nome>*_`;
  return msg;
}

function formatMonitorWhatsApp(monitorStatus = {}) {
  let msg = `📊 *Status do Monitor de Rede (Zabbix / Meraki)*\n\n`;
  const isOnline = monitorStatus.active !== false;
  const lastUpdate = monitorStatus.updatedAt ? new Date(monitorStatus.updatedAt).toLocaleString('pt-BR') : 'N/D';
  msg += `📶 *Agente URE:* ${isOnline ? '🟢 Ativo' : '🔴 Inativo'}\n`;
  msg += `⏱️ *Última captura:* ${lastUpdate}\n`;
  if (monitorStatus.alerts && Array.isArray(monitorStatus.alerts) && monitorStatus.alerts.length > 0) {
    msg += `\n🚨 *Alertas de Queda / Incidentes:*\n`;
    monitorStatus.alerts.slice(0, 5).forEach(alert => { msg += `• ⚠️ ${alert.message || alert.name || alert}\n`; });
  } else {
    msg += `\n✅ *Nenhum alarme de queda de link no momento.*\n`;
  }
  return msg;
}

function handleWhatsAppMessage({
  text = '',
  from = '',
  sender = '',
  appData = {},
  monitorStatus = {},
  painelUrl = 'https://painelure-cloudflare-pages.pages.dev'
}) {
  const clean = String(text || '').trim();
  const lower = clean.toLowerCase();
  const userDisplayName = sender || 'Usuário WhatsApp';

  // 1. Saudação / Menu
  if (!clean || ['menu', 'oi', 'ola', 'olá', 'ajuda', 'help', '/start', 'iniciar', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'começar'].includes(lower)) {
    return {
      replyText: getWhatsAppMenu(painelUrl)
    };
  }

  // 2. Opções numeradas do Menu
  if (lower === '1' || lower === 'escola' || lower === 'escolas') {
    return {
      replyText: `🏫 *Consulta de Escolas*\n\nDigite o nome ou CIE da escola que deseja pesquisar.\n\n*Exemplo:* _venturelli_ ou _murtinho_`
    };
  }

  if (lower === '2' || lower === 'equipamento' || lower === 'equipamentos' || lower === 'inventario') {
    return {
      replyText: `💻 *Inventário de Equipamentos*\n\nDigite *eq <nome da escola>* para ver os equipamentos detalhados.\n\n*Exemplo:* _eq venturelli_ ou _eq jupira_`
    };
  }

  if (lower === '3' || lower === 'chamado sed' || lower === 'texto chamado' || lower === 'texto de chamado') {
    return {
      replyText: `📋 *Texto Padrão para Chamado SED*\n\nDigite *chamado <nome da escola>* para gerar o texto do chamado pronto para copiar.\n\n*Exemplo:* _chamado venturelli_`
    };
  }

  if (lower === '4' || lower === 'chamados' || lower === 'chamados ti') {
    return {
      replyText: formatCallsWhatsApp(appData)
    };
  }

  if (lower === '5' || lower === 'carros' || lower === 'carro' || lower === 'frota') {
    return {
      replyText: formatCarsWhatsApp(appData)
    };
  }

  if (lower === '6' || lower === 'supervisores' || lower === 'supervisao' || lower === 'supervisor') {
    return {
      replyText: formatSupervisorsWhatsApp('', appData)
    };
  }

  if (lower === '7' || lower === 'monitor' || lower === 'rede' || lower === 'status rede') {
    return {
      replyText: formatMonitorWhatsApp(monitorStatus)
    };
  }

  // 3. Gerar Texto Chamado SED: "chamado <escola>" ou "sed <escola>"
  if (/^(chamado|sed|texto chamado)\s+/i.test(clean)) {
    const q = clean.replace(/^(chamado|sed|texto chamado)\s+/i, '').trim();
    if (!q) {
      return { replyText: `ℹ️ Digite o nome da escola após a palavra chamado.\nExemplo: *chamado venturelli*` };
    }
    const matches = findSchools(q, appData);
    if (!matches.length) {
      return { replyText: `❌ Nenhuma escola encontrada para "${q}".\nTente digitar parte do nome (ex: _venturelli_).` };
    }
    return { replyText: formatSedTicketWhatsApp(matches[0], appData) };
  }

  // 4. Detalhes de Equipamentos: "eq <escola>" ou "equipamentos <escola>"
  if (/^(eq|equipamento|equipamentos|inventario)\s+/i.test(clean)) {
    const q = clean.replace(/^(eq|equipamento|equipamentos|inventario)\s+/i, '').trim();
    if (!q) {
      return { replyText: `ℹ️ Digite o nome da escola após o comando.\nExemplo: *eq venturelli*` };
    }
    const matches = findSchools(q, appData);
    if (!matches.length) {
      return { replyText: `❌ Nenhuma escola encontrada para "${q}".` };
    }
    return { replyText: formatEquipmentDetailsWhatsApp(matches[0], appData) };
  }

  // 5. Supervisor específico: "supervisor <nome>"
  if (/^supervisor(es)?\s+/i.test(clean)) {
    const q = clean.replace(/^supervisor(es)?\s+/i, '').trim();
    return { replyText: formatSupervisorsWhatsApp(q, appData) };
  }

  // 6. Novo Chamado via WhatsApp: "novo chamado <escola> | <problema>"
  if (/^(novo chamado|novochamado)\b/i.test(clean)) {
    const content = clean.replace(/^(novo chamado|novochamado)\s*/i, '').trim();
    if (!content.includes('|')) {
      return {
        replyText: `ℹ️ *Como abrir chamado:*\nEnvie no formato:\n*novo chamado <Escola> | <Problema>*\n\n_Exemplo:_ *novo chamado Venturelli | Impressora não liga*`
      };
    }
    const [rawSchool, ...rest] = content.split('|');
    const sQuery = rawSchool.trim();
    const issue = rest.join('|').trim();
    const matches = findSchools(sQuery, appData);
    const finalSchool = matches.length > 0 ? matches[0] : sQuery;
    const newCall = {
      id: `call-${Date.now()}`,
      school: finalSchool,
      title: issue,
      description: issue,
      status: 'Aberto',
      priority: 'Normal',
      technician: userDisplayName,
      createdAt: new Date().toISOString(),
      source: 'WhatsApp'
    };
    if (!Array.isArray(appData.calls)) appData.calls = [];
    appData.calls.unshift(newCall);
    return {
      dataMutation: { type: 'add_call', call: newCall },
      replyText: `✅ *Chamado Aberto com Sucesso!*\n\n🎫 *ID:* ${newCall.id}\n🏫 *Escola:* ${finalSchool}\n📝 *Problema:* ${issue}\n👤 *Solicitante:* ${userDisplayName}\n\n_O chamado já está visível para a equipe de T.I. no PainelURE._`
    };
  }

  // 7. Reserva de Carro via WhatsApp: "reservar carro <veiculo> | <data> | <destino>"
  if (/^(reservar carro|reservarcarro|reserva carro)\b/i.test(clean)) {
    const content = clean.replace(/^(reservar carro|reservarcarro|reserva carro)\s*/i, '').trim();
    if (!content.includes('|')) {
      return {
        replyText: `🚗 *Como reservar veículo oficial:*\nEnvie no formato:\n*reservar carro <Veículo> | <Data> | <Destino>*\n\n_Exemplo:_ *reservar carro Utilitário | 15/09 08:00 | Visita técnica Ribeirão Branco*`
      };
    }
    const parts = content.split('|').map(s => s.trim());
    const vehicle = parts[0] || 'Veículo Utilitário';
    const dateInput = parts[1] || 'Hoje';
    const destination = parts[2] || 'Regional Itapeva';
    const newRes = {
      id: `car-${Date.now()}`,
      vehicle,
      date: dateInput,
      time: '08:00',
      requester: userDisplayName,
      destination,
      place: destination,
      title: `Visita técnica - ${destination}`,
      status: 'Aprovado',
      authorization: 'Aprovado',
      source: 'WhatsApp',
      createdAt: new Date().toISOString()
    };
    if (!Array.isArray(appData.cars)) appData.cars = [];
    appData.cars.unshift(newRes);
    return {
      dataMutation: { type: 'add_car', car: newRes },
      replyText: `🚗 *Reserva de Veículo Confirmada!*\n\n🚘 *Veículo:* ${vehicle}\n📅 *Data:* ${dateInput}\n📍 *Destino:* ${destination}\n👤 *Responsável:* ${userDisplayName}\n\n_Reserva registrada na escala oficial do PainelURE._`
    };
  }

  // 8. Consulta de Escola (seja "escola <nome>" ou apenas o nome da escola direto)
  let schoolQuery = clean;
  if (/^escola\s+/i.test(clean)) {
    schoolQuery = clean.replace(/^escola\s+/i, '').trim();
  }

  const matches = findSchools(schoolQuery, appData);
  if (matches.length === 1) {
    return {
      replyText: formatSchoolWhatsApp(matches[0], appData)
    };
  }

  if (matches.length > 1) {
    let msg = `🔍 *Encontrei ${matches.length} escolas para "${schoolQuery}":*\n\n`;
    matches.slice(0, 6).forEach((sch, i) => {
      msg += `${i + 1}️⃣ *${sch}*\n`;
    });
    msg += `\n_Digite o nome da escola desejada (ex: ${matches[0].split(/\s+/).slice(0, 2).join(' ')})._`;
    return {
      replyText: msg
    };
  }

  // 9. Se nada bateu
  return {
    replyText: `Desculpe, não entendi "${clean}". 🤔\n\nDigite *menu* para ver as opções ou digite o nome de uma escola para pesquisar (ex: _venturelli_).`
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalize,
    toWhatsApp,
    getWhatsAppMenu,
    findSchools,
    formatSchoolWhatsApp,
    formatSedTicketWhatsApp,
    formatEquipmentDetailsWhatsApp,
    formatCallsWhatsApp,
    formatCarsWhatsApp,
    formatSupervisorsWhatsApp,
    formatMonitorWhatsApp,
    handleWhatsAppMessage
  };
}

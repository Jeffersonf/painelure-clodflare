/**
 * Bot Core para o PainelURE no Telegram
 * Compatível tanto com Node.js (v18+) quanto Cloudflare Workers
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

function getMainKeyboard(painelUrl = 'https://painelure-cloudflare-pages.pages.dev') {
  const keyboard = [
    [{ text: '🏫 Escolas' }, { text: '🎫 Chamados TI' }],
    [{ text: '🚗 Carros' }, { text: '📊 Monitor Rede' }],
    [{ text: '👨‍🏫 Supervisores' }, { text: '❓ Ajuda' }]
  ];
  if (painelUrl) {
    keyboard.push([{ text: '🚀 Abrir PainelURE', web_app: { url: painelUrl } }]);
  }
  return {
    keyboard,
    resize_keyboard: true,
    is_persistent: true
  };
}

function getStartMessage(painelUrl) {
  return {
    text: `🏛️ <b>Bem-vindo ao Bot do PainelURE!</b>\n\n` +
      `Este é o assistente operacional oficial da <b>URE Itapeva</b>.\n` +
      `Aqui você pode consultar informações de escolas, abrir e gerenciar chamados de TI, reservar veículos oficiais e monitorar a rede em tempo real.\n\n` +
      `📌 <b>Comandos Rápidos:</b>\n` +
      `• <code>/escola &lt;nome ou CIE&gt;</code> - Dados, rede, DVRs e botões de GPS (Maps/Waze)\n` +
      `• <code>/chamados</code> - Fila de chamados de suporte com botões de baixa\n` +
      `• <code>/novochamado &lt;escola&gt; | &lt;problema&gt;</code> - Abrir novo chamado de TI\n` +
      `• <code>/carros</code> - Agenda da frota oficial e botão de reserva\n` +
      `• <code>/reservarcarro</code> - Formulário interativo para reservar veículo oficial\n` +
      `• <code>/supervisores</code> - Consulta de supervisores e escolas\n` +
      `• <code>/monitor</code> - Saúde dos links Zabbix/Meraki + print ao vivo\n` +
      `• <code>/alertas</code> - Ativar/Desativar avisos automáticos de queda de link\n` +
      `• <code>/painel</code> - Abrir o PainelURE no celular (Mini App)\n` +
      `• <code>/ajuda</code> - Guia detalhado de comandos\n\n` +
      `<i>Toque nos botões do teclado abaixo para navegar rapidamente.</i>`,
    parse_mode: 'HTML',
    reply_markup: getMainKeyboard(painelUrl)
  };
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
    
    // Consulta em network
    const net = networkData[name];
    if (net && net.ips && net.ips.some(ip => normalize(ip).includes(q))) return true;

    // Consulta em profiles
    const prof = schoolProfiles.find(p => normalize(p.school || p.name || p.escola) === normName);
    if (prof) {
      if (normalize(prof.cie || '').includes(q)) return true;
      if (normalize(prof.municipality || prof.municipio || prof.city || '').includes(q)) return true;
      if (normalize(prof.email || '').includes(q)) return true;
      if (normalize(prof.phone || '').includes(q)) return true;
    }
    return false;
  });
}

function getSchoolButtons(schoolName, appData) {
  const normTarget = normalize(schoolName);
  const profile = (appData.schoolProfiles || []).find(p => normalize(p.school || p.name || p.escola) === normTarget) || {};
  const muni = profile.municipality || profile.municipio || profile.city || 'Itapeva';
  const query = encodeURIComponent(`${schoolName} ${muni} SP`);

  return {
    inline_keyboard: [
      [
        { text: '📍 Google Maps', url: `https://www.google.com/maps/search/?api=1&query=${query}` },
        { text: '🚗 Waze', url: `https://waze.com/ul?q=${query}&navigate=yes` }
      ],
      [
        { text: '🎫 Abrir Chamado TI', callback_data: `newcall:${schoolName.slice(0, 40)}` }
      ]
    ]
  };
}

function getCallsButtons(calls = []) {
  const rows = [];
  calls.slice(0, 3).forEach((c, idx) => {
    const id = c.id || String(idx);
    const shortTitle = (c.school || c.title || `Chamado #${idx + 1}`).slice(0, 18);
    rows.push([
      { text: `✅ Concluir: ${shortTitle}`, callback_data: `call_done:${id}` },
      { text: `⏳ Andamento`, callback_data: `call_prog:${id}` }
    ]);
  });
  rows.push([
    { text: '➕ Abrir Novo Chamado', callback_data: 'call_prompt' }
  ]);
  return { inline_keyboard: rows };
}

function getCarsButtons() {
  return {
    inline_keyboard: [
      [
        { text: '🚘 Reservar Utilitário', callback_data: 'car_pick:Veículo Utilitário' },
        { text: '🛻 Reservar Pick-up', callback_data: 'car_pick:Veículo Pick-up' }
      ]
    ]
  };
}

function formatSchool(schoolName, appData) {
  const normTarget = normalize(schoolName);
  const net = (appData.networkData || {})[schoolName] || 
              Object.entries(appData.networkData || {}).find(([k]) => normalize(k) === normTarget)?.[1] || {};
  
  const profile = (appData.schoolProfiles || []).find(p => normalize(p.school || p.name || p.escola) === normTarget) || {};
  const baseSchool = Array.isArray(appData.schools) ? (appData.schools.find(s => normalize(s.name || s) === normTarget) || {}) : {};

  // Localizar supervisor da escola
  const supervisor = (appData.supervisors || []).find(s => 
    (s.assignedSchools || []).some(sch => normalize(sch) === normTarget)
  );

  // Extrair CIE
  let cie = profile.cie || baseSchool.cie || '';
  if (!cie && profile.email) {
    const cieMatch = profile.email.match(/^e(\d{5,7})[a-z]?@/i);
    if (cieMatch) cie = cieMatch[1];
  }
  if (!cie && net.ips) {
    const cieIp = net.ips.find(i => /cie[:\s]*(\d+)/i.test(i));
    if (cieIp) {
      const m = cieIp.match(/(\d+)/);
      if (m) cie = m[1];
    }
  }

  // Localizar inventário
  const inventoryMetrics = (appData.schoolInventoryMetrics || {})[schoolName] || {};
  const assets = (appData.schoolAssets || []).filter(a => normalize(a.school || a.escola || '') === normTarget);

  // Localizar chamados abertos
  const openCalls = (appData.calls || []).filter(c => {
    const sName = normalize(c.school || c.escola || c.unit || '');
    return sName === normTarget && !['resolvido', 'fechado', 'concluido'].includes(normalize(c.status || ''));
  });

  let msg = `🏫 <b>${escapeHtml(schoolName)}</b>\n`;
  if (profile.municipality || profile.municipio || profile.city) {
    msg += `📍 <b>Município:</b> ${escapeHtml(profile.municipality || profile.municipio || profile.city)}\n`;
  }
  if (cie) {
    msg += `🏷️ <b>CIE:</b> <code>${escapeHtml(cie)}</code>\n`;
  }
  if (profile.phone) {
    msg += `📞 <b>Telefone:</b> ${escapeHtml(profile.phone)}\n`;
  }
  if (profile.email) {
    msg += `✉️ <b>Email:</b> <code>${escapeHtml(profile.email)}</code>\n`;
  }
  if (supervisor) {
    msg += `👨‍🏫 <b>Supervisor(a):</b> ${escapeHtml(supervisor.name)}\n`;
  }

  // Redes e Câmeras
  msg += `\n🌐 <b>Rede & Câmeras:</b>\n`;
  if (net.network && net.network.length) {
    const admNet = net.network.find(l => /administrativ/i.test(l)) || net.network[0];
    const pedNet = net.network.find(l => /pedagog/i.test(l));
    msg += `• <b>Rede ADM:</b> <code>${escapeHtml(admNet)}</code>\n`;
    if (pedNet) msg += `• <b>Rede PED:</b> <code>${escapeHtml(pedNet)}</code>\n`;
  }

  if (net.ips && net.ips.length) {
    const dvrs = net.ips.filter(ip => /dvr/i.test(ip));
    if (dvrs.length) {
      msg += `• <b>DVRs:</b>\n`;
      dvrs.slice(0, 4).forEach(dvr => {
        msg += `  📹 <code>${escapeHtml(dvr)}</code>\n`;
      });
    }
    const gateway = net.ips.find(ip => /gateway/i.test(ip));
    if (gateway) msg += `• <b>Gateway:</b> <code>${escapeHtml(gateway)}</code>\n`;
  } else {
    msg += `• <i>Dados de rede em consolidação.</i>\n`;
  }

  if (net.cameras && net.cameras.length) {
    msg += `• <b>Câmeras:</b> ${escapeHtml(net.cameras.join(' | '))}\n`;
  }

  // Inventário
  msg += `\n💻 <b>Equipamentos / Ativos:</b>\n`;
  if (Object.keys(inventoryMetrics).length > 0) {
    const parts = [];
    if (inventoryMetrics.desktops) parts.push(`${inventoryMetrics.desktops} Desktops`);
    if (inventoryMetrics.chromebooks) parts.push(`${inventoryMetrics.chromebooks} Chromebooks`);
    if (inventoryMetrics.notebooks) parts.push(`${inventoryMetrics.notebooks} Notebooks`);
    if (inventoryMetrics.switches) parts.push(`${inventoryMetrics.switches} Switches`);
    msg += parts.length ? `• ${parts.join(' | ')}\n` : `• ${inventoryMetrics.total || 'Inventariado'}\n`;
  } else if (assets.length > 0) {
    msg += `• ${assets.length} ativos cadastrados no sistema.\n`;
  } else {
    msg += `• <i>Inventário não consolidado.</i>\n`;
  }

  // Chamados
  msg += `\n🎫 <b>Chamados de TI:</b> `;
  if (openCalls.length === 0) {
    msg += `✅ <i>Nenhum chamado aberto no momento.</i>\n`;
  } else {
    msg += `⚠️ <b>${openCalls.length} chamado(s) aberto(s):</b>\n`;
    openCalls.slice(0, 3).forEach(c => {
      const title = c.title || c.descricao || c.description || c.issue || 'Suporte';
      const status = c.status || 'Pendente';
      msg += `  • [${escapeHtml(status)}] ${escapeHtml(title)}\n`;
    });
  }

  return msg;
}

function formatCalls(appData, query) {
  const allCalls = appData.calls || [];
  const q = normalize(query);
  
  let calls = allCalls.filter(c => {
    const status = normalize(c.status || '');
    return !['resolvido', 'fechado', 'concluido'].includes(status);
  });

  if (q && q !== 'todos') {
    calls = calls.filter(c => 
      normalize(c.school || c.escola || '').includes(q) ||
      normalize(c.title || c.descricao || '').includes(q) ||
      normalize(c.technician || c.tecnico || '').includes(q)
    );
  }

  let msg = `🎫 <b>Fila de Chamados de T.I. - URE Itapeva</b>\n\n`;
  if (calls.length === 0) {
    msg += `✅ <b>Nenhum chamado pendente</b>`;
    if (q) msg += ` para o termo <i>"${escapeHtml(query)}"</i>`;
    msg += `!\n\nTudo em ordem com as escolas monitoradas.\n\n` +
      `💡 <i>Para abrir um chamado, use:</i>\n<code>/novochamado &lt;Escola&gt; | &lt;Problema&gt;</code>`;
    return { text: msg, reply_markup: { inline_keyboard: [[{ text: '➕ Abrir Chamado', callback_data: 'call_prompt' }]] } };
  }

  msg += `📊 <b>Total em aberto:</b> ${calls.length} chamado(s)\n\n`;

  calls.slice(0, 7).forEach((c, idx) => {
    const school = c.school || c.escola || 'Escola não informada';
    const title = c.title || c.description || c.descricao || c.issue || 'Suporte técnico';
    const status = c.status || 'Pendente';
    const tech = c.technician || c.tecnico || 'Não atribuído';
    const priority = c.priority || c.prioridade || 'Normal';

    const icon = /alta|urgente|critica/i.test(priority) ? '🚨' : '🔹';

    msg += `${icon} <b>#${idx + 1} - ${escapeHtml(school)}</b>\n`;
    msg += `   📝 ${escapeHtml(title)}\n`;
    msg += `   ⚙️ <b>Status:</b> ${escapeHtml(status)} | <b>Prioridade:</b> ${escapeHtml(priority)}\n`;
    msg += `   👤 <b>Técnico:</b> ${escapeHtml(tech)}\n\n`;
  });

  if (calls.length > 7) {
    msg += `<i>... e mais ${calls.length - 7} chamados na fila.</i>\n\n`;
  }

  msg += `💡 <i>Clique nos botões abaixo para dar baixa ou abrir um novo chamado:</i>`;
  return { text: msg, reply_markup: getCallsButtons(calls) };
}

function formatCars(appData) {
  const cars = appData.cars || [];
  let msg = `🚗 <b>Frota de Carros Oficiais - URE Itapeva</b>\n\n`;

  if (!cars.length) {
    msg += `ℹ️ <i>Nenhuma reserva de veículo registrada no sistema no momento.</i>\n\n` +
      `💡 <i>Para reservar um carro oficial, toque no botão abaixo ou use:</i>\n` +
      `<code>/reservarcarro Veículo | Hoje | Destino | Nome</code>`;
    return { text: msg, reply_markup: getCarsButtons() };
  }

  const nowBr = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date());

  msg += `📅 <b>Data de Hoje:</b> ${nowBr}\n\n`;

  cars.slice(0, 6).forEach((c) => {
    const vehicle = c.vehicle || c.car || c.recurso || 'Carro oficial';
    const date = c.date || c.quando || 'Hoje';
    const time = c.time || c.hora || '--:--';
    const retTime = c.returnTime || c.devolucao || '--:--';
    const requester = c.requester || c.solicitante || c.sector || c.owner || 'Regional';
    const destination = c.destination || c.destino || c.local || c.place || 'Itinerário oficial';
    const status = c.status || c.authorization || 'Reservado';

    msg += `🚘 <b>${escapeHtml(vehicle)}</b>\n`;
    msg += `   🗓️ <b>Data/Hora:</b> ${escapeHtml(date)} (${escapeHtml(time)}${retTime ? ` às ${escapeHtml(retTime)}` : ''})\n`;
    msg += `   📍 <b>Destino:</b> ${escapeHtml(destination)}\n`;
    msg += `   👤 <b>Solicitante:</b> ${escapeHtml(requester)} [${escapeHtml(status)}]\n\n`;
  });

  msg += `<i>Total de ${cars.length} registro(s) no sistema.</i>\n\n` +
    `💡 <i>Toque abaixo para fazer uma nova reserva:</i>`;
  return { text: msg, reply_markup: getCarsButtons() };
}

function formatSupervisors(query, appData) {
  const supervisors = appData.supervisors || [];
  const q = normalize(query);

  if (!supervisors.length) {
    return `👨‍🏫 <b>Supervisão de Ensino</b>\n\n<i>Nenhum supervisor cadastrado no momento.</i>`;
  }

  if (q) {
    const match = supervisors.find(s => normalize(s.name).includes(q));
    if (match) {
      let msg = `👨‍🏫 <b>Supervisor(a): ${escapeHtml(match.name)}</b>\n`;
      if (match.email) msg += `📧 <b>Email:</b> ${escapeHtml(match.email)}\n`;
      if (match.phone) msg += `📱 <b>Telefone:</b> ${escapeHtml(match.phone)}\n`;
      
      const schools = match.assignedSchools || [];
      msg += `\n🏫 <b>Escolas Atribuídas (${schools.length}):</b>\n`;
      if (schools.length) {
        schools.forEach(sch => {
          msg += `• <code>${escapeHtml(sch)}</code>\n`;
        });
      } else {
        msg += `• <i>Nenhuma escola vinculada na lista oficial.</i>\n`;
      }
      return msg;
    }
  }

  let msg = `👨‍🏫 <b>Supervisores de Ensino - URE Itapeva</b>\n\n`;
  supervisors.slice(0, 10).forEach(s => {
    const count = (s.assignedSchools || []).length;
    msg += `• <b>${escapeHtml(s.name)}</b> (${count} escolas)\n`;
  });

  if (supervisors.length > 10) {
    msg += `\n<i>... e mais ${supervisors.length - 10} supervisores.</i>\n`;
  }

  msg += `\n💡 <i>Para ver as escolas de um supervisor, digite: <code>/supervisores &lt;nome&gt;</code></i>`;
  return msg;
}

function formatMonitor(monitorStatus = {}) {
  let msg = `📊 <b>Status do Monitor de Rede (Zabbix / Meraki)</b>\n\n`;
  const isOnline = monitorStatus.active !== false;
  const lastUpdate = monitorStatus.updatedAt ? new Date(monitorStatus.updatedAt).toLocaleString('pt-BR') : 'N/D';

  msg += `📶 <b>Agente URE:</b> ${isOnline ? '🟢 Ativo' : '🔴 Inativo'}\n`;
  msg += `⏱️ <b>Última captura:</b> ${escapeHtml(lastUpdate)}\n`;
  if (monitorStatus.source) {
    msg += `🖥️ <b>Fonte:</b> ${escapeHtml(monitorStatus.source)}\n`;
  }

  if (monitorStatus.alerts && Array.isArray(monitorStatus.alerts) && monitorStatus.alerts.length > 0) {
    msg += `\n🚨 <b>Alertas de Queda / Incidentes:</b>\n`;
    monitorStatus.alerts.slice(0, 5).forEach(alert => {
      msg += `• ⚠️ ${escapeHtml(alert.message || alert.name || alert)}\n`;
    });
  } else {
    msg += `\n✅ <b>Nenhum alarme de queda de link no momento.</b>\n`;
  }

  msg += `\n<i>Os prints são sincronizados automaticamente pelo agente na rede interna.</i>`;
  return msg;
}

function getHelpMessage() {
  return `❓ <b>Guia de Uso do Bot PainelURE</b>\n\n` +
    `Aqui estão todos os comandos disponíveis:\n\n` +
    `🏫 <b>/escola &lt;nome ou CIE&gt;</b>\n` +
    `Exibe dados da unidade escolar, rede, DVRs e botões diretos de navegação por <b>Google Maps</b> e <b>Waze</b>.\n\n` +
    `🎫 <b>/chamados [filtro]</b>\n` +
    `Lista os chamados de TI abertos com botões interativos para concluir ou atribuir.\n\n` +
    `➕ <b>/novochamado &lt;Escola&gt; | &lt;Problema&gt;</b>\n` +
    `Abre um chamado de TI diretamente pelo Telegram e sincroniza no sistema.\n\n` +
    `🚗 <b>/carros</b>\n` +
    `Mostra a agenda de veículos oficiais e botão para nova reserva.\n\n` +
    `🚘 <b>/reservarcarro</b>\n` +
    `Menu interativo para solicitar a reserva de um veículo oficial da regional.\n\n` +
    `👨‍🏫 <b>/supervisores [nome]</b>\n` +
    `Lista a equipe de supervisão e suas respectivas escolas atribuídas.\n\n` +
    `📊 <b>/monitor</b>\n` +
    `Status ao vivo dos links Zabbix/Meraki com print PNG da tela atual.\n\n` +
    `🔔 <b>/alertas</b>\n` +
    `Inscreve o chat para receber alertas proativos automáticos de queda de link.\n\n` +
    `🚀 <b>/painel</b>\n` +
    `Abre o PainelURE diretamente dentro do Telegram como um Mini App.\n`;
}

/**
 * Processa uma atualização (update) do Telegram
 */
async function handleTelegramUpdate({ update, appData = {}, monitorStatus = {}, painelUrl = 'https://painelure-cloudflare-pages.pages.dev' }) {
  const message = update.message || update.edited_message;

  // ────────────────────────────────────────────────────────────
  // Tratar Callback Queries (Botões Inline)
  // ────────────────────────────────────────────────────────────
  if (!message) {
    if (update.callback_query) {
      const cb = update.callback_query;
      const data = cb.data || '';
      const chatId = cb.message?.chat?.id;
      const userDisplayName = cb.from?.username ? `@${cb.from.username}` : (cb.from?.first_name || 'Técnico URE');

      // Seleção de escola por botão
      if (data.startsWith('esc:')) {
        const schoolName = data.slice(4);
        const text = formatSchool(schoolName, appData);
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            reply_markup: getSchoolButtons(schoolName, appData)
          }
        };
      }

      // Prompt para abrir chamado em escola específica
      if (data.startsWith('newcall:')) {
        const schoolName = data.slice(8);
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: `🎫 <b>Abrir Chamado para ${escapeHtml(schoolName)}:</b>\n\n` +
              `Copie, cole e complete a mensagem abaixo com o problema:\n\n` +
              `<code>/novochamado ${schoolName} | Descreva o defeito aqui</code>`,
            parse_mode: 'HTML'
          }
        };
      }

      // Prompt genérico para novo chamado
      if (data === 'call_prompt') {
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: `🎫 <b>Como abrir um novo chamado de T.I.:</b>\n\n` +
              `Envie o comando no formato:\n` +
              `<code>/novochamado &lt;Escola&gt; | &lt;Problema&gt;</code>\n\n` +
              `<i>Exemplo:</i>\n<code>/novochamado Venturelli | Switch da sala dos professores travado</code>`,
            parse_mode: 'HTML'
          }
        };
      }

      // Concluir chamado
      if (data.startsWith('call_done:')) {
        const callId = data.slice(10);
        const calls = appData.calls || [];
        const targetCall = calls.find(c => String(c.id) === callId);

        if (targetCall) {
          targetCall.status = 'Concluído';
          targetCall.closedAt = new Date().toISOString();
          targetCall.closedBy = userDisplayName;

          return {
            action: 'answer_callback',
            callback_query_id: cb.id,
            dataMutation: { type: 'update_call', call: targetCall },
            reply: {
              chat_id: chatId,
              text: `✅ <b>Chamado Concluído!</b>\n\n` +
                `🎫 <b>Escola:</b> ${escapeHtml(targetCall.school || targetCall.escola || 'Unidade')}\n` +
                `📝 <b>Assunto:</b> ${escapeHtml(targetCall.title || targetCall.description || 'Suporte')}\n` +
                `👤 <b>Finalizado por:</b> ${escapeHtml(userDisplayName)}\n` +
                `⏱️ <b>Data:</b> ${new Date().toLocaleString('pt-BR')}`,
              parse_mode: 'HTML'
            }
          };
        }
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: { chat_id: chatId, text: `ℹ️ Chamado já concluído ou não localizado.`, parse_mode: 'HTML' }
        };
      }

      // Colocar chamado em andamento
      if (data.startsWith('call_prog:')) {
        const callId = data.slice(10);
        const calls = appData.calls || [];
        const targetCall = calls.find(c => String(c.id) === callId);

        if (targetCall) {
          targetCall.status = 'Em Andamento';
          targetCall.technician = userDisplayName;

          return {
            action: 'answer_callback',
            callback_query_id: cb.id,
            dataMutation: { type: 'update_call', call: targetCall },
            reply: {
              chat_id: chatId,
              text: `⏳ <b>Chamado em Andamento!</b>\n\n` +
                `🎫 <b>Escola:</b> ${escapeHtml(targetCall.school || targetCall.escola || 'Unidade')}\n` +
                `📝 <b>Assunto:</b> ${escapeHtml(targetCall.title || targetCall.description || 'Suporte')}\n` +
                `👤 <b>Assumido por:</b> ${escapeHtml(userDisplayName)}`,
              parse_mode: 'HTML'
            }
          };
        }
        return { action: 'answer_callback', callback_query_id: cb.id };
      }

      // Passo 1 da reserva de carro (escolher veículo)
      if (data.startsWith('car_pick:')) {
        const vehicle = data.slice(9);
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: `🚘 <b>Reserva: ${escapeHtml(vehicle)}</b>\n\nPara qual data você precisa do veículo?`,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '📅 Hoje', callback_data: `car_date:${vehicle}:Hoje` },
                  { text: '📅 Amanhã', callback_data: `car_date:${vehicle}:Amanhã` }
                ]
              ]
            }
          }
        };
      }

      // Passo 2 da reserva de carro (escolher data)
      if (data.startsWith('car_date:')) {
        const [, vehicle, dateChoice] = data.split(':');
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: `🚗 <b>Finalizar Reserva:</b>\n\n` +
              `Veículo: <b>${escapeHtml(vehicle)}</b>\n` +
              `Data: <b>${escapeHtml(dateChoice)}</b>\n\n` +
              `Copie, complete com o destino e envie:\n\n` +
              `<code>/reservarcarro ${vehicle} | ${dateChoice} | Informe o Destino | ${escapeHtml(userDisplayName)}</code>`,
            parse_mode: 'HTML'
          }
        };
      }

      return { action: 'answer_callback', callback_query_id: cb.id };
    }
    return null;
  }

  const chatId = message.chat.id;
  const rawText = String(message.text || '').trim();
  const lowerText = rawText.toLowerCase();
  const userDisplayName = message.from?.username ? `@${message.from.username}` : (message.from?.first_name || 'Técnico URE');

  // ────────────────────────────────────────────────────────────
  // Botões do Teclado Principal (Reply Keyboard)
  // ────────────────────────────────────────────────────────────
  if (lowerText === '🏫 escolas' || lowerText === 'escolas') {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: `🏫 <b>Consulta de Escolas</b>\n\nDigite o nome ou CIE da escola que deseja consultar.\n\nExemplo: <code>/escola venturelli</code> ou <code>/escola intervales</code>`,
        parse_mode: 'HTML'
      }
    };
  }

  if (lowerText === '🎫 chamados ti' || lowerText === 'chamados') {
    const formatted = formatCalls(appData);
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatted.text,
        parse_mode: 'HTML',
        reply_markup: formatted.reply_markup
      }
    };
  }

  if (lowerText === '🚗 carros' || lowerText === 'carros') {
    const formatted = formatCars(appData);
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatted.text,
        parse_mode: 'HTML',
        reply_markup: formatted.reply_markup
      }
    };
  }

  if (lowerText === '📊 monitor rede' || lowerText === 'monitor') {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatMonitor(monitorStatus),
        parse_mode: 'HTML'
      }
    };
  }

  if (lowerText === '👨‍🏫 supervisores' || lowerText === 'supervisores') {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatSupervisors('', appData),
        parse_mode: 'HTML'
      }
    };
  }

  if (lowerText === '❓ ajuda' || lowerText === 'ajuda') {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: getHelpMessage(),
        parse_mode: 'HTML'
      }
    };
  }

  // ────────────────────────────────────────────────────────────
  // Comandos de Barra (/)
  // ────────────────────────────────────────────────────────────
  if (rawText.startsWith('/start')) {
    const startMsg = getStartMessage(painelUrl);
    return {
      action: 'send_message',
      registerSubscriber: true,
      chatId,
      reply: {
        chat_id: chatId,
        ...startMsg
      }
    };
  }

  if (rawText.startsWith('/help') || rawText.startsWith('/ajuda')) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: getHelpMessage(),
        parse_mode: 'HTML'
      }
    };
  }

  if (rawText.startsWith('/alertas') || rawText.startsWith('/inscrever')) {
    return {
      action: 'toggle_alerts',
      chatId,
      reply: {
        chat_id: chatId,
        text: `🔔 <b>Notificações do Guardião da Rede Ativadas!</b>\n\n` +
          `Este chat agora está inscrito para receber alertas automáticos imediatos caso ocorra qualquer queda de link (Zabbix) ou APs offline (Meraki) nas escolas da URE Itapeva.\n\n` +
          `Você também receberá uma notificação verde quando o link for restabelecido.`,
        parse_mode: 'HTML'
      }
    };
  }

  if (rawText.startsWith('/painel')) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: `🚀 <b>Acesse o PainelURE direto pelo Telegram:</b>\n\nClique no botão abaixo para abrir a central completa:`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Abrir PainelURE no App', web_app: { url: painelUrl } }]
          ]
        }
      }
    };
  }

  // ── Comando /novochamado ──────────────────────────────────
  if (rawText.startsWith('/novochamado') || rawText.startsWith('/chamadonovo')) {
    const content = rawText.replace(/^\/(novochamado|chamadonovo)(@\w+)?/i, '').trim();
    if (!content || !content.includes('|')) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `ℹ️ <b>Como abrir um novo chamado de T.I.:</b>\n\n` +
            `Envie o comando no formato:\n` +
            `<code>/novochamado &lt;Escola&gt; | &lt;Descrição do problema&gt;</code>\n\n` +
            `<i>Exemplo:</i>\n<code>/novochamado Venturelli | Impressora da secretaria não responde na rede</code>`,
          parse_mode: 'HTML'
        }
      };
    }

    const [rawSchool, ...rest] = content.split('|');
    const schoolQuery = rawSchool.trim();
    const issueDesc = rest.join('|').trim();

    if (!issueDesc) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `⚠️ Por favor, informe a descrição do problema após a barra (|).\n\n` +
            `Exemplo: <code>/novochamado ${escapeHtml(schoolQuery)} | Sem internet na sala de informática</code>`,
          parse_mode: 'HTML'
        }
      };
    }

    const matches = findSchools(schoolQuery, appData);
    const finalSchool = matches.length > 0 ? matches[0] : schoolQuery;

    const newCall = {
      id: `call-${Date.now()}`,
      school: finalSchool,
      title: issueDesc,
      description: issueDesc,
      status: 'Aberto',
      priority: 'Normal',
      technician: userDisplayName,
      createdAt: new Date().toISOString(),
      source: 'Telegram'
    };

    if (!Array.isArray(appData.calls)) appData.calls = [];
    appData.calls.unshift(newCall);

    return {
      action: 'send_message',
      dataMutation: { type: 'add_call', call: newCall },
      reply: {
        chat_id: chatId,
        text: `✅ <b>Chamado Aberto com Sucesso!</b>\n\n` +
          `🎫 <b>ID:</b> <code>${newCall.id}</code>\n` +
          `🏫 <b>Escola:</b> <b>${escapeHtml(finalSchool)}</b>\n` +
          `📝 <b>Problema:</b> ${escapeHtml(issueDesc)}\n` +
          `👤 <b>Aberto por:</b> ${escapeHtml(userDisplayName)}\n` +
          `⚙️ <b>Status:</b> 🟡 Aberto\n\n` +
          `<i>Sincronizado automaticamente com o PainelURE.</i>`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Concluir Chamado', callback_data: `call_done:${newCall.id}` },
              { text: '⏳ Em Andamento', callback_data: `call_prog:${newCall.id}` }
            ]
          ]
        }
      }
    };
  }

  // ── Comando /reservarcarro ────────────────────────────────
  if (rawText.startsWith('/reservarcarro') || rawText.startsWith('/reservar')) {
    const content = rawText.replace(/^\/(reservarcarro|reservar)(@\w+)?/i, '').trim();
    if (!content || !content.includes('|')) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `🚗 <b>Reserva de Veículo Oficial - URE Itapeva</b>\n\n` +
            `Selecione um veículo abaixo para iniciar a reserva guiada:\n` +
            `<i>Ou envie direto:</i>\n<code>/reservarcarro Veículo Utilitário | Amanhã | Capão Bonito | ${escapeHtml(message.from?.first_name || 'Seu Nome')}</code>`,
          parse_mode: 'HTML',
          reply_markup: getCarsButtons()
        }
      };
    }

    const parts = content.split('|').map(s => s.trim());
    const vehicle = parts[0] || 'Veículo Utilitário';
    const dateInput = parts[1] || 'Hoje';
    const destination = parts[2] || 'Regional Itapeva';
    const requester = parts[3] || message.from?.first_name || 'Técnico URE';

    let finalDate = dateInput;
    const now = new Date();
    if (/hoje/i.test(dateInput)) {
      finalDate = now.toISOString().slice(0, 10);
    } else if (/amanha|amanhã/i.test(dateInput)) {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      finalDate = tomorrow.toISOString().slice(0, 10);
    }

    const newReservation = {
      id: `car-${Date.now()}`,
      vehicle,
      date: finalDate,
      time: '08:00',
      returnTime: '17:00',
      requester,
      owner: requester,
      destination,
      place: destination,
      title: `Visita técnica - ${destination}`,
      status: 'Aprovado',
      authorization: 'Aprovado',
      source: 'Telegram',
      createdAt: new Date().toISOString()
    };

    if (!Array.isArray(appData.cars)) appData.cars = [];
    appData.cars.unshift(newReservation);

    return {
      action: 'send_message',
      dataMutation: { type: 'add_car', car: newReservation },
      reply: {
        chat_id: chatId,
        text: `🚗 <b>Reserva Confirmada com Sucesso!</b>\n\n` +
          `🚘 <b>Veículo:</b> ${escapeHtml(vehicle)}\n` +
          `📅 <b>Data:</b> ${escapeHtml(finalDate)}\n` +
          `📍 <b>Destino:</b> ${escapeHtml(destination)}\n` +
          `👤 <b>Solicitante:</b> ${escapeHtml(requester)}\n` +
          `✅ <b>Status:</b> Aprovado\n\n` +
          `<i>A reserva já está registrada na escala oficial do PainelURE.</i>`,
        parse_mode: 'HTML'
      }
    };
  }

  // ── Comando /escola ───────────────────────────────────────
  if (rawText.startsWith('/escola')) {
    const query = rawText.replace(/^\/escola(@\w+)?/i, '').trim();
    if (!query) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `ℹ️ <b>Por favor, informe o nome ou CIE da escola.</b>\n\nExemplo: <code>/escola venturelli</code> ou <code>/escola intervales</code>`,
          parse_mode: 'HTML'
        }
      };
    }

    const matches = findSchools(query, appData);
    if (matches.length === 0) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `❌ Nenhuma escola encontrada com o termo <i>"${escapeHtml(query)}"</i>.\n\nTente usar apenas parte do nome (ex: <code>venturelli</code>, <code>intervales</code>, <code>bairro</code>).`,
          parse_mode: 'HTML'
        }
      };
    }

    if (matches.length === 1) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: formatSchool(matches[0], appData),
          parse_mode: 'HTML',
          reply_markup: getSchoolButtons(matches[0], appData)
        }
      };
    }

    const buttons = matches.slice(0, 6).map(name => ([{
      text: `🏫 ${name}`,
      callback_data: `esc:${name.slice(0, 50)}`
    }]));

    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: `🔍 <b>Encontrei ${matches.length} escolas para "${escapeHtml(query)}":</b>\n\nSelecione qual deseja ver:`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: buttons
        }
      }
    };
  }

  if (rawText.startsWith('/chamados')) {
    const query = rawText.replace(/^\/chamados(@\w+)?/i, '').trim();
    const formatted = formatCalls(appData, query);
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatted.text,
        parse_mode: 'HTML',
        reply_markup: formatted.reply_markup
      }
    };
  }

  if (rawText.startsWith('/carros')) {
    const formatted = formatCars(appData);
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatted.text,
        parse_mode: 'HTML',
        reply_markup: formatted.reply_markup
      }
    };
  }

  if (rawText.startsWith('/supervisores')) {
    const query = rawText.replace(/^\/supervisores(@\w+)?/i, '').trim();
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatSupervisors(query, appData),
        parse_mode: 'HTML'
      }
    };
  }

  if (rawText.startsWith('/monitor')) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatMonitor(monitorStatus),
        parse_mode: 'HTML'
      }
    };
  }

  // Se o usuário digitou apenas o nome de uma escola sem o comando
  const potentialSchools = findSchools(rawText, appData);
  if (potentialSchools.length === 1 && rawText.length >= 3) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: formatSchool(potentialSchools[0], appData),
        parse_mode: 'HTML',
        reply_markup: getSchoolButtons(potentialSchools[0], appData)
      }
    };
  }

  return {
    action: 'send_message',
    reply: {
      chat_id: chatId,
      text: `Olá! Não reconheci esse comando.\n\nUse os botões do teclado abaixo ou digite <code>/ajuda</code> para ver os comandos disponíveis.`,
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(painelUrl)
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalize,
    escapeHtml,
    getMainKeyboard,
    getStartMessage,
    findSchools,
    formatSchool,
    formatCalls,
    formatCars,
    formatSupervisors,
    formatMonitor,
    getHelpMessage,
    getSchoolButtons,
    getCallsButtons,
    getCarsButtons,
    handleTelegramUpdate
  };
}

/**
 * Script de teste unitário e simulação do Bot Telegram do PainelURE
 */

const fs = require('fs');
const path = require('path');
const botCore = require('../modules/telegram/bot-core');

console.log('🤖 Iniciando testes da lógica do Bot Telegram...\n');

// Carregar dados de teste do storage local
const storagePath = path.resolve(__dirname, '..', 'server', 'storage', 'app-data.json');
let appData = {};
if (fs.existsSync(storagePath)) {
  const store = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
  appData = store.appData || {};
  console.log('✅ Dados reais de app-data.json carregados com sucesso.');
} else {
  console.warn('⚠️ app-data.json não encontrado. Usando mock.');
  appData = {
    schools: [{ name: 'EE Profa. Corina Caçapava Barth', cie: '915075' }],
    networkData: {
      'EE Profa. Corina Caçapava Barth': {
        network: ['Rede administrativa: 10.109.42.128'],
        ips: ['CIE: 915075', 'VIDEO-DVR1: 10.109.42.130']
      }
    }
  };
}

async function runTests() {
  const dummyChatId = 12345678;

  // Teste 1: /start
  console.log('\n--- Teste 1: Comando /start ---');
  const startRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/start' } },
    appData
  });
  console.log('Action:', startRes.action);
  console.log('Parse Mode:', startRes.reply.parse_mode);
  console.log('Possui teclado:', Boolean(startRes.reply.reply_markup?.keyboard));
  if (!startRes.reply.text.includes('Bem-vindo')) throw new Error('Falha no /start');

  // Teste 2: /escola com termo existente
  console.log('\n--- Teste 2: Comando /escola venturelli ---');
  const escolaRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/escola venturelli' } },
    appData
  });
  console.log('Resultado:\n' + escolaRes.reply.text);
  if (!escolaRes.reply.text.includes('Venturelli')) throw new Error('Falha na busca de escola');
  if (!escolaRes.reply.text.includes('Diretor(a):')) throw new Error('Falha: Diretor(a) não encontrado no card da escola');
  if (escolaRes.reply.text.includes('Rede & Câmeras:')) throw new Error('Falha: Faixas de IP e câmeras ainda estão no card da escola');
  if (escolaRes.reply.text.includes('Chamados de TI:')) throw new Error('Falha: Chamados abertos ainda estão no card da escola');
  console.log('✅ Card da escola limpo: Diretor(a) incluído(a), IPs/Câmeras e Chamados removidos!');

  // Teste 3: /chamados
  console.log('\n--- Teste 3: Comando /chamados ---');
  const chamadosRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/chamados' } },
    appData
  });
  console.log('Resultado:\n' + chamadosRes.reply.text.slice(0, 200) + '...');
  if (!chamadosRes.reply.text.includes('Chamados')) throw new Error('Falha em /chamados');

  // Teste 4: /carros
  console.log('\n--- Teste 4: Comando /carros ---');
  const carrosRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/carros' } },
    appData
  });
  console.log('Resultado:\n' + carrosRes.reply.text.slice(0, 200) + '...');
  if (!carrosRes.reply.text.includes('Carros')) throw new Error('Falha em /carros');

  // Teste 5: /supervisores
  console.log('\n--- Teste 5: Comando /supervisores ---');
  const superRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/supervisores' } },
    appData
  });
  console.log('Resultado:\n' + superRes.reply.text.slice(0, 200) + '...');
  if (!superRes.reply.text.includes('Supervis')) throw new Error('Falha em /supervisores');

  // Teste 6: /monitor
  console.log('\n--- Teste 6: Comando /monitor ---');
  const monitorRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/monitor' } },
    appData,
    monitorStatus: { active: true, source: 'zabbix', updatedAt: new Date().toISOString() }
  });
  console.log('Resultado:\n' + monitorRes.reply.text);
  if (!monitorRes.reply.text.includes('Monitor')) throw new Error('Falha em /monitor');

  // Teste 7: /painel (Mini App)
  console.log('\n--- Teste 7: Comando /painel (Web App) ---');
  const painelRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/painel' } },
    appData,
    painelUrl: 'https://painelure-cloudflare-pages.pages.dev'
  });
  console.log('Inline keyboard buttons:', JSON.stringify(painelRes.reply.reply_markup.inline_keyboard));
  if (!painelRes.reply.reply_markup.inline_keyboard[0][0].web_app) throw new Error('Falha no Mini App web_app');

  // Teste 8: Botões em /escola (GPS e Texto de Chamado SED)
  console.log('\n--- Teste 8: Botões em /escola (GPS & Texto de Chamado SED) ---');
  const buttons = escolaRes.reply.reply_markup?.inline_keyboard || [];
  console.log('Botões gerados:', JSON.stringify(buttons));
  const hasMaps = buttons.some(row => row.some(b => b.text.includes('Maps')));
  const hasWaze = buttons.some(row => row.some(b => b.text.includes('Waze')));
  const hasSedCall = buttons.some(row => row.some(b => b.text.includes('Texto de Chamado')));
  if (!hasMaps || !hasWaze) throw new Error('Falha nos botões de GPS (Maps/Waze)');
  if (!hasSedCall) throw new Error('Falha no botão Texto de Chamado');
  console.log('✅ Botões de navegação e Texto de Chamado validados!');

  // Teste 8b: Callback do botão Texto de Chamado SED
  console.log('\n--- Teste 8b: Callback sed_call (Texto de Chamado SED) ---');
  const sedCallRes = await botCore.handleTelegramUpdate({
    update: {
      callback_query: {
        id: 'cb_sed_1',
        from: { username: 'analista_ti' },
        message: { chat: { id: dummyChatId } },
        data: 'sed_call:EE Doutor Raul Venturelli'
      }
    },
    appData
  });
  console.log('Resposta Callback SED:\n' + sedCallRes.reply.text);
  if (!sedCallRes.reply.text.includes('Texto Padrão para Chamado SED')) {
    throw new Error('Falha no modelo de chamado SED');
  }
  if (!sedCallRes.reply.text.includes('Unidade Escolar: EE Doutor Raul Venturelli')) {
    throw new Error('Falha nos dados da escola no modelo SED');
  }
  console.log('✅ Modelo de chamado SED retornado perfeitamente com dados da unidade!');

  // Teste 9: Abertura de chamado /novochamado
  console.log('\n--- Teste 9: Comando /novochamado ---');
  const novoChamadoRes = await botCore.handleTelegramUpdate({
    update: {
      message: {
        chat: { id: dummyChatId },
        from: { username: 'analista_ti' },
        text: '/novochamado Venturelli | Roteador da diretoria travando'
      }
    },
    appData
  });
  console.log('Resultado:', novoChamadoRes.reply.text);
  if (!novoChamadoRes.dataMutation || novoChamadoRes.dataMutation.type !== 'add_call') {
    throw new Error('Falha ao registrar novo chamado');
  }
  const createdCallId = novoChamadoRes.dataMutation.call.id;
  console.log('✅ Chamado criado com ID:', createdCallId);

  // Teste 10: Concluir chamado via Callback Query
  console.log('\n--- Teste 10: Concluir chamado via Callback Query ---');
  const concluiRes = await botCore.handleTelegramUpdate({
    update: {
      callback_query: {
        id: 'cb_test_1',
        from: { username: 'analista_ti' },
        message: { chat: { id: dummyChatId } },
        data: `call_done:${createdCallId}`
      }
    },
    appData
  });
  console.log('Resposta callback:', concluiRes.reply.text);
  if (!concluiRes.dataMutation || concluiRes.dataMutation.call.status !== 'Concluído') {
    throw new Error('Falha ao concluir chamado');
  }
  console.log('✅ Chamado concluído com sucesso!');

  // Teste 11: Reserva de carro /reservarcarro
  console.log('\n--- Teste 11: Comando /reservarcarro ---');
  const reservaRes = await botCore.handleTelegramUpdate({
    update: {
      message: {
        chat: { id: dummyChatId },
        from: { first_name: 'Jefferson' },
        text: '/reservarcarro Veículo Utilitário | Amanhã | Capão Bonito | Jefferson T.I.'
      }
    },
    appData
  });
  console.log('Resultado:', reservaRes.reply.text);
  if (!reservaRes.dataMutation || reservaRes.dataMutation.type !== 'add_car') {
    throw new Error('Falha na reserva de carro');
  }
  console.log('✅ Reserva de veículo registrada com sucesso!');

  // Teste 12: Inscrição em alertas proativos /alertas
  console.log('\n--- Teste 12: Comando /alertas ---');
  const alertaRes = await botCore.handleTelegramUpdate({
    update: { message: { chat: { id: dummyChatId }, text: '/alertas' } },
    appData
  });
  console.log('Resultado:', alertaRes.reply.text);
  if (alertaRes.action !== 'toggle_alerts') throw new Error('Falha no comando /alertas');
  console.log('✅ Inscrição do Guardião da Rede validada!');

  console.log('\n🎉 TODOS OS 12 TESTES PASSARAM COM 100% DE SUCESSO! 🎉\n');
}

runTests().catch(err => {
  console.error('❌ Erro no teste:', err);
  process.exit(1);
});

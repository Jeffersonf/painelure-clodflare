/**
 * Script de teste unitário e validação do Bot WhatsApp do PainelURE
 */

const fs = require('fs');
const path = require('path');
const waBot = require('../modules/whatsapp/bot-core');

console.log('🤖 Iniciando testes da lógica do Bot WhatsApp...\n');

const storagePath = path.resolve(__dirname, '..', 'server', 'storage', 'app-data.json');
let appData = {};
if (fs.existsSync(storagePath)) {
  const store = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
  appData = store.appData || {};
  console.log('✅ Dados reais de app-data.json carregados.');
} else {
  console.warn('⚠️ app-data.json não encontrado.');
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) {
    console.error('❌ ERRO:', message);
    throw new Error(message);
  }
  console.log('✅', message);
}

// 1. Menu
const menuRes = waBot.handleWhatsAppMessage({ text: 'oi', from: '5515999999999@c.us', appData });
assert(menuRes.replyText.includes('Assistente WhatsApp URE Itapeva'), 'Menu de boas-vindas exibido com sucesso');
assert(menuRes.replyText.includes('1️⃣ *Escolas*'), 'Opções numeradas presentes no menu');

// 2. Busca de Escola por termo direto
const escolaRes = waBot.handleWhatsAppMessage({ text: 'venturelli', from: '5515999999999@c.us', appData });
assert(escolaRes.replyText.includes('Venturelli'), 'Escola encontrada por busca direta');
assert(escolaRes.replyText.includes('Diretor(a):'), 'Diretor(a) presente no card do WhatsApp');
assert(escolaRes.replyText.includes('Total:'), 'Resumo de equipamentos presente no card');
assert(escolaRes.replyText.includes('Google Maps:'), 'Link do Google Maps gerado');

// 3. Detalhes de Equipamentos (eq <escola>)
const eqRes = waBot.handleWhatsAppMessage({ text: 'eq venturelli', from: '5515999999999@c.us', appData });
assert(eqRes.replyText.includes('Inventário Detalhado'), 'Inventário detalhado gerado');
assert(eqRes.replyText.includes('Total no Inventário:'), 'Contagem total presente no inventário');

// 4. Texto de Chamado SED (chamado <escola>)
const sedRes = waBot.handleWhatsAppMessage({ text: 'chamado venturelli', from: '5515999999999@c.us', appData });
assert(sedRes.replyText.includes('Texto Padrão para Chamado SED'), 'Cabeçalho do Chamado SED presente');
assert(sedRes.replyText.includes('```'), 'Bloco com crases triplas (```) presente para cópia fácil no WhatsApp');
assert(sedRes.replyText.includes('Unidade Escolar:'), 'Campos do chamado preenchidos');

// 5. Chamados TI
const chamadosRes = waBot.handleWhatsAppMessage({ text: '4', from: '5515999999999@c.us', appData });
assert(chamadosRes.replyText.includes('Fila de Chamados de T.I.'), 'Opção 4 exibe lista de chamados');

// 6. Carros Oficiais
const carrosRes = waBot.handleWhatsAppMessage({ text: 'carros', from: '5515999999999@c.us', appData });
assert(carrosRes.replyText.includes('Frota de Carros Oficiais'), 'Comando carros exibe frota');

// 7. Supervisores
const supRes = waBot.handleWhatsAppMessage({ text: 'supervisores', from: '5515999999999@c.us', appData });
assert(supRes.replyText.includes('Supervisores de Ensino'), 'Comando supervisores exibe equipe');

// 8. Monitor de Rede
const monRes = waBot.handleWhatsAppMessage({ text: '7', from: '5515999999999@c.us', appData });
assert(monRes.replyText.includes('Status do Monitor de Rede'), 'Opção 7 exibe status do monitor');

// 9. Abertura de Chamado via WhatsApp
const novoChamadoRes = waBot.handleWhatsAppMessage({
  text: 'novo chamado Venturelli | Teste de impressora sem papel',
  from: '5515999999999@c.us',
  sender: 'Prof. Carlos',
  appData
});
assert(novoChamadoRes.replyText.includes('Chamado Aberto com Sucesso'), 'Chamado aberto via WhatsApp');
assert(Boolean(novoChamadoRes.dataMutation), 'Mutação de dados gerada para salvar no banco');

// 10. Reserva de Carro via WhatsApp
const novaReservaRes = waBot.handleWhatsAppMessage({
  text: 'reservar carro Utilitário | Amanhã 09:00 | Visita técnica Ribeirão Branco',
  from: '5515999999999@c.us',
  sender: 'Supervisor Marcos',
  appData
});
assert(novaReservaRes.replyText.includes('Reserva de Veículo Confirmada'), 'Reserva de veículo confirmada via WhatsApp');
assert(Boolean(novaReservaRes.dataMutation), 'Mutação de reserva gerada para salvar no banco');

console.log('\n🎉 TODOS OS 10 TESTES DO BOT WHATSAPP PASSARAM COM 100% DE SUCESSO!\n');

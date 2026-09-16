/**
 * Testes Unitários do Bot WhatsApp PainelURE
 * Cobre:
 * 1. Zabbix e Meraki: escolas offline
 * 2. zab <escola> (ex: zab silverio -> offline)
 * 3. aps <escola> (ex: aps padre -> 9 total, 1 offline)
 * 4. rede (escolas com zabbix e meraki offline)
 * 5. rede <escola> (ex: rede padre -> situação zabbix e meraki da escola)
 */

const fs = require('fs');
const path = require('path');
const waBot = require('../modules/whatsapp/bot-core');

console.log('🤖 Testando comandos de monitoramento Zabbix, Meraki e Rede...\n');

const storagePath = path.resolve(__dirname, '..', 'server', 'storage', 'app-data.json');
let appData = {};
if (fs.existsSync(storagePath)) {
  const store = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
  appData = store.appData || {};
}

// Mock realista do monitorStatus idêntico ao que o agente e o D1 armazenam
const mockMonitorStatus = {
  active: true,
  updatedAt: new Date().toISOString(),
  alerts: {
    zabbix: [
      { cie: "015428", host: "015428-RT", name: "PEI EE Simpliciano Campolim de Almeida (015428-RT)", time: "11:00:32", status: "Desastre" },
      { cie: "035336", host: "FW-035336", name: "EE Professor Silverio Monteiro (FW-035336)", time: "12-09-2026 02:46:07", status: "Desastre" }
    ],
    meraki: [
      { cie: "015118", name: "PEI EE Padre Arlindo Vieira", total: 9, offline: 1, hasRedDot: true },
      { cie: "015222", name: "EE Doutor Raul Venturelli", total: 17, offline: 1, hasRedDot: true },
      { cie: "015519", name: "PEI EE Professor Jose Vasques Ferrari", total: 13, offline: 1, hasRedDot: true },
      { cie: "926036", name: "EE Bairro Turvo dos Almeidas", total: 6, offline: 1, hasRedDot: true },
      { cie: "015544", name: "PEI EE Professora Zulmira de Oliveira", total: 17, offline: 1, hasRedDot: true }
    ]
  }
};

function assert(condition, message) {
  if (!condition) {
    console.error('❌ ERRO:', message);
    throw new Error(message);
  }
  console.log('✅', message);
}

// 1. Comando "zab" geral (diz se tem escolas offline no Zabbix)
const zabGeral = waBot.handleWhatsAppMessage({ text: 'zab', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(zabGeral.replyText.includes('Simpliciano Campolim'), 'Zab geral lista Simpliciano offline');
assert(zabGeral.replyText.includes('Silverio Monteiro'), 'Zab geral lista Silvério Monteiro offline');
assert(zabGeral.replyText.includes('/api/monitor/image?source=zabbix'), 'Link da foto do Zabbix presente');

// 2. Comando "zab silverio" (diz que a escola está offline)
const zabSilverio = waBot.handleWhatsAppMessage({ text: 'zab silverio', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(zabSilverio.replyText.includes('OFFLINE'), 'zab silverio indica que a escola está OFFLINE');
assert(zabSilverio.replyText.includes('Desastre'), 'zab silverio informa incidente de Desastre');

// 3. Comando "zab padre" (escola com link online)
const zabPadre = waBot.handleWhatsAppMessage({ text: 'zab padre', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(zabPadre.replyText.includes('ONLINE'), 'zab padre indica link 100% ONLINE');

// 4. Comando "aps" geral (quantidade de APs e escolas com AP offline)
const apsGeral = waBot.handleWhatsAppMessage({ text: 'aps', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(apsGeral.replyText.includes('420 APs'), 'aps geral exibe total monitorado');
assert(apsGeral.replyText.includes('Padre Arlindo'), 'aps geral lista Padre Arlindo com AP offline');
assert(apsGeral.replyText.includes('/api/monitor/image?source=meraki'), 'Link da foto do Meraki presente');

// 5. Comando "aps silverio" (escola com todos os APs online)
const apsSilverio = waBot.handleWhatsAppMessage({ text: 'aps silverio', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(apsSilverio.replyText.includes('100% ONLINE'), 'aps silverio indica 100% ONLINE');
assert(apsSilverio.replyText.includes('0 APs offline'), 'aps silverio indica 0 APs offline');

// 6. Comando "aps padre" (quantidade de APs e quantos offline)
const apsPadre = waBot.handleWhatsAppMessage({ text: 'aps padre', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(apsPadre.replyText.includes('Total de APs: *9*'), 'aps padre informa total de 9 APs');
assert(apsPadre.replyText.includes('Offline: *1*'), 'aps padre informa 1 AP offline');
assert(apsPadre.replyText.includes('Online: *8*'), 'aps padre informa 8 APs online');

// 7. Comando "rede" geral (diz escolas com Zabbix e Meraki offline)
const redeGeral = waBot.handleWhatsAppMessage({ text: 'rede', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(redeGeral.replyText.includes('Escolas Offline no Zabbix'), 'rede geral lista Zabbix');
assert(redeGeral.replyText.includes('Silverio Monteiro'), 'rede geral lista Silvério no Zabbix');
assert(redeGeral.replyText.includes('Escolas com APs Offline no Meraki'), 'rede geral lista Meraki');
assert(redeGeral.replyText.includes('Padre Arlindo'), 'rede geral lista Padre Arlindo no Meraki');
assert(redeGeral.replyText.includes('Venturelli'), 'rede geral lista Venturelli no Meraki');

// 8. Comando "rede padre" (fala da situação de Zabbix e Meraki da escola específica)
const redePadre = waBot.handleWhatsAppMessage({ text: 'rede padre', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(redePadre.replyText.includes('Padre Arlindo'), 'rede padre identifica escola');
assert(redePadre.replyText.includes('ONLINE'), 'rede padre informa Zabbix online');
assert(redePadre.replyText.includes('1 de 9 AP(s) offline'), 'rede padre informa 1 de 9 APs offline no Meraki');

// 9. Comando "rede silverio" (fala da situação de Zabbix e Meraki da escola específica)
const redeSilverio = waBot.handleWhatsAppMessage({ text: 'rede silverio', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(redeSilverio.replyText.includes('OFFLINE'), 'rede silverio informa Zabbix offline');
assert(redeSilverio.replyText.includes('100% ONLINE'), 'rede silverio informa Meraki online');
// 10. Comando "dvr" geral (status dos 33 DVRs da planilha CONVIVA)
const dvrGeral = waBot.handleWhatsAppMessage({ text: 'dvr', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(dvrGeral.replyText.includes('33 DVRs'), 'dvr geral exibe total de 33 DVRs');
assert(dvrGeral.replyText.includes('28 Online'), 'dvr geral informa 28 online');
assert(dvrGeral.replyText.includes('5 Offline'), 'dvr geral informa 5 offline');
assert(dvrGeral.replyText.includes('Venturelli'), 'dvr geral lista Venturelli offline');
assert(dvrGeral.replyText.includes('Silverio Monteiro'), 'dvr geral lista Silverio offline');
assert(dvrGeral.replyText.includes('1 hora'), 'dvr geral informa ciclo de 1 hora');

// 11. Comando "dvr venturelli" (específica da unidade)
const dvrVenturelli = waBot.handleWhatsAppMessage({ text: 'dvr venturelli', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(dvrVenturelli.replyText.includes('Venturelli'), 'dvr venturelli identifica escola');
assert(dvrVenturelli.replyText.includes('10.109.40.179'), 'dvr venturelli traz IP do DVR 1');
assert(dvrVenturelli.replyText.includes('10.109.40.173'), 'dvr venturelli traz IP do DVR 2');
assert(dvrVenturelli.replyText.includes('Offline'), 'dvr venturelli identifica DVR 2 offline');

// 12. Comando "dvr padre" (específica da unidade)
const dvrPadre = waBot.handleWhatsAppMessage({ text: 'dvr padre', isTech: true, monitorStatus: mockMonitorStatus, appData });
assert(dvrPadre.replyText.includes('Padre Arlindo'), 'dvr padre identifica escola');
assert(dvrPadre.replyText.includes('10.109.40.194'), 'dvr padre traz IP do DVR 1');
assert(dvrPadre.replyText.includes('Online'), 'dvr padre traz status Online');

console.log('\n🎉 TODOS OS TESTES DE MONITORAMENTO ZABBIX / MERAKI / REDE / DVR PASSARAM COM 100% DE SUCESSO!\n');

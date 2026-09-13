# PainelURE Monitor Agent

Agente robo headless leve em Node.js para captura periodica de dashboards do Zabbix ou Meraki a partir de um computador conectado na rede interna da URE.

## Como Usar:
1. Instale o [Node.js](https://nodejs.org) (v18 ou superior) no computador da URE.
2. Abra a pasta `painelure-agent` no computador.
3. Edite o arquivo `config.json`:
   - `dashboardUrl`: O link do dashboard do Zabbix ou Meraki.
   - `auth.username` e `auth.password`: Credenciais de acesso local (se aplicavel).
   - `agentSecretToken`: Chave secreta de autenticacao compartilhada com o PainelURE.
4. De duplo clique em `iniciar-monitor.bat` (ou rode `npm install` e `npm start`).

## Modos de Operacao:
- **Modo Normal:** O robo tira print da tela a cada **1 hora** e envia para o PainelURE, sobrescrevendo a imagem anterior (espaco de armazenamento constante < 150 KB).
- **Modo Tempo Real:** Quando qualquer usuario clica no botao 'Ativar Tempo Real' no PainelURE, o robo automaticamente passa a capturar e transmitir a cada **10 segundos** durante **5 minutos**. Apos os 5 minutos, ele volta sozinho ao modo normal.
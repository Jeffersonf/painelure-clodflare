# Assistente Telegram & Mini App - PainelURE Itapeva

Integração oficial do **Telegram Bot API** e **Telegram Mini Apps (TMA)** ao **PainelURE**.

Permite que técnicos do CTC em campo, supervisores de ensino e diretores consultem dados de escolas, IPs de rede, status de câmeras/DVRs, fila de chamados de T.I. e escala de carros oficiais diretamente pelo Telegram, com **custo R$ 0,00**.

---

## ⚡ Passo 1: Criando seu Bot no Telegram (Leva 30 segundos)

1. No aplicativo do Telegram (no celular ou computador), busque pelo usuário oficial **`@BotFather`** (tem o selo azul de verificado).
2. Envie o comando `/newbot`.
3. Escolha um nome de exibição (ex: `PainelURE Assistente`).
4. Escolha um username único terminando em `bot` (ex: `painelure_itapeva_bot` ou `ure_itapeva_bot`).
5. O `@BotFather` responderá com uma mensagem de sucesso contendo o **Token de Acesso da API** (formato: `123456789:ABCdefGhIJKlmNoPQRstuVWXyz`).

---

## 🖥️ Modo de Teste / Execução Local (Windows)

Você não precisa publicar nada na internet nem usar túnel para testar o bot no seu celular:

1. Dê um duplo clique no arquivo **`iniciar-bot-telegram.bat`** (ou execute no terminal: `node scripts/telegram-bot-runner.js`).
2. Na primeira vez, se você ainda não configurou o `.env`, o terminal solicitará que você cole o token gerado pelo `@BotFather`.
3. O token será salvo automaticamente no seu arquivo `.env`.
4. O bot registrará os comandos no menu do Telegram e ficará escutando via **Long Polling**.
5. Abra o seu bot no Telegram e envie `/start`!

---

## ☁️ Modo Nuvem 24/7 (Cloudflare Workers)

Para manter o bot rodando 24 horas por dia sem precisar de computador ligado:

1. Configure o token nas variáveis de segredo do Cloudflare Worker:
   ```bash
   npx wrangler secret put TELEGRAM_BOT_TOKEN --config=wrangler.worker.toml
   # (Cole o token quando solicitado)
   ```
2. *(Opcional)* Configure um token secreto para validar chamadas:
   ```bash
   npx wrangler secret put TELEGRAM_WEBHOOK_SECRET --config=wrangler.worker.toml
   ```
3. Registre o Webhook no Telegram executando uma chamada autenticada ao endpoint de setup:
   ```bash
   curl -X POST https://seu-worker.workers.dev/api/telegram/setup \
     -H "Authorization: Bearer SEU_ADMIN_KEY"
   ```
   *Ou configure manualmente acessando no navegador:*
   `https://api.telegram.org/bot<SEU_TOKEN>/setWebhook?url=https://seu-worker.workers.dev/api/telegram/webhook`

---

## 📱 Comandos Disponíveis

| Comando | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| **`/start`** | Menu de boas-vindas com teclado interativo fixo | `/start` |
| **`/escola <termo>`** | Consulta de escola: endereço, CIE, supervisor, IPs de rede, câmeras DVR, inventário e chamados | `/escola venturelli` ou `/escola 915075` |
| **`/chamados [filtro]`**| Fila de chamados de suporte de T.I. abertos na URE | `/chamados` ou `/chamados impressora` |
| **`/carros`** | Escala e reservas de veículos oficiais da regional | `/carros` |
| **`/supervisores [nome]`** | Relação de supervisores e escolas vinculadas | `/supervisores` ou `/supervisores adilson` |
| **`/monitor`** | Status da captura Zabbix / Meraki e integridade dos links | `/monitor` |
| **`/painel`** | Abre o PainelURE diretamente dentro do Telegram (Mini App) | `/painel` |
| **`/ajuda`** | Exibe o resumo de comandos e instruções | `/ajuda` |

---

## 🚀 Como Funciona o Mini App (TMA)

Ao digitar `/painel` ou tocar no botão **🚀 Abrir PainelURE** do teclado:
* O Telegram abre uma janela nativa com o **PainelURE** (na URL configurada em `PAINELURE_URL`).
* O usuário navega por escolas, chamados e supervisores diretamente dentro do app do Telegram sem precisar abrir o navegador externo.

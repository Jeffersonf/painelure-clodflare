# 🚀 Bot WhatsApp PainelURE (WAHA + n8n + Cloudflare D1)

Este guia contém o passo a passo completo para subir o robô do WhatsApp no computador usando **Docker**, **WAHA** (gratuito via QR Code) e **n8n**.

---

## 📋 Pré-requisitos no PC

1. **Docker instalado:**
   - **No Windows:** Instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/) (marque a opção WSL2 durante a instalação).
   - **No Linux (Ubuntu/Debian):** `sudo apt update && sudo apt install docker.io docker-compose-v2 -y`

---

## 🛠️ Passo 1: Subir os Containers

1. Abra o terminal (PowerShell no Windows ou Terminal no Linux).
2. Entre na pasta `docker-whatsapp`:
   ```bash
   cd "C:\Users\jeffe\projetos\painelure clodflare\docker-whatsapp"
   ```
3. Suba o WAHA e o n8n com um único comando:
   ```bash
   docker compose up -d
   ```
4. Verifique se os dois containers estão rodando:
   ```bash
   docker compose ps
   ```
   *Você verá `painelure-waha` na porta 3000 e `painelure-n8n` na porta 5678.*

---

## 📱 Passo 2: Conectar o WhatsApp no WAHA

1. No navegador do seu PC, acesse:
   👉 **http://localhost:3000/dashboard**
2. Se pedir login:
   - **Usuário:** `admin`
   - **Senha:** `ureadmin`
3. Na tela inicial do WAHA:
   - Clique em **"Start"** ou **"New Session"** com o nome `default`.
   - Clique em **"Scan QR"** (ou veja o QR Code na tela).
   - Abra o WhatsApp no celular do robô ➔ Vá em **Aparelhos Conectados** ➔ **Conectar um aparelho** ➔ Escaneie o QR Code na tela.
4. Quando o status mudar para **WORKING / CONNECTED (Verde)**, o WhatsApp já está online e integrado!

---

## ⚙️ Passo 3: Importar o Fluxo no n8n

1. No navegador, acesse:
   👉 **http://localhost:5678**
2. Se for o primeiro acesso, faça seu cadastro ou use:
   - **Usuário:** `admin`
   - **Senha:** `ureadmin`
3. No canto superior direito, clique em **Add workflow** (ou menu `...` no canto) ➔ **Import from File**.
4. Selecione o arquivo:
   `docker-whatsapp/n8n-workflow-painelure-whatsapp.json`
5. O fluxo de 4 nós aparecerá na tela:
   - **Webhook WAHA**
   - **Filtrar Mensagem**
   - **Consultar PainelURE API** (já configurado apontando para `https://painelure-cloudflare-pages.pages.dev/api/bot/whatsapp`)
   - **Enviar Resposta no WhatsApp**
6. No canto superior direito do n8n, mude a chavinha de **Inactive** para **Active** (Ativo).

---

## 🎉 Passo 4: Fazer o Primeiro Teste!

Envie uma mensagem do seu celular pessoal para o número do robô:

1. Digite: `oi` ou `menu`
   - O bot responde com o menu de opções 1 a 7 e o link do painel.
2. Digite: `venturelli`
   - O bot responde com os dados da escola, diretor, telefone, e-mail, resumo dos equipamentos e botões de GPS.
3. Digite: `eq venturelli`
   - O bot responde com o inventário detalhado e equipamentos com avarias/baixas.
4. Digite: `chamado venturelli`
   - O bot devolve o texto padrão oficial da SED dentro do bloco para copiar com 1 clique!
5. Digite: `carros`
   - O bot lista os veículos agendados da frota.
6. Digite: `novo chamado Venturelli | Teste de chamado`
   - O bot grava o chamado direto no banco D1 do PainelURE!

---

## 🔒 Vantagens desta Configuração

- **Sem necessidade de IP Público / Sem Túnel ngrok:** O n8n chama a API do PainelURE no Cloudflare por HTTPS de dentro para fora, funcionando em qualquer conexão de internet ou Wi-Fi.
- **Tudo Grátis:** Sem mensalidade de APIs pagas e sem limite de mensagens.
- **Banco Oficial:** Todas as consultas puxam os 5.019 equipamentos e as 22 escolas atualizadas direto da nuvem Cloudflare D1.

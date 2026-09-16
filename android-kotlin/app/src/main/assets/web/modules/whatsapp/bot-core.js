const DVR_STATIC_DATA = {
  "updatedAt": "2026-09-14T22:15:28.995Z",
  "summary": { "total": 33, "online": 28, "offline": 5 },
  "schools": {
    "EE Doutor Antonio Deffune": [{ "name": "DVR 1", "ip": "10.113.9.148", "cameras": 16, "status": "online" }],
    "EE Doutor Raul Venturelli": [
      { "name": "DVR 1", "ip": "10.109.40.179", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.109.40.173", "cameras": null, "status": "offline" },
      { "name": "DVR 3", "ip": "10.109.40.188", "cameras": null, "status": "online" }
    ],
    "EE Bairro Ferreira dos Matos": [
      { "name": "DVR 1", "ip": "10.121.243.147", "cameras": 15, "status": "online" },
      { "name": "DVR 2", "ip": "10.121.243.144", "cameras": 8, "status": "online" }
    ],
    "PEI EE Professora Francelina Franco": [
      { "name": "DVR 2", "ip": "10.119.128.21", "cameras": 14, "status": "offline" },
      { "name": "DVR 3", "ip": "10.119.128.20", "cameras": null, "status": "online" }
    ],
    "EE Professor Gerson de Barros": [
      { "name": "DVR 1", "ip": "10.113.10.20", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.113.10.19", "cameras": 16, "status": "online" }
    ],
    "PEI EE Professor Jose Vasques Ferrari": [
      { "name": "DVR 1", "ip": "10.113.8.148", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.113.8.147", "cameras": 16, "status": "online" }
    ],
    "PEI EE Professora Jupira Coulibaly Borges": [
      { "name": "DVR 1", "ip": "10.109.40.17", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.109.40.18", "cameras": 16, "status": "online" }
    ],
    "PEI EE Professora Maria Brizida Lins Maluf": [
      { "name": "DVR 1", "ip": "10.109.39.21", "cameras": 16, "status": "online" }
    ],
    "PEI EE Professor Nicacio Ramos Alfaro": [
      { "name": "DVR 1", "ip": "10.109.39.148", "cameras": 16, "status": "online" }
    ],
    "PEI EE Padre Arlindo Vieira": [
      { "name": "DVR 1", "ip": "10.109.40.194", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.109.40.195", "cameras": 16, "status": "online" }
    ],
    "EE Professora Silvina Guedes": [
      { "name": "DVR 1", "ip": "10.113.12.148", "cameras": 16, "status": "online" }
    ],
    "PEI EE Professora Zulmira de Oliveira": [
      { "name": "DVR 1", "ip": "10.109.40.210", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.109.40.211", "cameras": 16, "status": "online" }
    ],
    "EE Professor Silverio Monteiro": [
      { "name": "DVR 1", "ip": "10.119.128.84", "cameras": 16, "status": "offline" },
      { "name": "DVR 2", "ip": "10.119.128.85", "cameras": 16, "status": "online" }
    ],
    "PEI EE Simpliciano Campolim de Almeida": [
      { "name": "DVR 1", "ip": "10.113.11.147", "cameras": 16, "status": "online" },
      { "name": "DVR 2", "ip": "10.113.11.148", "cameras": 16, "status": "online" }
    ],
    "EE Bairro Turvo dos Almeidas": [
      { "name": "DVR 1", "ip": "10.121.243.210", "cameras": 16, "status": "offline" },
      { "name": "DVR 2", "ip": "10.121.243.211", "cameras": 16, "status": "online" }
    ],
    "EE Bairro Boa Vista Intervales": [
      { "name": "DVR 1", "ip": "10.121.243.179", "cameras": 16, "status": "offline" }
    ]
  }
};
/**
 * Bot Core para o WhatsApp do PainelURE
 * Compatível tanto com Node.js quanto Cloudflare Workers
 * Formatação nativa de WhatsApp (*negrito*, _itálico_, blocos ``` para cópia)
 */


const POWERAPPS_CHAMADO_SHORT_URL = 'https://tinyurl.com/283y3tn8';
const POWERAPPS_CHAMADO_FULL_URL = 'https://apps.powerapps.com/play/e/default-16b87798-4517-442c-9200-ce1cca93259c/a/9ad5563d-95e4-4fb8-a109-296775e69254?tenantId=16b87798-4517-442c-9200-ce1cca93259c&hint=e2ce7aaf-d0cd-41b0-a80e-206deaa91257&sourcetime=1789432959699';
const PESQUISA_SATISFACAO_URL = 'https://app.powerbi.com/view?r=eyJrIjoiNTI3NWEyZmItMjM4Yi00OWMzLWIwNTgtNzBhNmE5N2Y2MWEyIiwidCI6IjE2Yjg3Nzk4LTQ1MTctNDQyYy05MjAwLWNlMWNjYTkzMjU5YyIsImMiOjR9';
const MATERIAL_APOIO_ITEMS = [
  {
    "id": "cuidados-boas-praticas-equipamentos",
    "category": "tablets",
    "categoryLabel": "Bons Usos & Conservação",
    "icon": "🛡️",
    "title": "Guia de Bons Usos e Conservação de Tablets e Notebooks",
    "description": "Boas práticas para professores, alunos e equipe gestora preservarem a vida útil dos aparelhos.",
    "details": "1) Carga: Nunca deixe a bateria zerar totalmente com frequência; recarregue quando atingir ~20%.\n2) Armazenamento: Mantenha sempre nos carrinhos/armários de recarga travados com ventilação adequada.\n3) Cabos: Ao desconectar o carregador, segure pelo plugue plástico e nunca puxe pelo cabo.\n4) Conectividade: Conecte periodicamente à rede TABLETS-ESCOLAS para receber atualizações do CMSP e do MDM.\n5) Danos físicos: Em caso de tela trincada ou bateria estufada, desligue imediatamente e solicite chamado.",
    "keywords": [
      "cuidados",
      "bons usos",
      "boas praticas",
      "conservacao",
      "bateria",
      "carrinho",
      "carregador",
      "preservacao"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0",
    "restricted": false
  },
  {
    "id": "redes-ips-cameras-impressoras",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "🌐",
    "title": "Listagem de IPs, Câmeras DVR e Impressoras",
    "description": "Tabela oficial de endereçamento IP para DVRs, câmeras de segurança e impressoras de rede da Diretoria de Itapeva.",
    "details": "Mapeamento completo dos IPs fixos e faixas atribuídas para dispositivos de segurança e equipamentos de impressão nas 21 escolas.",
    "keywords": [
      "ip",
      "ips",
      "dvr",
      "camera",
      "cameras",
      "impressora",
      "impressoras",
      "rede"
    ],
    "link": "https://seesp-my.sharepoint.com/:x:/g/personal/itv_seintec_educacao_sp_gov_br/EebSR2G4-1lDrs28WMp3Sr4BgVRGmbri4EitA5bdEG8sBA?e=9MGNb7",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/KxJvag30y187aAg0",
    "restricted": true
  },
  {
    "id": "redes-diagrama-aps",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "📡",
    "title": "Diagrama de Instalação dos APs (Access Points) nas Escolas",
    "description": "Esquema de ligação dos pontos de acesso Wi-Fi Cisco Meraki e cabeamento estruturado.",
    "details": "Instruções de cabeamento PoE, conexão no switch gerenciável e posicionamento correto dos pontos de acesso nas salas de aula e pátios.",
    "keywords": [
      "ap",
      "aps",
      "meraki",
      "access point",
      "wifi",
      "diagrama",
      "instalacao",
      "switches"
    ],
    "link": "https://seesp-my.sharepoint.com/:p:/g/personal/elcio_azevedo_educacao_sp_gov_br/EeVBCzvjY85AkjqiIMJ9pTEBv1DmtppAoq6aLVP_Q9rQbQ?e=q0pGz1",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/02ePW25n01P8Qj6x",
    "restricted": false
  },
  {
    "id": "redes-manual-conectividade-seduc",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "🔗",
    "title": "Manual de Conectividade - Nova Rede SEDUC",
    "description": "Guia oficial das novas diretrizes de conectividade, VLANs e topologia de rede das escolas estaduais.",
    "details": "Procedimentos para validação de link, testes de DNS, gateway padrão e diagnóstico de falha de conexão com a Intranet SEDUC.",
    "keywords": [
      "conectividade",
      "nova rede",
      "seduc",
      "vlan",
      "dns",
      "gateway",
      "internet"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/mDRxWBoEY9XPajb1",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/mDRxWBoEY9XPajb1",
    "restricted": false
  },
  {
    "id": "redes-wifi-tablets-escolas",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "📶",
    "title": "Tutorial Conectar Tablet na Rede TABLETS-ESCOLAS",
    "description": "Passo a passo com certificado e credenciais para autenticar tablets na rede Wi-Fi corporativa.",
    "details": "Configuração do SSID TABLETS-ESCOLAS, autenticação EAP-TLS/PEAP, domínio e certificado institucional para navegação liberada.",
    "keywords": [
      "wifi",
      "tablets-escolas",
      "rede tablets",
      "eap",
      "peap",
      "certificado",
      "ssid"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/9kmlZV9d8e7napgV",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/9kmlZV9d8e7napgV",
    "restricted": false
  },
  {
    "id": "redes-rede-visitante",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "👥",
    "title": "Guia de Acesso à Rede Visitante",
    "description": "Normas e forma de conexão de visitantes, palestrantes e profissionais externos na rede Wi-Fi escolar.",
    "details": "Portal de autenticação e termos de uso temporário para acesso externo controlado nas escolas.",
    "keywords": [
      "visitante",
      "rede visitante",
      "wifi visitante",
      "convidado",
      "portal"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/j40PQDMN66kDZvXB",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/j40PQDMN66kDZvXB",
    "restricted": false
  },
  {
    "id": "redes-medidor-internet-conectada",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "📊",
    "title": "Manual de Instalação - Medidor Internet Conectada",
    "description": "Instruções para instalação e homologação do software medidor de velocidade do MEC/FNDE.",
    "details": "Software que monitora continuamente a banda contratada da escola e envia telemetria ao governo federal.",
    "keywords": [
      "medidor",
      "internet conectada",
      "velocidade",
      "fnde",
      "mec",
      "banda"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/x5A7arvN1361awr6",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/x5A7arvN1361awr6",
    "restricted": false
  },
  {
    "id": "redes-bloqueio-jogos-hosts",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "🚫",
    "title": "Bloqueio de Sites de Jogos e Sites Impróprios (Arquivo Hosts)",
    "description": "Arquivo e procedimento para bloquear jogos (Roblox, FreeFire, etc.) e sites não pedagógicos localmente.",
    "details": "Procedimento de cópia do arquivo hosts customizado para System32/drivers/etc no Windows para bloqueio direto sem depender de proxy.",
    "keywords": [
      "hosts",
      "bloqueio",
      "bloquear jogos",
      "jogos",
      "roblox",
      "sites improprios",
      "seguranca"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/YBl3Z2l03gQxZv16",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/YBl3Z2l03gQxZv16",
    "restricted": true
  },
  {
    "id": "redes-chamado-fde-internet",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "⚡",
    "title": "Abertura de Chamado FDE - Falta de Internet na Escola",
    "description": "Formulário oficial para registro de queda de link, falha em roteador ou rompimento de fibra óptica junto à FDE.",
    "details": "Abertura prioritária direta para encaminhamento às operadoras de telecomunicação homologadas.",
    "keywords": [
      "fde",
      "falta de internet",
      "sem internet",
      "chamado internet",
      "queda",
      "fibra",
      "roteador"
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLSeCKtCHqBy8dEXfgMgBjuk0BJ1cSZLKe54Zgb1Ap68iVnkZ5g/viewform",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/kxodWGyLL84JQgP7",
    "restricted": false
  },
  {
    "id": "redes-escolas-pble",
    "category": "redes",
    "categoryLabel": "Redes, Wi-Fi & Infra",
    "icon": "🏫",
    "title": "Relação de Escolas Atendidas pelo PBLE",
    "description": "Planilha de escolas com Programa Banda Larga nas Escolas e operadoras responsáveis.",
    "details": "Contatos das concessionárias e identificação de circuitos do PBLE na Diretoria de Itapeva.",
    "keywords": [
      "pble",
      "banda larga",
      "operadoras",
      "circuitos"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/1xkVaqyYdR59al0e",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/1xkVaqyYdR59al0e",
    "restricted": false
  },
  {
    "id": "tablets-sair-modo-quiosque",
    "category": "tablets",
    "categoryLabel": "Tablets & MDM",
    "icon": "📱",
    "title": "Como Sair do Modo Quiosque no Tablet (Leia SP / Matific)",
    "description": "Procedimento passo a passo para desbloquear o tablet travado na tela de avaliação ou app exclusivo.",
    "details": "Passo a passo oficial de reinicialização, toques de emergência e PIN de desbloqueio para retornar o tablet para a interface padrão do Android.",
    "keywords": [
      "quiosque",
      "modo quiosque",
      "sair do quiosque",
      "leia sp",
      "matific",
      "desbloquear tablet",
      "travado"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/YBl3Z2ldM8G3Zv16",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/YBl3Z2ldM8G3Zv16",
    "restricted": false
  },
  {
    "id": "tablets-hard-reset",
    "category": "tablets",
    "categoryLabel": "Tablets & MDM",
    "icon": "🔄",
    "title": "Hard Reset e Restauração de Fábrica nos Tablets",
    "description": "Combinação de botões (Power + Volume) e processo de wipe data / factory reset para tablets SEDUC.",
    "details": "Procedimento para restaurar o tablet aos padrões de fábrica quando o sistema não inicializa ou apresenta loop infinito.",
    "keywords": [
      "hard reset",
      "reset",
      "restaurar tablet",
      "factory reset",
      "wipe",
      "formatar tablet",
      "loop"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/E851Q0llX078QVAb",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/E851Q0llX078QVAb",
    "restricted": false
  },
  {
    "id": "tablets-provisionamento-datamob-navita",
    "category": "tablets",
    "categoryLabel": "Tablets & MDM",
    "icon": "📲",
    "title": "Provisionamento de Tablets (Datamob / Navita EMM v3 Zero-Touch)",
    "description": "Manual e vídeo com QR Code para cadastro e inscrição do dispositivo no gerenciamento central SEDUC.",
    "details": "Leitura do QR Code de provisionamento na primeira inicialização (Zero-Touch), autenticação no servidor Navita e instalação dos apps educacionais.",
    "keywords": [
      "provisionamento",
      "datamob",
      "navita",
      "emm",
      "zero touch",
      "qr code",
      "ativar tablet",
      "cadastrar tablet"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/9kmlZV9d0W2dapgV",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/9kmlZV9d0W2dapgV",
    "restricted": false
  },
  {
    "id": "tablets-atualizacao-cmsp",
    "category": "tablets",
    "categoryLabel": "Tablets & MDM",
    "icon": "🚀",
    "title": "Guia Rápido de Atualização do CMSP no Tablet",
    "description": "Instruções para atualizar a versão do aplicativo Centro de Mídias SP e resolver problemas de login.",
    "details": "Limpeza de cache, sincronização com a Play Store gerenciada e força de atualização do pacote do CMSP.",
    "keywords": [
      "cmsp",
      "atualizar cmsp",
      "centro de midias",
      "tablet cmsp",
      "play store"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/94PGWno3d833aLRV",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/94PGWno3d833aLRV",
    "restricted": false
  },
  {
    "id": "tablets-planilha-controle",
    "category": "tablets",
    "categoryLabel": "Tablets & MDM",
    "icon": "📋",
    "title": "Planilha de Controle de Tablets e Pendências de Provisionamento",
    "description": "Planilha em tempo real com o inventário de tablets ativos, pendentes de ativação e bloqueados na D.E.",
    "details": "Listagem com números de série, IMEIs, escolas alocadas e status no console Navita/Datamob.",
    "keywords": [
      "planilha tablets",
      "imei",
      "numero de serie",
      "pendente",
      "tablets sem provisionamento"
    ],
    "link": "https://seesp-my.sharepoint.com/:x:/g/personal/deitvnit_educacao_sp_gov_br/EXWR0vLx9Z1HqUFj1hTHUkUBsmqVZGOkRZpw-HtkDMdO_w?e=on7PRP",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/J24jal22DOPda0A1",
    "restricted": false
  },
  {
    "id": "tablets-suporte-navita",
    "category": "tablets",
    "categoryLabel": "Tablets & MDM",
    "icon": "🛠️",
    "title": "Portal de Suporte Navita EMM",
    "description": "Canal de atendimento direto para resolução de bloqueios e inconsistências de licença MDM.",
    "details": "Abertura de tickets para problemas avançados de controle de dispositivos móveis da SEDUC.",
    "keywords": [
      "navita suporte",
      "chamado navita",
      "licenca mdm"
    ],
    "link": "https://conteudo.navita.com.br/suporte-navita",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/PR3NWxEn18E0ab0O",
    "restricted": false
  },
  {
    "id": "equip-upgrade-ssd-positivo",
    "category": "equipamentos",
    "categoryLabel": "Notebooks & Desktops",
    "icon": "💾",
    "title": "Upgrade de SSD 128GB - Netbook Positivo Sala de Aula",
    "description": "Manual de substituição física do disco e instalação do SSD nos netbooks da Sala de Aula.",
    "details": "Instruções de abertura da carcaça plástica, fixação do SSD M.2 SATA/NVMe e testes de detecção pela placa-mãe.",
    "keywords": [
      "ssd",
      "troca de ssd",
      "positivo",
      "netbook",
      "upgrade ssd",
      "128gb",
      "sala de aula"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMPmK75qW2j7",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMPmK75qW2j7",
    "restricted": true
  },
  {
    "id": "equip-desabilitar-emmc-bios",
    "category": "equipamentos",
    "categoryLabel": "Notebooks & Desktops",
    "icon": "⚙️",
    "title": "Como Desabilitar o eMMC na BIOS do Netbook Positivo",
    "description": "Passo a passo no Setup da BIOS para desativar a memória interna lenta e priorizar o novo SSD.",
    "details": "Entrar no Setup da BIOS (tecla F2 ou Del ao ligar), navegar até Advanced / Chipset Configuration, localizar a opção SCC eMMC Support e alterar para Disabled. Salvar com F4.",
    "keywords": [
      "emmc",
      "bios",
      "desabilitar emmc",
      "netbook positivo",
      "bios positivo",
      "setup"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/mDRxWB7k6qKwajb1",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/mDRxWB7k6qKwajb1",
    "restricted": true
  },
  {
    "id": "equip-instalacao-windows-11",
    "category": "equipamentos",
    "categoryLabel": "Notebooks & Desktops",
    "icon": "🪟",
    "title": "Instalação e Configurações Iniciais Windows 11 Positivo Sala de Aula",
    "description": "Guia oficial com a imagem customizada da Prodesp/SEDUC para instalação limpa do Windows 11.",
    "details": "Criação de pendrive bootável, particionamento do SSD, drivers homologados e configurações pós-instalação para otimização da máquina.",
    "keywords": [
      "windows 11",
      "win 11",
      "instalacao windows",
      "imagem prodesp",
      "sala de aula",
      "positivo"
    ],
    "link": "https://drive.google.com/file/d/1G37tFg_MWBtzOPeNq0TmvXt1MlRIW8fo/view",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/goElQyGPAjdGW3yY",
    "restricted": false
  },
  {
    "id": "equip-formatacao-restauracao-positivo",
    "category": "equipamentos",
    "categoryLabel": "Notebooks & Desktops",
    "icon": "💿",
    "title": "Manuais de Formatação e Restauração Netbook Positivo",
    "description": "Procedimento completo para formatação, recuperação de partição oculta e restauração de fábrica.",
    "details": "Download do manual oficial de suporte técnico para recuperação de notebooks de alunos e professores.",
    "keywords": [
      "formatacao",
      "restauracao",
      "recuperacao",
      "netbook",
      "positivo formatação"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/lDK1ZRq22ykXQJ9z",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/lDK1ZRq22ykXQJ9z",
    "restricted": false
  },
  {
    "id": "equip-reset-chromebook-samsung",
    "category": "equipamentos",
    "categoryLabel": "Notebooks & Desktops",
    "icon": "💻",
    "title": "Reset do Sistema do Chromebook Samsung (Powerwash / Recovery)",
    "description": "Como realizar o Powerwash e restaurar o ChromeOS pelo modo de recuperação com pendrive.",
    "details": "Combinação ESC + Refresh + Power, criação da mídia de recuperação no app Utilitário de Recuperação do Chromebook e reinstalação do ChromeOS.",
    "keywords": [
      "chromebook",
      "samsung",
      "powerwash",
      "recovery",
      "reset chromebook",
      "chromeos"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMP4ZkGOW2j7",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMP4ZkGOW2j7",
    "restricted": false
  },
  {
    "id": "equip-biblioteca-prodesp-positivo",
    "category": "equipamentos",
    "categoryLabel": "Notebooks & Desktops",
    "icon": "📚",
    "title": "Biblioteca Oficial Positivo Prodesp (Drivers e Manuais)",
    "description": "Repositório online da Positivo com todas as imagens, BIOS e pacotes de drivers dos equipamentos SEDUC.",
    "details": "Pesquisa por número de série ou modelo para baixar drivers homologados de áudio, Wi-Fi, vídeo e BIOS atualizada.",
    "keywords": [
      "positivo prodesp",
      "drivers",
      "bios download",
      "biblioteca positivo"
    ],
    "link": "https://prodesp.positivoempresas.com.br/#biblioteca",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/J24jal2GAEjmZ0A1",
    "restricted": false
  },
  {
    "id": "garantia-lenovo",
    "category": "garantia",
    "categoryLabel": "Garantia & Chamados",
    "icon": "🛡️",
    "title": "Abertura de Chamado Técnico - Lenovo Suporte Brasil",
    "description": "Portal oficial para solicitação de reparo em garantia dos desktops e notebooks Lenovo.",
    "details": "Basta inserir o Serial Number (S/N) do equipamento, descrever a peça danificada (fonte, placa, tela) e solicitar atendimento em garantia.",
    "keywords": [
      "lenovo",
      "garantia lenovo",
      "chamado lenovo",
      "suporte lenovo",
      "reparo lenovo"
    ],
    "link": "https://pcsupport.lenovo.com/br/pt/servicerequest",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/O4x6am1n4Lg4W20v",
    "restricted": false
  },
  {
    "id": "garantia-multilaser",
    "category": "garantia",
    "categoryLabel": "Garantia & Chamados",
    "icon": "📦",
    "title": "Portal de Atendimento e Abertura de Chamados - Multilaser",
    "description": "Jira Service Management da Multilaser para abertura de chamado em garantia dos tablets e notebooks.",
    "details": "Acesso pelo portal com o CIE da unidade escolar para solicitação de código de postagem ou visita técnica.",
    "keywords": [
      "multilaser",
      "garantia multilaser",
      "chamado multilaser",
      "jira multilaser",
      "suporte multilaser"
    ],
    "link": "https://multilaserbrasil.atlassian.net/servicedesk/customer/portal/46/user/login?destination=portal%2F46",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/mlNDZ3n9N80oQznG",
    "restricted": false
  },
  {
    "id": "garantia-recebimento-equipamentos-cieq",
    "category": "garantia",
    "categoryLabel": "Garantia & Chamados",
    "icon": "📝",
    "title": "Manual de Recebimento de Equipamentos - CIEQ SEDUC",
    "description": "Guia de conferência de notas fiscais, termos de entrega e verificação física de lotes recebidos.",
    "details": "Procedimentos obrigatórios para o recebimento de notebooks, tablets, nobreaks e switches na escola.",
    "keywords": [
      "cieq",
      "recebimento",
      "nota fiscal",
      "conferencia",
      "lotes"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/MbejW1BKgj2AaNkG",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/MbejW1BKgj2AaNkG",
    "restricted": false
  },
  {
    "id": "sed-portal-atendimento",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "🎫",
    "title": "Portal de Atendimento da SED (Abertura de Ocorrências)",
    "description": "Tutorial completo para abertura de chamados técnicos e suporte a sistemas na SEDUC-SP.",
    "details": "Como categorizar chamados de infraestrutura, sistemas pedagógicos, problemas com e-mail institucional e equipamentos.",
    "keywords": [
      "portal de atendimento",
      "chamado sed",
      "ocorrencia sed",
      "abrir chamado",
      "suporte sed"
    ],
    "link": "https://atendimento.educacao.sp.gov.br/",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/wKmOZ5dyB3nPQzMA",
    "restricted": false
  },
  {
    "id": "sed-reset-senha-emails",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "🔑",
    "title": "Alteração e Reset de Senha / E-mails Institucionais SED",
    "description": "Procedimento para recuperação de acesso à SED, Google Workspace (@prof / @aluno) e Microsoft (@servidor).",
    "details": "Passo a passo para redefinir senhas esquecidas, sincronizar contas institucionais e desbloquear usuários.",
    "keywords": [
      "reset de senha",
      "alterar senha",
      "email institucional",
      "google sala de aula",
      "prof",
      "aluno",
      "microsoft"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/E851Q0lxxy6OQVAb",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/E851Q0lxxy6OQVAb",
    "restricted": false
  },
  {
    "id": "sed-tv-lg-airplay",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "📺",
    "title": "Manual TV LG - Configuração de Rede SEDUC TV e AirPlay",
    "description": "Como configurar as TVs LG nas salas de aula para conexão Wi-Fi e espelhamento via AirPlay / Miracast.",
    "details": "Ajuste de rede SEDUC TV, emparelhamento com notebooks dos professores e transmissão de tela sem cabos.",
    "keywords": [
      "tv lg",
      "airplay",
      "miracast",
      "espelhamento",
      "seduc tv",
      "televisao"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/KxJvagkPP2z5aAg0",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/KxJvagkPP2z5aAg0",
    "restricted": false
  },
  {
    "id": "sed-bluemonitor",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "🖥️",
    "title": "Manual de Vinculação e Instalação do BlueMonitor",
    "description": "Instruções para pareamento e gerenciamento do sistema de monitoramento BlueMonitor nas escolas.",
    "details": "Instalação do agente BlueMonitor nos laboratórios e verificação do status no painel da Prodesp.",
    "keywords": [
      "bluemonitor",
      "blue monitor",
      "vinculacao",
      "prodesp monitor"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/94PGWnornPmbaLRV",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/94PGWnornPmbaLRV",
    "restricted": false
  },
  {
    "id": "sed-softwares-permitidos",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "💾",
    "title": "Lista de Softwares Permitidos e Profissionalizantes",
    "description": "Catálogo oficial de programas homologados para instalação nos computadores da rede escolar.",
    "details": "Softwares pedagógicos autorizados, cursos profissionalizantes e orientações para requisição de novos softwares à DETEC.",
    "keywords": [
      "softwares permitidos",
      "programas",
      "homologados",
      "profissionalizantes",
      "lista softwares"
    ],
    "link": "https://seesp-my.sharepoint.com/:f:/g/personal/itv_seintec_educacao_sp_gov_br/IgBH0pYJbwj8TauyzzEel66nAYNW5pPw8KqqD2RlAej-9M8?e=hzVKAp",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/mlNDZ3nB2W52QznG",
    "restricted": false
  },
  {
    "id": "sed-manual-assinatura-sed",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "✍️",
    "title": "Manual para Gerar Assinatura Digital na SED",
    "description": "Como configurar e validar a assinatura eletrônica nos documentos e históricos oficiais dentro da SED.",
    "details": "Passo a passo para secretários de escola, diretores e GOEs criarem e utilizarem a assinatura eletrônica.",
    "keywords": [
      "assinatura sed",
      "assinatura digital",
      "eletronica",
      "secretaria escolar"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/E851Q0lxxy6OQVAb",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/E851Q0lxxy6OQVAb",
    "restricted": false
  },
  {
    "id": "sed-carteirinha-aluno",
    "category": "sed",
    "categoryLabel": "Sistemas SED & Tutoriais",
    "icon": "🪪",
    "title": "Tutorial Carteirinha do Aluno (Física e Digital)",
    "description": "Instruções para geração, emissão e consulta da carteirinha estudantil no portal SED e app SouSP.",
    "details": "Geração de lote de fotos, conferência do RA e impressão das carteirinhas.",
    "keywords": [
      "carteirinha",
      "carteirinha do aluno",
      "estudantil",
      "ra"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/9kmlZVLgNedVapgV",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/9kmlZVLgNedVapgV",
    "restricted": false
  },
  {
    "id": "comunicados-formulario-visita-nit",
    "category": "comunicados",
    "categoryLabel": "Comunicados, Visitas & PROATI",
    "icon": "🚐",
    "title": "Solicitação de Visita Técnica do NIT às Escolas (Formulário)",
    "description": "Formulário Google para a equipe gestora solicitar visita presencial dos técnicos do NIT / SEINTEC.",
    "details": "Preenchimento com nome da escola, motivo da visita (rede, câmeras, laboratório), equipamentos com defeito e urgência.",
    "keywords": [
      "visita tecnica",
      "chamado nit",
      "solicitar visita",
      "formulario nit",
      "visita presencial"
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScs57T9RlVT--H8cfnu9qxJ8i6pdTxkw95g7bnmkpuviPMoDA/viewform",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMBAoVggQ2j7",
    "restricted": false
  },
  {
    "id": "comunicados-cronograma-visitas",
    "category": "comunicados",
    "categoryLabel": "Comunicados, Visitas & PROATI",
    "icon": "📅",
    "title": "Cronograma Oficial de Visitas SEINTEC / SETEC",
    "description": "Calendário mensal com as datas de visitas preventivas e manutenções nas 21 escolas da Diretoria.",
    "details": "Relação de escolas atendidas por semana e rotas de deslocamento dos veículos oficiais.",
    "keywords": [
      "cronograma",
      "calendario visitas",
      "visitas seintec",
      "rotas"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMPxN7YMW2j7",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/4b3zaMPxN7YMW2j7",
    "restricted": false
  },
  {
    "id": "comunicados-proati-materiais",
    "category": "comunicados",
    "categoryLabel": "Comunicados, Visitas & PROATI",
    "icon": "🎓",
    "title": "Materiais e Orientações Técnicas PROATI (Professores de Tecnologia)",
    "description": "Apresentações, slides e gravações das formações dos PROATIs da Diretoria de Itapeva.",
    "details": "Documentação de apoio para os professores que atuam nos laboratórios de informática e apoio tecnológico.",
    "keywords": [
      "proati",
      "proatec",
      "orientacao tecnica",
      "formacao",
      "professores de tecnologia"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/Z16lZW775O3gZ740",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/Z16lZW775O3gZ740",
    "restricted": false
  },
  {
    "id": "comunicados-codigo-cie-escolas",
    "category": "comunicados",
    "categoryLabel": "Comunicados, Visitas & PROATI",
    "icon": "🏛️",
    "title": "Tabela de Códigos CIE de Todas as Unidades Escolares",
    "description": "Planilha com códigos CIE, nomes oficiais, endereços e municípios das escolas da Diretoria de Itapeva.",
    "details": "Consulta rápida do código CIE indispensável para abertura de chamados técnicos e envio de solicitações à Prodesp/SEDUC.",
    "keywords": [
      "codigo cie",
      "cie",
      "cie escolas",
      "tabela cie",
      "unidades"
    ],
    "link": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/do3MQJMoL5oka15w",
    "padletWish": "https://padlet.com/SEINTEC/material-de-apoio-2026-ure-itv-seintec-setec-prodesp-qsr8tzcte78lau0/wish/do3MQJMoL5oka15w",
    "restricted": false
  }
];

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

function getWhatsAppMenu(painelUrl = 'https://painelure.pages.dev', isTech = false) {
  if (isTech) {
    return `🔓 *Modo Técnico URE Ativo*\n\n` +
      `Olá! Sessão técnica autenticada. Tenho informações completas do *Padlet URE 2026* para ajudar a responder procedimentos e orientações técnicas.\n\n` +
      `🛠️ *Comandos Rápidos:*\n` +
      `• *rede* - Resumo de Zabbix e Meraki offline (+ links das fotos)\n` +
      `• *zab* ou *zab <escola>* - Status de link no Zabbix\n` +
      `• *aps* ou *aps <escola>* - Quantidade e status de APs Meraki\n` +
      `• *dvr* ou *dvr <escola>* - Status dos 33 DVRs e senhas de acesso\n` +
      `• *escola <nome>* - Dados cadastrais, CIE, IPs e contatos\n` +
      `• *apoio <termo>* - Consultar procedimentos e manuais do Padlet (ex: *apoio bios*, *apoio ssd*)\n` +
      `• *painel* - Link do Painel Geral Web (${painelUrl})\n` +
      `• *#sair* - Encerrar sessão técnica\n\n` +
      `💡 _Digite diretamente o que precisa (ex: *rede*, *dvr venturelli*, *zab silverio*, *apoio ssd*)._`;
  }

  return `👋 *Olá! Sou o assistente virtual da Diretoria de Ensino de Itapeva (URE).*\n\n` +
    `Estou aqui para orientar sobre os sistemas e suporte tecnológico das escolas da nossa região.\n\n` +
    `📌 *Abertura de Chamados T.I.:*\n` +
    `Para registrar chamados técnicos ou relatar problemas com equipamentos:\n` +
    `🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n` +
    `💬 *Como posso ajudar?*\n` +
    `Você pode digitar o nome de uma escola (ex: _escola venturelli_) ou enviar sua dúvida diretamente.`;
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

function formatMaterialApoioWhatsApp(query = '', painelUrl = 'https://painelure.pages.dev', isTech = false) {
  const q = normalize(query);
  const items = (typeof MATERIAL_APOIO_ITEMS !== 'undefined' ? MATERIAL_APOIO_ITEMS : []);

  if (!q || q === 'menu' || q === 'geral' || q === 'ajuda' || q === 'todos') {
    if (isTech) {
      return `📚 *Material de Apoio Técnico 2026 - URE ITV / SEINTEC / SETEC*\n\n` +
        `Base completa de fichas técnicas, procedimentos de BIOS/SSD, diagramas e garantias.\n\n` +
        `🔍 *Para consultar um manual técnico, digite: apoio <termo>*\n\n` +
        `🌐 *1. Redes & Conectividade:*\n` +
        `• *apoio wifi* - Autenticação corporativa TABLETS-ESCOLAS\n` +
        `• *apoio aps* - Diagrama de instalação dos pontos Meraki\n` +
        `• *apoio hosts* - Arquivo hosts para bloqueio local de jogos\n` +
        `• *apoio fde* - Formulário de falta de link na escola\n\n` +
        `📱 *2. Tablets & MDM:*\n` +
        `• *apoio quiosque* - Procedimento para destravar modo quiosque\n` +
        `• *apoio reset tablet* - Hard reset e restauração aos padrões de fábrica\n` +
        `• *apoio provisionamento* - Inscrição no console Navita/Datamob\n` +
        `• *apoio cmsp* - Atualização do app Centro de Mídias\n\n` +
        `💻 *3. Notebooks & Hardware:*\n` +
        `• *apoio ssd* - Upgrade para SSD 128GB no netbook Positivo\n` +
        `• *apoio bios* - Desabilitar eMMC no Setup da BIOS\n` +
        `• *apoio windows 11* - Instalação da imagem W11 Sala de Aula\n` +
        `• *apoio chromebook* - Recuperação e Powerwash Samsung\n\n` +
        `🛡️ *4. Garantia & Fabricantes:*\n` +
        `• *apoio lenovo* - Abertura de chamado técnico Lenovo\n` +
        `• *apoio multilaser* - Abertura de chamado Multilaser (Jira)\n\n` +
        `⚙️ *5. Sistemas SED & TV:*\n` +
        `• *apoio tv lg* - Conexão na rede SEDUC TV e AirPlay\n` +
        `• *apoio bluemonitor* - Instalação e vinculação Prodesp\n` +
        `• *apoio senha sed* - Recuperação de senhas e e-mails institucionais\n\n` +
        `🚐 *6. Visitas & NIT:*\n` +
        `• *apoio visita nit* - Formulário de visita técnica presencial\n` +
        `• *apoio cie* - Tabela de códigos CIE das escolas\n\n` +
        `🌐 *Biblioteca Técnica Completa:*\n` +
        `${painelUrl}/#support`;
    } else {
      return `📚 *Material de Apoio & Bons Usos - URE Itapeva (2026)*\n\n` +
        `Guias práticos, tutoriais de uso e orientações para professores e gestores.\n\n` +
        `🔍 *Para consultar um tema, digite: apoio <termo>*\n\n` +
        `📱 *Tablets & Aplicativos:*\n` +
        `• *apoio quiosque* - Como sair da tela travada do Leia SP / Matific\n` +
        `• *apoio wifi* - Passo a passo para conectar o tablet na rede escolar\n` +
        `• *apoio cmsp* - Atualização do aplicativo Centro de Mídias\n` +
        `• *apoio cuidados* - Boas práticas para aumentar a vida útil da bateria\n\n` +
        `📺 *Salas de Aula & Multimídia:*\n` +
        `• *apoio tv lg* - Espelhamento de tela e conexão na TV da sala\n` +
        `• *apoio softwares* - Relação de programas homologados pela SEDUC\n\n` +
        `🔑 *Acessos & Sistemas SED:*\n` +
        `• *apoio senha sed* - Como recuperar senhas e contas de e-mail\n` +
        `• *apoio assinatura* - Assinatura digital na Secretaria Escolar Digital\n` +
        `• *apoio carteirinha* - Emissão da carteirinha do aluno\n\n` +
        `🛠️ *Garantia & Suporte:*\n` +
        `• *apoio garantia* - Como solicitar reparo de notebooks/tablets na garantia\n` +
        `• *apoio visita* - Formulário para solicitar visita presencial do NIT\n\n` +
        `🌐 *Consulte a biblioteca online:* ${painelUrl}/#support`;
    }
  }

  // Busca inteligente por termos
  const cleanQ = q.replace(/^(apoio|material|padlet|manual|procedimento|tutorial)\s*/i, '').trim();
  const searchTarget = cleanQ || q;

  let matches = items.filter(item => {
    const fullStr = [
      item.title,
      item.description,
      item.details,
      item.categoryLabel,
      ...(item.keywords || [])
    ].join(' ');
    const norm = normalize(fullStr);
    return norm.includes(searchTarget) || searchTarget.split(/\s+/).every(w => norm.includes(w));
  });

  if (matches.length === 0) {
    return `🔍 Não encontrei materiais específicos para "${query}".\n\n` +
      `💡 *Dica:* Digite *apoio* para ver os temas disponíveis ou tente palavras-chave como: *quiosque*, *wifi*, *tv lg*, *cuidados*, *cmsp* ou *garantia*.\n\n` +
      `🌐 *Acesse a biblioteca completa:* ${painelUrl}/#support`;
  }

  // Se o usuário NÃO for técnico e o item for restrito/sigiloso (ex: BIOS, troca física de SSD, IPs de câmeras)
  const isRestrictedTarget = matches.some(m => m.restricted);
  if (!isTech && isRestrictedTarget) {
    return `🔒 *Procedimento de Manutenção Técnica Restrita*\n\n` +
      `Alterações na BIOS, substituição física de peças (como SSD) e configurações avançadas de infraestrutura são procedimentos executados exclusivamente pela equipe técnica autorizada do NIT / SEINTEC.\n\n` +
      `🛠️ *Como solicitar para sua escola:*\n` +
      `Se algum netbook ou equipamento apresentar lentidão ou falha de hardware, registre uma solicitação pelo nosso formulário oficial de chamados:\n` +
      `🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n` +
      `🚐 *Visita presencial do NIT:* Digite *apoio visita* para agendar uma ida dos técnicos à sua unidade escolar.`;
  }

  // Formata os melhores resultados
  const top = matches.slice(0, 2);
  let res = `📚 *Material de Apoio URE Itapeva 2026*\n\n`;

  top.forEach((item, idx) => {
    res += `${item.icon || '📄'} *${item.title}*\n` +
      `📁 *Categoria:* ${item.categoryLabel}\n` +
      `📝 *Resumo:* ${item.description}\n\n` +
      `⚙️ *Orientações / Passo a Passo:*\n${item.details}\n\n`;
    if (item.link && !item.link.includes('padlet.com')) {
      res += `🔗 *Link Oficial:* ${item.link}\n`;
    }
    if (item.padletWish && isTech) {
      res += `🖼️ *No Padlet:* ${item.padletWish}\n`;
    }
    if (idx < top.length - 1) res += `\n────────────────────\n\n`;
  });

  if (matches.length > 2) {
    res += `\n💡 *Mais informações disponíveis:* Digite *apoio* para ver outros temas ou consulte o painel em: ${painelUrl}/#support`;
  }

  return res;
}

function formatZabbixWhatsApp(query = '', monitorStatus = {}, appData = {}, painelUrl = 'https://painelure.pages.dev') {
  const q = normalize(query);
  const alerts = monitorStatus.alerts?.zabbix || [];
  if (!q) {
    let text = `🚨 *Zabbix — Monitor de Links (Desastre)*\n\n`;
    if (alerts.length > 0) {
      text += `Identificamos *${alerts.length} escola(s) com queda de link:*\n\n`;
      alerts.forEach(a => {
        text += `• 🔴 *${a.name}*\n  ⏱️ Queda: ${a.time || 'Recente'} | Status: *${a.status || 'Desastre'}*\n`;
      });
    } else {
      text += `✅ *Todas as escolas estão com link respondendo normalmente!*\n`;
    }
    text += `\n📷 *Foto do Monitor Zabbix:* ${painelUrl}/api/monitor/image?source=zabbix\n`;
    text += `💡 _Digite *zab <nome da escola>* para consultar uma unidade específica._`;
    return text;
  }
  const found = alerts.find(a => normalize(a.name).includes(q) || (a.cie && a.cie === q));
  const matches = findSchools(query, appData);
  const schoolName = matches.length > 0 ? matches[0] : query;
  if (found) {
    return `🔴 *${schoolName}* — Link *OFFLINE* no Zabbix!\n\n` +
      `⚠️ *Status:* Desastre (Sem resposta ICMP Ping)\n` +
      `⏱️ *Desde:* ${found.time || 'Recentemente'}\n\n` +
      `📷 Foto do Monitor: ${painelUrl}/api/monitor/image?source=zabbix`;
  }
  return `🟢 *${schoolName}* — Link *100% ONLINE* no Zabbix!\n\n` +
    `A unidade está respondendo normalmente sem incidentes de queda ativos.`;
}

function formatMerakiWhatsApp(query = '', monitorStatus = {}, appData = {}, painelUrl = 'https://painelure.pages.dev') {
  const q = normalize(query);
  const alerts = monitorStatus.alerts?.meraki || [];
  const totalAps = 420;
  if (!q) {
    let text = `📶 *Meraki Wi-Fi — Monitor de APs*\n\n`;
    text += `📊 Total de Pontos de Acesso: *${totalAps} APs* monitorados.\n`;
    if (alerts.length > 0) {
      text += `⚠️ *${alerts.length} escola(s) com AP(s) desconectado(s):*\n\n`;
      alerts.forEach(a => {
        text += `• 📶 *${a.name}*: *${a.offline}* de ${a.total} APs offline\n`;
      });
    } else {
      text += `✅ *Todos os ${totalAps} APs estão 100% online nas escolas!*\n`;
    }
    text += `\n📷 *Foto do Monitor Meraki:* ${painelUrl}/api/monitor/image?source=meraki\n`;
    text += `💡 _Digite *aps <nome da escola>* para ver os pontos da unidade._`;
    return text;
  }
  const found = alerts.find(a => normalize(a.name).includes(q) || (a.cie && a.cie === q));
  const matches = findSchools(query, appData);
  const schoolName = matches.length > 0 ? matches[0] : query;
  if (found && found.offline > 0) {
    const online = (found.total || 0) - (found.offline || 0);
    return `📶 *${schoolName}* — Status dos APs Meraki\n\n` +
      `• Total de APs: *${found.total}*\n` +
      `• Offline: *${found.offline}*\n` +
      `• Online: *${online}*\n\n` +
      `⚠️ Há ponto de acesso sem comunicação na escola.`;
  }
  return `📶 *${schoolName}* — Status dos APs Meraki\n\n` +
    `✅ *100% ONLINE* (0 APs offline)\n` +
    `Todos os pontos de acesso da escola estão comunicando normalmente.`;
}

function formatRedeWhatsApp(query = '', monitorStatus = {}, appData = {}, painelUrl = 'https://painelure.pages.dev') {
  const q = normalize(query);
  const zAlerts = monitorStatus.alerts?.zabbix || [];
  const mAlerts = monitorStatus.alerts?.meraki || [];
  if (!q) {
    let text = `🌐 *Monitor Integrado de Redes (Zabbix & Meraki)*\n\n`;
    text += `🚨 *Escolas Offline no Zabbix (${zAlerts.length}):*\n`;
    if (zAlerts.length > 0) {
      zAlerts.forEach(a => { text += `• 🔴 *${a.name}* (Queda: ${a.time || 'Hoje'})\n`; });
    } else {
      text += `• Nenhum desastre de link ativo.\n`;
    }
    text += `\n📶 *Escolas com APs Offline no Meraki (${mAlerts.length}):*\n`;
    if (mAlerts.length > 0) {
      mAlerts.forEach(a => { text += `• 📶 *${a.name}*: ${a.offline}/${a.total} APs off\n`; });
    } else {
      text += `• Todos os APs online.\n`;
    }
    text += `\n📷 *Fotos dos Monitores:*\n` +
      `• Zabbix: ${painelUrl}/api/monitor/image?source=zabbix\n` +
      `• Meraki: ${painelUrl}/api/monitor/image?source=meraki`;
    return text;
  }
  const matches = findSchools(query, appData);
  const schoolName = matches.length > 0 ? matches[0] : query;
  const zFound = zAlerts.find(a => normalize(a.name).includes(q) || (a.cie && a.cie === q));
  const mFound = mAlerts.find(a => normalize(a.name).includes(q) || (a.cie && a.cie === q));
  
  let text = `🌐 *Situação de Rede — ${schoolName}*\n\n`;
  if (zFound) {
    text += `• *Link Intragov (Zabbix):* 🔴 *OFFLINE* (Desastre - ${zFound.time})\n`;
  } else {
    text += `• *Link Intragov (Zabbix):* 🟢 *ONLINE* (Ping 100% OK)\n`;
  }
  if (mFound && mFound.offline > 0) {
    text += `• *Wi-Fi Meraki:* 🟡 *${mFound.offline} de ${mFound.total} AP(s) offline*\n`;
  } else {
    text += `• *Wi-Fi Meraki:* 🟢 *100% ONLINE* (Todos os APs operando)\n`;
  }
  return text;
}

function formatDvrWhatsApp(query = '', appData = {}, isTech = false) {
  const q = normalize(query);
  const summary = DVR_STATIC_DATA.summary;
  if (!q) {
    let text = `📹 *Status Geral dos ${summary.total} DVRs Escolares:*\n`;
    text += `• Situação: 🟢 *${summary.online} Online* | 🔴 *${summary.offline} Offline*\n`;
    text += `• Escolas com DVR Offline:\n`;
    Object.entries(DVR_STATIC_DATA.schools).forEach(([sch, dvrs]) => {
      const off = dvrs.filter(d => d.status === 'offline');
      if (off.length > 0) {
        text += `  - ${sch} (${off.map(d => d.name).join(', ')})\n`;
      }
    });
    text += `\n⏱️ Monitoramento automático em ciclo de *1 hora* via ICMP Ping.\n`;
    text += `💡 _Digite *dvr <escola>* para ver IPs e câmeras da unidade (ex: *dvr venturelli*)._`;
    return text;
  }
  const matchEntry = Object.entries(DVR_STATIC_DATA.schools).find(([sch]) => normalize(sch).includes(q));
  if (!matchEntry) {
    const matches = findSchools(query, appData);
    const schoolName = matches.length > 0 ? matches[0] : query;
    return `ℹ️ Nenhum DVR cadastrado para *${schoolName}* ou nome não localizado.`;
  }
  const [schoolName, dvrs] = matchEntry;
  let text = `📹 *DVRs da Unidade: ${schoolName}*\n\n`;
  dvrs.forEach(d => {
    const statusIcon = d.status === 'online' ? '🟢' : '🔴';
    const statusText = d.status === 'online' ? 'Online' : 'Offline';
    text += `• *${d.name}:* IP ` + d.ip + ` — ${statusIcon} *${statusText}*\n`;
    if (d.cameras) text += `  Câmeras configuradas: ${d.cameras}\n`;
  });
  if (isTech) {
    text += `\n🔑 *Acesso Técnico Autorizado:*\n• Usuário padrão: ` + 'admin' + `\n• Porta RTSP: 554 | HTTP: 80`;
  }
  return text;
}

function handleWhatsAppMessage({
  text = '',
  from = '',
  sender = '',
  appData = {},
  monitorStatus = {},
  painelUrl = 'https://painelure.pages.dev',
  isTech = false,
  techPin = 'ney10'
}) {
  const clean = String(text || '').trim();
  const lower = clean.toLowerCase();
  const userDisplayName = sender || 'Usuário WhatsApp';

  // 0. Autenticação Técnico (reconhecimento de senha)
  const stripped = lower.replace(/[*_~`#!\/:,\.-]/g, '').trim();
  const isTechLogin = (
    stripped === 'ney10' ||
    stripped === 'ney 10' ||
    stripped === 'tecnico ney10' ||
    stripped === 'senha ney10' ||
    stripped === 'login ney10' ||
    stripped === 'admin ney10' ||
    stripped === 'modo tecnico ney10' ||
    /(?:^|\s)(?:tecnico|senha|login|pin|admin)?[\s:]*ney\s*10(?:\s|$)/i.test(clean) ||
    lower.includes('ney10') ||
    lower.includes('ney 10') ||
    (techPin && (stripped === String(techPin).toLowerCase() || lower.includes(String(techPin).toLowerCase())))
  );

  if (isTechLogin) {
    return {
      replyText: `🔓 *Modo Técnico Desbloqueado com Sucesso!*\n\n` +
        `Identidade confirmada. Acesso autorizado aos recursos internos e procedimentos do *Padlet URE 2026*:\n` +
        `• 📋 *Base do Padlet integrada:* tenho informações e tutoriais do Padlet para ajudar a responder qualquer dúvida técnica (*apoio <termo>*)\n` +
        `• 🚨 *Zabbix:* monitor de links de internet e incidentes (*zab* ou *zab <escola>*)\n` +
        `• 📶 *Meraki Wi-Fi:* monitor de APs offline (*aps* ou *aps <escola>*)\n` +
        `• 📹 *DVRs:* status dos 33 DVRs e senhas de acesso (*dvr* ou *dvr <escola>*)\n` +
        `• 🛠️ *Manuais restritos:* BIOS, SSD, infraestrutura e agendamento NIT (*apoio bios*, *apoio ssd*)\n\n` +
        `Digite *menu* para ver as opções ou digite o comando desejado (ex: *rede*, *dvr*, *zab*, *apoio ssd*).\n` +
        `Para sair do modo técnico a qualquer momento, envie *#sair*.`,
      isTech: true
    };
  }

  // Encerrar modo técnico
  if (lower === '#sair' || lower === 'sair' || lower === '!sair' || lower === '/sair') {
    return {
      replyText: `🔒 *Sessão Técnica Encerrada.*\n\nVocê retornou ao modo de atendimento público padrão da URE.`,
      isTech: false
    };
  }

  // Solicitação de modo técnico
  if (lower === 'tecnico' || lower === 'modo tecnico' || lower === 'senha' || lower === 'senha tecnico') {
    if (isTech) {
      return {
        replyText: `🔓 *Você já está no Modo Técnico!*\n\nDigite *menu* para ver os comandos ou digite *#sair* para desconectar.`,
        isTech: true
      };
    }
    return {
      replyText: `🔐 *Acesso ao Modo Técnico URE*\n\nPor favor, digite a senha técnica para desbloquear os recursos avançados de infraestrutura:`,
      isTech: false
    };
  }

  // Comandos de Monitoramento Técnico (Zabbix, Meraki, Rede, DVR)
  if (lower === 'zab' || /^zab\s+/i.test(clean)) {
    const q = clean.replace(/^zab\s*/i, '').trim();
    return {
      replyText: formatZabbixWhatsApp(q, monitorStatus, appData, painelUrl),
      isTech
    };
  }

  if (lower === 'aps' || /^aps\s+/i.test(clean)) {
    const q = clean.replace(/^aps\s*/i, '').trim();
    return {
      replyText: formatMerakiWhatsApp(q, monitorStatus, appData, painelUrl),
      isTech
    };
  }

  if (lower === 'rede' || /^rede\s+/i.test(clean)) {
    const q = clean.replace(/^rede\s*/i, '').trim();
    return {
      replyText: formatRedeWhatsApp(q, monitorStatus, appData, painelUrl),
      isTech
    };
  }

  if (lower === 'dvr' || /^dvr\s+/i.test(clean)) {
    const q = clean.replace(/^dvr\s*/i, '').trim();
    return {
      replyText: formatDvrWhatsApp(q, appData, isTech),
      isTech
    };
  }

  // Comando MATERIAL DE APOIO:
  const isApoioCommand = /^(apoio|material|padlet|manuais|guias|procedimentos?)\b/i.test(clean);
  const isNaturalApoioQuery = /(quiosque|sair do quiosque|sair quiosque|hard reset tablet|reset tablet|formatar tablet|ssd positivo|upgrade ssd|bios positivo|desabilitar emmc|emmc na bios|wifi tablets|tablets-escolas|garantia lenovo|chamado lenovo|garantia multilaser|chamado multilaser|bloquear jogos|arquivo hosts|tv lg|airplay tv|bluemonitor|visita nit|formulario nit|bons usos|cuidados)/i.test(clean);

  if (isApoioCommand || isNaturalApoioQuery) {
    const qTerm = isApoioCommand ? clean.replace(/^(apoio|material|padlet|manuais|guias|procedimentos?)\s*/i, '').trim() : clean;
    return {
      replyText: formatMaterialApoioWhatsApp(qTerm, painelUrl, isTech),
      isTech
    };
  }

  // 1. Saudação / Menu
  if (!clean || ['menu', 'oi', 'ola', 'olá', 'ajuda', 'help', '/start', 'iniciar', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'começar'].includes(lower)) {
    return {
      replyText: getWhatsAppMenu(painelUrl, isTech),
      isTech
    };
  }

  // 2. Opções numeradas do Menu
  if (lower === '1' || lower === 'escola' || lower === 'escolas') {
    return {
      replyText: `🏫 *Consulta de Escolas*\n\nDigite o nome ou CIE da escola que deseja pesquisar.\n\n*Exemplo:* _venturelli_ ou _murtinho_`,
      isTech
    };
  }

  if (lower === '2' || lower === 'equipamento' || lower === 'equipamentos' || lower === 'inventario') {
    return {
      replyText: `💻 *Inventário de Equipamentos*\n\nDigite *eq <nome da escola>* para ver os equipamentos detalhados.\n\n*Exemplo:* _eq venturelli_ ou _eq jupira_`,
      isTech
    };
  }

  if (lower === '3' || lower === 'chamado sed' || lower === 'texto chamado' || lower === 'texto de chamado') {
    return {
      replyText: `📋 *Texto Padrão para Chamado SED*\n\nDigite *chamado <nome da escola>* para gerar o texto do chamado pronto para copiar.\n\n*Exemplo:* _chamado venturelli_`,
      isTech
    };
  }

  if (lower === '4' || lower === 'chamados' || lower === 'chamados ti') {
    return {
      replyText: typeof formatCallsWhatsApp === 'function' ? formatCallsWhatsApp(appData) : toWhatsApp(formatCalls(appData)),
      isTech
    };
  }

  if (lower === '5' || lower === 'carros' || lower === 'carro' || lower === 'frota') {
    return {
      replyText: typeof formatCarsWhatsApp === 'function' ? formatCarsWhatsApp(appData) : toWhatsApp(formatCars(appData)),
      isTech
    };
  }

  if (lower === '6' || lower === 'supervisores' || lower === 'supervisao' || lower === 'supervisor') {
    return {
      replyText: typeof formatSupervisorsWhatsApp === 'function' ? formatSupervisorsWhatsApp('', appData) : toWhatsApp(formatSupervisors('', appData)),
      isTech
    };
  }

  if (lower === '7' || lower === 'monitor' || lower === 'status rede') {
    return {
      replyText: typeof formatMonitorWhatsApp === 'function' ? formatMonitorWhatsApp(monitorStatus) : toWhatsApp(formatMonitor(monitorStatus)),
      isTech
    };
  }

  if (lower === 'painel' || lower === 'site' || lower === 'link') {
    return {
      replyText: `🌐 *Painel Geral URE Itapeva:*\n${painelUrl}`,
      isTech
    };
  }

  // 3. Gerar Texto Chamado SED: "chamado <escola>" ou "sed <escola>"
  if (/^(chamado|sed|texto chamado)\s+/i.test(clean)) {
    const q = clean.replace(/^(chamado|sed|texto chamado)\s+/i, '').trim();
    if (!q) {
      return { replyText: `ℹ️ Digite o nome da escola após a palavra chamado.\nExemplo: *chamado venturelli*`, isTech };
    }
    const matches = findSchools(q, appData);
    if (!matches.length) {
      return { replyText: `❌ Nenhuma escola encontrada para "${q}".\nTente digitar parte do nome (ex: _venturelli_).`, isTech };
    }
    return { replyText: formatSedTicketWhatsApp(matches[0], appData), isTech };
  }

  // 4. Detalhes de Equipamentos: "eq <escola>" ou "equipamentos <escola>"
  if (/^(eq|equipamento|equipamentos|inventario)\s+/i.test(clean)) {
    const q = clean.replace(/^(eq|equipamento|equipamentos|inventario)\s+/i, '').trim();
    if (!q) {
      return { replyText: `ℹ️ Digite o nome da escola após o comando.\nExemplo: *eq venturelli*`, isTech };
    }
    const matches = findSchools(q, appData);
    if (!matches.length) {
      return { replyText: `❌ Nenhuma escola encontrada para "${q}".`, isTech };
    }
    return { replyText: formatEquipmentDetailsWhatsApp(matches[0], appData), isTech };
  }

  // 5. Supervisor específico: "supervisor <nome>"
  if (/^supervisor(es)?\s+/i.test(clean)) {
    const q = clean.replace(/^supervisor(es)?\s+/i, '').trim();
    return {
      replyText: typeof formatSupervisorsWhatsApp === 'function' ? formatSupervisorsWhatsApp(q, appData) : toWhatsApp(formatSupervisors(q, appData)),
      isTech
    };
  }

  // 6. Novo Chamado via WhatsApp: "novo chamado <escola> | <problema>"
  if (/^(novo chamado|novochamado)\b/i.test(clean)) {
    const content = clean.replace(/^(novo chamado|novochamado)\s*/i, '').trim();
    if (!content.includes('|')) {
      return {
        replyText: `ℹ️ *Como abrir chamado:*\nEnvie no formato:\n*novo chamado <Escola> | <Problema>*\n\n_Exemplo:_ *novo chamado Venturelli | Impressora não liga*`,
        isTech
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
      replyText: `✅ *Chamado Aberto com Sucesso!*\n\n🎫 *ID:* ${newCall.id}\n🏫 *Escola:* ${finalSchool}\n📝 *Problema:* ${issue}\n👤 *Solicitante:* ${userDisplayName}\n\n_O chamado já está visível para a equipe de T.I. no PainelURE._`,
      isTech
    };
  }

  // 7. Reserva de Carro via WhatsApp: "reservar carro <veiculo> | <data> | <destino>"
  if (/^(reservar carro|reservarcarro|reserva carro)\b/i.test(clean)) {
    const content = clean.replace(/^(reservar carro|reservarcarro|reserva carro)\s*/i, '').trim();
    if (!content.includes('|')) {
      return {
        replyText: `🚗 *Como reservar veículo oficial:*\nEnvie no formato:\n*reservar carro <Veículo> | <Data> | <Destino>*\n\n_Exemplo:_ *reservar carro Utilitário | 15/09 08:00 | Visita técnica Ribeirão Branco*`,
        isTech
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
      replyText: `🚗 *Reserva de Veículo Confirmada!*\n\n🚘 *Veículo:* ${vehicle}\n📅 *Data:* ${dateInput}\n📍 *Destino:* ${destination}\n👤 *Responsável:* ${userDisplayName}\n\n_Reserva registrada na escala oficial do PainelURE._`,
      isTech
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
      replyText: formatSchoolWhatsApp(matches[0], appData),
      isTech
    };
  }

  if (matches.length > 1) {
    let msg = `🔍 *Encontrei ${matches.length} escolas para "${schoolQuery}":*\n\n`;
    matches.slice(0, 6).forEach((sch, i) => {
      msg += `${i + 1}️⃣ *${sch}*\n`;
    });
    msg += `\n_Digite o nome da escola desejada (ex: ${matches[0].split(/\s+/).slice(0, 2).join(' ')})._`;
    return {
      replyText: msg,
      isTech
    };
  }

  // 9. Se nada bateu
  return {
    replyText: `Desculpe, não compreendi "${clean}". 🤔\n\nDigite *menu* para ver as opções ou digite o nome de uma escola para pesquisar (ex: _venturelli_).`,
    isTech
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

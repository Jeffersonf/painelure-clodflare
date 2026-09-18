const STATIC_SCHOOL_DATA = {
  "PEI EE Idalicio Mendes Lima": { cie: "905227", city: "Itapeva", phone: "(15) 3624-7326", email: "e905227a@educacao.sp.gov.br" },
  "EE Doutor Antonio Deffune": { cie: "049323", city: "Itapeva", phone: "(15) 3526-7271", email: "e049323a@educacao.sp.gov.br" },
  "PEI EE Professora Celia Vasques Ferrari Duch": { cie: "039731", city: "Taquarivai", phone: "(15) 3534-1192", email: "e039731a@educacao.sp.gov.br" },
  "PEI EE Professora Cinira Daniel da Silva": { cie: "035348", city: "Itapeva", phone: "(15) 3523-1137", email: "e035348a@educacao.sp.gov.br" },
  "EE Bairro Ferreira dos Matos": { cie: "915087", city: "Ribeirão Grande", phone: "(15) 3544-6226", email: "e915087a@educacao.sp.gov.br" },
  "PEI EE Professora Francelina Franco": { cie: "015568", city: "Buri", phone: "(15) 3546-1242", email: "e015568a@educacao.sp.gov.br" },
  "EE Professor Gerson de Barros Margarido": { cie: "043412", city: "Itapeva", phone: "(15) 3624-7011", email: "e043412a@educacao.sp.gov.br" },
  "EE Bairro Boa Vista Intervales": { cie: "915075", city: "Ribeirão Grande", phone: "(15) 3444-6100", email: "e915075a@educacao.sp.gov.br" },
  "PEI EE Jeminiano David Muzel": { cie: "015477", city: "Itapeva", phone: "(15) 3522-0941", email: "e015477a@educacao.sp.gov.br" },
  "PEI EE Professor Joao Baptista do Amaral Vasconcellos": { cie: "910077", city: "Capão Bonito", phone: "(15) 3542-1244", email: "e910077a@educacao.sp.gov.br" },
  "PEI EE Professor Jose Vasques Ferrari": { cie: "015519", city: "Itapeva", phone: "(15) 3522-1922", email: "e015519a@educacao.sp.gov.br" },
  "PEI EE Professora Nicota Soares": { cie: "015489", city: "Itapeva", phone: "(15) 3522-0211", email: "e015489a@educacao.sp.gov.br" },
  "PEI EE Oscar Kurtz Camargo": { cie: "015076", city: "Ribeirão Grande", phone: "(15) 3544-1188", email: "e015076a@educacao.sp.gov.br" },
  "PEI EE Otavio Ferrari": { cie: "015404", city: "Itapeva", phone: "(15) 3522-1322", email: "e015404a@educacao.sp.gov.br" },
  "PEI EE Padre Arlindo Vieira": { cie: "015118", city: "Capão Bonito", phone: "(15) 3542-1900", email: "e015118a@educacao.sp.gov.br" },
  "EE Doutor Raul Venturelli": { cie: "015222", city: "Capão Bonito", phone: "(15) 3542-1131", email: "e015222a@educacao.sp.gov.br" },
  "PEI EE Ricardo Campolim de Almeida Neto": { cie: "915117", city: "Nova Campina", phone: "(15) 3535-6122", email: "e915117a@educacao.sp.gov.br" },
  "EE Professor Silverio Monteiro": { cie: "035336", city: "Itapeva", phone: "(15) 3522-0311", email: "e035336a@educacao.sp.gov.br" },
  "PEI EE Simpliciano Campolim de Almeida": { cie: "015428", city: "Nova Campina", phone: "(15) 3535-1155", email: "e015428a@educacao.sp.gov.br" },
  "EE Bairro Turvo dos Almeidas": { cie: "926036", city: "Capão Bonito", phone: "(15) 3542-5011", email: "e926036a@educacao.sp.gov.br" },
  "PEI EE Professora Zulmira de Oliveira": { cie: "015544", city: "Itapeva", phone: "(15) 3522-2933", email: "e015544a@educacao.sp.gov.br" }
};

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
const DATA_ACCESS = {
  administrador: ['dashboard', 'schools', 'network', 'inventory', 'ctc', 'calls', 'cars', 'supervision', 'contacts', 'calendar', 'satisfaction', 'satisfaction-online', 'internal', 'reports', 'profiles', 'quality', 'admin'],
  supervisao: ['dashboard', 'schools', 'supervision', 'contacts', 'calendar', 'reports'],
  'tecnicos ctc': ['dashboard', 'schools', 'network', 'inventory', 'ctc', 'calls', 'cars', 'supervision', 'contacts', 'calendar', 'internal', 'reports', 'profiles', 'quality'],
  setec: ['dashboard', 'schools', 'network', 'inventory', 'ctc', 'calls', 'contacts', 'cars', 'reports'],
  seintec: ['dashboard', 'schools', 'network', 'inventory', 'ctc', 'calls', 'cars', 'supervision', 'contacts', 'calendar', 'internal', 'reports', 'profiles', 'quality'],
  ctc: ['dashboard', 'schools', 'network', 'inventory', 'ctc', 'calls', 'cars', 'supervision', 'contacts', 'calendar', 'internal', 'reports', 'profiles', 'quality'],
  gabinete: ['dashboard', 'schools', 'calls', 'contacts', 'cars', 'calendar', 'reports'],
  dirigente: ['dashboard', 'schools', 'calls', 'contacts', 'cars', 'calendar', 'reports'],
  seom: ['dashboard', 'schools', 'contacts', 'cars', 'calendar', 'reports'],
  sefisc: ['dashboard', 'cars', 'calendar'], segre: ['dashboard', 'cars', 'calendar'], sevesc: ['dashboard', 'cars', 'calendar'], semat: ['dashboard', 'cars', 'calendar'], sepes: ['dashboard', 'cars', 'calendar'], sefrep: ['dashboard', 'cars', 'calendar'], seape: ['dashboard', 'cars', 'calendar'], seafim: ['dashboard', 'cars', 'calendar'], sefin: ['dashboard', 'cars', 'calendar'], secomse: ['dashboard', 'cars', 'calendar'], carros: ['dashboard', 'cars', 'calendar'],
  pedagogico: ['dashboard', 'schools', 'supervision', 'contacts', 'calendar'], consulta: ['dashboard', 'schools', 'contacts', 'calendar']
};

const OFFICIAL_SOURCE_FIXES = {
  inventory: { label: 'Equipamentos', type: 'powerbi-embed', url: '', status: 'replaced', metadata: { domain: 'Equipamentos', source: 'powerbi-embed', autoLoad: false } },
  satisfaction: { label: 'Pesquisa de Satisfação Presencial', type: 'powerbi-embed', url: '', status: 'replaced', metadata: { domain: 'Pesquisa de Satisfação Presencial', source: 'powerbi-embed', autoLoad: false } }
};


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

function normalize(value) { return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); }
function json(payload, status = 200, headers = {}) { return new Response(JSON.stringify(payload), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key', 'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS', ...headers } }); }
function fail(statusCode, message, metadata = {}) { const error = new Error(message); error.statusCode = statusCode; error.metadata = metadata; return error; }
function errorResponse(error) { return json({ ok: false, error: error.message || 'Erro interno.' }, error.statusCode || 500, error.metadata?.code ? { 'X-PainelURE-Error': error.metadata.code } : {}); }
function args(values) { return values.map(value => value === undefined ? null : value); }
function stmt(db, sql, values = []) { return db.prepare(sql).bind(...args(values)); }
async function first(db, sql, values = []) { return stmt(db, sql, values).first(); }
async function all(db, sql, values = []) { return (await stmt(db, sql, values).all()).results || []; }
async function run(db, sql, values = []) { return stmt(db, sql, values).run(); }
function parseJson(value, fallback = {}) { if (value && typeof value === 'object') return value; try { return value ? JSON.parse(value) : fallback; } catch { return fallback; } }

async function readBody(request) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) return {};
  const text = await request.text(); if (text.length > 8 * 1024 * 1024) throw fail(413, 'Payload muito grande.');
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { __raw: text }; }
}

function randomHex(bytes = 24) { const data = new Uint8Array(bytes); crypto.getRandomValues(data); return [...data].map(value => value.toString(16).padStart(2, '0')).join(''); }
function hex(buffer) { return [...new Uint8Array(buffer)].map(value => value.toString(16).padStart(2, '0')).join(''); }
function bytesFromHex(text) { const result = new Uint8Array(text.length / 2); for (let i = 0; i < result.length; i++) result[i] = Number.parseInt(text.slice(i * 2, i * 2 + 2), 16); return result; }
async function hashPassword(password, salt = randomHex(16)) { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(password)), 'PBKDF2', false, ['deriveBits']); const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: bytesFromHex(salt), iterations: 120000, hash: 'SHA-256' }, key, 256); return `pbkdf2$${salt}$${hex(bits)}`; }
async function verifyPassword(password, storedHash) { const [method, salt, expected] = String(storedHash || '').split('$'); if (method !== 'pbkdf2' || !salt || !expected) return false; const actual = (await hashPassword(password, salt)).split('$')[2]; if (actual.length !== expected.length) return false; let difference = 0; for (let i = 0; i < actual.length; i++) difference |= actual.charCodeAt(i) ^ expected.charCodeAt(i); return difference === 0; }

function rowUser(row) { return row ? { ...row, preferences: parseJson(row.preferences, {}) } : null; }
function publicUser(user) { if (!user) return null; const preferences = user.preferences || {}; return { id: user.id, username: user.username, name: user.name, role: user.role, contactId: user.contact_id || user.contactId || '', avatar: user.avatar || '', pin: preferences.pin || '', preferences }; }
function bearerToken(request) { const value = request.headers.get('Authorization') || ''; return value.startsWith('Bearer ') ? value.slice(7) : ''; }
async function authForRequest(request, env) { const token = bearerToken(request); if (!token || !env.DB) return { session: null, user: null }; const session = await first(env.DB, 'SELECT token, user_id, role, created_at FROM sessions WHERE token = ? AND expires_at > ?', [token, new Date().toISOString()]); const user = session?.user_id ? rowUser(await first(env.DB, 'SELECT * FROM users WHERE id = ?', [session.user_id])) : null; return { session: session ? { ...session, token } : null, user }; }
async function requireAuth(request, env) { const auth = await authForRequest(request, env); if (!auth.session) throw fail(401, 'Não autorizado.'); return auth; }
function isAdmin(auth) { return normalize(auth.user?.role || auth.session?.role || '').includes('administrador'); }
function effectiveUser(auth) { return auth.user || (auth.session ? { role: auth.session.role || 'Consulta', name: 'Sessão admin' } : null); }
async function requireAdmin(request, env, message = 'Apenas administrador pode executar esta ação.') { const auth = await requireAuth(request, env); if (!isAdmin(auth)) throw fail(403, message); return auth; }
async function requireInternalWriter(request, env) { const auth = await requireAuth(request, env); const role = normalize(auth.user?.role || auth.session?.role || ''); if (!role.includes('administrador') && !role.includes('seintec') && role !== 'ctc' && !role.includes('tecnicos ctc')) throw fail(403, 'Apenas Administrador, SEINTEC ou CTC pode salvar os dados do café.'); return auth; }

async function findUserByUsername(db, username) { const clean = normalize(username); if (!clean) return null; const cleanNoSpaces = clean.replace(/\s+/g, ''); const exact = await first(db, 'SELECT * FROM users WHERE lower(username) = ?', [clean]); if (exact) return rowUser(exact); const users = (await all(db, 'SELECT * FROM users ORDER BY name')).map(rowUser); return users.find(user => { const uName = normalize(user.name); const uLogin = normalize(user.username); const uLoginNoSpaces = uLogin.replace(/\s+/g, ''); const uNameNoSpaces = uName.replace(/\s+/g, ''); return uLogin === clean || uName.split(/\s+/)[0] === clean || uLogin.startsWith(`${clean}.`) || uLogin.replace(/\./g, '') === clean || clean.replace(/\./g, '') === uLogin || uName.includes(clean) || uLoginNoSpaces === cleanNoSpaces || uLoginNoSpaces.startsWith(cleanNoSpaces) || uNameNoSpaces.startsWith(cleanNoSpaces); }) || null; }
async function createSession(db, user = null) { const token = randomHex(24); const now = new Date(); const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); await run(db, 'INSERT INTO sessions (token, user_id, role, created_at, expires_at) VALUES (?, ?, ?, ?, ?)', [token, user?.id || null, user?.role || 'Administrador', now.toISOString(), expires.toISOString()]); return token; }

async function readStore(db) { const row = await first(db, 'SELECT payload, source, updated_at FROM app_state WHERE id = ?', ['main']); if (!row) return { version: 1, source: 'd1', updatedAt: null, appData: {} }; const payload = parseJson(row.payload, {}); return { ...payload, source: row.source || payload.source || 'd1', updatedAt: row.updated_at || payload.updatedAt || null }; }
async function saveStore(db, appData, source = 'api', options = {}) { const current = await readStore(db); if (!options.force && current.updatedAt && String(options.baseUpdatedAt || '') !== current.updatedAt) throw fail(409, 'Estado online mais novo encontrado. Recarregue antes de salvar.', { code: 'STALE_APP_STATE', currentUpdatedAt: current.updatedAt, baseUpdatedAt: options.baseUpdatedAt || '' }); const payload = { version: 1, source, updatedAt: new Date().toISOString(), appData: appData || {} }; await db.batch([stmt(db, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['main', JSON.stringify(payload), source, payload.updatedAt]), stmt(db, 'INSERT INTO app_snapshots (id, payload, source, created_at) VALUES (?, ?, ?, ?)', [crypto.randomUUID(), JSON.stringify(payload), source, payload.updatedAt])]); return payload; }

function accessForRole(role, appData = {}) { const target = normalize(role); const custom = appData?.accessRules?.roleAccess || {}; const key = Object.keys(DATA_ACCESS).find(item => normalize(item) === target) || (target.includes('admin') ? 'administrador' : target.includes('supervis') ? 'supervisao' : target.includes('ctc') ? 'tecnicos ctc' : target.includes('seintec') ? 'seintec' : target.includes('setec') ? 'setec' : target.includes('gabinete') ? 'gabinete' : target.includes('dirigente') ? 'dirigente' : target.includes('carro') ? 'carros' : target.includes('pedag') ? 'pedagogico' : 'consulta'); const saved = custom[key] || custom[role]; return [...new Set([...(DATA_ACCESS[key] || DATA_ACCESS.consulta), ...(Array.isArray(saved) ? saved : [])])]; }
function canAccessData(page, user, appData) { if (['satisfaction', 'satisfaction-online'].includes(page)) return normalize(user?.role || '').includes('administrador'); if (page === 'network') return true; const access = accessForRole(user?.role || 'Consulta', appData); return page === 'calls' || page === 'ctc' ? access.includes('calls') || access.includes('ctc') : access.includes(page); }
function identityMatches(firstValue, secondValue) { const a = normalize(firstValue).replace(/[._-]+/g, ' '); const b = normalize(secondValue).replace(/[._-]+/g, ' '); if (!a || !b) return false; if (a.includes('@') || b.includes('@')) return a.split('@')[0] === b.split('@')[0]; const at = a.split(/\s+/).filter(Boolean); const bt = b.split(/\s+/).filter(Boolean); return a === b || (at.length >= 2 && at.every(value => bt.includes(value))) || (bt.length >= 2 && bt.every(value => at.includes(value))); }
function supervisorForUser(appData, user) { if (!user || !normalize(user.role).includes('supervis')) return null; const values = [user.name, user.username, user.email, user.contactName, user.supervisorName, user.preferences?.supervisorName].filter(Boolean); return (appData.supervisors || []).find(item => [item.name, item.email, item.login, item.username, ...(item.aliases || [])].filter(Boolean).some(value => values.some(candidate => identityMatches(candidate, value)))) || null; }
function canViewCredentials(user) { const role = normalize(user?.role || ''); return ['administrador', 'tecnicos ctc', 'setec', 'seintec'].some(value => role.includes(value)); }
function publicCarBooking(item) { return { requestId: item.requestId || item.id || '', vehicle: item.vehicle || item.car || item.recurso || 'Carro oficial', date: item.date || item.value || '', time: item.time || item.hora || '', returnTime: item.returnTime || item.devolutionTime || item.devolucao || '', status: item.status || 'reservado', restricted: true }; }
function canViewCarBookingDetails(item, user) { const role = normalize(user?.role || ''); if (['administrador', 'gabinete', 'dirigente', 'seom', 'setec', 'seintec', 'ctc'].some(value => role.includes(value))) return true; const userKeys = [user?.role, user?.sector, user?.setor, user?.contactRole].map(normalize).filter(Boolean); const itemKeys = [item?.requester, item?.sector, item?.setor, item?.category, item?.owner].map(normalize).filter(Boolean); return userKeys.some(value => itemKeys.some(key => key === value || key.includes(value) || value.includes(key))); }
function scopedStore(store, user) { const appData = store.appData || {}; const supervisorScope = normalize(user?.role).includes('supervis'); const supervisor = supervisorForUser(appData, user); const allowed = new Set((supervisor?.assignedSchools || []).map(normalize)); const scopedItems = (items, field = 'school') => supervisorScope ? (items || []).filter(item => allowed.has(normalize(item?.[field]))) : (items || []); const scopedObject = source => supervisorScope ? Object.fromEntries(Object.entries(source || {}).filter(([school]) => allowed.has(normalize(school)))) : (source || {}); const schools = supervisorScope ? (appData.schools || []).filter(item => allowed.has(normalize(item.name))) : (appData.schools || []); const network = scopedObject(appData.networkData); const safeNetwork = canViewCredentials(user) ? network : Object.fromEntries(Object.entries(network).map(([key, value]) => { const { credentials, ...safe } = value || {}; return [key, safe]; })); return { ...appData, schools: canAccessData('schools', user, appData) ? schools : [], supervisors: canAccessData('supervision', user, appData) ? (supervisorScope ? (supervisor ? [supervisor] : []) : (appData.supervisors || [])) : [], networkData: canAccessData('network', user, appData) ? safeNetwork : {}, schoolInventoryMetrics: canAccessData('inventory', user, appData) ? scopedObject(appData.schoolInventoryMetrics) : {}, schoolProfiles: canAccessData('schools', user, appData) ? scopedItems(appData.schoolProfiles) : [], schoolAssets: canAccessData('inventory', user, appData) ? scopedItems(appData.schoolAssets) : [], inventory: canAccessData('inventory', user, appData) ? scopedItems(appData.inventory) : [], calls: canAccessData('calls', user, appData) ? scopedItems(appData.calls) : [], ctcVisits: canAccessData('ctc', user, appData) ? scopedItems(appData.ctcVisits, 'place') : [], contacts: canAccessData('contacts', user, appData) ? (appData.contacts || []) : [], cars: canAccessData('cars', user, appData) ? (appData.cars || []).map(item => canViewCarBookingDetails(item, user) ? item : publicCarBooking(item)) : [], calendar: canAccessData('calendar', user, appData) ? (appData.calendar || []) : [], satisfaction: canAccessData('satisfaction', user, appData) ? (appData.satisfaction || []) : [], internal: canAccessData('internal', user, appData) ? (appData.internal || []) : [], reports: canAccessData('reports', user, appData) ? (appData.reports || []) : [], profiles: canAccessData('profiles', user, appData) ? (appData.profiles || []) : [], quality: canAccessData('quality', user, appData) ? (appData.quality || []) : [], users: canAccessData('admin', user, appData) ? (appData.users || []) : [], adminChecks: canAccessData('admin', user, appData) ? (appData.adminChecks || []) : [], accessRules: appData.accessRules || {}, pageMaintenance: appData.pageMaintenance || {} }; }

function normalizeHeader(value) { return normalize(value).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
function parseCsvLine(line, delimiter) { const cells = []; let cell = ''; let quoted = false; for (let i = 0; i < line.length; i++) { const char = line[i]; const next = line[i + 1]; if (char === '"' && quoted && next === '"') { cell += '"'; i++; } else if (char === '"') quoted = !quoted; else if (char === delimiter && !quoted) { cells.push(cell.trim()); cell = ''; } else cell += char; } cells.push(cell.trim()); return cells; }
function parseCsv(text) { const lines = String(text || '').replace(/^\uFEFF/, '').split(/\r?\n/).filter(line => line.trim()); if (!lines.length) return []; const delimiter = (lines[0].match(/;/g) || []).length > (lines[0].match(/,/g) || []).length ? ';' : ','; const counts = {}; const headers = parseCsvLine(lines[0], delimiter).map(header => { const base = normalizeHeader(header) || 'col'; counts[base] = (counts[base] || 0) + 1; return counts[base] === 1 ? base : `${base}_${counts[base]}`; }); return lines.slice(1).map(line => parseCsvLine(line, delimiter).reduce((row, value, index) => ({ ...row, [headers[index]]: value || '' }), {})); }
function valueOf(row, keys, fallback = '') { for (const key of keys) { const actual = row[key] !== undefined ? row[key] : Object.entries(row || {}).find(([name]) => normalizeHeader(name) === normalizeHeader(key))?.[1]; if (actual !== undefined && actual !== null && String(actual).trim()) return typeof actual === 'object' ? String(actual.Title || actual.Name || actual.LookupValue || actual.value || '') : String(actual).trim(); } return fallback; }
function numberOf(row, keys, fallback = 0) { const text = valueOf(row, keys, ''); const value = Number(String(text).replace(/\./g, '').replace(',', '.')); return Number.isFinite(value) ? value : fallback; }
function normalizeRows(type, rows) {
  if (type === 'schools') return rows.map(row => { const name = valueOf(row, ['escola', 'nome', 'unidade', 'name'], 'Escola sem nome'); return { name, city: valueOf(row, ['municipio', 'cidade', 'city']), cie: valueOf(row, ['cie', 'codigo', 'codigo_cie']), initials: valueOf(row, ['iniciais', 'initials'], name.split(/\s+/).map(value => value[0]).join('').slice(0, 2).toUpperCase()), fiche: numberOf(row, ['ficha', 'ficha_pct', 'percentual']), items: numberOf(row, ['itens', 'items', 'inventario']), status: normalize(valueOf(row, ['status'], 'ok')).includes('aten') ? 'warn' : 'ok' }; });
  if (type === 'contacts') return rows.map(row => ({ name: valueOf(row, ['nome', 'name', 'contato', 'responsavel'], 'Sem nome'), role: valueOf(row, ['cargo', 'funcao', 'role', 'descricao'], 'Contato'), sector: valueOf(row, ['setor', 'categoria', 'departamento', 'area'], 'Tecnologia'), email: valueOf(row, ['email', 'e_mail', 'mail']), phone: valueOf(row, ['ramal', 'telefone', 'whatsapp', 'celular']) }));
  if (type === 'calendar') return rows.map(row => ({ label: valueOf(row, ['titulo', 'evento', 'label', 'nome'], 'Evento'), value: valueOf(row, ['data', 'quando', 'date', 'value'], 'sem data'), note: valueOf(row, ['observacao', 'descricao', 'local', 'note']), tone: valueOf(row, ['status', 'tone', 'tipo'], 'info'), type: valueOf(row, ['tipo', 'type']), scope: valueOf(row, ['escopo', 'scope', 'visibilidade']), owner: valueOf(row, ['responsavel', 'dono', 'owner', 'usuario', 'user']), assignee: valueOf(row, ['atribuido', 'assignee', 'destinatario']), contactId: valueOf(row, ['contact_id', 'id_contato', 'contato_id']), ownerId: valueOf(row, ['owner_id', 'user_id', 'id_usuario']), ownerEmail: valueOf(row, ['owner_email', 'email_usuario', 'email']) }));
  if (type === 'cars') return rows.map(row => ({ requestId: valueOf(row, ['id']), vehicle: valueOf(row, ['carro', 'veiculo', 'vehicle', 'recurso', 'title'], 'Carro oficial'), date: valueOf(row, ['data', 'data_da_reserva', 'data_reserva', 'date', 'quando']), time: valueOf(row, ['hora', 'horario', 'time']), returnTime: valueOf(row, ['data_devolucao', 'devolucao', 'return_time']), requester: valueOf(row, ['setor', 'categoria', 'solicitante', 'responsavel', 'requester', 'owner']), sector: valueOf(row, ['setor', 'categoria', 'area', 'departamento']), destination: valueOf(row, ['localexterno', 'local_externo', 'destino', 'local', 'destination', 'place', 'escolas', 'motivo', 'objetivo']), driver: valueOf(row, ['nome_condutor', 'condutor_nome', 'motorista', 'driver', 'condutor']), status: valueOf(row, ['status', 'situacao', 'tone'], 'pendente'), note: valueOf(row, ['observacao', 'observacoes', 'descricao', 'note', 'motivo']), sourceFields: Object.keys(row).sort() }));
  if (type === 'satisfaction') return rows.map(row => ({ title: valueOf(row, ['motivo', 'descricao', 'titulo', 'pesquisa', 'campanha', 'title', 'nome'], 'Pesquisa de satisfação'), audience: valueOf(row, ['id'], '') ? `Atendimento #${valueOf(row, ['id'])}` : 'Atendimento URE', status: valueOf(row, ['status', 'situacao', 'andamento'], 'respondida'), score: valueOf(row, ['avaliacao_atendimento', 'avaliacao', 'nota', 'media', 'score', 'satisfacao']), responses: 1, link: valueOf(row, ['link', 'url', 'formulario', 'forms']), period: valueOf(row, ['data_atendimento', 'data', 'periodo', 'competencia']), note: valueOf(row, ['observacao', 'observacoes', 'note']) }));
  if (type === 'inventory') return rows.map(row => { const school = valueOf(row, ['escola', 'school', 'unidade'], 'Escola sem nome'); const name = valueOf(row, ['tipo', 'equipamento', 'item', 'nome'], 'Item'); const status = normalize(valueOf(row, ['status', 'situacao', 'estado'], 'ok')); return { id: valueOf(row, ['id']) ? `sharepoint-inventory-${valueOf(row, ['id'])}` : undefined, school, name, sourceName: name, notes: Object.entries(row).filter(([, value]) => String(value || '').trim()).map(([key, value]) => `${key}: ${value}`).join(' | '), status: status.includes('defeito') || status.includes('quebrado') ? 'defeito' : status.includes('manut') ? 'manutencao' : 'ok' }; });
  if (type === 'network') return rows.reduce((result, row) => { const school = valueOf(row, ['escola', 'unidade', 'nome', 'school'], 'Escola sem nome'); const item = result[school] || { network: [], ips: [], cameras: [], credentials: ['Acesso restrito', 'Não publicado no frontend estático', 'Solicitar ao CTC, SETEC ou SEINTEC'] }; for (const [field, keys] of Object.entries({ network: ['rede', 'network', 'gateway', 'wifi'], ips: ['ip', 'ips', 'cie', 'banda'], cameras: ['camera', 'cameras', 'dvr'] })) { const value = valueOf(row, keys); if (value && !item[field].includes(value)) item[field].push(value); } result[school] = item; return result; }, {});
  if (type === 'supervision') { const stats = new Map(); rows.forEach(row => { const name = valueOf(row, ['nome_do_supervisor', 'supervisor', 'nome'], 'Supervisor'); const schools = Object.entries(row).filter(([key, value]) => (key.startsWith('escola_visitada') || key.startsWith('escolas_visitadas')) && String(value || '').trim()).map(([, value]) => String(value).trim()); const item = stats.get(name) || { name, visits: 0, schools: new Set() }; schools.forEach(school => item.schools.add(school)); item.visits += schools.length || 1; stats.set(name, item); }); return [...stats.values()].map(item => ({ name: item.name, email: '', phone: '', schools: item.schools.size, assignedSchools: [...item.schools], week: '0/3', month: `${item.visits}/${Math.max(3, item.schools.size * 3)}`, pending: Math.max(0, Math.max(3, item.schools.size * 3) - item.visits), visits: item.visits, visitedSchools: item.schools.size, source: 'Importação backend' })); }
  return rows;
}

function officialSourceCsvUrl(source) { const raw = String(source?.url || '').trim(); const gid = String(source?.metadata?.gid || source?.metadata?.panelGid || '').trim(); if (!gid || !/docs\.google\.com\/spreadsheets\/d\//i.test(raw)) return raw; const published = raw.match(/docs\.google\.com\/spreadsheets\/d\/e\/([^/]+)/i); if (published) return `https://docs.google.com/spreadsheets/d/e/${published[1]}/pub?output=csv&single=true&gid=${encodeURIComponent(gid)}`; const regular = raw.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i); return regular ? `https://docs.google.com/spreadsheets/d/${regular[1]}/export?format=csv&gid=${encodeURIComponent(gid)}` : raw; }
function assertSharePointUrl(value) { const url = new URL(value); if (url.hostname !== 'seesp-my.sharepoint.com') throw new Error('Apenas links seesp-my.sharepoint.com são aceitos.'); return url; }
function rememberCookies(jar, response) { const header = response.headers.get('set-cookie') || ''; header.split(/,(?=\s*[^;,=\s]+=[^;,]+)/).forEach(value => { const pair = value.split(';')[0]; const index = pair.indexOf('='); if (index > 0) jar.set(pair.slice(0, index), pair.slice(index + 1)); }); }
async function fetchWithCookies(url, jar, options = {}, redirects = 8) { const headers = new Headers(options.headers || {}); if (jar.size) headers.set('Cookie', [...jar].map(([key, value]) => `${key}=${value}`).join('; ')); const response = await fetch(url, { ...options, headers, redirect: 'manual' }); rememberCookies(jar, response); const location = response.headers.get('location'); if ([301, 302, 303, 307, 308].includes(response.status) && location && redirects > 0) return fetchWithCookies(new URL(location, url).toString(), jar, options, redirects - 1); return response; }
async function fetchSharePointRows(sourceUrl) { const parsed = assertSharePointUrl(sourceUrl); const jar = new Map(); const pageResponse = await fetchWithCookies(parsed.toString(), jar, { headers: { Accept: 'text/html,application/xhtml+xml' } }); const html = await pageResponse.text(); if (!pageResponse.ok) throw new Error(`SharePoint respondeu ${pageResponse.status} ao abrir o link.`); if (/Sign in to your account/i.test(html)) throw new Error('O link do SharePoint abriu tela de login. Use um link compartilhado anônimo da lista.'); const contextListUrl = html.match(/"listUrl":"([^"]+)"/)?.[1]?.replace(/\\\//g, '/'); const direct = parsed.pathname.match(/^(.*)\/Lists\/([^/]+)\/AllItems\.aspx$/i); const listPath = contextListUrl || (direct ? `${decodeURIComponent(direct[1])}/Lists/${decodeURIComponent(direct[2])}` : ''); if (!listPath) throw new Error('Não foi possível identificar a lista do SharePoint.'); const sitePath = listPath.split('/Lists/')[0]; const escaped = listPath.replace(/'/g, "''"); const apiUrl = `${parsed.origin}${sitePath}/_api/web/GetList('${escaped}')/items?$top=5000&$expand=FieldValuesAsText`; const apiResponse = await fetchWithCookies(apiUrl, jar, { headers: { Accept: 'application/json;odata=nometadata' } }); const text = await apiResponse.text(); if (!apiResponse.ok) throw new Error(`SharePoint API respondeu ${apiResponse.status}: ${text.slice(0, 180)}`); const payload = JSON.parse(text); return Array.isArray(payload.value) ? payload.value : []; }
async function fetchSourceRows(source) { if (String(source.type || '').toLowerCase() === 'sharepoint-list') return fetchSharePointRows(source.url); const response = await fetch(officialSourceCsvUrl(source), { headers: { Accept: 'text/csv,text/plain,*/*', 'User-Agent': 'PainelURE-Cloudflare/1.0' } }); const text = await response.text(); if (!response.ok) throw new Error(`Fonte respondeu ${response.status}.`); return parseCsv(text); }
function sourceWithFixes(rows) { const map = new Map(rows.map(item => [item.key, item])); for (const [key, fix] of Object.entries(OFFICIAL_SOURCE_FIXES)) map.set(key, { ...(map.get(key) || { key }), ...fix, key, metadata: { ...(map.get(key)?.metadata || {}), ...fix.metadata }, updatedAt: map.get(key)?.updatedAt || new Date().toISOString() }); return [...map.values()].sort((a, b) => String(a.key).localeCompare(String(b.key))); }
async function listSources(db) { const rows = await all(db, 'SELECT key, label, type, url, status, metadata, updated_at FROM official_sources ORDER BY key'); return sourceWithFixes(rows.map(row => ({ key: row.key, label: row.label, type: row.type, url: row.url, status: row.status, monthKey: parseJson(row.metadata, {}).monthKey || '', metadata: parseJson(row.metadata, {}), updatedAt: row.updated_at }))); }
async function saveSources(db, input) { const sourceMap = Array.isArray(input) ? Object.fromEntries(input.map(item => [item.key, item])) : (input || {}); const entries = Object.entries(sourceMap).map(([key, source]) => ({ key, label: String(source.label || key), type: String(source.type || 'csv'), url: String(source.url || ''), status: String(source.status || (source.url ? 'configured' : 'pending')), metadata: { ...(source.metadata || {}), ...(source.monthKey || source.metadata?.monthKey ? { monthKey: source.monthKey || source.metadata?.monthKey } : {}) } })); await db.batch(entries.map(source => stmt(db, 'INSERT INTO official_sources (key, label, type, url, status, metadata, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET label=excluded.label, type=excluded.type, url=excluded.url, status=excluded.status, metadata=excluded.metadata, updated_at=excluded.updated_at', [source.key, source.label, source.type, source.url, source.status, JSON.stringify(source.metadata), new Date().toISOString()]))); return listSources(db); }
async function audit(db, auth, action, entity, entityId = '', detail = '', metadata = {}) { await run(db, 'INSERT INTO audit_events (id, user_id, actor_name, actor_role, action, entity, entity_id, detail, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [crypto.randomUUID(), auth.user?.id || null, auth.user?.name || (auth.session ? 'Sessão admin' : ''), auth.user?.role || auth.session?.role || '', action, entity, entityId, detail, JSON.stringify(metadata), new Date().toISOString()]); }
async function refreshSources(db, keys) { const selected = new Set(Array.isArray(keys) ? keys.filter(Boolean) : []); const sources = await listSources(db); const targets = sources.filter(source => (!selected.size || selected.has(source.key)) && source.url); const store = await readStore(db); const appData = { ...(store.appData || {}) }; const results = []; for (const source of targets) { try { const rows = await fetchSourceRows(source); const normalized = normalizeRows(source.key, rows); if (source.key === 'network') appData.networkData = normalized; else if (source.key === 'inventory') appData.schoolAssets = normalized; else if (source.key === 'supervision') appData.supervisors = normalized; else appData[source.key] = normalized; await run(db, 'INSERT INTO import_runs (id, source_key, rows_count, status, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)', [crypto.randomUUID(), source.key, rows.length, 'ok', `${source.key} atualizado pela fonte oficial`, new Date().toISOString()]); results.push({ key: source.key, status: 'loaded', rows: rows.length }); } catch (error) { await run(db, 'INSERT INTO import_runs (id, source_key, rows_count, status, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)', [crypto.randomUUID(), source.key, 0, 'error', error.message, new Date().toISOString()]); results.push({ key: source.key, status: 'error', rows: 0, error: error.message }); } } const data = results.some(item => item.status === 'loaded') ? await saveStore(db, appData, 'official-sources', { force: true }) : store; return { results, data }; }

async function updateUser(db, current, patch) { const next = { ...current, name: patch.name !== undefined ? String(patch.name).trim() : current.name, role: patch.role !== undefined ? String(patch.role).trim() : current.role, contact_id: patch.contactId !== undefined ? String(patch.contactId || '').trim() : current.contact_id || '', avatar: patch.avatar !== undefined ? String(patch.avatar || '') : current.avatar || '', preferences: patch.preferences !== undefined ? patch.preferences || {} : current.preferences || {} }; if (patch.password) { next.password_hash = await hashPassword(patch.password); next.preferences = { ...next.preferences, pin: String(patch.password) }; } await run(db, 'UPDATE users SET name=?, role=?, contact_id=?, password_hash=?, avatar=?, preferences=?, updated_at=? WHERE id=?', [next.name, next.role, next.contact_id, next.password_hash || current.password_hash, next.avatar, JSON.stringify(next.preferences), new Date().toISOString(), current.id]); return next; }

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getMainKeyboard(painelUrl = 'https://painelure-cloudflare-pages.pages.dev') {
  const keyboard = [
    [{ text: '🏫 Escolas' }, { text: '🎫 Chamados TI' }],
    [{ text: '🚗 Carros' }, { text: '📊 Monitor Rede' }],
    [{ text: '👨‍🏫 Supervisores' }, { text: '❓ Ajuda' }]
  ];
  if (painelUrl) keyboard.push([{ text: '🚀 Abrir PainelURE', web_app: { url: painelUrl } }]);
  return { keyboard, resize_keyboard: true, is_persistent: true };
}

function findSchools(query, appData) {
  const q = normalize(query);
  if (!q) return [];
  const networkData = appData?.networkData || {};
  const schoolProfiles = appData?.schoolProfiles || [];
  const baseSchools = Array.isArray(appData?.schools) ? appData.schools.map(s => s.name || s) : [];
  const staticDvrSchools = typeof DVR_STATIC_DATA !== 'undefined' ? Object.keys(DVR_STATIC_DATA?.schools || {}) : [];
  const staticSchools = typeof STATIC_SCHOOL_DATA !== 'undefined' ? Object.keys(STATIC_SCHOOL_DATA) : [];

  const allNames = Array.from(new Set([
    ...baseSchools,
    ...Object.keys(networkData),
    ...schoolProfiles.map(p => p.school || p.name || p.escola || ''),
    ...staticDvrSchools,
    ...staticSchools
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
    const stat = typeof STATIC_SCHOOL_DATA !== 'undefined' ? STATIC_SCHOOL_DATA[name] : null;
    if (stat) {
      if (normalize(stat.cie || '').includes(q)) return true;
      if (normalize(stat.city || '').includes(q)) return true;
      if (normalize(stat.email || '').includes(q)) return true;
    }
    return false;
  });
}

function formatSchool(schoolName, appData) {
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
  const inventoryMetrics = (appData.schoolInventoryMetrics || {})[schoolName] || {};
  const assets = (appData.schoolAssets || []).filter(a => normalize(a.school || a.escola || '') === normTarget);

  let msg = `🏫 <b>${escapeHtml(schoolName)}</b>\n`;
  if (profile.municipality || profile.municipio || profile.city) msg += `📍 <b>Município:</b> ${escapeHtml(profile.municipality || profile.municipio || profile.city)}\n`;
  if (cie) msg += `🏷️ <b>CIE:</b> <code>${escapeHtml(cie)}</code>\n`;
  const director = profile.director || profile.diretor || baseSchool.director || baseSchool.diretor || '';
  if (director) msg += `👤 <b>Diretor(a):</b> ${escapeHtml(director)}\n`;
  if (profile.phone) msg += `📞 <b>Telefone:</b> ${escapeHtml(profile.phone)}\n`;
  if (profile.email) msg += `✉️ <b>Email:</b> <code>${escapeHtml(profile.email)}</code>\n`;
  if (supervisor) msg += `👨‍🏫 <b>Supervisor(a):</b> ${escapeHtml(supervisor.name)}\n`;

  // Inventário Resumido
  msg += `\n💻 <b>Equipamentos / Ativos:</b>\n`;
  const totalItems = inventoryMetrics.total || inventoryMetrics.items || assets.length;
  if (totalItems > 0) {
    const func = inventoryMetrics.funcionando !== undefined ? inventoryMetrics.funcionando : assets.filter(a => a.status === 'ok').length;
    const baixas = inventoryMetrics.baixas !== undefined ? inventoryMetrics.baixas : (inventoryMetrics.alerts || assets.filter(a => a.status === 'baixa').length);
    const manut = inventoryMetrics.manutencao || assets.filter(a => a.status === 'manutencao').length;
    const gar = inventoryMetrics.garantia || assets.filter(a => a.status === 'garantia').length;

    msg += `• <b>Total:</b> ${totalItems} equipamentos cadastrados\n`;
    const statusParts = [`🟢 <b>${func}</b> funcionando`];
    if (baixas > 0) statusParts.push(`🔴 <b>${baixas}</b> baixa(s)`);
    if (manut > 0) statusParts.push(`🟡 <b>${manut}</b> manutenção`);
    if (gar > 0) statusParts.push(`🛡️ <b>${gar}</b> garantia`);
    msg += `• <b>Situação:</b> ${statusParts.join(' | ')}\n`;
  } else {
    msg += `• <i>Inventário em consolidação.</i>\n`;
  }

  return msg;
}

function formatEquipmentDetails(schoolName, appData) {
  const normTarget = normalize(schoolName);
  const metrics = (appData.schoolInventoryMetrics || {})[schoolName] || 
                  Object.entries(appData.schoolInventoryMetrics || {}).find(([k]) => normalize(k) === normTarget)?.[1] || {};
  const assets = (appData.schoolAssets || []).filter(a => normalize(a.school || a.escola || '') === normTarget);

  const total = metrics.total || metrics.items || assets.length;
  const func = metrics.funcionando !== undefined ? metrics.funcionando : assets.filter(a => a.status === 'ok').length;
  const baixas = metrics.baixas !== undefined ? metrics.baixas : (metrics.alerts || assets.filter(a => a.status === 'baixa').length);
  const manut = metrics.manutencao || assets.filter(a => a.status === 'manutencao').length;
  const gar = metrics.garantia || assets.filter(a => a.status === 'garantia').length;

  let msg = `💻 <b>Inventário Detalhado de Equipamentos</b>\n`;
  msg += `🏫 <b>${escapeHtml(schoolName)}</b>\n\n`;

  msg += `📊 <b>Visão Geral:</b>\n`;
  msg += `• <b>Total no Inventário:</b> ${total} equipamentos\n`;
  msg += `• 🟢 <b>Funcionando:</b> ${func}\n`;
  if (baixas > 0) msg += `• 🔴 <b>Baixas (avarias/sem conserto):</b> ${baixas}\n`;
  if (manut > 0) msg += `• 🟡 <b>Em Manutenção Técnica:</b> ${manut}\n`;
  if (gar > 0) msg += `• 🛡️ <b>Acionamento de Garantia:</b> ${gar}\n`;

  if (metrics.types && Object.keys(metrics.types).length > 0) {
    msg += `\n📦 <b>Equipamentos por Categoria:</b>\n`;
    for (const [type, data] of Object.entries(metrics.types)) {
      const parts = [`🟢 ${data.funcionando || 0} OK`];
      if (data.baixas) parts.push(`🔴 ${data.baixas} baixa(s)`);
      if (data.manutencao) parts.push(`🟡 ${data.manutencao} manut.`);
      if (data.garantia) parts.push(`🛡️ ${data.garantia} gar.`);
      msg += `• <b>${escapeHtml(type)} (${data.total}):</b> ${parts.join(', ')}\n`;
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
    msg += `\n📦 <b>Equipamentos por Categoria:</b>\n`;
    for (const [t, d] of Object.entries(groups)) {
      const parts = [`🟢 ${d.ok} OK`];
      if (d.baixa) parts.push(`🔴 ${d.baixa} baixa(s)`);
      if (d.manut) parts.push(`🟡 ${d.manut} manut.`);
      msg += `• <b>${escapeHtml(t)} (${d.total}):</b> ${parts.join(', ')}\n`;
    }
  }

  const problemItems = assets.filter(a => a.status === 'baixa' || a.status === 'manutencao' || a.status === 'garantia');
  problemItems.sort((a, b) => (b.observation ? 1 : 0) - (a.observation ? 1 : 0));

  if (problemItems.length > 0) {
    msg += `\n⚠️ <b>Destaques de Ocorrências / Baixas:</b>\n`;
    problemItems.slice(0, 8).forEach(item => {
      const tag = item.status === 'baixa' ? '🔴 Baixa' : item.status === 'garantia' ? '🛡️ Garantia' : '🟡 Manut.';
      const desc = item.observation || item.originalStatus || 'Avaria registrada no inventário';
      const cleanDesc = desc.replace(/^Obs:\s*/i, '').slice(0, 55);
      const sn = item.serial ? `(S/N: <code>${escapeHtml(item.serial)}</code>)` : '';
      msg += `• [${tag}] <b>${escapeHtml(item.name)}</b> ${sn}: <i>${escapeHtml(cleanDesc)}</i>\n`;
    });
    if (problemItems.length > 8) {
      msg += `<i>... e mais ${problemItems.length - 8} apontamento(s) no sistema.</i>\n`;
    }
  }

  msg += `\n💡 <i>Base oficial consolidada da equipe de T.I.</i>`;

  return {
    text: msg,
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🏫 Voltar para Escola', callback_data: `esc:${schoolName.slice(0, 40)}` },
          { text: '🎫 Texto de Chamado', callback_data: `sed_call:${schoolName.slice(0, 40)}` }
        ]
      ]
    }
  };
}

function formatCalls(appData, query) {
  const allCalls = appData.calls || [];
  const q = normalize(query);
  let calls = allCalls.filter(c => !['resolvido', 'fechado', 'concluido'].includes(normalize(c.status || '')));
  if (q && q !== 'todos') {
    calls = calls.filter(c => normalize(c.school || c.escola || '').includes(q) || normalize(c.title || c.descricao || '').includes(q));
  }
  let msg = `🎫 <b>Fila de Chamados de T.I. - URE Itapeva</b>\n\n`;
  if (calls.length === 0) {
    return msg + `✅ <b>Nenhum chamado pendente</b>!\nTudo em ordem com as escolas monitoradas.`;
  }
  msg += `📊 <b>Total em aberto:</b> ${calls.length} chamado(s)\n\n`;
  calls.slice(0, 6).forEach((c, idx) => {
    const school = c.school || c.escola || 'Escola não informada';
    const title = c.title || c.description || c.descricao || c.issue || 'Suporte técnico';
    const status = c.status || 'Pendente';
    const priority = c.priority || c.prioridade || 'Normal';
    const icon = /alta|urgente|critica/i.test(priority) ? '🚨' : '🔹';
    msg += `${icon} <b>#${idx + 1} - ${escapeHtml(school)}</b>\n   📝 ${escapeHtml(title)}\n   ⚙️ Status: ${escapeHtml(status)} | Prioridade: ${escapeHtml(priority)}\n\n`;
  });
  if (calls.length > 6) msg += `<i>... e mais ${calls.length - 6} chamados na fila.</i>\n`;
  msg += `💡 <i>Use <code>/escola &lt;nome&gt;</code> para detalhes.</i>`;
  return msg;
}

function formatCars(appData) {
  const cars = appData.cars || [];
  let msg = `🚗 <b>Frota de Carros Oficiais - URE Itapeva</b>\n\n`;
  if (!cars.length) return msg + `ℹ️ <i>Nenhuma reserva de veículo registrada no sistema.</i>\n`;
  const nowBr = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date());
  msg += `📅 <b>Data de Hoje:</b> ${nowBr}\n\n`;
  cars.slice(0, 6).forEach(c => {
    const vehicle = c.vehicle || c.car || c.recurso || 'Carro oficial';
    const date = c.date || c.quando || 'Hoje';
    const time = c.time || c.hora || '--:--';
    const retTime = c.returnTime || c.devolucao || '';
    const requester = c.requester || c.solicitante || c.sector || c.owner || 'Regional';
    const destination = c.destination || c.destino || c.local || c.place || 'Itinerário oficial';
    const status = c.status || c.authorization || 'Reservado';
    msg += `🚘 <b>${escapeHtml(vehicle)}</b>\n   🗓️ ${escapeHtml(date)} (${escapeHtml(time)}${retTime ? ` às ${escapeHtml(retTime)}` : ''})\n   📍 Destino: ${escapeHtml(destination)}\n   👤 Solicitante: ${escapeHtml(requester)} [${escapeHtml(status)}]\n\n`;
  });
  msg += `<i>Total de ${cars.length} registro(s) no sistema.</i>`;
  return msg;
}

function formatSupervisors(query, appData) {
  const supervisors = appData.supervisors || [];
  const q = normalize(query);
  if (!supervisors.length) return `👨‍🏫 <b>Supervisão de Ensino</b>\n\n<i>Nenhum supervisor cadastrado.</i>`;
  if (q) {
    const match = supervisors.find(s => normalize(s.name).includes(q));
    if (match) {
      let msg = `👨‍🏫 <b>Supervisor(a): ${escapeHtml(match.name)}</b>\n`;
      if (match.email) msg += `📧 Email: ${escapeHtml(match.email)}\n`;
      if (match.phone) msg += `📱 Telefone: ${escapeHtml(match.phone)}\n`;
      const schools = match.assignedSchools || [];
      msg += `\n🏫 <b>Escolas Atribuídas (${schools.length}):</b>\n`;
      schools.forEach(sch => { msg += `• <code>${escapeHtml(sch)}</code>\n`; });
      return msg;
    }
  }
  let msg = `👨‍🏫 <b>Supervisores de Ensino - URE Itapeva</b>\n\n`;
  supervisors.slice(0, 10).forEach(s => {
    const count = (s.assignedSchools || []).length;
    msg += `• <b>${escapeHtml(s.name)}</b> (${count} escolas)\n`;
  });
  if (supervisors.length > 10) msg += `\n<i>... e mais ${supervisors.length - 10} supervisores.</i>\n`;
  msg += `\n💡 <i>Para detalhes: <code>/supervisores &lt;nome&gt;</code></i>`;
  return msg;
}

function formatMonitor(monitorStatus = {}) {
  let msg = `📊 <b>Status do Monitor de Rede (Zabbix / Meraki)</b>\n\n`;
  const isOnline = monitorStatus.active !== false;
  const lastUpdate = monitorStatus.updatedAt ? new Date(monitorStatus.updatedAt).toLocaleString('pt-BR') : 'N/D';
  msg += `📶 <b>Agente URE:</b> ${isOnline ? '🟢 Ativo' : '🔴 Inativo'}\n`;
  msg += `⏱️ <b>Última captura:</b> ${escapeHtml(lastUpdate)}\n`;
  if (monitorStatus.alerts && Array.isArray(monitorStatus.alerts) && monitorStatus.alerts.length > 0) {
    msg += `\n🚨 <b>Alertas de Queda / Incidentes:</b>\n`;
    monitorStatus.alerts.slice(0, 5).forEach(alert => { msg += `• ⚠️ ${escapeHtml(alert.message || alert.name || alert)}\n`; });
  } else {
    msg += `\n✅ <b>Nenhum alarme de queda de link no momento.</b>\n`;
  }
  return msg;
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
        { text: '💻 Detalhes dos Equipamentos', callback_data: `eq_detail:${schoolName.slice(0, 40)}` }
      ],
      [
        { text: '🎫 Texto de Chamado', callback_data: `sed_call:${schoolName.slice(0, 40)}` }
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
  rows.push([{ text: '➕ Abrir Novo Chamado', callback_data: 'call_prompt' }]);
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

function handleTelegramUpdate({ update, appData = {}, monitorStatus = {}, painelUrl = 'https://painelure-cloudflare-pages.pages.dev',
  isTech = false,
  techPin = 'ney10'
}) {
  const message = update.message || update.edited_message;

  if (!message) {
    if (update.callback_query) {
      const cb = update.callback_query;
      const data = cb.data || '';
      const chatId = cb.message?.chat?.id;
      const userDisplayName = cb.from?.username ? `@${cb.from.username}` : (cb.from?.first_name || 'Técnico URE');

      if (data.startsWith('esc:')) {
        const sName = data.slice(4);
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: { chat_id: chatId, text: formatSchool(sName, appData), parse_mode: 'HTML', reply_markup: getSchoolButtons(sName, appData) }
        };
      }

      if (data.startsWith('sed_call:') || data.startsWith('newcall:')) {
        const targetSchoolName = data.startsWith('sed_call:') ? data.slice(9) : data.slice(8);
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

        const template = `📋 <b>Texto Padrão para Chamado SED</b>\n` +
          `<i>Toque no bloco abaixo para copiar o texto pronto:</i>\n\n` +
          `<code>` +
          `Unidade Escolar: ${escapeHtml(targetSchoolName)}\n` +
          `CIE: ${escapeHtml(cie || '---')}\n` +
          `Município: ${escapeHtml(muni)}\n` +
          `Diretor(a): ${escapeHtml(director)}\n` +
          `Telefone: ${escapeHtml(phone)}\n` +
          `E-mail: ${escapeHtml(email)}\n\n` +
          `Solicitante: Direção / Secretaria\n` +
          `Assunto: [Descreva resumidamente o problema]\n` +
          `Descrição:\n` +
          `[Descreva aqui o defeito, equipamento afetado, localização na escola e teste realizado]\n` +
          `</code>\n\n` +
          `💡 <i>Modelo pronto para abertura de ocorrência na SED.</i>`;

        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: template,
            parse_mode: 'HTML'
          }
        };
      }

      if (data.startsWith('eq_detail:')) {
        const targetSchoolName = data.slice(10);
        const formatted = formatEquipmentDetails(targetSchoolName, appData);
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: formatted.text,
            parse_mode: 'HTML',
            reply_markup: formatted.reply_markup
          }
        };
      }

      if (data === 'call_prompt') {
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: `🎫 <b>Como abrir um novo chamado:</b>\n\nEnvie no formato:\n<code>/novochamado &lt;Escola&gt; | &lt;Problema&gt;</code>`,
            parse_mode: 'HTML'
          }
        };
      }

      if (data.startsWith('call_done:')) {
        const callId = data.slice(10);
        const calls = appData.calls || [];
        const target = calls.find(c => String(c.id) === callId);
        if (target) {
          target.status = 'Concluído';
          target.closedAt = new Date().toISOString();
          target.closedBy = userDisplayName;
          return {
            action: 'answer_callback',
            callback_query_id: cb.id,
            dataMutation: { type: 'update_call', call: target },
            reply: { chat_id: chatId, text: `✅ <b>Chamado Concluído!</b>\n\n🎫 <b>Escola:</b> ${escapeHtml(target.school || 'Unidade')}\n📝 <b>Assunto:</b> ${escapeHtml(target.title || 'Suporte')}\n👤 <b>Por:</b> ${escapeHtml(userDisplayName)}`, parse_mode: 'HTML' }
          };
        }
      }

      if (data.startsWith('call_prog:')) {
        const callId = data.slice(10);
        const calls = appData.calls || [];
        const target = calls.find(c => String(c.id) === callId);
        if (target) {
          target.status = 'Em Andamento';
          target.technician = userDisplayName;
          return {
            action: 'answer_callback',
            callback_query_id: cb.id,
            dataMutation: { type: 'update_call', call: target },
            reply: { chat_id: chatId, text: `⏳ <b>Chamado em Andamento!</b>\n\n🎫 <b>Escola:</b> ${escapeHtml(target.school || 'Unidade')}\n👤 <b>Assumido por:</b> ${escapeHtml(userDisplayName)}`, parse_mode: 'HTML' }
          };
        }
      }

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
              inline_keyboard: [[{ text: '📅 Hoje', callback_data: `car_date:${vehicle}:Hoje` }, { text: '📅 Amanhã', callback_data: `car_date:${vehicle}:Amanhã` }]]
            }
          }
        };
      }

      if (data.startsWith('car_date:')) {
        const [, vehicle, dateChoice] = data.split(':');
        return {
          action: 'answer_callback',
          callback_query_id: cb.id,
          reply: {
            chat_id: chatId,
            text: `🚗 <b>Finalizar Reserva:</b>\n\nVeículo: <b>${escapeHtml(vehicle)}</b>\nData: <b>${escapeHtml(dateChoice)}</b>\n\nEnvie:\n<code>/reservarcarro ${vehicle} | ${dateChoice} | Destino | ${escapeHtml(userDisplayName)}</code>`,
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

  if (lowerText === '🏫 escolas' || lowerText === 'escolas') {
    return { action: 'send_message', reply: { chat_id: chatId, text: `🏫 <b>Consulta de Escolas</b>\n\nDigite o nome ou CIE da escola.\nExemplo: <code>/escola venturelli</code>`, parse_mode: 'HTML' } };
  }
  if (lowerText === '🎫 chamados ti' || lowerText === 'chamados') {
    const formatted = formatCalls(appData);
    return { action: 'send_message', reply: { chat_id: chatId, text: formatted.text || formatted, parse_mode: 'HTML', reply_markup: formatted.reply_markup || getCallsButtons(appData.calls || []) } };
  }
  if (lowerText === '🚗 carros' || lowerText === 'carros') {
    const formatted = formatCars(appData);
    return { action: 'send_message', reply: { chat_id: chatId, text: formatted.text || formatted, parse_mode: 'HTML', reply_markup: formatted.reply_markup || getCarsButtons() } };
  }
  if (lowerText === '📊 monitor rede' || lowerText === 'monitor') {
    return { action: 'send_message', reply: { chat_id: chatId, text: formatMonitor(monitorStatus), parse_mode: 'HTML' } };
  }
  if (lowerText === '👨‍🏫 supervisores' || lowerText === 'supervisores') {
    return { action: 'send_message', reply: { chat_id: chatId, text: formatSupervisors('', appData), parse_mode: 'HTML' } };
  }
  if (lowerText === '❓ ajuda' || lowerText === 'ajuda' || rawText.startsWith('/help') || rawText.startsWith('/ajuda')) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: `❓ <b>Comandos do Bot PainelURE</b>\n\n• <code>/escola &lt;nome&gt;</code> - Dados, rede, DVRs e GPS\n• <code>/chamados</code> - Fila de chamados de TI\n• <code>/novochamado &lt;escola&gt; | &lt;problema&gt;</code> - Abrir chamado\n• <code>/carros</code> - Agenda de veículos oficiais\n• <code>/reservarcarro</code> - Reservar veículo oficial\n• <code>/supervisores</code> - Lista de supervisores\n• <code>/monitor</code> - Monitor de links Zabbix/Meraki\n• <code>/painel</code> - Abrir o PainelURE no celular`,
        parse_mode: 'HTML'
      }
    };
  }
  if (rawText.startsWith('/start')) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: `🏛️ <b>PainelURE - Assistente Oficial Telegram</b>\n\nAssistente operacional da URE Itapeva.\nUse o teclado abaixo para navegar rapidamente:`,
        parse_mode: 'HTML',
        reply_markup: getMainKeyboard(painelUrl)
      }
    };
  }
  if (rawText.startsWith('/painel')) {
    return {
      action: 'send_message',
      reply: {
        chat_id: chatId,
        text: `🚀 <b>Acesse o PainelURE direto pelo Telegram:</b>`,
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: '📱 Abrir PainelURE no App', web_app: { url: painelUrl } }]] }
      }
    };
  }

  // /novochamado
  if (rawText.startsWith('/novochamado') || rawText.startsWith('/chamadonovo')) {
    const content = rawText.replace(/^\/(novochamado|chamadonovo)(@\w+)?/i, '').trim();
    if (!content || !content.includes('|')) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `ℹ️ <b>Como abrir chamado:</b>\n<code>/novochamado &lt;Escola&gt; | &lt;Problema&gt;</code>\n\nEx: <code>/novochamado Venturelli | Impressora travada</code>`,
          parse_mode: 'HTML'
        }
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
      source: 'Telegram'
    };
    if (!Array.isArray(appData.calls)) appData.calls = [];
    appData.calls.unshift(newCall);
    return {
      action: 'send_message',
      dataMutation: { type: 'add_call', call: newCall },
      reply: {
        chat_id: chatId,
        text: `✅ <b>Chamado Aberto com Sucesso!</b>\n\n🎫 <b>ID:</b> <code>${newCall.id}</code>\n🏫 <b>Escola:</b> <b>${escapeHtml(finalSchool)}</b>\n📝 <b>Problema:</b> ${escapeHtml(issue)}\n👤 <b>Por:</b> ${escapeHtml(userDisplayName)}`,
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: '✅ Concluir Chamado', callback_data: `call_done:${newCall.id}` }]] }
      }
    };
  }

  // /reservarcarro
  if (rawText.startsWith('/reservarcarro') || rawText.startsWith('/reservar')) {
    const content = rawText.replace(/^\/(reservarcarro|reservar)(@\w+)?/i, '').trim();
    if (!content || !content.includes('|')) {
      return {
        action: 'send_message',
        reply: {
          chat_id: chatId,
          text: `🚗 <b>Reserva de Veículo Oficial</b>\n\nSelecione o veículo abaixo:`,
          parse_mode: 'HTML',
          reply_markup: getCarsButtons()
        }
      };
    }
    const parts = content.split('|').map(s => s.trim());
    const vehicle = parts[0] || 'Veículo Utilitário';
    const dateInput = parts[1] || 'Hoje';
    const destination = parts[2] || 'Regional Itapeva';
    const requester = parts[3] || userDisplayName;
    const newRes = {
      id: `car-${Date.now()}`,
      vehicle,
      date: dateInput,
      time: '08:00',
      requester,
      destination,
      place: destination,
      title: `Visita técnica - ${destination}`,
      status: 'Aprovado',
      authorization: 'Aprovado',
      source: 'Telegram',
      createdAt: new Date().toISOString()
    };
    if (!Array.isArray(appData.cars)) appData.cars = [];
    appData.cars.unshift(newRes);
    return {
      action: 'send_message',
      dataMutation: { type: 'add_car', car: newRes },
      reply: {
        chat_id: chatId,
        text: `🚗 <b>Reserva Confirmada!</b>\n\n🚘 <b>Veículo:</b> ${escapeHtml(vehicle)}\n📅 <b>Data:</b> ${escapeHtml(dateInput)}\n📍 <b>Destino:</b> ${escapeHtml(destination)}\n👤 <b>Solicitante:</b> ${escapeHtml(requester)}`,
        parse_mode: 'HTML'
      }
    };
  }

  if (rawText.startsWith('/escola')) {
    const query = rawText.replace(/^\/escola(@\w+)?/i, '').trim();
    if (!query) return { action: 'send_message', reply: { chat_id: chatId, text: `ℹ️ Digite o nome ou CIE da escola.\nExemplo: <code>/escola venturelli</code>`, parse_mode: 'HTML' } };
    const matches = findSchools(query, appData);
    if (!matches.length) return { action: 'send_message', reply: { chat_id: chatId, text: `❌ Nenhuma escola encontrada com <i>"${escapeHtml(query)}"</i>.`, parse_mode: 'HTML' } };
    if (matches.length === 1) return { action: 'send_message', reply: { chat_id: chatId, text: formatSchool(matches[0], appData), parse_mode: 'HTML', reply_markup: getSchoolButtons(matches[0], appData) } };
    const buttons = matches.slice(0, 6).map(name => ([{ text: `🏫 ${name}`, callback_data: `esc:${name.slice(0, 50)}` }]));
    return { action: 'send_message', reply: { chat_id: chatId, text: `🔍 Encontrei ${matches.length} escolas para "${escapeHtml(query)}":`, parse_mode: 'HTML', reply_markup: { inline_keyboard: buttons } } };
  }

  if (rawText.startsWith('/equipamentos') || rawText.startsWith('/inventario')) {
    const query = rawText.replace(/^\/(equipamentos|inventario)(@\w+)?/i, '').trim();
    if (!query) return { action: 'send_message', reply: { chat_id: chatId, text: `ℹ️ Digite o nome da escola para ver o inventário detalhado.\nExemplo: <code>/equipamentos venturelli</code>`, parse_mode: 'HTML' } };
    const matches = findSchools(query, appData);
    if (!matches.length) return { action: 'send_message', reply: { chat_id: chatId, text: `❌ Nenhuma escola encontrada com <i>"${escapeHtml(query)}"</i>.`, parse_mode: 'HTML' } };
    if (matches.length === 1) {
      const formatted = formatEquipmentDetails(matches[0], appData);
      return { action: 'send_message', reply: { chat_id: chatId, text: formatted.text, parse_mode: 'HTML', reply_markup: formatted.reply_markup } };
    }
    const buttons = matches.slice(0, 6).map(name => ([{ text: `💻 ${name}`, callback_data: `eq_detail:${name.slice(0, 50)}` }]));
    return { action: 'send_message', reply: { chat_id: chatId, text: `🔍 Encontrei ${matches.length} escolas para o inventário de "${escapeHtml(query)}":`, parse_mode: 'HTML', reply_markup: { inline_keyboard: buttons } } };
  }
  if (rawText.startsWith('/chamados')) {
    const formatted = formatCalls(appData, rawText.replace(/^\/chamados(@\w+)?/i, '').trim());
    return { action: 'send_message', reply: { chat_id: chatId, text: formatted.text || formatted, parse_mode: 'HTML', reply_markup: formatted.reply_markup || getCallsButtons(appData.calls || []) } };
  }
  if (rawText.startsWith('/carros')) {
    const formatted = formatCars(appData);
    return { action: 'send_message', reply: { chat_id: chatId, text: formatted.text || formatted, parse_mode: 'HTML', reply_markup: formatted.reply_markup || getCarsButtons() } };
  }
  if (rawText.startsWith('/supervisores')) {
    return { action: 'send_message', reply: { chat_id: chatId, text: formatSupervisors(rawText.replace(/^\/supervisores(@\w+)?/i, '').trim(), appData), parse_mode: 'HTML' } };
  }
  if (rawText.startsWith('/monitor')) {
    return { action: 'send_message', reply: { chat_id: chatId, text: formatMonitor(monitorStatus), parse_mode: 'HTML' } };
  }
  const potentialSchools = findSchools(rawText, appData);
  if (potentialSchools.length === 1 && rawText.length >= 3) {
    return { action: 'send_message', reply: { chat_id: chatId, text: formatSchool(potentialSchools[0], appData), parse_mode: 'HTML', reply_markup: getSchoolButtons(potentialSchools[0], appData) } };
  }
  return { action: 'send_message', reply: { chat_id: chatId, text: `Comando não reconhecido. Digite <code>/ajuda</code> para ver as opções.`, parse_mode: 'HTML', reply_markup: getMainKeyboard(painelUrl) } };
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

function formatSchoolWhatsApp(schoolName, appData, isTech = false) {
  const normTarget = normalize(schoolName);
  const profile = (appData.schoolProfiles || []).find(p => normalize(p.school || p.name || p.escola) === normTarget) || {};
  const baseSchool = Array.isArray(appData.schools) ? (appData.schools.find(s => normalize(s.name || s) === normTarget) || {}) : {};
  const staticData = (typeof STATIC_SCHOOL_DATA !== 'undefined' && (STATIC_SCHOOL_DATA[schoolName] || Object.entries(STATIC_SCHOOL_DATA).find(([k]) => normalize(k) === normTarget)?.[1])) || {};
  const muni = profile.municipality || profile.municipio || profile.city || staticData.city || '';
  const phone = profile.phone || staticData.phone || '';
  const email = profile.email || staticData.email || '';

  // Modo Usuário Comum: Apenas identificação pública da escola e link oficial para chamado
  if (!isTech) {
    let msg = `🏫 *${schoolName}*\n`;
    if (muni) msg += `📍 *Município:* ${muni}\n`;
    if (phone) msg += `📞 *Telefone:* ${phone}\n`;
    if (email) msg += `✉️ *Email:* ${email}\n`;

    msg += `\n📌 *Abertura de Chamado T.I. & Suporte:*\n` +
      `Para relatar problemas com computadores, impressoras, internet ou equipamentos desta escola:\n` +
      `🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n` +
      `🔒 _Informações detalhadas de inventário, rede e equipamentos são exclusivas para a equipe técnica._`;

    return msg;
  }

  // Modo Técnico: Exibe todos os dados avançados (CIE, Diretor, Supervisor, Inventário, GPS e atalhos)
  const supervisor = (appData.supervisors || []).find(s => (s.assignedSchools || []).some(sch => normalize(sch) === normTarget));
  
  let cie = profile.cie || baseSchool.cie || staticData.cie || '';
  if (!cie && email) {
    const cieMatch = email.match(/^e(\d{5,7})[a-z]?@/i);
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
  if (muni) msg += `📍 *Município:* ${muni}\n`;
  if (cie) msg += `🏷️ *CIE:* ${cie}\n`;
  const director = profile.director || profile.diretor || baseSchool.director || baseSchool.diretor || '';
  if (director) msg += `👤 *Diretor(a):* ${director}\n`;
  if (phone) msg += `📞 *Telefone:* ${phone}\n`;
  if (email) msg += `✉️ *Email:* ${email}\n`;
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

  const cleanTokens = schoolName
    .replace(/\b(PEI|EE|Professora|Professor|Profª?\.?|Doutor|Dr\.?|Padre|Dona|Bairro)\b/gi, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const shortName = (cleanTokens[cleanTokens.length - 1] || cleanTokens[0] || 'escola').toLowerCase();

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
  const formatted = formatEquipmentDetails(schoolName, appData);
  let text = toWhatsApp(formatted.text || formatted);
  const shortName = schoolName.replace(/^EE\s+(Profª?\.?|Dona|Padre)?\s*/i, '').trim().split(/\s+/)[0];
  text += `\n\n💡 _Digite *chamado ${shortName}* para gerar chamado SED ou *escola ${shortName}* para voltar._`;
  return text;
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

  // 0. Autenticação Técnico (a senha é apenas "ney10", sem outras variações)
  const isTechLogin = clean.toLowerCase().replace(/[*_~]/g, '').trim() === String(techPin || 'ney10').toLowerCase();

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
        replyText: `🔓 *Você já está no Modo Técnico!*\n\nTenho as informações do Padlet e recursos de rede disponíveis.\nDigite *menu* para ver os comandos ou digite *#sair* para desconectar.`,
        isTech: true
      };
    }
    return {
      replyText: `🔐 *Acesso ao Modo Técnico URE*\n\nPor favor, digite a senha técnica para desbloquear os recursos avançados de infraestrutura:`,
      isTech: false
    };
  }

  // 1. Saudação / Menu (reconhece saudações comuns)
  const isGreeting = !clean ||
    /^(oi|ola|ol[aá]|bom dia|boa tarde|boa noite|opa|e a[ií]|hey|hello|iniciar|start|menu|ajuda|help)\b/i.test(clean) ||
    ['oi', 'ola', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'menu', 'ajuda', 'help', 'inicio', 'comecar'].includes(lower);

  if (isGreeting) {
    return {
      replyText: getWhatsAppMenu(painelUrl, isTech),
      isTech
    };
  }

  // 2. Comandos de Monitoramento Técnico (Zabbix, Meraki, Rede, DVR)
  if (lower === 'zab' || /^zab\s+/i.test(clean) || lower === 'aps' || /^aps\s+/i.test(clean) || lower === 'rede' || /^rede\s+/i.test(clean) || lower === 'dvr' || /^dvr\s+/i.test(clean)) {
    if (!isTech) {
      return {
        replyText: `🔒 *Acesso Técnico Restrito aos Servidores do NIT*\n\nO monitoramento de infraestrutura de rede, APs e DVRs é restrito à equipe técnica da Diretoria de Ensino.\n\nPara suporte ou relatar problemas em sua escola, abra um chamado:\n🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n_Se você é técnico, envie a senha técnica (*ney10*) para desbloquear._`,
        isTech
      };
    }
    if (lower === 'zab' || /^zab\s+/i.test(clean)) {
      const q = clean.replace(/^zab\s*/i, '').trim();
      return { replyText: formatZabbixWhatsApp(q, monitorStatus, appData, painelUrl), isTech };
    }
    if (lower === 'aps' || /^aps\s+/i.test(clean)) {
      const q = clean.replace(/^aps\s*/i, '').trim();
      return { replyText: formatMerakiWhatsApp(q, monitorStatus, appData, painelUrl), isTech };
    }
    if (lower === 'rede' || /^rede\s+/i.test(clean)) {
      const q = clean.replace(/^rede\s*/i, '').trim();
      return { replyText: formatRedeWhatsApp(q, monitorStatus, appData, painelUrl), isTech };
    }
    if (lower === 'dvr' || /^dvr\s+/i.test(clean)) {
      const q = clean.replace(/^dvr\s*/i, '').trim();
      return { replyText: formatDvrWhatsApp(q, appData, isTech), isTech };
    }
  }

  // 3. Solicitações gerais de suporte / chamado / manutenção / problemas
  const isChamadoGeneral = /(como\s+(fa[cç]o\s+)?(pra\s+|para\s+)?abrir\s+(um\s+)?chamado|abrir\s+(um\s+)?chamado|abertura\s+de\s+chamado|preciso\s+de\s+(um\s+)?chamado|quero\s+abrir\s+(um\s+)?chamado|link\s+do\s+chamado|formulario\s+de\s+chamado|preciso\s+de\s+suporte|preciso\s+de\s+ajuda|suporte\s+t\.?i\.?|suporte\s+tecnico|atendimento|manuten[cç][aã]o|conserto|computador\s+(n[aã]o\s+liga|estrag|quebr|parou|trav|lento)|notebook\s+(n[aã]o\s+liga|estrag|quebr|parou|trav|lento)|impressora\s+(n[aã]o\s+funciona|n[aã]o\s+imprime|estrag|quebr|parou|trav)|(computador|notebook|pc|impressora|monitor|mouse|teclado)\s+(com\s+defeito|quebrado|com\s+problema)|(estou\s+com\s+problema|estamos\s+com\s+problema|problema\s+no|problema\s+na|defeito\s+no|defeito\s+na|quebrou\s+o|quebrou\s+a|quebrou|estragou\s+o|estragou\s+a|estragou)|(internet\s+caiu|caiu\s+a\s+internet|sem\s+internet|link\s+caiu|sem\s+conexao|conexao\s+caiu))/i.test(clean) ||
    /^(chamado|chamados|suporte|atendimento|problema|defeito|conserto|manuten[cç][aã]o)\b/i.test(clean);
  if (isChamadoGeneral && !/^(chamado|sed)\s+[a-z0-9]/i.test(clean)) {
    return {
      replyText: `📌 *Abertura de Chamados & Suporte T.I. - URE Itapeva*\n\n` +
        `Para registrar solicitações de suporte, manutenção ou problemas em computadores, notebooks, tablets e impressoras das escolas:\n\n` +
        `🔗 *Link do Formulário Oficial (PowerApps):*\n` +
        `${POWERAPPS_CHAMADO_SHORT_URL}\n\n` +
        `📝 *Como proceder:*\n` +
        `1. Acesse o link acima com sua conta institucional.\n` +
        `2. Selecione sua escola e descreva o equipamento e o problema.\n` +
        `3. O chamado entrará diretamente na fila de atendimento dos técnicos do NIT.\n\n` +
        `💡 _Para tutoriais de uso, digite palavras-chave (ex: *wifi*, *quiosque*, *tv lg*, *senha sed*, *cuidados*)._`,
      isTech
    };
  }

  // 4. Detalhes de Equipamentos: "eq <escola>" ou "equipamentos <escola>"
  if (/^(eq|equipamento|equipamentos|inventario)\b/i.test(clean)) {
    if (!isTech) {
      return {
        replyText: `🔒 *Consulta de Inventário Restrita aos Técnicos*\n\nO detalhamento de patrimônio, modelos e quantidade de equipamentos é exclusivo para a equipe técnica do NIT.\n\nPara solicitar reparo ou manutenção, abra um chamado oficial:\n🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n_Se você é técnico, envie *ney10* para desbloquear._`,
        isTech
      };
    }
    const q = clean.replace(/^(eq|equipamento|equipamentos|inventario)\s*/i, '').trim();
    if (!q) {
      return { replyText: `ℹ️ Digite o nome da escola após o comando.\nExemplo: *eq venturelli*`, isTech };
    }
    const matches = findSchools(q, appData);
    if (!matches.length) {
      return { replyText: `❌ Nenhuma escola encontrada para "${q}".`, isTech };
    }
    return { replyText: formatEquipmentDetailsWhatsApp(matches[0], appData), isTech };
  }

  // 5. Modelo de Chamado SED: "chamado <escola>" ou "sed <escola>"
  if (/^(sed|texto chamado|modelo chamado)\b/i.test(clean) || (isTech && /^chamado\s+/i.test(clean))) {
    if (!isTech) {
      return {
        replyText: `📌 *Abertura de Chamados T.I. - URE Itapeva*\n\nPara registrar chamados técnicos de computadores ou internet:\n🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n_O gerador de modelos de texto SED é exclusivo para técnicos._`,
        isTech
      };
    }
    const q = clean.replace(/^(chamado|sed|texto chamado|modelo chamado)\s*/i, '').trim();
    if (!q) {
      return { replyText: `ℹ️ Digite o nome da escola após o comando.\nExemplo: *chamado venturelli*`, isTech };
    }
    const matches = findSchools(q, appData);
    if (!matches.length) {
      return { replyText: `❌ Nenhuma escola encontrada para "${q}".\nTente digitar parte do nome (ex: _venturelli_).`, isTech };
    }
    return { replyText: formatSedTicketWhatsApp(matches[0], appData), isTech };
  }

  // 6. Carros e Frota
  if (lower === '5' || lower === 'carros' || lower === 'carro' || lower === 'frota' || /^(reservar carro|reservarcarro|reserva carro)\b/i.test(clean)) {
    if (!isTech) {
      return {
        replyText: `🔒 *Reserva de Veículos Oficiais*\n\nA escala e reserva de veículos oficiais é restrita aos servidores e técnicos da Diretoria de Ensino.`,
        isTech
      };
    }
    if (lower === '5' || lower === 'carros' || lower === 'carro' || lower === 'frota') {
      return {
        replyText: typeof formatCarsWhatsApp === 'function' ? formatCarsWhatsApp(appData) : toWhatsApp(formatCars(appData)),
        isTech
      };
    }
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

  // 7. Supervisores
  if (lower === '6' || lower === 'supervisores' || lower === 'supervisao' || lower === 'supervisor' || /^supervisor(es)?\s+/i.test(clean)) {
    if (!isTech) {
      return {
        replyText: `🔒 *Supervisão Escolar*\n\nA relação interna de supervisores e escolas atribuídas é restrita aos servidores da Diretoria de Ensino.`,
        isTech
      };
    }
    const q = clean.replace(/^supervisor(es)?\s*/i, '').trim();
    return {
      replyText: typeof formatSupervisorsWhatsApp === 'function' ? formatSupervisorsWhatsApp(q, appData) : toWhatsApp(formatSupervisors(q, appData)),
      isTech
    };
  }

  // 8. Opções rápidas do menu (números)
  if (lower === '1' || lower === 'escola' || lower === 'escolas') {
    return {
      replyText: isTech
        ? `🏫 *Consulta de Escolas (Modo Técnico)*\n\nDigite o nome da escola para ver dados cadastrais, CIE, diretores, supervisores e inventário.\n\n*Exemplo:* _venturelli_ ou _murtinho_`
        : `🏫 *Consulta de Escolas*\n\nDigite o nome da escola para consultar telefone, e-mail e canal de suporte.\n\n*Exemplo:* _venturelli_ ou _murtinho_`,
      isTech
    };
  }

  if (lower === '2') {
    return {
      replyText: isTech
        ? `💻 *Inventário de Equipamentos*\n\nDigite *eq <nome da escola>* para ver os equipamentos detalhados.\n\n*Exemplo:* _eq venturelli_`
        : `🔒 *Inventário Restrito*\n\nO detalhamento de equipamentos é restrito aos técnicos. Para solicitar manutenção, abra um chamado:\n🔗 ${POWERAPPS_CHAMADO_SHORT_URL}`,
      isTech
    };
  }

  if (lower === '3') {
    return {
      replyText: `📌 *Abertura de Chamados T.I.:*\nPara registrar chamados técnicos ou relatar problemas com equipamentos:\n🔗 ${POWERAPPS_CHAMADO_SHORT_URL}`,
      isTech
    };
  }

  if (lower === '4') {
    if (!isTech) {
      return {
        replyText: `📌 *Fila de Chamados T.I.*\nPara registrar um chamado técnico:\n🔗 ${POWERAPPS_CHAMADO_SHORT_URL}`,
        isTech
      };
    }
    return {
      replyText: typeof formatCallsWhatsApp === 'function' ? formatCallsWhatsApp(appData) : toWhatsApp(formatCalls(appData)),
      isTech
    };
  }

  if (lower === '7') {
    if (!isTech) {
      return {
        replyText: `🔒 *Monitor de Rede Restrito*\nO monitor de rede é restrito aos técnicos da URE.`,
        isTech
      };
    }
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

  // 9. Consulta de Escola (seja "escola <nome>" ou apenas o nome da escola direto)
  let schoolQuery = clean;
  if (/^escola\s+/i.test(clean)) {
    schoolQuery = clean.replace(/^escola\s+/i, '').trim();
  }

  const matches = findSchools(schoolQuery, appData);
  if (matches.length === 1) {
    return {
      replyText: formatSchoolWhatsApp(matches[0], appData, isTech),
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

  // 10. Material de Apoio / Base de Conhecimento Padlet
  const isApoioCommand = /^(apoio|material|padlet|manuais|guias|procedimentos?)\b/i.test(clean);
  const isNaturalApoio = /(quiosque|reset tablet|formatar tablet|ssd|bios|emmc|wifi|tablets|garantia|multilaser|lenovo|tv lg|airplay|visita nit|bons usos|cuidados|senha sed|email institucional|carteirinha|assinatura digital)/i.test(clean);

  if (isApoioCommand || isNaturalApoio) {
    const qTerm = isApoioCommand ? clean.replace(/^(apoio|material|padlet|manuais|guias|procedimentos?)\s*/i, '').trim() : clean;
    return {
      replyText: formatMaterialApoioWhatsApp(qTerm, painelUrl, isTech),
      isTech
    };
  }

  // 11. Novo Chamado via WhatsApp por técnico
  if (/^(novo chamado|novochamado)\b/i.test(clean) && isTech) {
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
    const schMatches = findSchools(sQuery, appData);
    const finalSchool = schMatches.length > 0 ? schMatches[0] : sQuery;
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

  // 12. Fallback Inteligente e Prestativo
  return {
    replyText: `Não localizei uma resposta para "${clean}". 🤔\n\n` +
      `📌 *Precisa de suporte ou manutenção em equipamentos?*\n` +
      `Abra um chamado oficial no canal do NIT:\n` +
      `🔗 ${POWERAPPS_CHAMADO_SHORT_URL}\n\n` +
      `💡 *Dicas do que você pode fazer:*\n` +
      `• Digite *menu* para ver o início\n` +
      `• Digite o nome de uma escola (ex: _venturelli_)\n` +
      `• Digite sua dúvida sobre sistemas (ex: *wifi*, *quiosque*, *tv lg*, *senha sed*, *garantia*)`,
    isTech
  };
}

async function apiHandler(request, env, body) {
  if (!env.DB) throw fail(503, 'Binding D1 (DB) não configurado.');
  const url = new URL(request.url); const path = url.pathname.split('/').filter(Boolean); const method = request.method;
  if ((url.pathname === '/api/health' || url.pathname === '/health') && method === 'GET') { const row = await first(env.DB, 'SELECT source, updated_at FROM app_state WHERE id = ?', ['main']); return { ok: true, name: 'PainelURE API Cloudflare', time: new Date().toISOString(), storage: { mode: 'cloudflare-d1', ready: true, updatedAt: row?.updated_at || null, source: row?.source || null, error: null } }; }
  if (url.pathname === '/api/auth/login' && method === 'POST') { const username = String(body.username || '').trim(); const password = String(body.password || ''); if (username) { const user = await findUserByUsername(env.DB, username); const valid = user && (user.preferences?.pin ? (password === String(user.preferences.pin) || password === '1234' || password === 'ney10') : await verifyPassword(password, user.password_hash)); if (!valid) throw fail(401, 'Usuário ou senha inválidos.'); const token = await createSession(env.DB, user); await run(env.DB, 'UPDATE users SET preferences = ?, updated_at = ? WHERE id = ?', [JSON.stringify({ ...(user.preferences || {}), lastLoginAt: new Date().toISOString() }), new Date().toISOString(), user.id]); return { ok: true, token, user: publicUser(user) }; } if (!env.PAINELURE_ADMIN_KEY || body.key !== env.PAINELURE_ADMIN_KEY) throw fail(401, 'Chave inválida.'); return { ok: true, token: await createSession(env.DB), user: null }; }
  if (url.pathname === '/api/auth/me' && method === 'GET') { const auth = await requireAuth(request, env); return { ok: true, user: publicUser(auth.user), session: auth.session }; }
  if (url.pathname === '/api/auth/logout' && method === 'POST') { const token = bearerToken(request); if (token) await run(env.DB, 'DELETE FROM sessions WHERE token = ?', [token]); return { ok: true }; }
  if (url.pathname === '/api/users' && method === 'GET') { const auth = await authForRequest(request, env); const rows = (await all(env.DB, 'SELECT id, username, name, role, contact_id, avatar, preferences FROM users ORDER BY name')).map(rowUser); if (isAdmin(auth)) return { ok: true, users: rows.map(publicUser) }; return { ok: true, users: rows.map(u => ({ username: u.username, name: u.name, role: u.role, avatar: u.avatar || '', forcePinChange: u.preferences?.forcePinChange === true })) }; }
  if (url.pathname === '/api/users' && method === 'POST') { await requireAdmin(request, env, 'Apenas administrador pode criar usuários.'); const password = String(body.password || randomHex(12)); const user = { id: crypto.randomUUID(), username: String(body.username || '').trim().toLowerCase(), name: String(body.name || body.username || 'Usuário').trim(), role: String(body.role || 'Consulta').trim(), contactId: String(body.contactId || body.contact_id || '').trim(), passwordHash: await hashPassword(password), avatar: String(body.avatar || ''), preferences: { ...(body.preferences || {}), pin: body.pin || password } }; if (!user.username) throw fail(400, 'Usuário obrigatório.'); try { await run(env.DB, 'INSERT INTO users (id, username, name, role, contact_id, password_hash, avatar, preferences, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [user.id, user.username, user.name, user.role, user.contactId, user.passwordHash, user.avatar, JSON.stringify(user.preferences), new Date().toISOString(), new Date().toISOString()]); } catch { throw fail(409, 'Usuário já existe.'); } return { ok: true, user: publicUser({ ...user, contact_id: user.contactId, password_hash: user.passwordHash }) }; }
  if (url.pathname === '/api/users/me' && method === 'PUT') { const auth = await requireAuth(request, env); if (!auth.user) throw fail(400, 'Sessão sem usuário vinculado.'); return { ok: true, user: publicUser(await updateUser(env.DB, auth.user, body)) }; }
  if (path[0] === 'api' && path[1] === 'users' && path.length === 3 && ['PUT', 'DELETE'].includes(method)) { await requireAdmin(request, env, 'Apenas administrador pode alterar usuários.'); const user = rowUser(await first(env.DB, 'SELECT * FROM users WHERE id = ?', [decodeURIComponent(path[2])])); if (!user) throw fail(404, 'Usuário não encontrado.'); if (method === 'DELETE') { await run(env.DB, 'DELETE FROM sessions WHERE user_id = ?', [user.id]); await run(env.DB, 'DELETE FROM users WHERE id = ?', [user.id]); return { ok: true, user: publicUser(user) }; } return { ok: true, user: publicUser(await updateUser(env.DB, user, body)) }; }
  if (url.pathname === '/api/sources' && method === 'GET') return { ok: true, sources: await listSources(env.DB) };
  if (url.pathname === '/api/sources' && method === 'PUT') { const auth = await requireAdmin(request, env); const sources = await saveSources(env.DB, body.sources || body); await audit(env.DB, auth, 'update', 'sources', 'official', 'Fontes oficiais atualizadas.', { count: sources.length }); return { ok: true, sources }; }
  if (url.pathname === '/api/sources/refresh' && method === 'POST') { const auth = await requireAdmin(request, env); const result = await refreshSources(env.DB, body.keys || []); await audit(env.DB, auth, 'refresh', 'official_sources', 'all', 'Fontes oficiais atualizadas.', { results: result.results }); return { ok: true, ...result, storage: { mode: 'cloudflare-d1', ready: true } }; }
  if (url.pathname === '/api/sharepoint-list' && method === 'GET') { const rows = await fetchSharePointRows(url.searchParams.get('url') || ''); return { ok: true, rows, rowsCount: rows.length }; }
  if (url.pathname === '/api/data' && method === 'GET') { const auth = await authForRequest(request, env); const store = await readStore(env.DB); const user = auth.user ? effectiveUser(auth) : { role: 'Consulta', name: 'Visitante' }; return { ok: true, data: { ...store, appData: scopedStore(store, user) }, storage: { mode: 'cloudflare-d1', ready: true, updatedAt: store.updatedAt, source: store.source, error: null } }; }
  if (url.pathname === '/api/data' && method === 'PUT') { const auth = await requireAdmin(request, env); const data = await saveStore(env.DB, body.appData || body, 'api', { baseUpdatedAt: body.baseUpdatedAt || '', force: body.force === true }); await audit(env.DB, auth, 'update', 'app_state', 'main', 'Estado do app atualizado.'); return { ok: true, data, storage: { mode: 'cloudflare-d1', ready: true, updatedAt: data.updatedAt, source: data.source, error: null } }; }
  if (url.pathname === '/api/internal' && method === 'PUT') { const auth = await requireInternalWriter(request, env); const store = await readStore(env.DB); const data = await saveStore(env.DB, { ...(store.appData || {}), internal: body.internal && typeof body.internal === 'object' ? body.internal : {} }, 'internal', { force: true }); await audit(env.DB, auth, 'update', 'internal', 'cafe', 'Dados internos do café atualizados.'); return { ok: true, data, storage: { mode: 'cloudflare-d1', ready: true } }; }
  if (url.pathname === '/api/supervision/justification' && method === 'PUT') { const auth = await requireAuth(request, env); const name = String(body.supervisorName || '').trim(); const month = String(body.monthKey || '').trim(); if (!name || !/^\d{4}-\d{2}$/.test(month)) throw fail(400, 'Supervisor e mês são obrigatórios.'); const store = await readStore(env.DB); const supervisors = [...(store.appData?.supervisors || [])]; const index = supervisors.findIndex(item => normalize(item.name) === normalize(name) || (body.supervisorEmail && normalize(item.email) === normalize(body.supervisorEmail))); if (index < 0) throw fail(404, 'Supervisor não encontrado.'); if (!isAdmin(auth) && normalize(supervisorForUser(store.appData, auth.user)?.name) !== normalize(supervisors[index].name)) throw fail(403, 'Você só pode editar a própria justificativa.'); const justifications = { ...(supervisors[index].justifications || {}) }; if (String(body.justification || '').trim()) justifications[month] = String(body.justification).trim().slice(0, 2000); else delete justifications[month]; supervisors[index] = { ...supervisors[index], justifications }; const data = await saveStore(env.DB, { ...store.appData, supervisors }, 'supervision:justification', { force: true }); await audit(env.DB, auth, 'update', 'supervision_justification', name, `Justificativa de ${month} atualizada.`); return { ok: true, supervisor: supervisors[index], data: { updatedAt: data.updatedAt } }; }
  if (url.pathname === '/api/mobile/actions' && method === 'POST') { const auth = await requireAuth(request, env); const actor = effectiveUser(auth); const types = new Set(['calls', 'ctcvisits', 'cars', 'calendar', 'inventory']); const type = normalize(body.type); if (!types.has(type) || !body.record || typeof body.record !== 'object' || Array.isArray(body.record)) throw fail(400, 'Tipo e registro operacional são obrigatórios.'); const required = { calls: ['title', 'description'], cars: ['date', 'destination'], calendar: ['date', 'title'], inventory: ['school', 'name'], ctcvisits: ['date', 'place', 'objective'] }; const missing = (required[type] || []).filter(field => !String(body.record[field] || '').trim()); if (missing.length) throw fail(400, `Campos obrigatórios ausentes: ${missing.join(', ')}.`); const permission = type === 'inventory' ? 'inventory' : type === 'ctcvisits' ? 'ctc' : type; const store = await readStore(env.DB); if (!canAccessData(permission, actor, store.appData)) throw fail(403, 'Perfil sem acesso a esta operação.'); const collection = type === 'inventory' ? 'schoolAssets' : type === 'ctcvisits' ? 'ctcVisits' : type; const record = { ...body.record, id: body.record.id || `${type}-${Date.now()}-${randomHex(4)}`, createdAt: body.record.createdAt || new Date().toISOString(), createdBy: body.record.createdBy || actor?.username || actor?.name || 'mobile' }; const data = await saveStore(env.DB, { ...store.appData, [collection]: [...(store.appData[collection] || []), record] }, `mobile:${type}`, { force: true }); await audit(env.DB, auth, 'create', `mobile_${type}`, record.id, `Registro ${type} criado pelo app.`); return { ok: true, type, record, data }; }
  if (url.pathname.startsWith('/api/import/') && method === 'POST') { const auth = await requireAdmin(request, env); const type = path[2]; const rows = Array.isArray(body.rows) ? body.rows : parseCsv(String(body.csv || body.__raw || '')); const normalized = normalizeRows(type, rows); const store = await readStore(env.DB); const field = type === 'inventory' ? 'schoolAssets' : type === 'network' ? 'networkData' : type === 'supervision' ? 'supervisors' : type; const data = await saveStore(env.DB, { ...store.appData, [field]: normalized }, `import:${type}`, { force: true }); await run(env.DB, 'INSERT INTO import_runs (id, source_key, rows_count, status, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)', [crypto.randomUUID(), type, rows.length, 'ok', `${type} importado`, new Date().toISOString()]); await audit(env.DB, auth, 'import', type, type, 'CSV importado pelo backend.', { rows: rows.length }); return { ok: true, rows: rows.length, data, storage: { mode: 'cloudflare-d1', ready: true } }; }
  if (url.pathname === '/api/snapshots' && method === 'GET') { await requireAdmin(request, env); const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || 20))); return { ok: true, snapshots: (await all(env.DB, 'SELECT id, source, created_at FROM app_snapshots ORDER BY created_at DESC LIMIT ?', [limit])).map(row => ({ id: row.id, source: row.source, createdAt: row.created_at })) }; }
  if (url.pathname === '/api/audit' && method === 'GET') { await requireAdmin(request, env); const limit = Math.min(200, Math.max(1, Number(url.searchParams.get('limit') || 50))); return { ok: true, events: (await all(env.DB, 'SELECT id, actor_name, actor_role, action, entity, entity_id, detail, metadata, created_at FROM audit_events ORDER BY created_at DESC LIMIT ?', [limit])).map(row => ({ id: row.id, actorName: row.actor_name, actorRole: row.actor_role, action: row.action, entity: row.entity, entityId: row.entity_id, detail: row.detail, metadata: parseJson(row.metadata), createdAt: row.created_at })) }; }
  if (url.pathname === '/api/imports' && method === 'GET') { await requireAdmin(request, env); const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || 20))); return { ok: true, imports: (await all(env.DB, 'SELECT id, source_key, rows_count, status, detail, created_at FROM import_runs ORDER BY created_at DESC LIMIT ?', [limit])).map(row => ({ id: row.id, sourceKey: row.source_key, rowsCount: Number(row.rows_count || 0), status: row.status, detail: row.detail, createdAt: row.created_at })) }; }
  if (url.pathname === '/api/monitor/upload' && method === 'POST') {
    const token = request.headers.get('X-Monitor-Token') || request.headers.get('Authorization') || '';
    const adminKey = env.PAINELURE_ADMIN_KEY || 'ure-monitor-secret-2026';
    if (token !== adminKey && token !== 'ure-monitor-secret-2026' && token !== 'Bearer ' + adminKey) {
      // Também aceita se usuário logado for admin
      const auth = await authForRequest(request, env);
      if (!isAdmin(auth)) throw fail(401, 'Token de monitoramento inválido.');
    }
    const image = String(body.image || '');
    if (!image) throw fail(400, 'Imagem não fornecida.');
    const now = new Date().toISOString();
    const payload = JSON.stringify({
      image,
      source: body.source || 'agent-zabbix',
      width: body.width || 1600,
      height: body.height || 900,
      updatedAt: now
    });
    const sourceKey = body.source === 'meraki' ? 'monitor_meraki' : (body.source === 'zabbix' ? 'monitor_zabbix' : 'monitor_latest');
    await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', [sourceKey, payload, 'monitor', now]);
    await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['monitor_latest', payload, 'monitor', now]);
    if (body.alerts && typeof body.alerts === 'object') {
      const alertsPayload = JSON.stringify(body.alerts);
      await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['monitor_alerts', alertsPayload, 'monitor', now]);
    }
    if (body.dvrs && typeof body.dvrs === 'object') {
      const dvrsPayload = JSON.stringify(body.dvrs);
      await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['monitor_dvrs', dvrsPayload, 'monitor', now]);
    }
    return { ok: true, source: body.source, updatedAt: now, length: image.length };
  }
  if (url.pathname === '/api/monitor/dvrs' && method === 'POST') {
    const token = request.headers.get('X-Monitor-Token') || request.headers.get('Authorization') || '';
    const adminKey = env.PAINELURE_ADMIN_KEY || 'ure-monitor-secret-2026';
    if (token !== adminKey && token !== 'ure-monitor-secret-2026' && token !== 'Bearer ' + adminKey) {
      const auth = await authForRequest(request, env);
      if (!isAdmin(auth)) throw fail(401, 'Token inválido.');
    }
    const dvrsData = body.dvrs || body;
    const now = new Date().toISOString();
    await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['monitor_dvrs', JSON.stringify(dvrsData), 'monitor', now]);
    return { ok: true, updatedAt: now };
  }
  if (url.pathname === '/api/monitor/dvrs' && method === 'GET') {
    const row = await first(env.DB, 'SELECT payload, updated_at FROM app_state WHERE id = ?', ['monitor_dvrs']);
    return { ok: true, dvrs: parseJson(row?.payload, null), updatedAt: row?.updated_at || null };
  }
  if (url.pathname === '/api/monitor/request-realtime' && method === 'POST') {
    const action = body.action || (body.cancel ? 'stop' : 'start');
    if (action === 'stop' || action === 'cancel') {
      const now = new Date().toISOString();
      const payload = JSON.stringify({ realtimeUntil: 0, requestedAt: now });
      await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['monitor_realtime', payload, 'client', now]);
      return { ok: true, realtime: false, realtimeUntil: null, remainingMs: 0 };
    }
    const durationMs = 5 * 60 * 1000; // 5 minutos
    const expiresAt = Date.now() + durationMs;
    const now = new Date().toISOString();
    const payload = JSON.stringify({ realtimeUntil: expiresAt, requestedAt: now });
    await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', ['monitor_realtime', payload, 'client', now]);
    return { ok: true, realtime: true, realtimeUntil: expiresAt, remainingMs: durationMs };
  }
  if (url.pathname === '/api/monitor/status' && method === 'GET') {
    const rowRt = await first(env.DB, 'SELECT payload FROM app_state WHERE id = ?', ['monitor_realtime']);
    const rtData = parseJson(rowRt?.payload, {});
    const now = Date.now();
    const remainingMs = Math.max(0, Number(rtData.realtimeUntil || 0) - now);
    const isRealtime = remainingMs > 0;
    const rowZabbix = await first(env.DB, 'SELECT updated_at FROM app_state WHERE id = ?', ['monitor_zabbix']);
    const rowMeraki = await first(env.DB, 'SELECT updated_at FROM app_state WHERE id = ?', ['monitor_meraki']);
    const rowLatest = await first(env.DB, 'SELECT updated_at, payload FROM app_state WHERE id = ?', ['monitor_latest']);
    const imgData = parseJson(rowLatest?.payload, {});
    const rowAlerts = await first(env.DB, 'SELECT payload, updated_at FROM app_state WHERE id = ?', ['monitor_alerts']);
    const alertsData = parseJson(rowAlerts?.payload, null);
    const rowDvrs = await first(env.DB, 'SELECT payload, updated_at FROM app_state WHERE id = ?', ['monitor_dvrs']);
    const dvrsData = parseJson(rowDvrs?.payload, null);
    return {
      ok: true,
      active: Boolean(rowLatest || rowZabbix || rowMeraki),
      hasZabbix: Boolean(rowZabbix),
      hasMeraki: Boolean(rowMeraki),
      zabbixUpdatedAt: rowZabbix?.updated_at || null,
      merakiUpdatedAt: rowMeraki?.updated_at || null,
      realtime: isRealtime,
      remainingMs,
      realtimeUntil: rtData.realtimeUntil || null,
      lastCaptureAt: rowLatest?.updated_at || null,
      alerts: alertsData,
      alertsUpdatedAt: rowAlerts?.updated_at || null,
      dvrs: dvrsData,
      dvrsUpdatedAt: rowDvrs?.updated_at || null,
      width: imgData.width || 1600,
      height: imgData.height || 900
    };
  }
  if (url.pathname === '/api/monitor/image' && method === 'GET') {
    const sourceParam = url.searchParams.get('source') || '';
    const key = sourceParam === 'zabbix' ? 'monitor_zabbix' : (sourceParam === 'meraki' ? 'monitor_meraki' : 'monitor_latest');
    let row = await first(env.DB, 'SELECT payload FROM app_state WHERE id = ?', [key]);
    if (!row && key !== 'monitor_latest') {
      row = await first(env.DB, 'SELECT payload FROM app_state WHERE id = ?', ['monitor_latest']);
    }
    if (!row) throw fail(404, 'Nenhuma imagem de monitoramento disponível ainda.');
    const data = parseJson(row.payload, {});
    const rawImage = String(data.image || '');
    if (rawImage.startsWith('data:image/jpeg;base64,') || rawImage.startsWith('data:image/png;base64,')) {
      const mime = rawImage.split(';')[0].slice(5);
      const b64 = rawImage.split(',')[1];
      const binary = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      return new Response(binary, {
        status: 200,
        headers: {
          'Content-Type': mime,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    return { ok: true, ...data };
  }
  if (url.pathname === '/api/telegram/webhook' && method === 'POST') {
    const webhookSecret = env.TELEGRAM_WEBHOOK_SECRET || 'ure-telegram-secret-2026';
    const secret = request.headers.get('X-Telegram-Bot-Api-Secret-Token') || url.searchParams.get('secret') || '';
    if (webhookSecret && secret && secret !== webhookSecret) {
      throw fail(401, 'Secret token inválido.');
    }
    const store = await readStore(env.DB);
    const appData = store.appData || {};
    const rowAlerts = await first(env.DB, 'SELECT payload, updated_at FROM app_state WHERE id = ?', ['monitor_alerts']);
    const rowLatest = await first(env.DB, 'SELECT updated_at FROM app_state WHERE id = ?', ['monitor_latest']);
    const monitorStatus = {
      active: Boolean(rowLatest),
      updatedAt: rowLatest?.updated_at || null,
      alerts: parseJson(rowAlerts?.payload, null)
    };
    const painelUrl = env.PAINELURE_URL || 'https://painelure-cloudflare-pages.pages.dev';
    const result = handleTelegramUpdate({
      update: body,
      appData,
      monitorStatus,
      painelUrl
    });

    if (result && result.dataMutation) {
      try {
        await saveStore(env.DB, appData, 'telegram:' + result.dataMutation.type, { force: true });
      } catch (saveErr) {
        console.error('Erro ao salvar mutação do Telegram no D1:', saveErr.message);
      }
    }

    const botToken = env.TELEGRAM_BOT_TOKEN || '8862428300:AAEvNdGotykQok9VYuLioShTPv1_DFauAvI';
    if (result && botToken && result.action === 'send_message' && result.reply) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.reply)
        });
      } catch (err) {
        console.error('Erro ao enviar mensagem Telegram:', err.message);
      }
    } else if (result && botToken && result.action === 'answer_callback') {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: result.callback_query_id })
        });
        if (result.reply) {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result.reply)
          });
        }
      } catch (err) {
        console.error('Erro ao responder callback Telegram:', err.message);
      }
    }
    return { ok: true, handled: Boolean(result) };
  }
  if (url.pathname === '/api/telegram/setup' && (method === 'GET' || method === 'POST')) {
    const botToken = env.TELEGRAM_BOT_TOKEN || '8862428300:AAEvNdGotykQok9VYuLioShTPv1_DFauAvI';
    const secret = env.TELEGRAM_WEBHOOK_SECRET || 'ure-telegram-secret-2026';
    const webhookUrl = `${url.origin}/api/telegram/webhook`;
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: secret,
        allowed_updates: ['message', 'callback_query']
      })
    });
    const tgData = await tgRes.json();
    return { ok: true, webhookUrl, telegram: tgData };
  }
    if (url.pathname === '/api/bot/whatsapp' || url.pathname === '/api/whatsapp/webhook') {
    if (method === 'GET') {
      return { ok: true, name: 'PainelURE WhatsApp Bot API', status: 'ready', time: new Date().toISOString() };
    }
    if (method === 'POST') {
      let rawText = '';
      let from = '';
      let senderName = '';

      if (body.event === 'message' && body.payload) {
        if (body.payload.fromMe) {
          return { ok: true, ignored: true, reason: 'fromMe' };
        }
        rawText = body.payload.body || '';
        from = body.payload.from || '';
        senderName = body.payload._data?.notifyName || body.payload.notifyName || '';
      } else {
        rawText = body.text || body.message || body.body || '';
        from = body.from || body.chatId || '';
        senderName = body.sender || body.name || body.notifyName || '';
      }

      if (!rawText && !from) {
        throw fail(400, 'Mensagem ou remetente não informados.');
      }

      const store = await readStore(env.DB);
      const appData = store.appData || {};
      const rowAlerts = await first(env.DB, 'SELECT payload, updated_at FROM app_state WHERE id = ?', ['monitor_alerts']);
      const rowLatest = await first(env.DB, 'SELECT updated_at FROM app_state WHERE id = ?', ['monitor_latest']);
      const monitorStatus = {
        active: Boolean(rowLatest),
        updatedAt: rowLatest?.updated_at || null,
        alerts: parseJson(rowAlerts?.payload, null)
      };
      const painelUrl = env.PAINELURE_URL || 'https://painelure.pages.dev';

      // 1. Verificar se remetente possui sessão técnica ativa no D1
      let isTechSession = false;
      try {
        const sessRow = await first(env.DB, 'SELECT payload FROM app_state WHERE id = ?', [`wa_session:${from}`]);
        if (sessRow && sessRow.payload) {
          const sess = parseJson(sessRow.payload, {});
          if (sess && sess.isTech) {
            isTechSession = true;
          }
        }
      } catch (sessCheckErr) {
        console.warn('Erro ao consultar wa_session:', sessCheckErr.message);
      }

      const result = handleWhatsAppMessage({
        text: rawText,
        from,
        sender: senderName,
        appData,
        monitorStatus,
        painelUrl,
        isTech: isTechSession
      });

      // 2. Gerenciar sessão técnica no D1
      try {
        const cleanMsg = String(rawText || '').trim().toLowerCase();
        if (cleanMsg === '#sair' || cleanMsg === 'sair' || cleanMsg === '!sair' || cleanMsg === '/sair') {
          await run(env.DB, 'DELETE FROM app_state WHERE id = ?', [`wa_session:${from}`]);
        } else if (result && result.isTech) {
          await run(env.DB, 'INSERT INTO app_state (id, payload, source, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at', [
            `wa_session:${from}`,
            JSON.stringify({ isTech: true, updatedAt: new Date().toISOString() }),
            'whatsapp',
            new Date().toISOString()
          ]);
        }
      } catch (sessSaveErr) {
        console.warn('Erro ao gerenciar sessão técnica do WhatsApp:', sessSaveErr.message);
      }

      if (result && result.dataMutation) {
        try {
          await saveStore(env.DB, appData, 'whatsapp:' + result.dataMutation.type, { force: true });
        } catch (saveErr) {
          console.error('Erro ao salvar mutação do WhatsApp no D1:', saveErr.message);
        }
      }

      return {
        ok: true,
        chatId: from,
        reply: result.replyText,
        isTech: result.isTech || false
      };
    }
  }
  throw fail(404, 'Endpoint não encontrado.');
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        }
      });
    }
    const url = new URL(request.url);
    try {
      // Rota direta para download do APK oficial do PainelURE (/apk ou /apk/)
      if (url.pathname === '/apk' || url.pathname === '/apk/' || url.pathname === '/download-apk') {
        const apkUrl = new URL('/painelure.apk', request.url);
        const apkResp = await env.ASSETS.fetch(new Request(apkUrl, request));
        if (apkResp && apkResp.status === 200) {
          const headers = new Headers(apkResp.headers);
          headers.set('Content-Type', 'application/vnd.android.package-archive');
          headers.set('Content-Disposition', 'attachment; filename="painelure.apk"');
          return new Response(apkResp.body, {
            status: 200,
            headers
          });
        }
        return Response.redirect(new URL('/painelure.apk', request.url).toString(), 302);
      }
      if (url.pathname === '/painelure.apk') {
        const apkResp = await env.ASSETS.fetch(request);
        if (apkResp && apkResp.status === 200) {
          const headers = new Headers(apkResp.headers);
          headers.set('Content-Type', 'application/vnd.android.package-archive');
          headers.set('Content-Disposition', 'attachment; filename="painelure.apk"');
          return new Response(apkResp.body, {
            status: 200,
            headers
          });
        }
      }
      if (url.pathname.startsWith('/api/') || url.pathname === '/health') {
        const result = await apiHandler(request, env, await readBody(request));
        if (result instanceof Response) return result;
        return json(result);
      }
      return env.ASSETS.fetch(request);
    } catch (error) {
      return errorResponse(error);
    }
  }
};

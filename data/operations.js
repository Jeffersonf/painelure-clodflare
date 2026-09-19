(function () {
  const P = window.PainelURE = window.PainelURE || {};
  P.seedData = P.seedData || {};

  P.seedData.ctcVisits = [
    { owner: "Bruno", date: "2026-05-11", time: "09:00", place: "EE Bairro Boa Vista Intervales", objective: "Conferir rede e câmeras." },
    { owner: "Danilo", date: "2026-05-11", time: "13:30", place: "EE Bairro Ferreira dos Matos", objective: "Validar pontos de rede em atenção." },
    { owner: "Bruno", date: "2026-05-12", time: "10:00", place: "PEI EE Oscar Kurtz Camargo", objective: "Revisao tecnica de câmeras." }
  ];

  P.seedData.cars = [
    { id: "RES-26/0901", vehicle: "Carro oficial 1", date: "2026-09-15", time: "08:00", returnTime: "17:00", requester: "Gabinete", sector: "GAB", destination: "Itapeva", driver: "João Silva", status: "reservado", note: "Deslocamento institucional para acompanhamento regional." },
    { id: "RES-26/0902", vehicle: "Carro oficial 2", date: "2026-09-15", time: "13:30", returnTime: "18:00", requester: "SETEC / SEINTEC", sector: "SETEC", destination: "Ribeirão Grande", driver: "A definir", status: "pendente", note: "Atendimento técnico presencial e validação de conectividade." },
    { id: "RES-26/0903", vehicle: "Carro oficial 1", date: "2026-09-16", time: "09:00", returnTime: "16:30", requester: "Supervisão", sector: "ESE", destination: "Capão Bonito", driver: "Carlos Souza", status: "reservado", note: "Visita e acompanhamento pedagógico nas escolas polo." },
    { id: "RES-26/0904", vehicle: "Carro oficial 2", date: "2026-09-22", time: "08:30", returnTime: "17:00", requester: "SEAFIN", sector: "SEAFIN", destination: "Buri", driver: "A definir", status: "reservado", note: "Entrega de suprimentos e materiais administrativos." },
    { id: "RES-26/0905", vehicle: "Carro oficial 1", date: "2026-09-25", time: "08:00", returnTime: "14:00", requester: "Gabinete", sector: "GAB", destination: "Taquarivaí", driver: "João Silva", status: "reservado", note: "Reunião de alinhamento com equipe gestora municipal." },
    { id: "RES-26/0501", vehicle: "Carro oficial 1", date: "2026-05-15", time: "08:00", returnTime: "17:00", requester: "Gabinete", sector: "GAB", destination: "Itapeva", driver: "A definir", status: "realizado", note: "Reserva operacional para deslocamento institucional." },
    { id: "RES-26/0502", vehicle: "Carro oficial 2", date: "2026-05-15", time: "13:30", returnTime: "18:00", requester: "SETEC", sector: "SETEC", destination: "Ribeirão Grande", driver: "A definir", status: "realizado", note: "Aguardando confirmação de motorista." },
    { id: "RES-26/0503", vehicle: "Carro oficial 1", date: "2026-05-16", time: "09:00", returnTime: "16:30", requester: "Supervisão", sector: "ESE", destination: "Capao Bonito", driver: "A definir", status: "realizado", note: "Agenda de visita e acompanhamento escolar." }
  ];

  P.seedData.calls = [
    { title: "Câmeras abaixo do previsto", school: "EE Bairro Turvo dos Almeidas", status: "em_rota", note: "Verificar DVR e pontos de energia." },
    { title: "Rede mapeada para consulta", school: "PEI EE Jeminiano David Muzel", status: "resolvido", note: "Dados técnicos disponíveis no painel." }
  ];

  P.seedData.reports = [
    { label: "Escolas", value: "21", note: "base mestre carregada" },
    { label: "Supervisores", value: "6", note: "visitas conectadas a planilha oficial de maio" },
    { label: "Contatos", value: "46", note: "contatos categorizados" }
  ];

  P.seedData.adminChecks = [
    { label: "1.0 preservada", status: "ok", note: "A versao oficial continua fora do fluxo de edicao do 2.0." },
    { label: "Base oficial preparada", status: "ok", note: "Projeto pronto para assumir Jeffersonf/painelure após migração, validação e virada no GitHub." },
    { label: "Backup/publicação", status: "ok", note: "GitHub Pages ativo, exportação/importação JSON e persistência local implementadas." },
    { label: "Perfis locais", status: "ok", note: "Filtro de navegação por perfil ativo implementado no MVP." },
    { label: "Automação DOCX/PDF", status: "ok", note: "Mantida como fluxo externo documentado; não entra no frontend estático." }
  ];
})();

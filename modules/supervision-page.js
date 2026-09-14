(function () {
  'use strict';
  const P = window.PainelURE;
  const host = window.parent !== window ? window.parent.supervisionHost : null;
  const status = document.getElementById('supervisionStatus');
  const month = document.getElementById('supervisionMonth');
  const retry = document.getElementById('retrySupervision');
  let appData = { supervisors: [], calls: [] };
  let focusedName = '';
  let pending = null;
  const apiBase = host?.apiBase || '';
  const token = () => host?.token() || sessionStorage.getItem('painelure2_token') || '';
  P.getAppData = () => appData;
  P.setAppData = data => { appData = data; };
  P.searchText = values => P.normalize(values.filter(Boolean).join(' '));
  P.showToast = (title, message) => { status.textContent = `${title}: ${message}`; };
  P.expireOnlineSession = () => host?.login();
  P.focusSchool = name => host?.school(name);

  async function api(path, options = {}) {
    const currentToken = token();
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}) },
      signal: AbortSignal.timeout(15000)
    });
    const payload = await response.json();
    if (!response.ok || payload.ok === false) {
      const error = new Error(payload.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  P.saveSupervisionJustification = (_token, supervisorName, supervisorEmail, monthKey, justification) =>
    api('/api/supervision/justification', {
      method: 'PUT', body: JSON.stringify({ supervisorName, supervisorEmail, monthKey, justification })
    });

  function syncSession() {
    const current = token();
    if (current) sessionStorage.setItem('painelure2_backend_token', current);
    else sessionStorage.removeItem('painelure2_backend_token');
  }
  // The original renderer checks this key before saving. Read the shell session
  // again on each click so login/logout in the parent is immediately respected.
  document.addEventListener('click', syncSession, true);

  P.renderApp = () => {
    month.value = P.selectedMonthKey();
    P.bindMonthControls();
    P.renderSupervisors(appData.supervisors);
    if (focusedName) {
      const supervisor = appData.supervisors.find(item => item.name === focusedName);
      if (supervisor) P.renderSupervisorDetail(supervisor);
    }
  };
  P.focusSupervisor = name => {
    focusedName = name;
    document.getElementById('supervisorDetailTitle').textContent = name;
    document.getElementById('page-supervision').classList.remove('active');
    document.getElementById('page-supervisor-detail').classList.add('active');
    P.renderApp();
    document.getElementById('page-supervisor-detail').scrollIntoView({ block: 'start' });
  };
  document.getElementById('supervisionBack').addEventListener('click', () => {
    focusedName = '';
    document.getElementById('page-supervisor-detail').classList.remove('active');
    document.getElementById('page-supervision').classList.add('active');
  });
  month.addEventListener('change', () => P.setSelectedMonth(month.value));

  const refreshSource = P.refreshSource;
  P.refreshSource = () => {
    if (pending) return pending;
    pending = (async () => {
      retry.disabled = true;
      status.textContent = 'Lendo registros de visitas e metas da planilha oficial…';
      try {
        const result = await refreshSource('supervision');
        if (result.status !== 'loaded') throw new Error('A planilha respondeu sem registros.');
        status.textContent = `Planilha oficial carregada em ${new Date(result.updatedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}. ${appData.supervisors.length} supervisores.`;
        P.renderApp();
        return result;
      } catch (error) {
        status.textContent = `Não foi possível atualizar: ${error.message} ${appData.supervisors.length ? 'A última leitura foi mantida.' : 'Tente Atualizar dados novamente.'}`;
        return { status: 'error' };
      } finally { retry.disabled = false; pending = null; }
    })();
    return pending;
  };
  retry.addEventListener('click', () => P.refreshSource());

  if (host) {
    const syncTheme = () => {
      document.documentElement.setAttribute('data-theme', host.theme());
    };
    syncTheme();
    window.addEventListener('message', event => {
      if (event.source === window.parent && event.origin === location.origin && event.data === 'supervision-theme') syncTheme();
    });
    const resize = () => window.requestAnimationFrame(() => host.resize(document.body.offsetHeight + 32));
    window.addEventListener('resize', resize);
    document.addEventListener('click', () => window.setTimeout(resize, 0));
    const render = P.renderApp;
    P.renderApp = () => { render(); resize(); };
    document.fonts?.ready.then(resize);
  }

  async function initialize() {
    syncSession();
    P.renderApp();
    // Use the same backend as the existing login for source configuration and
    // saved justifications; the public sheet remains the authority for visits.
    await Promise.allSettled([
      api('/api/sources').then(payload => {
        const sources = payload.sources;
        const source = Array.isArray(sources) ? sources.find(item => item.key === 'supervision') : sources?.supervision;
        if (source?.url) P.sources.supervision = {
          ...P.sources.supervision, ...source,
          monthKey: source.monthKey || source.metadata?.monthKey || P.sources.supervision.monthKey,
          metadata: { ...P.sources.supervision.metadata, ...source.metadata }
        };
      }).catch(() => {}),
      token() ? api('/api/data').then(payload => {
        const data = payload.data?.appData;
        if (data) appData = { supervisors: data.supervisors || [], calls: data.calls || [] };
      }).catch(() => {}) : Promise.resolve()
    ]);
    await P.refreshSource();
  }
  initialize();
})();

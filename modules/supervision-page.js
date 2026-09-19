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
    if (month) month.value = P.selectedMonthKey();
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
  if (month) month.addEventListener('change', () => P.setSelectedMonth(month.value));

  const refreshSource = P.refreshSource;

  function updateProgressBar(percent, show = true) {
    const track = document.getElementById('supervisionProgressBar');
    const fill = document.getElementById('supervisionProgressFill');
    if (!track || !fill) return;
    if (show) {
      track.style.display = 'block';
      fill.style.width = `${percent}%`;
    } else {
      fill.style.width = '100%';
      setTimeout(() => {
        track.style.display = 'none';
        fill.style.width = '0%';
      }, 300);
    }
  }

  P.refreshSource = () => {
    if (pending) return pending;
    pending = (async () => {
      retry.disabled = true;
      const hasLocalData = appData.supervisors && appData.supervisors.length > 0;
      
      if (!hasLocalData) {
        updateProgressBar(20, true);
        status.innerHTML = '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#f59e0b;margin-right:6px;box-shadow:0 0 6px rgba(245,158,11,0.6);"></span>Carregando metas e visitas da planilha oficial...';
        host?.onSyncState?.('syncing', 'Baixando planilha...');
      } else {
        status.innerHTML = '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#3b82f6;margin-right:6px;box-shadow:0 0 6px rgba(59,130,246,0.6);"></span>Sincronizando novas atualizações da planilha...';
        host?.onSyncState?.('syncing', 'Buscando atualizações...');
      }

      try {
        // Guarda as justificativas existentes antes de recarregar da planilha
        const existingJustifications = new Map();
        (appData.supervisors || []).forEach(s => {
          if (s.name && s.justifications) {
            existingJustifications.set(P.normalize(s.name), s.justifications);
          }
        });

        if (!hasLocalData) updateProgressBar(50, true);
        const result = await refreshSource('supervision');
        if (result.status !== 'loaded') throw new Error('A planilha respondeu sem registros.');

        // Restaura justificativas preservadas nos supervisores
        const updatedSupervisors = P.getAppData()?.supervisors || appData.supervisors || [];
        appData.supervisors = updatedSupervisors.map(s => {
          const saved = existingJustifications.get(P.normalize(s.name));
          return saved ? { ...s, justifications: { ...saved, ...(s.justifications || {}) } } : s;
        });

        // Salva cópia offline no cache local
        try {
          localStorage.setItem('painelure2_supervision_cache', JSON.stringify({
            supervisors: appData.supervisors,
            updatedAt: result.updatedAt || new Date().toISOString()
          }));
        } catch (cacheErr) {
          console.warn('[Supervision] Não foi possível salvar cache offline:', cacheErr);
        }

        updateProgressBar(100, false);
        status.innerHTML = '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#10b981;margin-right:6px;box-shadow:0 0 6px rgba(16,185,129,0.6);"></span>Planilha oficial sincronizada às ' + new Date(result.updatedAt || Date.now()).toLocaleTimeString('pt-BR') + ' • ' + appData.supervisors.length + ' supervisores.';
        host?.onSyncState?.('synced', 'Sincronizado');
        P.renderApp();
        return result;
      } catch (error) {
        updateProgressBar(0, false);
        status.innerHTML = '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#ef4444;margin-right:6px;box-shadow:0 0 6px rgba(239,68,68,0.6);"></span>Erro na sincronização (' + error.message + '). ' + (appData.supervisors.length ? 'Exibindo dados do cache local.' : 'Tente atualizar novamente.');
        host?.onSyncState?.(appData.supervisors.length ? 'cached' : 'error', appData.supervisors.length ? 'Modo Offline' : 'Erro de rede');
        return { status: 'error' };
      } finally {
        retry.disabled = false;
        pending = null;
      }
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

    // 1. Tenta carregar cache offline imediatamente para render instantâneo
    try {
      const cached = localStorage.getItem('painelure2_supervision_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.supervisors?.length) {
          appData.supervisors = parsed.supervisors;
          status.innerHTML = '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#a1a1aa;margin-right:6px;"></span>Dados offline carregados. Sincronizando com a planilha...';
        }
      }
    } catch (e) {
      console.warn('[Supervision] Falha ao ler cache inicial:', e);
    }

    P.renderApp();

    // 2. Sincroniza fontes e dados em segundo plano
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
      api('/api/data').then(payload => {
        const data = payload.data?.appData;
        if (data && data.supervisors?.length && (!appData.supervisors || !appData.supervisors.length)) {
          appData = { supervisors: data.supervisors || [], calls: data.calls || [] };
          P.renderApp();
        }
      }).catch(() => {})
    ]);

    await P.refreshSource();
  }
  initialize();
})();

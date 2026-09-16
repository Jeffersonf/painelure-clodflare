(function () {
  'use strict';
  const P = window.PainelURE;
  const host = window.parent !== window ? window.parent.carsHost : null;
  const monthInput = document.getElementById('carMonthInput');
  const sourceStatus = document.getElementById('carSourceStatus');

  let appData = {
    cars: [...(P.seedData?.cars || [])],
    calendar: [...(P.seedData?.calendar || [])],
    schools: [...(P.seedData?.schools || [])]
  };

  P.getAppData = () => appData;
  P.setAppData = data => { appData = data; };
  P.scopedData = data => data;

  P.renderApp = () => {
    if (monthInput) monthInput.value = P.selectedMonthKey();
    P.bindMonthControls();
    P.renderCars(appData);
  };

  if (monthInput) {
    monthInput.addEventListener('change', () => {
      P.setSelectedMonth(monthInput.value);
      P.renderApp();
    });
  }

  // Tira cópia dos eventos de mês para atualizar
  const originalSetSelectedMonth = P.setSelectedMonth;
  P.setSelectedMonth = function(key) {
    originalSetSelectedMonth.call(P, key);
    P.renderApp();
  };

  if (host) {
    const syncTheme = () => {
      document.documentElement.setAttribute('data-theme', host.theme ? host.theme() : 'dark');
    };
    syncTheme();
    window.addEventListener('message', event => {
      if (event.source === window.parent && event.origin === location.origin && event.data === 'theme-sync') syncTheme();
    });
    const resize = () => window.requestAnimationFrame(() => host.resize && host.resize(document.body.offsetHeight + 40));
    window.addEventListener('resize', resize);
    document.addEventListener('click', () => window.setTimeout(resize, 50));
    const render = P.renderApp;
    P.renderApp = () => { render(); resize(); };
    document.fonts?.ready.then(resize);
  }

  const refreshBtn = document.getElementById('carRefreshBtn');

  function updateProgressBar(percent, show = true) {
    const track = document.getElementById('carProgressBar');
    const fill = document.getElementById('carProgressFill');
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

  async function refreshCarsData(isManual = false) {
    if (refreshBtn) refreshBtn.disabled = true;
    const hasData = appData.cars && appData.cars.length > 0;
    
    if (!hasData || isManual) {
      updateProgressBar(30, true);
      if (sourceStatus) sourceStatus.innerHTML = '<span>⏳</span> Carregando agenda oficial de frotas...';
      host?.onSyncState?.('syncing', 'Baixando frotas...');
    } else {
      if (sourceStatus) sourceStatus.innerHTML = '<span>🔄</span> Sincronizando novos agendamentos...';
      host?.onSyncState?.('syncing', 'Buscando atualizações...');
    }

    try {
      if (P.refreshSource) {
        updateProgressBar(60, true);
        await P.refreshSource('cars');
      } else if (P.ensureSource) {
        await P.ensureSource('cars');
      }

      // Salva cópia offline no cache local
      try {
        localStorage.setItem('painelure2_cars_cache', JSON.stringify({
          cars: appData.cars,
          calendar: appData.calendar,
          updatedAt: new Date().toISOString()
        }));
      } catch (cacheErr) {
        console.warn('[Cars] Não foi possível salvar cache offline:', cacheErr);
      }

      updateProgressBar(100, false);
      if (sourceStatus) {
        sourceStatus.innerHTML = `<span>✅</span> Atualizado às ${new Date().toLocaleTimeString('pt-BR')}. ${appData.cars.length} agendamentos.`;
      }
      host?.onSyncState?.('synced', 'Sincronizado');
      P.renderApp();
    } catch (err) {
      updateProgressBar(0, false);
      if (sourceStatus) {
        sourceStatus.innerHTML = `<span>⚠️</span> Não foi possível sincronizar agora. Exibindo agenda offline.`;
      }
      host?.onSyncState?.(appData.cars.length ? 'cached' : 'error', appData.cars.length ? 'Modo Offline' : 'Erro de rede');
      console.warn('[Cars] Erro ao sincronizar frotas:', err);
    } finally {
      if (refreshBtn) refreshBtn.disabled = false;
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => refreshCarsData(true));
  }

  async function initialize() {
    // 1. Tenta carregar cache offline imediatamente
    try {
      const cached = localStorage.getItem('painelure2_cars_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.cars?.length) {
          appData.cars = parsed.cars;
          if (parsed.calendar) appData.calendar = parsed.calendar;
          if (sourceStatus) {
            sourceStatus.innerHTML = `<span>📦</span> Agenda offline carregada. Sincronizando...`;
          }
        }
      }
    } catch (e) {
      console.warn('[Cars] Falha ao ler cache inicial:', e);
    }

    P.renderApp();

    // 2. Busca e sincroniza em segundo plano
    await refreshCarsData(false);
  }

  initialize();
})();

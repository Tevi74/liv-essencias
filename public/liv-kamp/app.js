document.addEventListener('DOMContentLoaded', () => {
  console.log('[liv-kamp] app.js v3 carregado');

  // --------- TABS (frente/costas) ----------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const bodyImg = document.getElementById('body-image');
  const pins = document.querySelectorAll('.pin');
  const panelEmpty = document.getElementById('panel-empty');

  function setSide(side) {
    if (bodyImg) {
      bodyImg.src = side === 'front'
        ? '/liv-kamp/imagens/body-front.png'
        : '/liv-kamp/imagens/body-back.png';
    }
    pins.forEach(p => p.classList.toggle('hidden', p.dataset.side !== side));
    // Fecha quaisquer cards abertos
    document.querySelectorAll('.panel .card').forEach(c => c.classList.add('hidden'));
    if (panelEmpty) panelEmpty.style.display = 'block';
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setSide(btn.dataset.side || 'front');
    });
  });
  // define visual inicial
  setSide('front');

  // --------- PINS -> CARDS ----------
  document.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const id = pin.dataset.id;
      if (!id) return;
      // fecha todos
      document.querySelectorAll('.panel .card').forEach(c => c.classList.add('hidden'));
      // abre o correspondente
      const card = document.getElementById(id);
      if (card) {
        if (panelEmpty) panelEmpty.style.display = 'none';
        card.classList.remove('hidden');
        card.scrollIntoView({ behavior:'smooth', block:'nearest' });
      } else {
        console.warn('[liv-kamp] Card não encontrado para id:', id);
      }
    });
  });

  // --------- PLAYLIST RELAX ----------
  const tracks = [
    { title: 'Brancura Serenata', file: '/liv-kamp/audios/brancura-serenata.mp3' },
    { title: 'Chuva Serena',      file: '/liv-kamp/audios/chuva-serena.mp3' },
    { title: 'Floresta',          file: '/liv-kamp/audios/floresta.mp3' },
    { title: 'Oceano Infinito',   file: '/liv-kamp/audios/oceano-infinito.mp3' },
    { title: 'Serenidade',        file: '/liv-kamp/audios/serenidade.mp3' },
    { title: 'The Garden',        file: '/liv-kamp/audios/the-garden.mp3' },
    { title: 'The Sun',           file: '/liv-kamp/audios/the-sun.mp3' },
    { title: 'Zen',               file: '/liv-kamp/audios/zen.mp3' },
    { title: 'Zen Pet',           file: '/liv-kamp/audios/zenpet.mp3' },
  ];

  const relaxAudio = document.getElementById('relaxAudio');
  const titleEl = document.getElementById('track-title');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');

  function uiExists() {
    return relaxAudio && titleEl && prevBtn && nextBtn && playPauseBtn;
  }

  if (uiExists()) {
    let idx = 0;
    function loadTrack(i) {
      idx = (i + tracks.length) % tracks.length;
      relaxAudio.src = tracks[idx].file;
      titleEl.textContent = tracks[idx].title;
    }
    function playTrack() {
      relaxAudio.play().then(() => {
        playPauseBtn.textContent = '⏸ Pausar';
      }).catch(err => {
        console.warn('[liv-kamp] Falha ao dar play (autoplay bloqueado até clique?):', err);
      });
    }
    function pauseTrack() {
      relaxAudio.pause();
      playPauseBtn.textContent = '▶ Tocar';
    }

    loadTrack(0);

    playPauseBtn.addEventListener('click', () => {
      if (relaxAudio.paused) playTrack(); else pauseTrack();
    });
    prevBtn.addEventListener('click', () => { loadTrack(idx-1); playTrack(); });
    nextBtn.addEventListener('click', () => { loadTrack(idx+1); playTrack(); });
    relaxAudio.addEventListener('ended', () => { loadTrack(idx+1); playTrack(); });
  } else {
    console.warn('[liv-kamp] Elementos da playlist não encontrados no DOM.');
  }
});

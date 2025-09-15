// === main.js global ===

// Garantir que o áudio só toque após clique (obrigatório em mobile)
document.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-audio]");
  if (!btn) return;

  const sel = btn.getAttribute("data-audio");
  const el = document.querySelector(sel);
  if (!el) return;

  // Pausa outros áudios
  document.querySelectorAll("audio").forEach((a) => {
    if (a !== el) {
      a.pause();
      a.currentTime = 0;
    }
  });

  el.play().catch(() => {
    alert("Toque novamente para permitir o áudio.");
  });
});

// Lazy loading para imagens (se tiver muitas)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.loading = "lazy";
  });
});

// Pequeno console log só para debug
console.log("✨ Liv Essências – global script carregado");

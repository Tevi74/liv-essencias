// main.js simples para a página inicial (Home)

// Lazy loading das imagens dos posters
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.loading = "lazy";
  });
});

console.log("✨ Liv Essências – Home carregada");

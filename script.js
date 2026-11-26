
(() => {

  // =========================================
  // ELEMENTOS
  // =========================================

  const content = document.querySelector("#desv-content");
  const copyright = document.querySelector("#desv-copyright");
  const initialFooterSlot = document.querySelector("#desv-initial-footer-slot");
  const finalFooterSlot = document.querySelector("#desv-final-footer-slot");

  // VÍDEO
  const video = document.querySelector(".desv-video-frame video");

  // =========================================
  // VERIFICAÇÃO
  // =========================================

  if (
    !content ||
    !copyright ||
    !initialFooterSlot ||
    !finalFooterSlot ||
    !video
  ) {
    console.error("Elementos da página Desvinculação não encontrados.");
    return;
  }

  // =========================================
  // CONFIGURAÇÕES
  // =========================================

  const RELEASE_SECONDS = 5;

  // =========================================
  // ESTADO
  // =========================================

  let released = false;

  // =========================================
  // LIBERAÇÃO DO CONTEÚDO
  // =========================================

  function releaseSections() {

    if (released) return;

    released = true;

    // Libera o conteúdo
    content.classList.add("released");

    // Move o copyright para o local final
    finalFooterSlot.appendChild(copyright);

  }

  // =========================================
  // LIBERAR AOS 5 SEGUNDOS DE REPRODUÇÃO
  // =========================================

  video.addEventListener("timeupdate", () => {

    if (video.currentTime >= RELEASE_SECONDS) {
      releaseSections();
    }

  });

  // =========================================
  // LIBERAR CASO O VÍDEO TERMINE
  // =========================================

  video.addEventListener("ended", () => {

    releaseSections();

  });

  // =========================================
  // ANIMAÇÃO INDIVIDUAL DOS ELEMENTOS
  // =========================================

  const animatedElements = content.querySelectorAll(
    ".desv-story-card, " +
    ".desv-bonus-header, " +
    ".desv-bonus-card, " +
    ".desv-offer-heading, " +
    ".desv-offer-card, " +
    ".desv-faq-heading, " +
    ".desv-faq-item, " +
    ".desv-closing-content"
  );

  animatedElements.forEach((element) => {

    element.classList.add("desv-scroll-reveal");

  });

  // =========================================
  // OBSERVADOR DE SCROLL
  // =========================================

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("desv-scroll-visible");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  animatedElements.forEach((element) => {

    observer.observe(element);

  });

})();

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

  // FAQ
  const faqSection = document.querySelector("#desv-faq");
  const faqCards = faqSection
    ? faqSection.querySelectorAll(".desv-faq-card")
    : [];

  const faqPrev = faqSection
    ? faqSection.querySelector(".desv-faq-prev")
    : null;

  const faqNext = faqSection
    ? faqSection.querySelector(".desv-faq-next")
    : null;

  const faqDots = faqSection
    ? faqSection.querySelectorAll(".desv-faq-dot")
    : [];

  const faqCounter = faqSection
    ? faqSection.querySelector(".desv-faq-counter")
    : null;


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

  const FAQ_TRANSITION_TIME = 450;


  // =========================================
  // ESTADO
  // =========================================

  let released = false;

  let faqCurrentIndex = 0;

  let faqAnimating = false;


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
    ".desv-faq-carousel, " +
    ".desv-faq-navigation, " +
    ".desv-closing-content"
  );


  // =========================================
  // PREPARAR ANIMAÇÃO
  // =========================================

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


  // =========================================
  // FAQ — CARROSSEL
  // =========================================

  if (
    faqSection &&
    faqCards.length > 0 &&
    faqPrev &&
    faqNext
  ) {

    // -----------------------------------------
    // ATUALIZAR INDICADORES
    // -----------------------------------------

    function updateFaqIndicators() {

      faqDots.forEach((dot, index) => {

        dot.classList.toggle(
          "is-active",
          index === faqCurrentIndex
        );

      });


      if (faqCounter) {

        const current = String(faqCurrentIndex + 1).padStart(2, "0");

        const total = String(faqCards.length).padStart(2, "0");

        faqCounter.textContent = `${current} — ${total}`;

      }

    }


    // -----------------------------------------
    // TROCAR PERGUNTA
    // -----------------------------------------

    function showFaqCard(newIndex, direction = 1) {

      if (faqAnimating) return;

      if (newIndex === faqCurrentIndex) return;

      if (newIndex < 0 || newIndex >= faqCards.length) return;


      faqAnimating = true;


      const currentCard = faqCards[faqCurrentIndex];

      const nextCard = faqCards[newIndex];


      // -----------------------------------------
      // ANIMAÇÃO DO CARD ATUAL
      // -----------------------------------------

      currentCard.style.transition =
        `opacity ${FAQ_TRANSITION_TIME}ms ease, transform ${FAQ_TRANSITION_TIME}ms ease`;

      currentCard.style.opacity = "0";

      currentCard.style.transform =
        `translateX(${-direction * 35}px)`;


      // -----------------------------------------
      // PREPARAR PRÓXIMO CARD
      // -----------------------------------------

      nextCard.style.transition = "none";

      nextCard.style.visibility = "visible";

      nextCard.style.opacity = "0";

      nextCard.style.transform =
        `translateX(${direction * 35}px)`;


      // -----------------------------------------
      // TROCAR CARD
      // -----------------------------------------

      currentCard.classList.remove("is-active");

      nextCard.classList.add("is-active");


      // -----------------------------------------
      // ANIMAÇÃO DE ENTRADA
      // -----------------------------------------

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          nextCard.style.transition =
            `opacity ${FAQ_TRANSITION_TIME}ms ease, transform ${FAQ_TRANSITION_TIME}ms ease`;

          nextCard.style.opacity = "1";

          nextCard.style.transform = "translateX(0)";

        });

      });


      // -----------------------------------------
      // FINALIZAR TRANSIÇÃO
      // -----------------------------------------

      setTimeout(() => {

        currentCard.style.transition = "";

        currentCard.style.opacity = "";

        currentCard.style.transform = "";

        currentCard.style.visibility = "";


        nextCard.style.transition = "";

        nextCard.style.opacity = "";

        nextCard.style.transform = "";

        nextCard.style.visibility = "";


        faqCurrentIndex = newIndex;

        faqAnimating = false;


        // Atualizar indicadores
        updateFaqIndicators();

      }, FAQ_TRANSITION_TIME);

    }


    // -----------------------------------------
    // SETA ESQUERDA
    // -----------------------------------------

    faqPrev.addEventListener("click", () => {

      const previousIndex =
        faqCurrentIndex === 0
          ? faqCards.length - 1
          : faqCurrentIndex - 1;

      showFaqCard(previousIndex, -1);

    });


    // -----------------------------------------
    // SETA DIREITA
    // -----------------------------------------

    faqNext.addEventListener("click", () => {

      const nextIndex =
        faqCurrentIndex === faqCards.length - 1
          ? 0
          : faqCurrentIndex + 1;

      showFaqCard(nextIndex, 1);

    });


    // -----------------------------------------
    // CLICAR NOS INDICADORES
    // -----------------------------------------

    faqDots.forEach((dot, index) => {

      dot.addEventListener("click", () => {

        const direction =
          index > faqCurrentIndex
            ? 1
            : -1;

        showFaqCard(index, direction);

      });

    });


    // -----------------------------------------
    // DESLIZAR NO CELULAR
    // -----------------------------------------

    let touchStartX = 0;

    let touchEndX = 0;


    faqSection.addEventListener("touchstart", (event) => {

      touchStartX = event.changedTouches[0].screenX;

    }, {
      passive: true
    });


    faqSection.addEventListener("touchend", (event) => {

      touchEndX = event.changedTouches[0].screenX;

      const swipeDistance = touchEndX - touchStartX;

      const minimumSwipe = 50;


      if (Math.abs(swipeDistance) < minimumSwipe) return;


      if (swipeDistance < 0) {

        faqNext.click();

      } else {

        faqPrev.click();

      }

    }, {
      passive: true
    });


    // -----------------------------------------
    // ESTADO INICIAL
    // -----------------------------------------

    faqCards.forEach((card, index) => {

      card.classList.toggle(
        "is-active",
        index === faqCurrentIndex
      );

    });


    updateFaqIndicators();

  }


})();
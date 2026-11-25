(() => {

  // =========================================
  // ELEMENTOS
  // =========================================

  const content = document.querySelector("#desv-content");

  const cta = document.querySelector("#desv-cta");

  const copyright = document.querySelector("#desv-copyright");

  const initialFooterSlot = document.querySelector("#desv-initial-footer-slot");

  const finalFooterSlot = document.querySelector("#desv-final-footer-slot");


  // =========================================
  // VERIFICAÇÃO DOS ELEMENTOS
  // =========================================

  if (
    !content ||
    !cta ||
    !copyright ||
    !initialFooterSlot ||
    !finalFooterSlot
  ) {

    console.error("Elementos da página Desvinculação não encontrados.");

    return;

  }


  // =========================================
  // CONFIGURAÇÃO
  // =========================================

  const RELEASE_TIME = 5;


  // =========================================
  // ESTADO
  // =========================================

  let released = false;


  // =========================================
  // LIBERAR PRÓXIMAS SEÇÕES
  // =========================================

  function releaseSections() {

    if (released) return;

    released = true;


    // Exibe as próximas seções

    content.classList.add("released");


    // Move o copyright para o final

    finalFooterSlot.appendChild(copyright);


    // =========================================
    // LIBERAÇÃO CONCLUÍDA
    // =========================================

  }


  // =========================================
  // TEMPORIZADOR DE 5 SEGUNDOS
  // =========================================

  window.setTimeout(() => {

    releaseSections();

  }, RELEASE_TIME);


  // =========================================
  // BOTÃO CTA
  // =========================================

  cta.addEventListener("click", (event) => {

    event.preventDefault();


    // Aguarda a liberação do conteúdo

    if (!released) return;


    // Direciona para as próximas seções

    content.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  });


})();

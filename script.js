
  const grid = document.getElementById('heroGrid');
  const columns = 26;

  function createGrid() {
    const cellSize = window.innerWidth / columns;

    const rows = Math.ceil(
      window.innerHeight / cellSize
    );

    const totalBoxes = columns * rows;

    grid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalBoxes; i++) {
      const box = document.createElement('div');

      box.classList.add('hero-grid');

      if (i >= totalBoxes - columns) {
        box.classList.add('last-row');
      }

      fragment.appendChild(box);
    }

    grid.appendChild(fragment);
  }

  createGrid();

  window.addEventListener('resize', createGrid);


  // ==========================================
  // FLOATING ELEMENTS
  // ==========================================

  const floatingElements = document.querySelectorAll(
    '.ui-designer, .ux-designer, .developer, .creadeveloper, .E-com'
  );

  function floatElement(element) {

    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;

    gsap.to(element, {
      x: gsap.utils.random(0, maxX),
      y: gsap.utils.random(0, maxY),

      duration: gsap.utils.random(4, 8),

      ease: "sine.inOut",

      onComplete: () => {
        floatElement(element);
      }
    });
  }


  floatingElements.forEach((element) => {

    // different starting position for every element
    gsap.set(element, {
      x: gsap.utils.random(0, window.innerWidth - element.offsetWidth),
      y: gsap.utils.random(0, window.innerHeight - element.offsetHeight)
    });

    floatElement(element);

  });
  // dots-grid
const dotGrid = document.querySelector("#dotGrid");
const section = document.querySelector(".section2");

function createDots() {
    dotGrid.innerHTML = "";

    const columns = Math.ceil(window.innerWidth / 18);
    const rows = Math.ceil(section.clientHeight / 18);

    for (let i = 0; i < columns * rows; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dotGrid.appendChild(dot);
    }
}

createDots();
window.addEventListener("resize", createDots);
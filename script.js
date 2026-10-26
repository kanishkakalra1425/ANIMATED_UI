
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

for (let i = 0; i < 10000; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotGrid.appendChild(dot);
}

dotGrid.addEventListener("mousemove", (e) => {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect();

        const dotX = rect.left + rect.width / 2;
        const dotY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            (e.clientX - dotX) ** 2 +
            (e.clientY - dotY) ** 2
        );

        if (distance < 60) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
});
gsap.registerPlugin(ScrollTrigger, SplitText);

const split = SplitText.create(".highlight-text", {
  type: "words"
});

gsap.to(split.words, {
  color: "#fff",
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".dot-text",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});
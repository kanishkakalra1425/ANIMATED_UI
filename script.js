
//   const grid = document.getElementById('heroGrid');
//   const columns = 26;

//   function createGrid() {
//     const cellSize = window.innerWidth / columns;

//     const rows = Math.ceil(
//       window.innerHeight / cellSize
//     );

//     const totalBoxes = columns * rows;

//     grid.innerHTML = '';

//     const fragment = document.createDocumentFragment();

//     for (let i = 0; i < totalBoxes; i++) {
//       const box = document.createElement('div');

//       box.classList.add('hero-grid');

//       if (i >= totalBoxes - columns) {
//         box.classList.add('last-row');
//       }

//       fragment.appendChild(box);
//     }

//     grid.appendChild(fragment);
//   }

//   createGrid();

//   window.addEventListener('resize', createGrid);


//   // ==========================================
//   // FLOATING ELEMENTS
//   // ==========================================

//   const floatingElements = document.querySelectorAll(
//     '.ui-designer, .ux-designer, .developer, .creadeveloper, .E-com'
//   );

//   function floatElement(element) {

//     const maxX = window.innerWidth - element.offsetWidth;
//     const maxY = window.innerHeight - element.offsetHeight;

//     gsap.to(element, {
//       x: gsap.utils.random(0, maxX),
//       y: gsap.utils.random(0, maxY),

//       duration: gsap.utils.random(4, 8),

//       ease: "sine.inOut",

//       onComplete: () => {
//         floatElement(element);
//       }
//     });
//   }


//   floatingElements.forEach((element) => {

//     // different starting position for every element
//     gsap.set(element, {
//       x: gsap.utils.random(0, window.innerWidth - element.offsetWidth),
//       y: gsap.utils.random(0, window.innerHeight - element.offsetHeight)
//     });

//     floatElement(element);

//   });
//   // dots-grid
// const dotGrid = document.querySelector("#dotGrid");

// for (let i = 0; i < 10000; i++) {
//     const dot = document.createElement("div");
//     dot.classList.add("dot");
//     dotGrid.appendChild(dot);
// }

// dotGrid.addEventListener("mousemove", (e) => {
//     const dots = document.querySelectorAll(".dot");

//     dots.forEach((dot) => {
//         const rect = dot.getBoundingClientRect();

//         const dotX = rect.left + rect.width / 2;
//         const dotY = rect.top + rect.height / 2;

//         const distance = Math.sqrt(
//             (e.clientX - dotX) ** 2 +
//             (e.clientY - dotY) ** 2
//         );

//         if (distance < 60) {
//             dot.classList.add("active");
//         } else {
//             dot.classList.remove("active");
//         }
//     });
// });
// gsap.registerPlugin(ScrollTrigger, SplitText);

// const split = SplitText.create(".highlight-text", {
//   type: "words"
// });

// gsap.set(split.words, {
//   color: "#666"
// });

// gsap.to(split.words, {
//   color: "#140101",
//   stagger: 0.1,
//   scrollTrigger: {
//     trigger: ".dot-text",
//     start: "top 80%",
//     end: "bottom 40%",
//     scrub: true
//   }
// });

gsap.registerPlugin(ScrollTrigger, SplitText);

/* =========================
   HERO GRID
========================= */

const hero = document.querySelector("#hero");
const heroGrid = document.querySelector("#heroGrid");

function createHeroGrid() {
  if (!hero || !heroGrid) return;

  const columns = 26;
  const rows = Math.ceil(hero.clientHeight / (hero.clientWidth / columns));
  const totalBoxes = columns * rows;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.classList.add("hero-grid");

    if (i >= totalBoxes - columns) {
      box.classList.add("last-row");
    }

    fragment.appendChild(box);
  }

  heroGrid.replaceChildren(fragment);
}

createHeroGrid();

/* =========================
   FLOATING HERO ELEMENTS
========================= */

const floatingElements = document.querySelectorAll(
  ".ui-designer, .ux-designer, .developer, .creadeveloper, .E-com"
);

const floatingTweens = new WeakMap();

function floatElement(element) {
  if (!hero) return;

  const maxX = Math.max(0, hero.clientWidth - element.offsetWidth);
  const maxY = Math.max(0, hero.clientHeight - element.offsetHeight);

  const nextX = gsap.utils.random(0, maxX);
  const nextY = gsap.utils.random(0, maxY);

  const tween = gsap.to(element, {
    x: nextX,
    y: nextY,
    duration: gsap.utils.random(4, 8),
    ease: "sine.inOut",
    onComplete: () => floatElement(element)
  });

  floatingTweens.set(element, tween);
}

floatingElements.forEach((element, index) => {
  const maxX = Math.max(0, hero.clientWidth - element.offsetWidth);
  const maxY = Math.max(0, hero.clientHeight - element.offsetHeight);

  gsap.set(element, {
    x: gsap.utils.random(0, maxX),
    y: gsap.utils.random(0, maxY)
  });

  // Start at slightly different times.
  gsap.delayedCall(index * 0.25, () => floatElement(element));
});

/* =========================
   DOT GRID
========================= */

const dotGrid = document.querySelector("#dotGrid");
const section = document.querySelector("#about");

let dots = [];
let mouseX = -1000;
let mouseY = -1000;
let hoverFrame = null;

function createDotGrid() {
  if (!dotGrid || !section) return;

  const spacing = 12;
  const columns = Math.ceil(section.clientWidth / spacing);
  const rows = Math.ceil(section.clientHeight / spacing);
  const totalDots = columns * rows;

  const fragment = document.createDocumentFragment();

  dots = [];

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    fragment.appendChild(dot);
    dots.push(dot);
  }

  dotGrid.replaceChildren(fragment);

  // Keep the number of columns consistent with the calculated layout.
  dotGrid.style.gridTemplateColumns = `repeat(${columns}, 12px)`;
}

function updateActiveDots() {
  hoverFrame = null;

  if (!dotGrid) return;

  const radius = 60;
  const radiusSquared = radius * radius;

  dots.forEach((dot) => {
    const rect = dot.getBoundingClientRect();
    const dotX = rect.left + rect.width / 2;
    const dotY = rect.top + rect.height / 2;

    const dx = mouseX - dotX;
    const dy = mouseY - dotY;

    if (dx * dx + dy * dy < radiusSquared) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

if (dotGrid && section) {
  createDotGrid();

  dotGrid.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (hoverFrame === null) {
      hoverFrame = requestAnimationFrame(updateActiveDots);
    }
  });

  dotGrid.addEventListener("pointerleave", () => {
    mouseX = -1000;
    mouseY = -1000;

    if (hoverFrame === null) {
      hoverFrame = requestAnimationFrame(updateActiveDots);
    }
  });
}

/* =========================
   SCROLL TEXT ANIMATION
========================= */

const highlightText = document.querySelector(".highlight-text");

if (highlightText) {
  const split = SplitText.create(highlightText, {
    type: "words",
    wordsClass: "split-word"
  });

  gsap.set(split.words, {
    color: "#777980"
  });

  gsap.to(split.words, {
    color: "#ffffff",
    stagger: 0.12,
    ease: "none",
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      end: "center 45%",
      scrub: true
    }
  });
}

/* =========================
   RESIZE HANDLING
========================= */

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    createHeroGrid();
    createDotGrid();

    floatingElements.forEach((element) => {
      const tween = floatingTweens.get(element);

      if (tween) tween.kill();

      gsap.set(element, {
        x: 0,
        y: 0
      });

      floatElement(element);
    });

    ScrollTrigger.refresh();
  }, 150);
});

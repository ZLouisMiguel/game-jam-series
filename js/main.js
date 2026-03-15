/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */

const GAMES = [
  {
    id: "wordle",
    index: "01",
    title: "Wordle Clone",
    subtitle: "Word Puzzle",
    tags: ["JS", "React"],
    tagClasses: ["js", "react"],
    techColors: { JavaScript: "#facc15", React: "#67e8f9" },
    tech: ["JavaScript", "React"],
    desc: "Word puzzle with color-coded tile feedback and game state management.",
    fullDesc: `A faithful recreation of the word puzzle that swept the internet. The core challenge was the feedback system: green for correct position, yellow for wrong position, gray for absent — with careful handling of duplicate letters.\n\nBuilt with React for state management. Not just tracking guesses but making each change visually meaningful for the player.\n\nResult: a clean, playable clone that taught me more about interactive UI state than any tutorial ever could.`,
    source: "https://github.com/ZLouisMiguel/wordle-clone",
    demo: "https://wordle-lingo-clone.vercel.app/",
    grad: "linear-gradient(145deg,#3b1f7c,#6d28d9,#a78bfa)",
    status: "live",
    rating: "4.7",
    art: "wordle",
  },
  {
    id: "blockblast",
    index: "02",
    title: "Block Blast",
    subtitle: "Canvas Puzzle",
    tags: ["JS", "Canvas"],
    tagClasses: ["js", "canvas"],
    techColors: {
      JavaScript: "#facc15",
      "HTML5 Canvas": "#fb923c",
      CSS: "#60a5fa",
    },
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    desc: "Grid puzzle on raw HTML5 Canvas — every frame hand-drawn with requestAnimationFrame.",
    fullDesc: `A grid-based block placement puzzle built entirely on the HTML5 Canvas API — no DOM elements involved.\n\nEvery frame is manually drawn: clear canvas, redraw grid, render each block. The game loop runs on requestAnimationFrame. Collision detection and line clearing are hand-rolled from scratch.\n\nThis project gave me a deep appreciation for what game engines abstract away — and exactly why that abstraction exists.`,
    source: "https://github.com/ZLouisMiguel/block-blast",
    demo: "https://bblastc.netlify.app/",
    grad: "linear-gradient(145deg,#1e3a8a,#1d4ed8,#60a5fa)",
    status: "live",
    rating: "4.5",
    art: "blockblast",
  },
  {
    id: "snake",
    index: "03",
    title: "Snake",
    subtitle: "Java Desktop",
    tags: ["Java"],
    tagClasses: ["java"],
    techColors: { Java: "#fb923c", "Java Swing": "#4ade80" },
    tech: ["Java", "Java Swing"],
    desc: "Classic snake as a native desktop app. First project outside the browser.",
    fullDesc: `The timeless snake game, rebuilt as a native desktop application with Java Swing. A major shift from web work — suddenly thinking about windowing, native rendering, and desktop architecture.\n\nJava Swing's JFrame → JPanel hierarchy provides structure. javax.swing.Timer drives the game loop; Graphics2D handles rendering; KeyListeners capture input.\n\nNo libraries, no shortcuts. Just Java doing Java things — and me learning how desktop apps actually work.`,
    source: "https://github.com/ZLouisMiguel/snake-java",
    demo: null,
    grad: "linear-gradient(145deg,#052e16,#15803d,#4ade80)",
    status: "source",
    rating: "4.2",
    art: "snake",
  },
];

/* ═══════════════════════════════════════════
   PIXEL ART HELPERS
═══════════════════════════════════════════ */

function tile(bg, bc, s) {
  return `<div class="pt" style="width:${s}px;height:${s}px;background:${bg};border-color:${bc}"></div>`;
}

function row(cells) {
  return `<div class="pr">${cells.join("")}</div>`;
}

function wordleArt(s = 13) {
  const gc = (c) =>
    c === "g"
      ? "rgba(34,197,94,.85)"
      : c === "y"
        ? "rgba(234,179,8,.85)"
        : "rgba(255,255,255,.1)";
  const grid = [
    [null, null, null, null, null],
    ["g", null, null, null, null],
    ["g", "y", null, null, null],
    ["g", "g", "g", "g", "g"],
  ];
  return `<div class="pg">${grid
    .map((r) => row(r.map((c) => tile(gc(c), "rgba(255,255,255,.08)", s))))
    .join("")}</div>`;
}

function blockArt(s = 13) {
  const g = [
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 3, 3, 0, 0],
    [1, 1, 3, 3, 0, 0, 0],
    [1, 1, 0, 0, 4, 4, 0],
    [0, 0, 0, 0, 4, 4, 0],
  ];
  const c = {
    0: "rgba(255,255,255,.03)",
    1: "#3b82f6",
    2: "#f59e0b",
    3: "#ef4444",
    4: "#22c55e",
  };
  return `<div class="pg">${g
    .map((r) =>
      row(
        r.map((x) =>
          tile(c[x], x ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.03)", s),
        ),
      ),
    )
    .join("")}</div>`;
}

function snakeArt(s = 10) {
  const path = [
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [4, 4],
    [3, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
    [7, 5],
    [7, 4],
    [7, 3],
    [7, 2],
  ];
  const food = [2, 8];
  const ps = new Set(path.map(([r, c]) => `${r},${c}`));
  const rows = Array.from({ length: 10 }, (_, ri) =>
    row(
      Array.from({ length: 10 }, (_, ci) => {
        const inPath = ps.has(`${ri},${ci}`);
        const isHead = ri === path[0][0] && ci === path[0][1];
        const isFood = ri === food[0] && ci === food[1];
        const bg = isHead
          ? "#4ade80"
          : inPath
            ? "#16a34a"
            : isFood
              ? "#f87171"
              : "rgba(255,255,255,.03)";
        const bc =
          inPath || isFood ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.03)";
        return tile(bg, bc, s);
      }),
    ),
  );
  return `<div class="pg">${rows.join("")}</div>`;
}

function getArt(type, s) {
  if (type === "wordle") return wordleArt(s);
  if (type === "blockblast") return blockArt(s);
  return snakeArt(s);
}

/* ═══════════════════════════════════════════
   LARGE ART  (game detail preview)
═══════════════════════════════════════════ */

function largeArt(g) {
  let inner = "";

  if (g.art === "wordle") {
    const gc = (c) =>
      c === "g"
        ? "rgba(34,197,94,.85)"
        : c === "y"
          ? "rgba(234,179,8,.85)"
          : "rgba(255,255,255,.09)";
    const grid = [
      [null, null, null, null, null],
      ["g", null, null, null, null],
      ["g", "y", null, null, null],
      ["g", "g", "g", "g", "g"],
    ];
    inner = `<div style="display:flex;flex-direction:column;gap:10px;z-index:1;position:relative">${grid
      .map(
        (r) =>
          `<div style="display:flex;gap:10px">${r
            .map(
              (c) =>
                `<div style="width:54px;height:54px;border-radius:9px;background:${gc(c)};border:1px solid rgba(255,255,255,.1)"></div>`,
            )
            .join("")}</div>`,
      )
      .join("")}</div>`;
  } else if (g.art === "blockblast") {
    const grid = [
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 3, 3, 0, 5, 0],
      [1, 1, 3, 3, 0, 0, 5, 0],
      [1, 1, 0, 0, 4, 4, 0, 0],
      [0, 0, 0, 0, 4, 4, 0, 0],
      [0, 3, 3, 3, 0, 0, 2, 2],
    ];
    const c = {
      0: "rgba(255,255,255,.03)",
      1: "#3b82f6",
      2: "#f59e0b",
      3: "#ef4444",
      4: "#22c55e",
      5: "#a78bfa",
    };
    inner = `<div style="display:flex;flex-direction:column;gap:4px;z-index:1;position:relative">${grid
      .map(
        (r) =>
          `<div style="display:flex;gap:4px">${r
            .map(
              (x) =>
                `<div style="width:28px;height:28px;border-radius:5px;background:${c[x]};border:1px solid ${x ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.03)"}"></div>`,
            )
            .join("")}</div>`,
      )
      .join("")}</div>`;
  } else {
    // snake
    const path = [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [2, 6],
      [3, 6],
      [4, 6],
      [4, 5],
      [4, 4],
      [4, 3],
      [5, 3],
      [6, 3],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [6, 7],
      [5, 7],
    ];
    const food = [3, 10];
    const ps = new Set(path.map(([r, c]) => `${r},${c}`));
    const rows = Array.from(
      { length: 12 },
      (_, ri) =>
        `<div style="display:flex;gap:4px">${Array.from(
          { length: 13 },
          (_, ci) => {
            const inPath = ps.has(`${ri},${ci}`);
            const isHead = ri === path[0][0] && ci === path[0][1];
            const isFood = ri === food[0] && ci === food[1];
            const bg = isHead
              ? "#4ade80"
              : inPath
                ? "#16a34a"
                : isFood
                  ? "#f87171"
                  : "rgba(255,255,255,.03)";
            return `<div style="width:18px;height:18px;border-radius:4px;background:${bg};border:1px solid ${inPath || isFood ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.03)"}"></div>`;
          },
        ).join("")}</div>`,
    ).join("");
    inner = `<div style="display:flex;flex-direction:column;gap:4px;z-index:1;position:relative">${rows}</div>`;
  }

  return `<div class="la-wrap" style="background:${g.grad}">${inner}</div>`;
}

/* ═══════════════════════════════════════════
   FAN CARD TRANSFORMS
═══════════════════════════════════════════ */

const FAN_TR = [
  { t: "translate(-50%,0) translate(-224px,55px) rotate(-18deg)", z: 1 },
  { t: "translate(-50%,0) translate(-112px,16px) rotate(-7deg)", z: 3 },
  { t: "translate(-50%,0) translate(0px,0px) rotate(0deg)", z: 10 },
  { t: "translate(-50%,0) translate(112px,16px) rotate(7deg)", z: 3 },
  { t: "translate(-50%,0) translate(224px,55px) rotate(18deg)", z: 1 },
];

function liftCard(id, idx, hover) {
  const el = document.getElementById("fc-" + id);
  if (!el) return;
  el.style.transform = hover
    ? FAN_TR[idx].t + " translateY(-22px)"
    : FAN_TR[idx].t;
}
window.liftCard = liftCard;

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════ */

function NavHTML(page) {
  return `
    <nav>
      <span class="nav-brand" onclick="go('home')">Game Jam Series</span>
      <ul class="nav-links">
        <li class="${page === "home" ? "active" : ""}" onclick="go('home')">games</li>
        <li class="${page === "about" ? "active" : ""}" onclick="go('about')">about</li>
      </ul>
    </nav>`;
}

function FooterHTML() {
  return `
    <footer>
      <span class="ft-l">© Game Jam Series — ZLouisMiguel</span>
      <div class="ft-r">
        <span onclick="go('home')">games</span>
        <span onclick="go('about')">about</span>
        <span onclick="window.open('https://github.com/ZLouisMiguel','_blank')">github ↗</span>
      </div>
    </footer>`;
}

function FanCard(g, idx) {
  if (!g) {
    return `
      <div class="ghost-fcard" style="transform:${FAN_TR[idx].t};z-index:${FAN_TR[idx].z}">
        <span style="font-size:1.2rem;opacity:.2">?</span>
        <span class="ghost-label">Coming<br/>Soon</span>
      </div>`;
  }
  return `
    <div class="fcard" id="fc-${g.id}"
      style="transform:${FAN_TR[idx].t};z-index:${FAN_TR[idx].z};background:${g.grad}"
      onclick="go('game','${g.id}')"
      onmouseenter="liftCard('${g.id}',${idx},true)"
      onmouseleave="liftCard('${g.id}',${idx},false)">
      <div class="fcard-inner">
        <div class="fcard-top">
          <span class="fcard-rating">★ ${g.rating}</span>
          <span class="fcard-arrow">↗</span>
        </div>
        <div class="fcard-art">${getArt(g.art, 13)}</div>
        <div class="fcard-foot">
          <div class="fcard-name">${g.title}</div>
          <div class="fcard-sub">${g.subtitle}</div>
        </div>
      </div>
    </div>`;
}

const TICKS = [
  "3 Games Built",
  "No Game Engines",
  "JavaScript",
  "Java",
  "HTML5 Canvas",
  "React",
  "Open Source",
  "From Scratch",
  "Game Jam Series",
];

function tickerContent() {
  return [...TICKS, ...TICKS]
    .map((t) => `<span class="tick-item">${t}</span>`)
    .join("");
}

/* ═══════════════════════════════════════════
   PAGES
═══════════════════════════════════════════ */

function HomePage() {
  const fanOrder = [null, GAMES[2], GAMES[0], GAMES[1], null];

  return `
    <div class="page">
      ${NavHTML("home")}

      <section class="hero">
        <div class="hero-left">
          <p class="hero-eyebrow">Open source · 2024</p>
          <h1 class="hero-h1">Fun<br/>Games<br/><em>from</em><br/>Scratch.</h1>
          <p class="hero-desc">
            No game engines, no shortcuts — just me figuring out how things
            work by actually building them. Every game taught me something new.
          </p>
          <div class="hero-actions">
            <span class="btn-primary"
              onclick="document.getElementById('glist').scrollIntoView({behavior:'smooth'})">
              Browse Games →
            </span>
            <span class="btn-ghost" onclick="go('about')">About the Series</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="fan-scene">
            ${fanOrder.map((g, i) => FanCard(g, i)).join("")}
          </div>
        </div>
      </section>

      <div class="scroll-bar">
        <div class="scroll-inner">${tickerContent()}</div>
      </div>

      <section class="section" id="glist">
        <div class="sec-header">
          <span class="sec-num">00 — 03</span>
          <span class="sec-title">All Games</span>
        </div>
        <ul class="games-list">
          ${GAMES.map(
            (g) => `
            <li class="game-row" onclick="go('game','${g.id}')">
              <span class="gr-num">${g.index}</span>
              <div class="gr-main">
                <div class="gr-name">${g.title}</div>
                <div class="gr-desc">${g.desc}</div>
              </div>
              <div class="gr-meta">
                ${g.tags.map((t, i) => `<span class="gr-tag ${g.tagClasses[i]}">${t}</span>`).join("")}
              </div>
              <div class="gr-status">
                ${
                  g.status === "live"
                    ? `<span class="status-live">Live</span>`
                    : `<span class="status-src">Source</span>`
                }
              </div>
              <div class="gr-arrow">↗</div>
            </li>
          `,
          ).join("")}
        </ul>
      </section>

      ${FooterHTML()}
    </div>`;
}

function GamePage(id) {
  const g = GAMES.find((x) => x.id === id);
  if (!g) return HomePage();

  return `
    <div class="page">
      ${NavHTML("game")}
      <div class="gd-page">
        <button class="gd-back" onclick="go('home')">← all games</button>
        <div class="gd-grid">
          <div class="gd-preview">${largeArt(g)}</div>
          <div class="gd-content">
            <p class="gd-eyebrow">${g.subtitle}</p>
            <h1 class="gd-title">${g.title}</h1>
            <div class="gd-tags">
              <span class="gr-tag ${g.status === "live" ? "react" : "java"}"
                style="font-size:.65rem;padding:3px 10px">
                ${g.status === "live" ? "● Live" : "◆ Source Only"}
              </span>
              <span style="font-family:var(--mono);font-size:.65rem;color:var(--t3);
                padding:3px 10px;border:1px solid var(--border);border-radius:3px">
                ★ ${g.rating}
              </span>
            </div>

            <div class="gd-div"></div>
            <p class="gd-sec-label">About</p>
            <p class="gd-text">${g.fullDesc}</p>

            <div class="gd-div"></div>
            <p class="gd-sec-label">Tech Stack</p>
            <div class="tech-pills">
              ${g.tech
                .map(
                  (t) => `
                <div class="tech-pill">
                  <div class="tpill-dot" style="background:${g.techColors[t]}"></div>
                  ${t}
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="gd-div"></div>
            <p class="gd-sec-label">Links</p>
            <div class="gd-links">
              ${g.demo ? `<a href="${g.demo}" target="_blank" class="link-primary">↗ Play Live Demo</a>` : ""}
              <a href="${g.source}" target="_blank" class="link-secondary">⌥ Source Code</a>
            </div>
          </div>
        </div>
      </div>
      ${FooterHTML()}
    </div>`;
}

function AboutPage() {
  return `
    <div class="page">
      ${NavHTML("about")}
      <div class="ab-page">
        <button class="gd-back" onclick="go('home')">← home</button>

        <h1 class="ab-h">Building<br/>Games <em>from</em><br/>Scratch.</h1>
        <p class="ab-lead">
          No engines, no shortcuts — just figuring out how things work by
          actually building them. This series is equal parts portfolio and
          learning journal. Some games are polished, some are rough, all of
          them moved me forward.
        </p>

        <div class="ab-section">
          <h2 class="ab-sec-h">Why I'm doing this</h2>
          <ul class="goal-list">
            <li>Get better at game logic and state management</li>
            <li>Actually understand how rendering and input works under the hood</li>
            <li>Try different genres and see what breaks</li>
            <li>Write cleaner code with each new project</li>
            <li>Have something to show for the time I spend coding</li>
          </ul>
        </div>

        <div class="ab-section">
          <h2 class="ab-sec-h">Tech used so far</h2>
          <div class="stack-row">
            ${[
              "JavaScript ES6+",
              "React",
              "HTML5 Canvas",
              "CSS3",
              "Java",
              "Java Swing",
            ]
              .map((t) => `<span class="stag">${t}</span>`)
              .join("")}
          </div>
        </div>

        <div class="ab-section">
          <h2 class="ab-sec-h">Get in touch</h2>
          <div class="contact-row">
            <div class="c-icon">⌥</div>
            <div>
              <p class="c-label">GitHub</p>
              <a href="https://github.com/ZLouisMiguel" target="_blank" class="c-val">
                github.com/ZLouisMiguel
              </a>
            </div>
          </div>
          <p style="margin-top:16px;font-size:.85rem;color:var(--t2);line-height:1.75;font-weight:300">
            All projects are open source — explore, fork, or reach out on GitHub.
            Want to contribute a game or just say hello? That's the best place to find me.
          </p>
        </div>

        <div class="ab-quote">
          <p>"Projects may vary in polish but every single one moved me forward. That's the whole point." 🚀</p>
        </div>
      </div>
      ${FooterHTML()}
    </div>`;
}

/* ═══════════════════════════════════════════
   ROUTER
═══════════════════════════════════════════ */

let PAGE = "home";
let GAME_ID = null;

function go(page, gameId = null) {
  PAGE = page;
  GAME_ID = gameId;
  render();
  window.scrollTo(0, 0);
}
window.go = go;

function render() {
  const app = document.getElementById("app");
  if (PAGE === "home") app.innerHTML = HomePage();
  else if (PAGE === "game") app.innerHTML = GamePage(GAME_ID);
  else if (PAGE === "about") app.innerHTML = AboutPage();
}

render();

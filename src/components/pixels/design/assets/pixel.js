/* ===========================================================
   Pixel engine — CSS box-shadow sprite builder + tiny FX
   Authentic pixel art, no images. Drop a <i data-sprite="heart">
   anywhere; size via data-unit (px per pixel) and data-color.
   =========================================================== */
(function () {
  "use strict";

  // Each pattern is a small grid. 'X' = main color, '.' / ' ' = empty.
  // Other letters map to data-c<LETTER> overrides (else fall back to --tint).
  const SPRITES = {
    heart: [
      ".XX.XX.",
      "XXXXXXX",
      "XXXXXXX",
      ".XXXXX.",
      "..XXX..",
      "...X..."
    ],
    sparkle: [
      "..X..",
      "..X..",
      "XXXXX",
      "..X..",
      "..X.."
    ],
    star4: [
      "...X...",
      "..XXX..",
      "X.XXX.X",
      "XXXXXXX",
      "X.XXX.X",
      "..XXX..",
      "...X..."
    ],
    gem: [
      ".XXXX.",
      "XXXXXX",
      "XXXXXX",
      ".XXXX.",
      "..XX..",
      "...X.."
    ],
    coin: [
      ".XXXX.",
      "XOOOOX",
      "XOOOOX",
      "XOOOOX",
      "XOOOOX",
      ".XXXX."
    ],
    cloud: [
      "....XXXX...",
      "..XXXXXXXX.",
      ".XXXXXXXXXX",
      "XXXXXXXXXXX",
      "XXXXXXXXXXX",
      ".XXXXXXXXX."
    ],
    slime: [
      "..XXXX..",
      ".XXXXXX.",
      "XXXXXXXX",
      "XOXXXXOX",
      "XXXXXXXX",
      ".XXXXXX."
    ],
    mushroom: [
      ".XXXXX.",
      "XXOXXOX",
      "XXXXXXX",
      "XXXXXXX",
      "..SSS..",
      "..SSS.."
    ],
    leaf: [
      ".....X",
      "...XXX",
      ".XXXX.",
      "XXXXX.",
      "XXXX..",
      ".X...."
    ],
    flag: [
      "X.....",
      "XXXXX.",
      "XXXXXX",
      "XXXXX.",
      "X.....",
      "X.....",
      "X....."
    ],
    arrow: [
      "..X..",
      "...X.",
      "XXXXX",
      "...X.",
      "..X.."
    ]
  };

  const DEFAULT_ALT = "#3a2e3f"; // eyes / inner darks

  function build(el) {
    const name = el.dataset.sprite;
    const grid = SPRITES[name];
    if (!grid) return;
    const u = parseFloat(el.dataset.unit || "4");
    const main = el.dataset.color || getComputedStyle(el).color || "#000";
    const shadows = [];
    grid.forEach((row, y) => {
      [...row].forEach((ch, x) => {
        if (ch === "." || ch === " ") return;
        let col = main;
        if (ch !== "X") {
          col = el.dataset["c" + ch] || el.dataset.alt || DEFAULT_ALT;
        }
        shadows.push(`${x * u}px ${y * u}px 0 0 ${col}`);
      });
    });
    el.style.setProperty("--u", u + "px");
    el.style.width = u + "px";
    el.style.height = u + "px";
    el.style.boxShadow = shadows.join(",");
    el.style.display = "inline-block";
    el.dataset.built = "1";
    // expose grid extent for centering helpers
    el.style.setProperty("--sw", grid[0].length * u + "px");
    el.style.setProperty("--sh", grid.length * u + "px");
  }

  function buildAll(root) {
    (root || document)
      .querySelectorAll("[data-sprite]:not([data-built])")
      .forEach(build);
  }

  // Scatter floating decorative sprites into any [data-pixel-field]
  function seedFields() {
    document.querySelectorAll("[data-pixel-field]").forEach((field) => {
      const spec = field.dataset.pixelField
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      spec.forEach((entry) => {
        // format: name,color,count,minU,maxU
        const [name, color, count, minU, maxU] = entry.split(",");
        const n = parseInt(count || "6", 10);
        for (let i = 0; i < n; i++) {
          const i2 = document.createElement("i");
          i2.className = "px-float";
          i2.dataset.sprite = name;
          i2.dataset.color = color;
          const u = rand(parseFloat(minU || "3"), parseFloat(maxU || "5"));
          i2.dataset.unit = u.toFixed(1);
          i2.style.left = rand(2, 96).toFixed(2) + "%";
          i2.style.top = rand(2, 94).toFixed(2) + "%";
          i2.style.setProperty("--dur", rand(4.5, 9).toFixed(2) + "s");
          i2.style.setProperty("--delay", rand(-6, 0).toFixed(2) + "s");
          i2.style.setProperty("--amp", rand(6, 16).toFixed(1) + "px");
          i2.style.opacity = rand(0.5, 0.95).toFixed(2);
          field.appendChild(i2);
        }
      });
    });
  }

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function init() {
    seedFields();
    buildAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.Pixel = { build, buildAll, SPRITES };
})();

import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.MOTION_BASE || "http://localhost:3100";
const SHOTS = process.env.MOTION_SHOTS || "/tmp/motion-shots";
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const pass = (name, detail) => results.push({ ok: true, name, detail });
const fail = (name, detail) => results.push({ ok: false, name, detail });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(`PAGEERROR: ${e.message}`));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

// Smoothly scroll to an absolute Y and let ScrollTrigger settle.
async function scrollTo(y) {
  await page.evaluate((target) => {
    window.scrollTo(0, target);
  }, y);
  await page.waitForTimeout(320);
}
const docHeight = () => page.evaluate(() => document.body.scrollHeight);

/* -------- motion-ready gate -------- */
const ready = await page.evaluate(() => document.documentElement.classList.contains("motion-ready"));
ready
  ? pass("motion-ready applied before paint", "reveal targets start hidden only when JS + motion are on")
  : fail("motion-ready applied", "class missing");

/* -------- PATTERN 1: REVEAL --------
   Must run FIRST: reveals use once:true, so any later deep scroll would fire
   them permanently and make this assertion meaningless. */
const problemTop = await page.evaluate(
  () => document.querySelector("#problem").getBoundingClientRect().top + window.scrollY,
);
const revealBefore = await page.evaluate(
  () => getComputedStyle(document.querySelector("#problem [data-reveal]")).opacity,
);
await scrollTo(problemTop - 250);
await page.waitForTimeout(1500);
const revealAfter = await page.evaluate(
  () => getComputedStyle(document.querySelector("#problem [data-reveal]")).opacity,
);
Number(revealBefore) < 0.5 && Number(revealAfter) > 0.9
  ? pass("REVEAL fires on enter", `opacity ${revealBefore} → ${revealAfter}`)
  : fail("REVEAL", `opacity ${revealBefore} → ${revealAfter}`);
await page.screenshot({ path: `${SHOTS}/02-problem.png` });
await scrollTo(0);
await page.waitForTimeout(300);

/* -------- PATTERN 3: PARALLAX -------- */
const parallaxA = await page.evaluate(
  () => getComputedStyle(document.querySelector("[data-parallax]")).transform,
);
await scrollTo(600);
const parallaxB = await page.evaluate(
  () => getComputedStyle(document.querySelector("[data-parallax]")).transform,
);
parallaxA !== parallaxB
  ? pass("PARALLAX layers move on scroll", `${parallaxA} → ${parallaxB}`)
  : fail("PARALLAX", `transform unchanged (${parallaxA})`);

// Layers at different depths must move DIFFERENT distances, or it isn't depth.
const depths = await page.evaluate(() =>
  [...document.querySelectorAll("[data-parallax]")].map((el) => ({
    depth: el.dataset.depth,
    m: new DOMMatrix(getComputedStyle(el).transform).f,
  })),
);
const distinct = new Set(depths.map((d) => Math.round(d.m))).size;
distinct > 1
  ? pass("PARALLAX depth separation", `${distinct} distinct offsets: ${depths.map((d) => `${d.depth}:${Math.round(d.m)}px`).join(", ")}`)
  : fail("PARALLAX depth separation", "all layers moved identically");

await page.screenshot({ path: `${SHOTS}/01-hero.png` });

/* -------- PATTERN 5: SCROLL PROGRESS -------- */
await scrollTo(0);
const progA = await page.evaluate(() =>
  new DOMMatrix(getComputedStyle(document.querySelector(".fixed.inset-x-0.top-0 div")).transform).a,
);
await scrollTo(await docHeight().then((h) => h * 0.5));
const progB = await page.evaluate(() =>
  new DOMMatrix(getComputedStyle(document.querySelector(".fixed.inset-x-0.top-0 div")).transform).a,
);
progB > progA
  ? pass("SCROLL PROGRESS bar advances", `scaleX ${progA.toFixed(2)} → ${progB.toFixed(2)}`)
  : fail("SCROLL PROGRESS", `scaleX ${progA} → ${progB}`);

/* -------- PATTERN 2: PIN + PATTERN 6: SCROLL LINK -------- */
const spacers = await page.evaluate(() => document.querySelectorAll(".pin-spacer").length);
spacers >= 2
  ? pass("PIN creates pin-spacers", `${spacers} pinned sections (dimensions + pipeline)`)
  : fail("PIN", `expected >=2 pin-spacers, found ${spacers}`);

const dimTop = await page.evaluate(
  () => document.querySelector("#dimensions").getBoundingClientRect().top + window.scrollY,
);
// GSAP wraps a pinned element in .pin-spacer and switches the element itself to
// position:fixed only while the pin is active.
await scrollTo(dimTop + 400);
const pinState = await page.evaluate(() => {
  const el = document.querySelector("#dimensions .pin-spacer > div");
  if (!el) return { position: "NO PIN-SPACER CHILD" };
  const cs = getComputedStyle(el);
  return { position: cs.position, top: cs.top };
});
pinState.position === "fixed"
  ? pass("PIN holds section fixed while scrolling", `position: ${pinState.position}, top: ${pinState.top}`)
  : fail("PIN fixed", `position: ${pinState.position}`);

// Scroll-linked score counter must climb as we scrub through the pin.
const readAt = async (offset) => {
  await scrollTo(dimTop + offset);
  return page.evaluate(() => {
    const spans = [...document.querySelectorAll("#dimensions span")];
    const el = spans.find((s) => /^\d{2,3}$/.test(s.textContent.trim()));
    return el ? Number(el.textContent.trim()) : null;
  });
};
const s1 = await readAt(200);
const s2 = await readAt(1200);
const s3 = await readAt(2600);
await page.screenshot({ path: `${SHOTS}/03-dimensions.png` });
s1 !== null && s2 > s1 && s3 > s2
  ? pass("SCROLL LINK scrubs composite score", `${s1} → ${s2} → ${s3} /100`)
  : fail("SCROLL LINK score", `readings: ${s1} → ${s2} → ${s3}`);

/* -------- PATTERN 4: HORIZONTAL -------- */
const pipeTop = await page.evaluate(
  () => document.querySelector("#pipeline").getBoundingClientRect().top + window.scrollY,
);
const trackX = async (offset) => {
  await scrollTo(pipeTop + offset);
  return page.evaluate(() => {
    const track = document.querySelector("#pipeline .flex.w-max");
    return new DOMMatrix(getComputedStyle(track).transform).e;
  });
};
const x1 = await trackX(100);
const x2 = await trackX(900);
const x3 = await trackX(1800);
await page.screenshot({ path: `${SHOTS}/04-pipeline.png` });
x2 < x1 && x3 < x2
  ? pass("HORIZONTAL track travels sideways", `x ${Math.round(x1)} → ${Math.round(x2)} → ${Math.round(x3)}px`)
  : fail("HORIZONTAL", `x ${x1} → ${x2} → ${x3}`);

/* -------- PATTERN 6 again: ECONOMICS COUNTERS -------- */
const ecoTop = await page.evaluate(
  () => document.querySelector("#economics").getBoundingClientRect().top + window.scrollY,
);
await scrollTo(ecoTop - 400);
await page.waitForTimeout(400);
const c1 = await page.evaluate(() =>
  [...document.querySelectorAll("#economics span")].map((s) => s.textContent).join("|"),
);
await scrollTo(ecoTop + 500);
await page.waitForTimeout(600);
const counters = await page.evaluate(() => {
  const nums = [...document.querySelectorAll("#economics span")]
    .map((s) => s.textContent.replace(/,/g, ""))
    .filter((t) => /^\d+$/.test(t))
    .map(Number);
  return nums;
});
await page.screenshot({ path: `${SHOTS}/05-economics.png` });
counters.some((n) => n > 100)
  ? pass("SCROLL LINK counts cost figures", `values: ${counters.join(", ")}`)
  : fail("SCROLL LINK counters", `values: ${counters.join(", ")}`);

/* -------- bottom + horizontal overflow -------- */
await scrollTo(await docHeight());
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/06-cta.png` });

const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
overflow <= 1 ? pass("No horizontal page overflow", `${overflow}px`) : fail("Horizontal overflow", `${overflow}px`);

/* -------- MOBILE -------- */
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await mobile.goto(BASE, { waitUntil: "networkidle" });
await mobile.waitForTimeout(700);
const mOverflow = await mobile.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
await mobile.screenshot({ path: `${SHOTS}/07-mobile-hero.png` });
mOverflow <= 1 ? pass("Mobile: no overflow at 390px", `${mOverflow}px`) : fail("Mobile overflow", `${mOverflow}px`);

/* -------- REDUCED MOTION -------- */
const rm = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await rm.emulateMedia({ reducedMotion: "reduce" });
await rm.goto(BASE, { waitUntil: "networkidle" });
await rm.waitForTimeout(700);
const rmReady = await rm.evaluate(() => document.documentElement.classList.contains("motion-ready"));
const rmOpacity = await rm.evaluate(() =>
  [...document.querySelectorAll("[data-reveal]")].map((el) => getComputedStyle(el).opacity),
);
const rmPins = await rm.evaluate(() => document.querySelectorAll(".pin-spacer").length);
await rm.screenshot({ path: `${SHOTS}/08-reduced-motion.png`, fullPage: false });
!rmReady && rmOpacity.every((o) => Number(o) === 1) && rmPins === 0
  ? pass("REDUCED MOTION: content visible, nothing pinned", `${rmOpacity.length} elements at opacity 1, 0 pins`)
  : fail("REDUCED MOTION", `ready=${rmReady} pins=${rmPins} opacities=${[...new Set(rmOpacity)].join(",")}`);

await browser.close();

/* -------- report -------- */
console.log("\n" + "=".repeat(62));
results.forEach((r) => console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}\n      ${r.detail}`));
console.log("=".repeat(62));
console.log(`${results.filter((r) => r.ok).length}/${results.length} checks passed`);
if (consoleErrors.length) {
  console.log("\nCONSOLE ERRORS:");
  [...new Set(consoleErrors)].forEach((e) => console.log("  " + e));
} else {
  console.log("No console errors.");
}
process.exit(results.every((r) => r.ok) ? 0 : 1);

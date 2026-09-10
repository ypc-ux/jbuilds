---
name: scroll-motion
description: Build scroll-driven web animations with GSAP ScrollTrigger — reveal-on-scroll, pinned sections, parallax depth, horizontal scroll, scroll progress indicators, and scroll-linked (scrubbed) timelines. Use whenever adding, changing, reviewing, or debugging scroll animation on a site, or when someone asks for a section to "animate in", "stick", "feel deeper", "move sideways", "show progress", or "follow the scroll". Also use when a scroll animation is misfiring — jumping pins, progress bars that fill too fast, triggers firing at the wrong position.
---

# Scroll motion

Six primitives. Each exists for exactly one job. Pick by the job, never by
what looks impressive.

| Need | Pattern | Primitive |
|---|---|---|
| Reveal something | fire on entry | `reveal` |
| Hold an element | keep it fixed while scrolling past | `pin` |
| Create depth or mood | layers moving at different rates | `parallax` |
| Sideways movement | vertical scroll → lateral travel | `horizontal` |
| Show position in the page | 0..1 readout | `progress` |
| Give the reader control | timeline bound 1:1 to scroll | `scrollLink` |

Reference implementation: `src/lib/motion/primitives.ts`.
Regression suite: `scripts/verify-motion.mjs`.

## Choosing

- **reveal** — the default. Content arrives when the reader reaches it. Use
  `once: true`; re-animating on scroll-back is annoying, not delightful.
- **pin** — only when several ideas must be compared inside one frame.
  Releasing between them breaks the comparison. A pin that holds a single
  static message is just a scroll tax.
- **parallax** — for atmosphere behind content, never for the content itself.
  Depths must actually differ or it reads as lag, not depth.
- **horizontal** — for genuine sequences (pipelines, timelines, steps).
  Not for grids or galleries, where readers expect to scan freely.
- **progress** — for long pages where "how much is left?" is a real question.
- **scrollLink** — when the reader should drive the reveal. Scrubbing makes the
  wheel a transport control. Anything that plays on its own is not this.

## Non-negotiables

**Reduced motion.** Wrap every registration in
`gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", ...)`.
Reverting the matchMedia removes tweens *and* pins, leaving the composed page.
Never ship a pin or a scrub that a reduced-motion visitor still gets.

**Never hide content that JS might not un-hide.** Reveal targets start at
`opacity: 0` only under a `.motion-ready` class set by a tiny inline script in
`<head>` that runs before paint and checks the motion query. No JS, or reduced
motion, means the class is never added and everything renders visible. Setting
that state in an effect instead causes a visible flash.

**No CSS smooth scrolling.** `scroll-behavior: smooth` on `html` fights
ScrollTrigger's scrub math and makes pins jitter. Next.js 16 no longer strips it
for you — keep it `auto`.

**`overflow-x: clip` on body.** Pinned and horizontal sections push content past
the viewport mid-tween. Use `clip`, not `hidden` (which creates a scroll
container).

## refreshPriority — the bug you will hit

**Symptom:** a progress bar reaches 100% at half the page; section triggers fire
at roughly half their correct scroll position; anything positioned *after* a
pinned section is measured wrong.

**Cause:** `ScrollTrigger.refresh()` temporarily strips pin-spacing to measure
natural layout. Any trigger measured during that window sees a document without
the height its pins add — often about half the real height.

**Fix:** order the refresh explicitly. Higher priority refreshes first.

```ts
export const PRIORITY = {
  pin: 1,       // pins add document height — measure these first
  document: -1, // depends on final pinned height — measure last
};
```

Give every `pin: true` trigger `refreshPriority: PRIORITY.pin`. Give page-level
progress and any trigger sitting after a pinned section
`refreshPriority: PRIORITY.document`. Creation order is not enough: React runs
child effects before parent effects, so a progress bar declared above the
pinned sections is always created first.

For whole-document progress, do not use `<body>` as the trigger. Use numeric
bounds so they re-evaluate on refresh:

```ts
ScrollTrigger.create({
  start: 0,
  end: () => ScrollTrigger.maxScroll(window),
  invalidateOnRefresh: true,
  refreshPriority: PRIORITY.document,
  onUpdate: (self) => onUpdate(self.progress),
});
```

Also refresh after layout settles — pin-spacing is not applied until after
paint, and webfonts shift text when they land:

```ts
requestAnimationFrame(() => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => ScrollTrigger.refresh());
```

## Other traps

- **Tailwind `scale-*` utilities compile to the CSS `scale` property**, which
  multiplies against the `transform` GSAP writes rather than being replaced by
  it. Set initial transforms inline and let GSAP own them.
- **`anticipatePin: 1`** on every pin, or fast scrolling drops a frame and the
  section visibly jumps.
- **`invalidateOnRefresh: true`** plus function-based `end` values for anything
  that depends on measured size, so resizing recalculates instead of using
  stale numbers.
- **Horizontal travel should equal scroll distance** (`end: () => "+=" + overflow`).
  Any other ratio feels either sluggish or runaway.
- **Counters need `font-variant-numeric: tabular-nums`** or the layout reflows
  on every frame while counting.

## Verifying

Assertions that compile are not assertions that fire. Drive a real browser:

```bash
npm run build && npx next start -p 3100 &
node scripts/verify-motion.mjs
```

It checks each pattern by measuring the DOM at several scroll positions —
transforms actually change, pins actually go `position: fixed`, scrubbed values
actually climb, reduced motion actually disables everything, and no axis
overflows at 390px.

Two things that will fool you when writing such tests:
- Reveals use `once: true`, so **test reveal before any deep scroll**, or an
  earlier test will have fired them permanently.
- GSAP wraps a pinned element in `.pin-spacer`, so the pinned element is
  `.pin-spacer > *`, not the original child selector.

And always look at the screenshots. Passing assertions say the animation runs;
only your eyes say it looks right.

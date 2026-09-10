"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============================================================
   The six scroll primitives.

   Each one exists for exactly one job:

   1. reveal      — need to REVEAL something        → fire on scroll
   2. pin         — need to HOLD an element         → keep it fixed while scrolling past
   3. parallax    — need DEPTH                      → move layers at different rates
   4. horizontal  — need SIDEWAYS movement          → convert vertical scroll to lateral
   5. progress    — need to show POSITION           → report 0..1 through the document
   6. scrollLink  — need SCROLL CONTROL             → bind a timeline 1:1 to scroll

   Every primitive is registered inside a gsap.matchMedia() scope keyed on
   prefers-reduced-motion, so a visitor who asks for less motion gets the final
   composed state with no tweens and no pinning.
   ============================================================ */

export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

/**
 * Refresh ordering. ScrollTrigger refreshes triggers in descending priority and
 * temporarily strips pin-spacing while it measures, so anything whose position
 * depends on how much height the pins add MUST refresh after them. Without this,
 * a page-level progress bar measures a document roughly half its true height.
 */
export const PRIORITY = {
  /** Pins add document height — measure them first. */
  pin: 1,
  /** Depends on the final, fully-pinned document height — measure last. */
  document: -1,
} as const;

let registered = false;

export function registerScrollPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  // Pinned sections change document height; without this, a resize leaves
  // every downstream trigger measuring against stale offsets.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

/* ---------------------------------------------------------------
   1. REVEAL — "when you need to reveal something"
   Elements marked [data-reveal] rise and fade in as they enter.
   [data-reveal-child] inside a [data-reveal-group] stagger together.
   --------------------------------------------------------------- */
export function reveal(scope: HTMLElement | Document = document) {
  const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]", scope);

  groups.forEach((group) => {
    const children = gsap.utils.toArray<HTMLElement>("[data-reveal-child]", group);
    if (!children.length) return;
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: "top 78%", once: true },
    });
    gsap.set(children, { y: 28 });
  });

  const singles = gsap
    .utils.toArray<HTMLElement>("[data-reveal]", scope)
    .filter((el) => !el.closest("[data-reveal-group]"));

  singles.forEach((el) => {
    gsap.set(el, { y: 28 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
    });
  });
}

/* ---------------------------------------------------------------
   3. PARALLAX — "when you need depth"
   [data-parallax] with data-depth from -1 (recedes) to 1 (advances).
   Layers travel different distances across the same scroll span, which
   is what the eye reads as physical depth.
   --------------------------------------------------------------- */
export function parallax(scope: HTMLElement | Document = document) {
  const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]", scope);

  layers.forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth ?? "0.2");
    const trigger = (layer.closest("[data-parallax-scene]") as HTMLElement) ?? layer;

    gsap.fromTo(
      layer,
      { yPercent: 0 },
      {
        yPercent: depth * 100,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

/* ---------------------------------------------------------------
   2. PIN — "when you need to hold an element"
   Holds `element` in place while the page scrolls `distance` past it.
   Returns the ScrollTrigger so callers can attach scrubbed timelines.
   --------------------------------------------------------------- */
export function pin(
  element: HTMLElement,
  options: { distance?: string; scrub?: boolean | number; anticipatePin?: number } = {},
) {
  const { distance = "+=100%", scrub = true, anticipatePin = 1 } = options;

  return ScrollTrigger.create({
    trigger: element,
    start: "top top",
    end: distance,
    pin: true,
    // Without this the pin drops a frame on fast scroll and the section jumps.
    anticipatePin,
    scrub,
    invalidateOnRefresh: true,
    refreshPriority: PRIORITY.pin,
  });
}

/* ---------------------------------------------------------------
   4. HORIZONTAL — "when you need sideways movement"
   Pins `viewport` and translates `track` laterally by exactly its overflow,
   so vertical scroll distance maps 1:1 onto horizontal travel.
   --------------------------------------------------------------- */
export function horizontal(viewport: HTMLElement, track: HTMLElement) {
  const overflow = () => Math.max(0, track.scrollWidth - viewport.offsetWidth);

  const tween = gsap.to(track, {
    x: () => -overflow(),
    ease: "none",
    scrollTrigger: {
      trigger: viewport,
      start: "top top",
      // Scroll distance equals horizontal travel — the track moves at the
      // same rate as the wheel, so it never feels sluggish or overrun.
      end: () => `+=${overflow()}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      invalidateOnRefresh: true,
      refreshPriority: PRIORITY.pin,
    },
  });

  return tween;
}

/* ---------------------------------------------------------------
   5. PROGRESS — "when you need to show position"
   Reports 0..1 for the whole document (or a given element).
   --------------------------------------------------------------- */
export function progress(onUpdate: (value: number) => void, target?: HTMLElement) {
  // For whole-document progress, measure the scroller directly rather than
  // using <body> as a trigger element: pinned sections change body's box in
  // ways that make "bottom bottom" resolve to roughly half the real range.
  // Function-based bounds are re-evaluated on every refresh, so this stays
  // correct as pins are added.
  if (!target) {
    return ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => onUpdate(self.progress),
      invalidateOnRefresh: true,
      refreshPriority: PRIORITY.document,
    });
  }

  return ScrollTrigger.create({
    trigger: target,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => onUpdate(self.progress),
    invalidateOnRefresh: true,
  });
}

/* ---------------------------------------------------------------
   6. SCROLL LINK — "scroll control"
   Binds a timeline to a trigger so playhead position === scroll position.
   Nothing plays on its own; the wheel is the transport control.
   --------------------------------------------------------------- */
export function scrollLink(
  timeline: gsap.core.Timeline,
  trigger: HTMLElement,
  options: { start?: string; end?: string; scrub?: boolean | number; pin?: boolean } = {},
) {
  const { start = "top 70%", end = "bottom 40%", scrub = 0.8, pin: shouldPin = false } = options;

  ScrollTrigger.create({
    animation: timeline,
    trigger,
    start,
    end,
    scrub,
    pin: shouldPin,
    anticipatePin: shouldPin ? 1 : 0,
    invalidateOnRefresh: true,
    refreshPriority: shouldPin ? PRIORITY.pin : 0,
  });

  return timeline;
}

/* ---------------------------------------------------------------
   Helper: a scroll-linked number counter.
   Counts a value while scrubbing, without reflowing layout
   (pair with the .tabular class).
   --------------------------------------------------------------- */
export function countTo(
  el: HTMLElement,
  to: number,
  format: (n: number) => string = (n) => Math.round(n).toLocaleString(),
) {
  const proxy = { value: 0 };
  return gsap.to(proxy, {
    value: to,
    ease: "none",
    onUpdate: () => {
      el.textContent = format(proxy.value);
    },
  });
}

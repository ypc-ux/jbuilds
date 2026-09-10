"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_QUERY, PRIORITY, progress, registerScrollPlugins } from "@/lib/motion/primitives";

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "dimensions", label: "Dimensions" },
  { id: "pipeline", label: "Pipeline" },
  { id: "economics", label: "Economics" },
];

/**
 * PATTERN 5 — SCROLL PROGRESS.
 * Reports how far through the document the reader is: a hairline bar across the
 * top, a numeric readout, and a rail marking which section is active.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    registerScrollPlugins();
    const mm = gsap.matchMedia();

    mm.add(MOTION_QUERY, () => {
      const st = progress((value) => {
        gsap.set(bar.current, { scaleX: value });
        if (readout.current) {
          readout.current.textContent = String(Math.round(value * 100)).padStart(2, "0");
        }
      });

      // Section rail: which heading is currently in the upper half of the screen.
      const triggers = SECTIONS.map((section, i) =>
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: "top 50%",
          end: "bottom 50%",
          invalidateOnRefresh: true,
          // Sections sit after pinned sections, so their offsets are only
          // correct once pin-spacing has been restored.
          refreshPriority: PRIORITY.document,
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        }),
      );

      return () => {
        st.kill();
        triggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  });

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-line">
        {/* Initial scale is set inline, not via a Tailwind scale-* utility:
            those compile to the `scale` property, which would multiply against
            the `transform` GSAP writes instead of being replaced by it. */}
        <div
          ref={bar}
          className="h-full origin-left bg-signal"
          style={{ transform: "scaleX(0)", boxShadow: "0 0 12px var(--color-signal-glow)" }}
        />
      </div>

      <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {SECTIONS.map((section, i) => (
          <div key={section.id} className="flex items-center gap-2.5">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                i === active ? "text-signal" : "text-ink-faint/0"
              }`}
            >
              {section.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                i === active ? "w-7 bg-signal" : "w-3.5 bg-line-bright"
              }`}
            />
          </div>
        ))}
        <span className="mt-2 font-mono text-[10px] tabular text-ink-faint">
          <span ref={readout}>00</span>
          <span className="opacity-50">%</span>
        </span>
      </div>
    </>
  );
}

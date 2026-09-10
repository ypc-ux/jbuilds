"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MOTION_QUERY, registerScrollPlugins, scrollLink } from "@/lib/motion/primitives";

const DIMENSIONS = [
  {
    name: "Developer Productivity",
    points: 25,
    question: "How much time does this give back?",
    body: "Hours saved per week against hours spent learning it. A tool that saves two hours and takes twelve to master is a loss until month three.",
    color: "var(--color-verdict-strong)",
  },
  {
    name: "Technical Debt",
    points: 25,
    question: "What does it cost to keep — and to remove?",
    body: "Maintenance burden, API stability, and exit cost. The score drops hard for anything that is easy to adopt and expensive to reverse.",
    color: "var(--color-verdict-good)",
  },
  {
    name: "Business Fit",
    points: 20,
    question: "Does it move a number you actually track?",
    body: "Alignment with current objectives, not hypothetical ones. Capability you will not use for six months scores as zero, not as optionality.",
    color: "var(--color-verdict-mixed)",
  },
  {
    name: "Implementation Effort",
    points: 20,
    question: "What does it take to reach production?",
    body: "Integration complexity, migration surface, and the calendar time before it earns anything. Measured in engineer-weeks, not story points.",
    color: "var(--color-verdict-weak)",
  },
  {
    name: "ROI Analysis",
    points: 10,
    question: "What is the payoff ratio, honestly?",
    body: "Total cost of ownership against measured return. The final ten points are the sanity check on the ninety that came before them.",
    color: "var(--color-verdict-avoid)",
  },
];

const CUMULATIVE = DIMENSIONS.reduce<number[]>((acc, d) => {
  acc.push((acc.at(-1) ?? 0) + d.points);
  return acc;
}, []);

/**
 * PATTERN 2 (PIN) + PATTERN 6 (SCROLL LINK).
 *
 * Pin, because the reader needs to HOLD one frame while five things are
 * explained inside it — releasing the frame between each would break the
 * comparison.
 *
 * Scroll link, because the score is the subject. Binding the timeline 1:1 to
 * scroll makes the wheel the transport control: the reader advances the
 * evaluation themselves rather than watching it play.
 */
export function Dimensions() {
  const section = useRef<HTMLDivElement>(null);
  const total = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerScrollPlugins();
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERY, () => {
        const scope = section.current!;
        const rows = gsap.utils.toArray<HTMLElement>("[data-dim-row]", scope);
        const bars = gsap.utils.toArray<HTMLElement>("[data-dim-bar]", scope);
        const readout = total.current!;
        const counter = { value: 0 };

        gsap.set(rows, { opacity: 0.22 });
        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline();

        DIMENSIONS.forEach((_, i) => {
          const at = i;
          tl.to(rows[i], { opacity: 1, duration: 0.3 }, at)
            .to(bars[i], { scaleX: 1, duration: 0.5, ease: "power2.out" }, at)
            .to(
              counter,
              {
                value: CUMULATIVE[i],
                duration: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                  readout.textContent = String(Math.round(counter.value)).padStart(2, "0");
                },
              },
              at,
            );

          if (i < DIMENSIONS.length - 1) {
            tl.to(rows[i], { opacity: 0.22, duration: 0.3 }, at + 0.72);
          }
        });

        // Tail so the final dimension holds on screen before the pin releases.
        tl.to({}, { duration: 0.4 });

        scrollLink(tl, scope, {
          start: "top top",
          end: `+=${DIMENSIONS.length * 90}%`,
          scrub: 0.6,
          pin: true,
        });
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section id="dimensions" className="border-t border-line">
      <div ref={section} className="flex min-h-[100svh] items-center px-6 py-24 md:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Left: the five dimensions */}
          <div>
            <p className="mb-9 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
              The rubric
            </p>

            <div className="space-y-7">
              {DIMENSIONS.map((d) => (
                <div key={d.name} data-dim-row className="border-l-2 pl-5" style={{ borderColor: d.color }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-title font-semibold text-ink text-pretty">{d.name}</h3>
                    <span className="shrink-0 font-mono text-sm tabular" style={{ color: d.color }}>
                      {d.points} pts
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                    {d.question}
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-dim text-pretty">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the running score */}
          <div className="lg:sticky lg:top-1/2">
            <div className="rounded-2xl border border-line bg-base/70 p-8 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                Composite score
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span
                  ref={total}
                  className="text-readout font-mono font-medium tabular text-signal"
                >
                  00
                </span>
                <span className="font-mono text-2xl text-ink-faint">/100</span>
              </div>

              <div className="mt-9 flex h-2.5 gap-1 overflow-hidden">
                {DIMENSIONS.map((d) => (
                  <div
                    key={d.name}
                    className="h-full overflow-hidden rounded-full bg-line"
                    style={{ flexGrow: d.points }}
                  >
                    <div
                      data-dim-bar
                      className="h-full w-full rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                  </div>
                ))}
              </div>

              <dl className="mt-9 space-y-2.5 border-t border-line pt-6 font-mono text-[11px]">
                {[
                  ["80–100", "Integrate now", "var(--color-verdict-strong)"],
                  ["60–79", "Integrate with scope limits", "var(--color-verdict-mixed)"],
                  ["40–59", "Prototype first", "var(--color-verdict-weak)"],
                  ["0–39", "Do not integrate", "var(--color-verdict-avoid)"],
                ].map(([range, verdict, color]) => (
                  <div key={range} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    <dt className="w-16 shrink-0 tabular text-ink-dim">{range}</dt>
                    <dd className="text-ink-faint">{verdict}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

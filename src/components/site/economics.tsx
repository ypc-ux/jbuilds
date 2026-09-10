"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MOTION_QUERY, countTo, registerScrollPlugins, scrollLink } from "@/lib/motion/primitives";

/**
 * PATTERN 6 — SCROLL LINK.
 * The comparison is the argument, so the reader should control the reveal.
 * Both counters are bound to the same scrubbed timeline: scrolling drives them
 * apart, and scrolling back closes the gap again.
 */
export function Economics() {
  const section = useRef<HTMLDivElement>(null);
  const cloud = useRef<HTMLSpanElement>(null);
  const local = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerScrollPlugins();
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERY, () => {
        const tl = gsap.timeline();
        tl.add(countTo(cloud.current!, 5800), 0);
        tl.add(countTo(local.current!, 42), 0);

        scrollLink(tl, section.current!, { start: "top 75%", end: "bottom 65%", scrub: 0.7 });
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section id="economics" className="border-t border-line px-6 py-32 md:px-10 md:py-44">
      <div ref={section} className="mx-auto w-full max-w-5xl">
        <p data-reveal className="mb-9 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
          The economics
        </p>

        <h2 data-reveal className="text-headline max-w-3xl font-semibold text-balance">
          The analysis runs on your hardware,
          <span className="text-ink-faint"> so it costs nothing to run it often.</span>
        </h2>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-2">
          <div className="bg-base p-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
              Hosted LLM evaluation
            </p>
            <p className="mt-6 font-mono text-readout font-medium tabular text-verdict-avoid">
              <span className="text-3xl align-top">$</span>
              <span ref={cloud}>0</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
              per month, typical
            </p>
            <p className="mt-7 text-sm leading-relaxed text-ink-dim text-pretty">
              Per-token pricing turns every re-evaluation into a line item, so teams stop
              re-running them — which is exactly when the scores go stale.
            </p>
          </div>

          <div className="bg-base p-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              AgentGraphology
            </p>
            <p className="mt-6 font-mono text-readout font-medium tabular text-signal">
              <span className="text-3xl align-top">$</span>
              <span ref={local}>0</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
              per month, all-in
            </p>
            <p className="mt-7 text-sm leading-relaxed text-ink-dim text-pretty">
              Inference runs locally through Ollama. Re-score the whole dependency tree every
              sprint if you want to — the marginal cost of one more evaluation is zero.
            </p>
          </div>
        </div>

        <div
          data-reveal-group
          className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3"
        >
          {[
            ["Local-first", "No repository contents are sent to a third-party model provider."],
            ["Open source", "MIT licensed. Read the scoring engine before you trust its output."],
            ["Reproducible", "Every score carries its justification, so a verdict can be argued with."],
          ].map(([title, body]) => (
            <div key={title} data-reveal-child>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim text-pretty">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

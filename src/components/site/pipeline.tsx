"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MOTION_QUERY, horizontal, registerScrollPlugins } from "@/lib/motion/primitives";

const STEPS = [
  {
    n: "01",
    title: "Ingest",
    meta: "GitHub API",
    body: "Commit cadence, contributor concentration, issue response time, licence, release history, and the dependency surface you would be inheriting.",
  },
  {
    n: "02",
    title: "Analyse",
    meta: "Ollama · local inference",
    body: "A model running on your own hardware reads what the README claims and checks it against what the repository actually shows. Nothing leaves your machine.",
  },
  {
    n: "03",
    title: "Score",
    meta: "Scoring engine",
    body: "The five dimensions resolve into a 100-point composite. Every dimension carries its own written justification, so the number is auditable rather than oracular.",
  },
  {
    n: "04",
    title: "Recommend",
    meta: "Verdict + scope limits",
    body: "Not a thumbs up. A verdict with boundaries: what to adopt it for, what to keep it away from, and the conditions that would change the answer.",
  },
  {
    n: "05",
    title: "Plan",
    meta: "Phased rollout",
    body: "A staged integration plan with named risks, effort estimates in engineer-weeks, and a defined exit path if the bet does not pay.",
  },
];

/**
 * PATTERN 4 — HORIZONTAL SCROLL.
 * A pipeline is a sequence, and sideways is how a sequence reads. Turning the
 * wheel into lateral travel keeps all five stages on one continuous line
 * instead of stacking them into five unrelated screens.
 */
export function Pipeline() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerScrollPlugins();
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERY, () => {
        horizontal(viewport.current!, track.current!);
      });

      return () => mm.revert();
    },
    { scope: viewport },
  );

  return (
    <section id="pipeline" className="border-t border-line">
      <div ref={viewport} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
        <div className="mb-14 px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
              How it runs
            </p>
            <h2 className="text-headline max-w-2xl font-semibold text-balance">
              Five stages, one pass,
              <span className="text-ink-faint"> under fifteen seconds.</span>
            </h2>
          </div>
        </div>

        {/* Trailing padding keeps the last card clear of the fixed section rail. */}
        <div ref={track} className="flex w-max gap-5 px-6 md:px-10 lg:pr-32">
          {STEPS.map((step, i) => (
            <article
              key={step.n}
              className="flex w-[80vw] max-w-[26rem] flex-col rounded-2xl border border-line bg-base p-8 sm:w-[52vw] lg:w-[30vw]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl tabular text-signal">{step.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {step.meta}
                </span>
              </div>

              <h3 className="mt-8 text-title font-semibold text-ink">{step.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-dim text-pretty">
                {step.body}
              </p>

              <div className="mt-8 flex items-center gap-2" aria-hidden="true">
                {STEPS.map((_, j) => (
                  <span
                    key={j}
                    className={`h-px flex-1 ${j <= i ? "bg-signal" : "bg-line-bright"}`}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

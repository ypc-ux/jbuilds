import Link from "next/link";
import { NodeField } from "./node-field";

const FACTS = [
  ["5", "dimensions"],
  ["100", "point scale"],
  ["5–15s", "per evaluation"],
  ["$0", "cloud inference"],
];

/**
 * PATTERN 3 — PARALLAX.
 * Three node layers plus the headline all travel at different rates across the
 * same scroll span. Depth is the whole point: it gives the section physical
 * space and mood before the reader has read a word.
 */
export function Hero() {
  return (
    <section
      data-parallax-scene
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-32 md:px-10"
    >
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <NodeField />
      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent"
        aria-hidden="true"
      />

      <div data-parallax data-depth="0.08" className="relative mx-auto w-full max-w-5xl">
        <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
          Business Integration Protocol
        </p>

        <h1 className="text-display font-semibold text-balance">
          Profile your tools.
          <br />
          <span className="text-ink-dim">Decide with data.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-dim text-pretty">
          Every dependency you adopt is a bet you never scored. AgentGraphology reads any
          GitHub repository across five dimensions and returns a verdict, a risk profile,
          and a phased implementation plan.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/evaluate"
            className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-void transition-transform duration-200 hover:-translate-y-0.5"
          >
            Run an evaluation
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <a
            href="https://github.com/ypc-ux/jbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-bright px-6 py-3 text-sm font-medium text-ink-dim transition-colors duration-200 hover:border-signal hover:text-ink"
          >
            Read the protocol
          </a>
        </div>

        <dl className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
          {FACTS.map(([value, label]) => (
            <div key={label}>
              <dt className="font-mono text-2xl tabular text-ink">{value}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

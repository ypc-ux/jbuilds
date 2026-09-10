import Link from "next/link";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M5 18 L12 6 L19 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="5" cy="18" r="2.1" fill="currentColor" />
      <circle cx="12" cy="6" r="2.1" fill="currentColor" />
      <circle cx="19" cy="15" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-void/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <Mark className="h-5 w-5 text-signal" />
          <span className="text-sm font-semibold tracking-tight">AgentGraphology</span>
        </Link>

        <div className="flex items-center gap-7">
          <a
            href="#dimensions"
            className="hidden text-sm text-ink-dim transition-colors hover:text-ink sm:block"
          >
            Rubric
          </a>
          <a
            href="#pipeline"
            className="hidden text-sm text-ink-dim transition-colors hover:text-ink sm:block"
          >
            Pipeline
          </a>
          <Link
            href="/evaluate"
            className="rounded-full border border-line-bright px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
          >
            Evaluate
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-t border-line px-6 py-36 md:px-10 md:py-48">
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 data-reveal className="text-headline font-semibold text-balance">
          Score the next one
          <span className="text-ink-faint"> before you merge it.</span>
        </h2>
        <p data-reveal className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-dim text-pretty">
          Paste a GitHub URL. Get a composite score, a verdict with scope limits, and a phased
          plan — in about the time it takes to read the README you were going to skim anyway.
        </p>
        <div data-reveal className="mt-11 flex flex-wrap justify-center gap-3">
          <Link
            href="/evaluate"
            className="group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-void transition-transform duration-200 hover:-translate-y-0.5"
          >
            Run an evaluation
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
          <a
            href="https://github.com/ypc-ux/jbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-bright px-7 py-3.5 text-sm font-medium text-ink-dim transition-colors hover:border-signal hover:text-ink"
          >
            View source
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-ink-dim">
          <Mark className="h-4 w-4 text-signal" />
          <span className="text-sm">AgentGraphology</span>
          <span className="text-ink-faint">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            Business Integration Protocol
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          <Link href="/evaluate" className="transition-colors hover:text-signal">
            Evaluate
          </Link>
          <Link href="/compare" className="transition-colors hover:text-signal">
            Compare
          </Link>
          <a
            href="https://github.com/ypc-ux/jbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-signal"
          >
            GitHub
          </a>
          <span>MIT</span>
        </div>
      </div>
    </footer>
  );
}

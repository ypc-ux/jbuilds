const SYMPTOMS = [
  {
    index: "01",
    title: "The library that saved a week",
    body: "It shipped the feature on Friday and cost you the next two sprints in migration work nobody scoped.",
  },
  {
    index: "02",
    title: "The framework nobody can remove",
    body: "Adopted in an afternoon by one engineer. Load-bearing across nine services eighteen months later.",
  },
  {
    index: "03",
    title: "The vendor you priced after signing",
    body: "The seat cost was the cheap part. The integration effort never appeared on any invoice.",
  },
];

/**
 * PATTERN 1 — SCROLL TRIGGER.
 * Nothing here moves with the scroll; it simply arrives when the reader gets to
 * it. Reveal is for delivering a line at the moment it should land.
 */
export function Problem() {
  return (
    <section id="problem" className="relative border-t border-line px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto w-full max-w-5xl">
        <p
          data-reveal
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint"
        >
          The problem
        </p>

        <h2 data-reveal className="text-headline font-semibold text-balance">
          You adopted forty tools last year.
          <br />
          <span className="text-ink-faint">You measured none of them.</span>
        </h2>

        <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-dim text-pretty">
          Integration decisions get made in a Slack thread in four minutes and get paid for
          over four years. The cost never shows up where the decision was made — it shows up
          in velocity, in on-call, in the refactor you keep postponing.
        </p>

        <div data-reveal-group className="mt-20 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
          {SYMPTOMS.map((symptom) => (
            <div key={symptom.index} data-reveal-child className="bg-base p-8">
              <span className="font-mono text-[11px] tabular text-signal">{symptom.index}</span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-ink text-pretty">
                {symptom.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim text-pretty">
                {symptom.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

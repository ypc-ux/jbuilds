import { WaitlistForm } from "@/components/waitlist-form";

const GUARDRAILS = [
  {
    title: "Emergency stop",
    body: "One switch halts every agent action immediately, even mid-execution. Nothing fires while it's on.",
  },
  {
    title: "Hard spend caps",
    body: "You set the ceiling per campaign, per platform, per day. The agent cannot spend past it. Not \"tries not to\" — cannot.",
  },
  {
    title: "Approval-required threshold",
    body: "Set a dollar amount. Any move above it sits in a queue until you approve it. Below it, the agent acts and logs why.",
  },
  {
    title: "Full action log",
    body: "Every bid change, pause, and budget shift is timestamped with the reasoning and the before/after state. Nothing happens off the record.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your accounts",
    body: "Link Meta, Google, and TikTok ad accounts. Read-only to start — nothing changes until you turn it on.",
  },
  {
    step: "02",
    title: "Set your caps and targets",
    body: "Spend ceilings, ROAS or CPA targets, approval threshold. You define the box the agent operates inside.",
  },
  {
    step: "03",
    title: "The agent runs",
    body: "It pulls performance, adjusts bids, pauses losers, shifts budget toward what's working — inside the limits you set, not past them.",
  },
  {
    step: "04",
    title: "You see everything",
    body: "Every action is logged with its reasoning and the before/after state. Stop it cold whenever you want, for any reason.",
  },
];

const WHO_ITS_FOR = [
  "E-commerce brands running real budget across Meta, Google, and TikTok",
  "Agencies managing spend for multiple clients who need to show their work",
  "DTC companies that got burned by a black-box tool once and won't do it again",
];

const PRICING = [
  { tier: "Starter", spend: "Up to $10k/mo managed", price: "$500/mo" },
  { tier: "Growth", spend: "Up to $50k/mo managed", price: "$1,000/mo" },
  { tier: "Scale", spend: "$50k+/mo managed", price: "$2,000/mo" },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-black text-zinc-50">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-tight">AgentAdSpend</span>
        <a
          href="#waitlist"
          className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-50"
        >
          Get early access
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-4xl flex-col items-start px-6 pt-16 pb-24 sm:pt-24">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl sm:leading-tight">
          An AI that decides your ad spend.
          <br />
          Not one you have to program.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
          AgentAdSpend manages bids and budget across Meta, Google, and TikTok
          autonomously, inside hard limits you set. Every action is logged with
          its reasoning and can be reversed or stopped instantly.
        </p>
        <div id="waitlist" className="mt-10 w-full scroll-mt-24">
          <WaitlistForm />
          <p className="mt-3 text-sm text-zinc-500">
            Not live yet. Join the waitlist for early access.
          </p>
        </div>
      </section>

      {/* Positioning */}
      <section className="border-t border-zinc-900 bg-zinc-950">
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            The problem with the two options you have now
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-lg font-medium text-zinc-50">
                Autonomous tools are black boxes.
              </p>
              <p className="mt-2 text-base leading-7 text-zinc-400">
                They make decisions and don&apos;t show you why. You find out
                something changed after it already happened.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-zinc-50">
                Transparent tools aren&apos;t autonomous.
              </p>
              <p className="mt-2 text-base leading-7 text-zinc-400">
                Rules engines log everything, but you write every rule. The
                thinking is still yours, all day, every day.
              </p>
            </div>
          </div>
          <p className="mt-10 max-w-2xl text-lg font-medium leading-8 text-zinc-50">
            AgentAdSpend does both: the agent actually makes the call, and you
            can see and reverse every decision it makes.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step}>
              <span className="text-sm font-semibold text-zinc-600">
                {item.step}
              </span>
              <p className="mt-2 text-lg font-medium text-zinc-50">
                {item.title}
              </p>
              <p className="mt-2 text-base leading-7 text-zinc-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Guardrails — the real differentiator */}
      <section className="border-y border-zinc-900 bg-zinc-950">
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            The guardrails
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            This is what makes an autonomous agent safe to run on real budget.
            It&apos;s also what Madgicx doesn&apos;t give you.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
            {GUARDRAILS.map((g) => (
              <div key={g.title} className="bg-zinc-950 p-8">
                <p className="text-xl font-semibold text-zinc-50">
                  {g.title}
                </p>
                <p className="mt-3 text-base leading-7 text-zinc-400">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Who it&apos;s for</h2>
        <ul className="mt-8 space-y-4">
          {WHO_ITS_FOR.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-lg leading-8 text-zinc-300"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Founder credibility */}
      <section className="border-t border-zinc-900 bg-zinc-950">
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            Why I built it this way
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Before this, I ran attribution and campaign strategy at Velocity
            Demos, where the work I designed drove $1.2M in ARR and $7.4M in
            pipeline. Those campaigns were built to convert and be measured,
            not to look good in a deck.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            AgentAdSpend is that same attribution discipline, automated. I
            haven&apos;t personally run an autonomous ad-spend agent before —
            nobody has run this one before, it&apos;s new. What I bring is
            knowing exactly what needs to be measured and logged for an
            optimization decision to be trustworthy, and building the
            guardrails around that from day one instead of bolting them on
            later.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
          Priced by spend managed, not seats or features. No fake urgency, no
          fake discounts.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          {PRICING.map((p) => (
            <div key={p.tier} className="bg-black p-8">
              <p className="text-lg font-semibold text-zinc-50">{p.tier}</p>
              <p className="mt-2 text-sm text-zinc-400">{p.spend}</p>
              <p className="mt-6 text-3xl font-semibold text-zinc-50">
                {p.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-900 bg-zinc-950">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-start px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Get on the list.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-400">
            AgentAdSpend isn&apos;t live yet. Join the waitlist and you&apos;ll
            be the first to get access when it opens.
          </p>
          <div className="mt-8 w-full">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-4xl px-6 py-10 text-sm text-zinc-600">
        AgentAdSpend
      </footer>
    </div>
  );
}

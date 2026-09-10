---
name: agentgraphology-brand
description: The AgentGraphology design system and voice — colour tokens, the verdict scale, typography, layout rhythm, component patterns, and copy rules. Use whenever writing or reviewing anything user-facing for AgentGraphology or agentgraphology.com — a page, section, component, headline, button label, empty state, error message, OG image, or docs page — and whenever judging whether a change is on-brand.
---

# AgentGraphology brand

**Positioning:** a diagnostic instrument, not a SaaS brochure.
**Tagline:** Profile your tools. Decide with data.
**Metaphor:** graphology — reading the handwriting of a codebase to judge its
character. Forensic, measured, unimpressed.

Tokens live in `src/app/globals.css` under `@theme`. Use the token names, never
raw hex, and never Tailwind's default palette (`gray-500`, `blue-600` — these
are off-brand on sight).

## Colour

Surfaces step up from near-black with a cool undertone, so the accent reads as
a signal rather than decoration.

| Token | Use |
|---|---|
| `void` | page ground |
| `base` | cards and panels |
| `surface` / `raised` | nested elevation |
| `line` / `line-bright` | hairlines, borders, dividers |
| `ink` / `ink-dim` / `ink-faint` | primary / body / metadata text |
| `signal` | the single accent — CTAs, active state, live values |

**Verdict scale.** Scores map to recommendations, so this doubles as the data
palette. Use it in this order, never re-mapped:

`verdict-strong` → `verdict-good` → `verdict-mixed` → `verdict-weak` → `verdict-avoid`

80–100 integrate now · 60–79 integrate with scope limits · 40–59 prototype
first · 0–39 do not integrate.

Keep `signal` scarce. If everything is green, nothing is.

## Type

Geist Sans for everything except numbers and metadata; Geist Mono for scores,
labels, eyebrows, and any figure the reader might compare.

- `text-display` — page-opening statement, once per page
- `text-headline` — section openers
- `text-title` — card and subsection headings
- `text-readout` — large numeric values only

Eyebrows and metadata: mono, `text-[10px]`/`[11px]`, `uppercase`,
`tracking-[0.18em]`–`[0.3em]`, in `ink-faint` (or `signal` when labelling the
active thing). Every numeric readout gets the `.tabular` class so it does not
reflow while animating.

Set `text-balance` on headings and `text-pretty` on body copy.

## Layout

`max-w-5xl`/`max-w-6xl` centred, `px-6 md:px-10`. Sections separated by
`border-t border-line` and `py-32 md:py-44` — the generous vertical rhythm is
part of the instrument feel; do not compress it to fit more in.

Cards: `rounded-2xl border border-line bg-base p-8`. For grids that should read
as one panel, use `gap-px` over a `bg-line` parent so the dividers are hairlines
rather than gaps.

## Voice

Declarative, specific, slightly cold. The reader is a competent engineer or
founder who has been burned by a tool decision. Respect that.

- Lead with the cost of not knowing, not with features.
- Concrete over abstract: "engineer-weeks, not story points" beats "reduces
  effort".
- Name the tradeoff. The product's whole claim is that it refuses to be
  flattering, so the copy cannot be flattering either.
- Second person. Present tense. Full sentences in body copy.

**Never:** "revolutionary", "seamless", "supercharge", "unlock", "game-changing",
"effortless", "AI-powered" as a virtue in itself. No exclamation marks. No emoji
in UI (the README's are legacy). Do not claim a number the repository cannot
back up.

**Calibrated claims.** `$0` cloud inference, 5–15s per evaluation, 5 dimensions,
100-point scale, MIT licensed, local-first — these are true and load-bearing.
Cost comparisons are ranges, not promises; write "typical", not "guaranteed".

## Motion

All scroll behaviour goes through the `scroll-motion` skill and
`src/lib/motion/primitives.ts`. Motion here is instrumentation — it should make
the measurement legible, never perform. If an animation does not help the reader
understand the score, cut it.

## Interaction

- Focus states are visible on dark: `2px solid signal`, `3px` offset.
- Buttons: primary is `bg-signal text-void rounded-full`; secondary is
  `border border-line-bright` that brightens to `signal` on hover.
- Hover lifts are `-translate-y-0.5` at most. No scale transforms on buttons.
- Every external link gets `target="_blank" rel="noopener noreferrer"`.

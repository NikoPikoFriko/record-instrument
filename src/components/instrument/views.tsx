import {
  clock,
  docketNodes,
  gaps,
  governance,
  gradeLabel,
  incident,
  log,
  money,
  pairs,
  reductions,
  sources,
  type Grade,
} from "@/lib/record/data";

export function GradeMark({ grade }: { grade: Grade }) {
  const open = grade === "unanswered" || grade === "not-lodged" || grade === "arithmetic";
  return (
    <span className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-wide text-ink uppercase">
      <i aria-hidden className={open ? "h-2 w-2 bg-gap" : "h-2 w-2 bg-ink"} />
      {gradeLabel[grade]}
    </span>
  );
}

export function Pin({ children }: { children: string }) {
  return <p className="mt-3 font-sans text-xs leading-relaxed text-muted">{children}</p>;
}

function PairBlock({
  kicker,
  compiler,
  compilerPin,
  counter,
  counterPin,
}: {
  kicker: string;
  compiler: string;
  compilerPin: string;
  counter: string;
  counterPin: string;
}) {
  return (
    <article className="border-t border-line py-8">
      <p className="font-sans text-xs font-medium tracking-widest text-gap uppercase">{kicker}</p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <p className="font-sans text-xs tracking-widest text-muted uppercase">From the certified copy</p>
          <p className="mt-2 font-serif text-lg leading-relaxed text-pretty text-ink">{compiler}</p>
          <Pin>{compilerPin}</Pin>
        </div>
        <div className="border-t border-line pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <p className="font-sans text-xs tracking-widest text-muted uppercase">Also from the certified copy</p>
          <p className="mt-2 font-serif text-lg leading-relaxed text-pretty text-ink">{counter}</p>
          <Pin>{counterPin}</Pin>
        </div>
      </div>
    </article>
  );
}

export function MethodView() {
  return (
    <div>
      <p className="max-w-xl font-serif text-2xl leading-snug text-balance text-ink">
        Every sentence cites a court-certified PDF. The other column is the rest of that PDF, not a speech.
      </p>
      {pairs.map((pair) => (
        <PairBlock key={pair.id} {...pair} />
      ))}
    </div>
  );
}

export function ClockView() {
  return (
    <ol className="relative border-l border-ink">
      {clock.map((event) => (
        <li key={event.id} className="relative py-5 pl-6">
          <span
            aria-hidden
            className={
              event.grade === "not-lodged"
                ? "absolute -left-1.5 mt-1.5 h-3 w-3 border border-gap bg-paper"
                : "absolute -left-1.5 mt-1.5 h-3 w-3 bg-ink"
            }
          />
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-sans text-sm font-medium text-ink tabular-nums">{event.date}</p>
            <GradeMark grade={event.grade} />
          </div>
          <h3 className="mt-1 font-serif text-xl text-ink">{event.label}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-pretty text-muted">{event.detail}</p>
          <Pin>{event.pin}</Pin>
        </li>
      ))}
    </ol>
  );
}

export function DocketView() {
  return (
    <div>
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        Only documents whose PDF carries a clerk’s certificate. Empty cells are documents this build does not hold.
      </p>
      <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {docketNodes.map((node) => (
          <article key={node.id} className="flex min-h-44 flex-col bg-paper p-4">
            <GradeMark grade={node.grade} />
            <h3 className="mt-4 font-serif text-2xl text-ink">{node.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{node.note}</p>
            <Pin>{node.pin}</Pin>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MoneyView() {
  return (
    <div>
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        Amounts are copied from a certified order or the judgment’s total line. One row is labeled arithmetic because the judgment does not print the sum.
      </p>
      <ol className="mt-8">
        {money.map((stop, index) => (
          <li key={stop.id} className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex flex-col items-center">
              <span className={stop.grade === "arithmetic" ? "h-4 w-4 border border-gap bg-paper" : "h-4 w-4 bg-ink"} />
              {index < money.length - 1 && <span className="w-px flex-1 bg-line" />}
            </div>
            <article className="pb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl text-ink">{stop.label}</h3>
                <p className="font-serif text-3xl text-ink tabular-nums">{stop.amount}</p>
              </div>
              <div className="mt-2">
                <GradeMark grade={stop.grade} />
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{stop.note}</p>
              <Pin>{stop.pin}</Pin>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ReductionView() {
  return (
    <div className="space-y-10">
      <p className="max-w-xl font-serif text-2xl leading-snug text-balance">
        Width is the cut a later official text makes. Both widths are still the certified record.
      </p>
      {reductions.map((row) => (
        <article key={row.id} className="border-t border-line pt-6">
          <GradeMark grade="certified" />
          <div className="mt-4 bg-ink p-4 text-paper">
            <p className="font-sans text-xs tracking-widest uppercase">Longer certified text</p>
            <p className="mt-2 max-w-3xl font-serif text-lg leading-relaxed">{row.long}</p>
          </div>
          <div className="mt-2 max-w-md border border-ink p-4 md:ml-24">
            <p className="font-sans text-xs tracking-widest uppercase">What the later paper kept</p>
            <p className="mt-2 font-serif text-lg leading-relaxed">{row.short}</p>
          </div>
          <div className="mt-2 max-w-xs border border-dashed border-gap p-4 md:ml-48">
            <p className="font-sans text-xs tracking-widest text-gap uppercase">Not carried forward</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{row.dropped}</p>
          </div>
          <Pin>{row.pin}</Pin>
        </article>
      ))}
    </div>
  );
}

export function GovernanceView() {
  return (
    <div className="grid gap-px bg-line md:grid-cols-2">
      {governance.map((node) => (
        <article key={node.id} className="bg-paper p-5">
          <p className="font-sans text-xs tracking-widest text-gap uppercase">{node.place}</p>
          <h3 className="mt-2 font-serif text-2xl leading-snug text-balance text-ink">{node.name}</h3>
          <ul className="mt-4 space-y-2">
            {node.lines.map((line) => (
              <li key={line} className="border-t border-line pt-2 text-sm leading-relaxed text-muted">
                {line}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function IncidentView() {
  return (
    <div>
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        The incident is told only in the words of the findings. No video is lodged. Exhibit J1 is identified in the findings as a video clip, and the clip itself is not in this build.
      </p>
      <ol className="mt-8 border-t border-ink">
        {incident.map((item) => (
          <li key={item.date} className="grid gap-2 border-b border-line py-5 md:grid-cols-[9rem_1fr]">
            <p className="font-sans text-sm font-medium tabular-nums">{item.date}</p>
            <div>
              <p className="text-sm leading-relaxed text-pretty text-ink">{item.text}</p>
              <Pin>{item.pin}</Pin>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function GapsView() {
  return (
    <div className="space-y-6">
      {gaps.map((gap) => (
        <article key={gap.id} className="border border-line">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
            <p className="font-sans text-xs font-medium tracking-widest text-gap uppercase">{gap.kind}</p>
            <GradeMark grade={gap.kind === "Not lodged" ? "not-lodged" : "unanswered"} />
          </header>
          <h3 className="px-4 py-4 font-serif text-2xl leading-snug text-balance">{gap.question}</h3>
          <div className="grid border-t border-line md:grid-cols-2">
            <div className="p-4">
              <p className="font-sans text-xs tracking-widest text-muted uppercase">Why it is open</p>
              <p className="mt-2 text-sm leading-relaxed text-pretty">{gap.why}</p>
            </div>
            <div className="border-t border-line p-4 md:border-t-0 md:border-l">
              <p className="font-sans text-xs tracking-widest text-muted uppercase">Why it is not a finding</p>
              <p className="mt-2 text-sm leading-relaxed text-pretty">{gap.counter}</p>
            </div>
          </div>
          <div className="border-t border-line px-4 py-3">
            <Pin>{gap.pin}</Pin>
          </div>
        </article>
      ))}
    </div>
  );
}

export function LedgerView() {
  return (
    <div className="space-y-6">
      {sources.map((source) => (
        <article key={source.id} className="border border-line p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-serif text-2xl">{source.title}</h3>
            <p className="font-sans text-xs tracking-widest text-muted uppercase">{source.short}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink">{source.stamp}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{source.cert}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{source.heldAs}</p>
          <p className="mt-4 font-sans text-xs break-all text-muted">
            <span className="tracking-widest text-ink uppercase">SHA-256 </span>
            {source.hash}
          </p>
        </article>
      ))}
      <section className="border-t border-ink pt-6">
        <h3 className="font-sans text-xs tracking-widest text-gap uppercase">Public log</h3>
        <ul className="mt-4 space-y-4">
          {log.map((entry) => (
            <li key={entry.text} className="grid gap-2 md:grid-cols-[8rem_1fr]">
              <p className="font-sans text-sm tabular-nums">{entry.date}</p>
              <p className="text-sm leading-relaxed text-muted">{entry.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import { useState } from "react";
import { CUTOFF, sources, views, type ViewId } from "@/lib/record/data";
import {
  ClockView,
  DocketView,
  GapsView,
  GovernanceView,
  IncidentView,
  LedgerView,
  MethodView,
  MoneyView,
  ReductionView,
} from "@/components/instrument/views";
import { IntakeView } from "@/components/instrument/intake";

const counts = [
  { label: "Certified PDFs", value: String(sources.length) },
  { label: "Uncertified sources", value: "0" },
  { label: "Open gaps", value: "4" },
  { label: "Machine transcript", value: "Out" },
];

export function Instrument() {
  const [view, setView] = useState<ViewId>("method");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-gap uppercase">
              Systems study · not a filing
            </p>
            <h1 className="mt-2 font-serif text-4xl leading-none text-balance md:text-5xl">
              Record Instrument
            </h1>
            <p className="mt-3 font-sans text-sm text-ink tabular-nums">
              1RC191003776
              <span className="px-2 text-muted">/</span>
              CAAP-26-0000625
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
              Association of Apartment Owners of Marine Surf Waikiki, Inc. v. Pikor.
              Cutoff {CUTOFF}. Seven court-certified PDFs. Each claim has a pin.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {counts.map((item) => (
              <div key={item.label}>
                <dt className="font-sans text-xs tracking-wide text-muted uppercase">{item.label}</dt>
                <dd className="font-serif text-3xl tabular-nums">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <nav className="sticky top-0 z-10 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 md:px-6">
          {views.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={
                  active
                    ? "min-h-11 shrink-0 border border-ink bg-ink px-3 font-sans text-sm text-paper"
                    : "min-h-11 shrink-0 border border-transparent px-3 font-sans text-sm text-muted hover:text-ink"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {view === "method" && <MethodView />}
        {view === "clock" && <ClockView />}
        {view === "docket" && <DocketView />}
        {view === "money" && <MoneyView />}
        {view === "reduction" && <ReductionView />}
        {view === "governance" && <GovernanceView />}
        {view === "incident" && <IncidentView />}
        {view === "gaps" && <GapsView />}
        {view === "intake" && <IntakeView />}
        {view === "ledger" && <LedgerView />}
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm leading-relaxed text-muted md:px-6">
          Not a filing. Not legal advice. A claim without a pin is not on this page. Mail addresses,
          firm street addresses, and telephone numbers that appear on the certified PDFs are not reprinted.
          If a page comes down, the public log is where that change is written.
        </p>
      </footer>
    </div>
  );
}

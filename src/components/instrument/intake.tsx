import { useState } from "react";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import { qualifyExample, type Qualification } from "@/lib/record/qualify";

function endpoint() {
  if (typeof window === "undefined") return "/api/qualify";
  const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
  return `${prefix ?? ""}/api/qualify`;
}

export function IntakeView() {
  const [packet, setPacket] = useState("");
  const [report, setReport] = useState<Qualification | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function qualify() {
    setBusy(true);
    setError("");
    setReport(null);
    try {
      const response = await fetch(endpoint(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: packet,
      });
      const body = (await response.json()) as Qualification & { summary?: string };
      if (!response.ok && !body.verdict) {
        setError(body.summary ?? "The packet was refused.");
        return;
      }
      setReport(body);
    } catch {
      setError("The packet was not sent. Check that it is JSON.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="max-w-xl font-serif text-2xl leading-snug text-balance">
        Another agent may submit a packet. Qualification does not lodge it.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        POST JSON to <span className="text-ink">/api/qualify</span>. GET that path for the
        rules and a shape example. The certificate sentence has to be in the packet. The PDF
        bytes are not opened here, and a pass is not a line in the ledger.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 border border-ink px-3 text-sm"
          onClick={() => {
            setPacket(JSON.stringify(qualifyExample, null, 2));
            setReport(null);
            setError("");
          }}
        >
          Load shape example
        </button>
        <button
          type="button"
          disabled={busy || packet.trim().length === 0}
          className="min-h-11 border border-ink bg-ink px-3 text-sm text-paper disabled:opacity-40"
          onClick={() => void qualify()}
        >
          {busy ? "Qualifying" : "Qualify"}
        </button>
      </div>
      <label className="mt-4 block font-sans text-xs tracking-widest text-muted uppercase" htmlFor="packet">
        Packet
      </label>
      <textarea
        id="packet"
        value={packet}
        onChange={(event) => setPacket(event.target.value)}
        spellCheck={false}
        className="mt-2 min-h-72 w-full border border-line bg-paper p-3 font-sans text-sm leading-relaxed text-ink"
        placeholder='{"agent":"","caseId":"1RC191003776","document":{},"claims":[]}'
      />
      {error && <p className="mt-3 text-sm text-gap">{error}</p>}
      {report && (
        <section className="mt-6 border border-ink">
          <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink px-4 py-3">
            <p className="font-sans text-xs tracking-widest text-gap uppercase">{report.verdict}</p>
            <p className="font-sans text-xs text-muted">Not lodged</p>
          </header>
          <p className="px-4 py-4 font-serif text-xl leading-snug">{report.summary}</p>
          <ul className="border-t border-line">
            {report.document.map((check) => (
              <li key={check.id} className="grid gap-2 border-b border-line px-4 py-3 md:grid-cols-[8rem_1fr]">
                <p className="font-sans text-xs tracking-widest text-muted uppercase">
                  {check.pass ? "Pass" : "Fail"} · {check.id}
                </p>
                <p className="text-sm leading-relaxed">{check.reason}</p>
              </li>
            ))}
            {report.claims.map((claim) => (
              <li key={claim.index} className="grid gap-2 border-b border-line px-4 py-3 md:grid-cols-[8rem_1fr]">
                <p className="font-sans text-xs tracking-widest text-muted uppercase">
                  {claim.pass ? "Pass" : "Fail"} · claim {claim.index + 1}
                </p>
                <p className="text-sm leading-relaxed">
                  {claim.pass ? "Pin, quote, and claim text are in the required shape." : claim.reasons.join(" ")}
                </p>
              </li>
            ))}
          </ul>
          <p className="px-4 py-3 text-sm leading-relaxed text-muted">{report.next}</p>
        </section>
      )}
    </div>
  );
}

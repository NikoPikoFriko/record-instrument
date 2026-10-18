export type Grade = "certified" | "arithmetic" | "unanswered" | "not-lodged";

export type Source = {
  id: string;
  short: string;
  title: string;
  heldAs: string;
  hash: string;
  cert: string;
  stamp: string;
};

export type Pair = {
  id: string;
  kicker: string;
  compiler: string;
  compilerPin: string;
  counter: string;
  counterPin: string;
};

export type ClockEvent = {
  id: string;
  date: string;
  label: string;
  detail: string;
  grade: Grade;
  pin: string;
};

export type MoneyStop = {
  id: string;
  label: string;
  amount: string;
  grade: Grade;
  note: string;
  pin: string;
};

export type Reduction = {
  id: string;
  long: string;
  short: string;
  dropped: string;
  pin: string;
};

export type Gap = {
  id: string;
  kind: "Unanswered" | "Text layer" | "Not lodged";
  question: string;
  why: string;
  counter: string;
  pin: string;
};

export const CUTOFF = "17 Oct 2026";

const ZACK =
  "Certified 3 Oct 2026 by Elizabeth Zack, Clerk of the Supreme Court: full, true and correct copy of the official court record.";
const OKITA_FOF =
  "Also certified 31 Jan 2024 by Lori Ann Okita, Clerk of the First Judicial Circuit, on the trial-court original inside this exhibit.";
const OKITA_FEES =
  "Also certified 15 Jun 2026 by Lori Ann Okita, Clerk of the First Judicial Circuit, on the trial-court original inside this exhibit.";
const OKITA_JDG =
  "Also certified 23 Jun 2026 by Lori Ann Okita, Clerk of the First Judicial Circuit, on the trial-court original inside this exhibit.";

export const sources: Source[] = [
  {
    id: "nof",
    short: "ICA Dkt 1",
    title: "Notice of Appeal, CAAP-26-0000625",
    heldAs: "Court-certified PDF. Letterhead addresses and telephone numbers are not reprinted.",
    hash: "6ae030c9aa4e8468dac82a65fa97a362cde7af43bd402aaf9e10cfe8442025b4",
    cert: ZACK,
    stamp: "Electronically filed, Intermediate Court of Appeals, 4 Sep 2026, 4:22 PM, Dkt. 1 NA.",
  },
  {
    id: "fof",
    short: "Dkt 396",
    title: "Findings of fact, conclusions of law, and order granting directed verdict",
    heldAs: "Court-certified PDF, lodged in the appeal as ICA Dkt. 2 EXH. Service-list addresses are not reprinted.",
    hash: "28d60230a3859420de82803d4f893654214e4f74a91cdba103b2c3a7e8d74d2b",
    cert: `${ZACK} ${OKITA_FOF}`,
    stamp: "Electronically filed, First Circuit, 1RC191003776, 31 Jan 2024, 11:55 AM, Dkt. 396 FOF.",
  },
  {
    id: "fees",
    short: "Dkt 423",
    title: "Order granting in part and denying in part the motion for attorneys’ fees and costs",
    heldAs: "Court-certified PDF, lodged in the appeal as ICA Dkt. 3 EXH. Service-list addresses are not reprinted.",
    hash: "ce8598ff850ae861f39f12b71a895139f77240e6ceee337a41cc2420ecd18dbc",
    cert: `${ZACK} ${OKITA_FEES}`,
    stamp: "Electronically filed, First Circuit, 1RC191003776, 15 Jun 2026, 1:32 PM, Dkt. 423 ORD. Judge: Chris A. Thomas. The signature date’s year is not clean in the text layer.",
  },
  {
    id: "jdg",
    short: "Dkt 427",
    title: "Judgment",
    heldAs: "Court-certified PDF, lodged in the appeal as ICA Dkt. 4 EXH. Firm addresses and telephone numbers on the form are not reprinted.",
    hash: "7b84f24403a0e999f321acf8db4d617374fffa31ff65e9c7c3bf7e7deba19f2f",
    cert: `${ZACK} ${OKITA_JDG}`,
    stamp: "Electronically filed, First Circuit, 1RC191003776, 23 Jun 2026, 1:07 PM, Dkt. 427 JDG.",
  },
  {
    id: "nef",
    short: "ICA Dkt 7",
    title: "Notice of electronic filing of the notice of appeal",
    heldAs: "Court-certified PDF. Mail addresses on the notice are not reprinted.",
    hash: "9cbb62f0e67d9bca747d507e9d9025d898fd8faab8925f3f03eff867f9d3223e",
    cert: ZACK,
    stamp: "Filing date/time printed on the notice: Friday, 4 Sep 2026, 4:22:21 PM. Dkt. 7 NEF.",
  },
  {
    id: "nonpay",
    short: "ICA Dkt 8",
    title: "Notice of non-payment",
    heldAs: "Court-certified PDF. Mail addresses and the clerk’s street address are not reprinted.",
    hash: "ebac524667e11d1053966aed957fd6bf7a6b24e93c3269e65b0a4feb57868a18",
    cert: ZACK,
    stamp: "Electronically filed, Intermediate Court of Appeals, 15 Sep 2026, 1:58 PM, Dkt. 8 DOC1.",
  },
  {
    id: "receipt",
    short: "ICA Dkt 10",
    title: "Payment receipt",
    heldAs: "Court-certified PDF.",
    hash: "68e64e550d82830987ac1c651601886c21d99561e4ded18a0bc3719db4184800",
    cert: ZACK,
    stamp: "Electronically filed, Intermediate Court of Appeals, 16 Sep 2026, 1:21 PM, Dkt. 10 PY. Receipt no. 609983.",
  },
];

export const pairs: Pair[] = [
  {
    id: "method",
    kicker: "What counts as a source",
    compiler:
      "A sentence appears on this page only if a court-certified PDF says it. Each of the seven files carries the clerk’s line: a full, true and correct copy of the official court record. The certificate on the appeal copies is Elizabeth Zack’s, dated 3 October 2026. The trial-court originals inside three of them were certified earlier by Lori Ann Okita.",
    compilerPin: "Certificate page of each lodged PDF.",
    counter:
      "A certificate proves that copy, as of that date. It does not prove the docket stopped. These seven files are the notice of appeal, three exhibits, two fee papers, and one filing notice. They are not the whole case. A machine transcript used in an earlier build of this page is not a court PDF and is not a source.",
    counterPin: "Scope of the seven files listed in the ledger. No other file is lodged.",
  },
  {
    id: "finding",
    kicker: "What the findings actually say",
    compiler:
      "Finding 32 says that at the time Pikor used Elevator 1, it was operating as it should without any defects. Footnote 4 says the testimony of Charles Bigler was more credible than the testimony of James Whitmore. The finding does not give a date for Bigler’s inspection.",
    compilerPin: "Dkt. 396, finding 32 and footnote 4, PDF page 10.",
    counter:
      "That is a credibility finding, made by Judge Summer Kupau-Odo after trial, not a laboratory report. The same order finds that Pikor left bins on the sill, that the hoistway doors hit them, and that he was at fault. Conclusion 14 says he failed to give the required advance notice. Those sentences are in the order too.",
    counterPin: "Dkt. 396, findings 25–30, PDF pages 9–10; conclusion of law 14, PDF page 17; order signed Summer Kupau-Odo, PDF page 23.",
  },
  {
    id: "money-pair",
    kicker: "What the money orders do to a $2,260.15 repair",
    compiler:
      "The directed-verdict order awards the Association $2,260.15. The fees order, by a different judge, says two lawyers attended a six-day trial on that sum, finds part of the billing unreasonable, and still awards $196,744.08 in fees and $12,743.54 in costs. The judgment form prints a total of $211,747.77.",
    compilerPin: "Dkt. 396 order paragraph 1, PDF page 23. Dkt. 423, PDF pages 9 and 13. Dkt. 427, the total line.",
    counter:
      "The fees order finds the Association was the prevailing party and that the governing documents, plus the statute the order cites, allow fees. It awards James Ferguson’s side $73,053.03 in fees and $85.53 in costs, which it finds reasonable. The reduction was applied to Glenn Horio’s side. The court wrote the reduction. This page does not write a new one.",
    counterPin: "Dkt. 423, PDF pages 4–7 and 13. Statute glyphs in the text layer are not clean; the section number is not restated here.",
  },
  {
    id: "clock-pair",
    kicker: "The dates a rule would use, and the word this page will not use",
    compiler:
      "The fees order is file-stamped 15 June 2026 at 1:32 PM. The judgment is file-stamped 23 June 2026 at 1:07 PM. The notice of appeal is file-stamped 4 September 2026 at 4:22 PM. Rule 4(a)(1) of the Hawaiʻi Rules of Appellate Procedure starts thirty days after entry. These PDFs do not contain an order that says the appeal is timely or late.",
    compilerPin: "Dkt. 423 stamp. Dkt. 427 stamp. ICA Dkt. 1 stamp. The rule is external and is not a case file.",
    counter:
      "Entry is a defined term in the appellate rules. Subtracting the stamps is arithmetic, not a holding. The filing fee was a separate problem: a non-payment notice on 15 September 2026, then a receipt for $285.00 on 16 September 2026 from Terrance M. Revere. Paying the fee is not a ruling on the clock.",
    counterPin: "ICA Dkt. 8. ICA Dkt. 10, receipt 609983.",
  },
];

export const clock: ClockEvent[] = [
  {
    id: "incident",
    date: "9 May 2018",
    label: "Elevator 1, as finding 25 finds it",
    detail:
      "On the afternoon of 9 May 2018, Pikor used Elevator 1 to move household goods in large storage bins. He had not given advance notice. Later findings say bins were left on the sill and the hoistway doors made contact.",
    grade: "certified",
    pin: "Dkt. 396, findings 25–28, PDF page 9.",
  },
  {
    id: "repair",
    date: "10 May 2018",
    label: "Repair, as finding 36 finds it",
    detail:
      "Two ThyssenKrupp technicians fixed Elevator 1 and restored it to service. Finding 37 says ThyssenKrupp billed the Association $2,260.15 and the Association paid in full.",
    grade: "certified",
    pin: "Dkt. 396, findings 36–37, PDF page 10.",
  },
  {
    id: "complaint",
    date: "31 May 2019",
    label: "Complaint, as the fees order dates it",
    detail:
      "The fees order says the Association’s complaint was filed on 31 May 2019, and that Exhibit 1 of that complaint set out the governing-document theory.",
    grade: "certified",
    pin: "Dkt. 423, PDF pages 4 and 7.",
  },
  {
    id: "trial",
    date: "2022–2023",
    label: "Trial days named on the findings",
    detail:
      "The findings’ caption lists trial on 12 May 2022, 26–27 October 2022, 11–12 January 2023, and 5 April 2023, before Judge Summer Kupau-Odo.",
    grade: "certified",
    pin: "Dkt. 396 caption, PDF page 2.",
  },
  {
    id: "dv",
    date: "31 Jan 2024",
    label: "Directed-verdict order file-stamped",
    detail:
      "Dkt. 396 grants the Association’s motions for directed verdict, awards $2,260.15, and dismisses counterclaim counts IV, VI, and VII with prejudice.",
    grade: "certified",
    pin: "Dkt. 396 file stamp and order, PDF pages 2 and 23.",
  },
  {
    id: "fees-hear",
    date: "13 Jan 2025",
    label: "Fees hearing, as the fees order dates it",
    detail:
      "The fees order says the hearing was 13 January 2025. It also says this judge did not sit on the trial. Judge Summer Kupau-Odo did.",
    grade: "certified",
    pin: "Dkt. 423 caption and footnote, PDF pages 2–3.",
  },
  {
    id: "fees",
    date: "15 Jun 2026",
    label: "Fees order file-stamped",
    detail:
      "Dkt. 423 grants the fee motion in part and denies it in part. Award stated in the order paragraph: $196,744.08 in fees and $12,743.54 in costs.",
    grade: "certified",
    pin: "Dkt. 423 file stamp, PDF page 2; order paragraph, PDF page 13.",
  },
  {
    id: "jdg",
    date: "23 Jun 2026",
    label: "Judgment file-stamped",
    detail:
      "Dkt. 427 enters judgment for the plaintiff on the directed verdict (Dkt. 396) and the fees motion (Dkt. 423). The total line reads $211,747.77.",
    grade: "certified",
    pin: "Dkt. 427 file stamp and total line, PDF page 2.",
  },
  {
    id: "noa",
    date: "4 Sep 2026",
    label: "Notice of appeal file-stamped",
    detail:
      "ICA Dkt. 1. Nikodem Pikor, by Terrance M. Revere and Amanda L. Dutcher, appeals the findings, the fees order, and the judgment. ThyssenKrupp Elevator Corporation is named as third-party defendant.",
    grade: "certified",
    pin: "ICA Dkt. 1, file stamp and body. ICA Dkt. 7 prints the same minute, 4:22:21 PM, and a $285.00 fee.",
  },
  {
    id: "paid",
    date: "16 Sep 2026",
    label: "Appellate fee receipt",
    detail:
      "After the 15 September non-payment notice, receipt 609983 shows $285.00 received from Terrance M. Revere at 1:21 PM.",
    grade: "certified",
    pin: "ICA Dkt. 8, 15 Sep 2026. ICA Dkt. 10, 16 Sep 2026.",
  },
];

export const money: MoneyStop[] = [
  {
    id: "repair",
    label: "Repair award in the directed-verdict order",
    amount: "$2,260.15",
    grade: "certified",
    note: "The order’s own figure. Finding 37 uses the same figure for the ThyssenKrupp bill the Association paid.",
    pin: "Dkt. 396, finding 37 and order paragraph 1.",
  },
  {
    id: "asked",
    label: "Fees and costs the Association requested",
    amount: "$269,841.04",
    grade: "certified",
    note: "The fees order says the request was $257,097.50 in fees and $12,743.54 in costs.",
    pin: "Dkt. 423, PDF page 3.",
  },
  {
    id: "awarded-fees",
    label: "Fees the fees order awards",
    amount: "$196,744.08",
    grade: "certified",
    note: "The order’s split, in its own sentences: Ferguson $73,053.03, and Horio’s side $123,691.05. Those two figures add to this one.",
    pin: "Dkt. 423, PDF pages 5, 11, and 13.",
  },
  {
    id: "awarded-costs",
    label: "Costs the fees order awards",
    amount: "$12,743.54",
    grade: "certified",
    note: "Stated in the order paragraph. The same page’s discussion attributes $12,658.01 of Horio-side costs largely to an expert.",
    pin: "Dkt. 423, PDF pages 12–13.",
  },
  {
    id: "total",
    label: "Total printed on the judgment",
    amount: "$211,747.77",
    grade: "certified",
    note: "The judgment form’s total line. Other lines on that form do not keep their columns in the text layer, so they are not restated.",
    pin: "Dkt. 427, total line, PDF page 2.",
  },
  {
    id: "check",
    label: "Compiler’s addition, not a line of the judgment",
    amount: "$211,747.77",
    grade: "arithmetic",
    note: "$2,260.15 + $196,744.08 + $12,743.54 equals the printed total. The addition is this page’s. The judgment does not print the addition.",
    pin: "Figures from Dkt. 396, Dkt. 423, and Dkt. 427. The sum is not itself a docket line.",
  },
  {
    id: "ica-fee",
    label: "Appellate filing fee received",
    amount: "$285.00",
    grade: "certified",
    note: "Receipt 609983. The notice of electronic filing had said the filing incurs $285.00. This is not part of the judgment.",
    pin: "ICA Dkt. 7. ICA Dkt. 10.",
  },
];

export const reductions: Reduction[] = [
  {
    id: "fof-to-judgment",
    long: "Twenty-three pages of findings: how the doors couple, what happened on 9 May 2018, who was believed, and an award of $2,260.15.",
    short: "The judgment’s ground is one line: motion for directed verdict, see Dkt. 396, and the fees motion, see Dkt. 423.",
    dropped: "Findings 25 through 36 do not reappear on the judgment form. A reader of the judgment alone does not see the sill, the bins, or the notice.",
    pin: "Dkt. 396, PDF pages 9–10 and 23. Dkt. 427, the “other” ground.",
  },
  {
    id: "credibility",
    long: "Footnote 4 is one sentence: Charles Bigler was more credible than James Whitmore.",
    short: "The fees order later uses that choice. It says Judge Kupau-Odo relied on the Association’s expert and found that expert more credible.",
    dropped: "The fees order does not restate Bigler’s testimony. It also does not say when he inspected the elevator. Neither does finding 32.",
    pin: "Dkt. 396, footnote 4, PDF page 10. Dkt. 423, PDF page 12.",
  },
  {
    id: "fee-cut",
    long: "The Association asked for $257,097.50 in fees. The order discusses two firms, ten timekeepers, double billing, and a $2,260.15 claim tried by two lawyers.",
    short: "The order paragraph keeps two numbers: $196,744.08 in fees and $12,743.54 in costs.",
    dropped: "The billing entries, the redactions the judge says he could not read, and the names of the associate timekeepers are not in the order paragraph.",
    pin: "Dkt. 423, PDF pages 3, 8–11, and 13.",
  },
  {
    id: "title",
    long: "The fees order is a written ruling by Judge Chris A. Thomas, file-stamped 15 June 2026.",
    short: "The notice of electronic filing packed into the same PDF compresses the result into the document name: granted in part and denied in part by Judge C. Thomas.",
    dropped: "The amounts. A filename can carry the result and drop the dollars.",
    pin: "Dkt. 423, PDF page 2. The NEF inside that PDF, Dkt. 424, PDF page 14. Addresses on that notice are not reprinted.",
  },
];

export const gaps: Gap[] = [
  {
    id: "inspect",
    kind: "Unanswered",
    question: "On what date did Charles Bigler inspect Elevator 1?",
    why: "Finding 32 and footnote 4 are the sentences that carry his credibility. They do not state an inspection date. The condition finding therefore does not, on its own face, show how long after 9 May 2018 he looked.",
    counter:
      "The absence of a date inside footnote 4 is not a finding that he never saw the elevator, and it is not a finding that the court ignored the timing. It is a date the certified finding does not contain.",
    pin: "Dkt. 396, finding 32 and footnote 4, PDF page 10.",
  },
  {
    id: "hand",
    kind: "Text layer",
    question: "What year did the judge write next to his signature on the fees order?",
    why: "The text layer of the signature block looks like “JUN 15 2020.” The electronic file stamp on the same document is 15 June 2026, 1:32 PM. This page uses the stamp. It does not treat the handwritten year as proved.",
    counter:
      "A bad text layer is a defect in the copy’s extractability. The stamp and Lori Ann Okita’s certificate of 15 June 2026 are on the same PDF. They are the clearer official lines.",
    pin: "Dkt. 423, PDF pages 2 and 13.",
  },
  {
    id: "columns",
    kind: "Text layer",
    question: "Which judgment-form line is principal, which is interest, and which is fees?",
    why: "The total, $211,747.77, is labeled. The rows above it do not stay in their columns in the text layer. One broken figure resembles the fees award and is not quoted as a second number.",
    counter:
      "The fees order and the directed-verdict order state their own figures in sentences. The judgment’s job, on this page, is the total and the cross-references to Dkt. 396 and Dkt. 423.",
    pin: "Dkt. 427, PDF page 2. Dkt. 396 order. Dkt. 423 order paragraph.",
  },
  {
    id: "later",
    kind: "Not lodged",
    question: "What did the trial court write, if anything, after the 23 June 2026 judgment?",
    why: "Not lodged. No court-certified PDF in this build is a later trial-court order, a stay, or a ruling on time to appeal. An uncertified transcript is not being used to fill the cell.",
    counter:
      "An empty cell means this build does not hold the paper. It does not mean the court filed nothing. The certificate dates stop at 3 October 2026, and even those certificates cover only these seven files.",
    pin: "Ledger. Seven files. No others.",
  },
];

export const governance = [
  {
    id: "trial",
    place: "Trial judge, on the findings",
    name: "Summer Kupau-Odo",
    lines: [
      "Judge of the District Court of the First Circuit",
      "Signed the findings and the directed-verdict order, 31 Jan 2024",
      "Dkt. 396 caption and signature, PDF pages 2 and 23",
    ],
  },
  {
    id: "fees-judge",
    place: "Fees judge, on the fees order",
    name: "Chris A. Thomas",
    lines: [
      "Heard the fee motion. The order says he did not try the case",
      "File stamp 15 Jun 2026, Dkt. 423",
      "Dkt. 423, PDF pages 2–3",
    ],
  },
  {
    id: "appeal",
    place: "Appellate file",
    name: "Intermediate Court of Appeals, CAAP-26-0000625",
    lines: [
      "Notice of appeal file-stamped 4 Sep 2026, 4:22 PM, Dkt. 1",
      "Certified copies bear Elizabeth Zack’s certificate of 3 Oct 2026",
      "No appellate ruling is in these seven files",
    ],
  },
  {
    id: "assoc",
    place: "Plaintiff",
    name: "Association of Apartment Owners of Marine Surf Waikiki, Inc.",
    lines: [
      "Caption of Dkt. 396, Dkt. 423, Dkt. 427, and the notice of appeal",
      "Prevailing party, as the fees order states",
      "Managing agent in finding 3: W. E. Denison Corporation, William E. Denison",
    ],
  },
  {
    id: "def",
    place: "Defendant and appellant",
    name: "Nikodem Pikor",
    lines: [
      "Defendant, counterclaimant, and third-party plaintiff on the notice of appeal",
      "Finding 2: an apartment owner at the project",
      "Unit number is not stated in the findings quoted here",
    ],
  },
  {
    id: "tke",
    place: "Third-party defendant, on the notice",
    name: "ThyssenKrupp Elevator Corporation",
    lines: [
      "Named on the notice of appeal and on the findings caption",
      "Finding 37: billed $2,260.15 and was paid by the Association",
      "These seven files do not contain a judgment for or against it",
    ],
  },
  {
    id: "counsel-p",
    place: "Association counsel, as the fees order divides them",
    name: "Glenn S. Horio and James R. Ferguson",
    lines: [
      "Horio on the affirmative claim. Ferguson on the counterclaims",
      "Also named on the findings’ appearances: Horio, Yun W. Kim, Ferguson",
      "Attorney numbers appear on the judgment form and are not repeated with addresses",
    ],
  },
  {
    id: "counsel-d",
    place: "Appellant’s counsel, on the notice of appeal",
    name: "Terrance M. Revere and Amanda L. Dutcher",
    lines: [
      "Signed the notice of appeal, 4 Sep 2026",
      "The findings say Dutcher appeared for Pikor at trial",
      "Office address and telephone number are on the notice and are not reprinted",
    ],
  },
] as const;

export const incident = [
  {
    date: "9 May 2018",
    text: "Finding 25: Pikor used Elevator 1, without advance notice, to move household goods in large, heavy storage bins.",
    pin: "Dkt. 396, finding 25, PDF page 9.",
  },
  {
    date: "Same afternoon",
    text: "Findings 26–30: bins were dragged out at the basement; a stack was left on the sill; the hoistway doors hit that stack and the door sets decoupled. The car doors did not hit the bins.",
    pin: "Dkt. 396, findings 26–30, PDF pages 9–10.",
  },
  {
    date: "10 May 2018",
    text: "Finding 36: two ThyssenKrupp technicians put the hoistway doors back on track. Each door weighed 70 pounds, the finding says.",
    pin: "Dkt. 396, finding 36, PDF page 10.",
  },
  {
    date: "The bill",
    text: "Finding 37: the bill was $2,260.15. The Association paid it. The order awards that amount.",
    pin: "Dkt. 396, finding 37 and order paragraph 1.",
  },
];

export const log = [
  {
    date: "17 Oct 2026",
    text: "Withdrew the automatic calendar transcript, the Gmail notice extracts, and the operator pack. None of them is a court-certified PDF. No claim on this page rests on them.",
  },
  {
    date: "17 Oct 2026",
    text: "Lodged seven court-certified PDFs from the appeal packet. Each hash is of the file whose certificate page was read. Mail addresses, firm street addresses, and telephone numbers printed on those PDFs are not shown.",
  },
  {
    date: "17 Oct 2026",
    text: "A compiler’s addition ($2,260.15 + $196,744.08 + $12,743.54) is labeled arithmetic. It is not a line of the judgment.",
  },
  {
    date: "17 Oct 2026",
    text: "Opened /api/qualify. Another agent may POST a packet. A qualified packet is not lodged. The endpoint does not keep the submission.",
  },
];

export const gradeLabel: Record<Grade, string> = {
  certified: "Certified PDF",
  arithmetic: "Arithmetic",
  unanswered: "Unanswered",
  "not-lodged": "Not lodged",
};

export const views = [
  { id: "method", label: "Method" },
  { id: "clock", label: "Clock" },
  { id: "docket", label: "Docket" },
  { id: "money", label: "Money" },
  { id: "reduction", label: "Reduction" },
  { id: "governance", label: "Governance" },
  { id: "incident", label: "Incident" },
  { id: "gaps", label: "Gaps" },
  { id: "intake", label: "Intake" },
  { id: "ledger", label: "Ledger" },
] as const;

export type ViewId = (typeof views)[number]["id"];

export const docketNodes: { id: string; name: string; note: string; grade: Grade; pin: string }[] = [
  { id: "case", name: "1RC191003776", note: "District Court of the First Circuit, Honolulu Division. The number is on every trial-court stamp in this set.", grade: "certified", pin: "Dkt. 396, Dkt. 423, Dkt. 427 stamps." },
  { id: "396", name: "Dkt. 396", note: "Findings, conclusions, and directed verdict. File-stamped 31 Jan 2024.", grade: "certified", pin: "Dkt. 396. Appeal exhibit ICA Dkt. 2." },
  { id: "423", name: "Dkt. 423", note: "Fees and costs, granted in part and denied in part. File-stamped 15 Jun 2026.", grade: "certified", pin: "Dkt. 423. Appeal exhibit ICA Dkt. 3." },
  { id: "427", name: "Dkt. 427", note: "Judgment. File-stamped 23 Jun 2026. Total line $211,747.77.", grade: "certified", pin: "Dkt. 427. Appeal exhibit ICA Dkt. 4." },
  { id: "ica", name: "CAAP-26-0000625", note: "Notice of appeal, Dkt. 1, file-stamped 4 Sep 2026, 4:22 PM.", grade: "certified", pin: "ICA Dkt. 1 and ICA Dkt. 7." },
  { id: "fee", name: "Dkt. 8 and Dkt. 10", note: "Non-payment notice, then a $285.00 receipt the next day.", grade: "certified", pin: "ICA Dkt. 8. ICA Dkt. 10." },
  { id: "empty", name: "After 23 Jun 2026", note: "No later trial-court order is lodged. The cell stays empty.", grade: "not-lodged", pin: "No file." },
  { id: "ruling", name: "No ICA ruling", note: "These files do not contain a decision of the Intermediate Court of Appeals.", grade: "not-lodged", pin: "No file." },
];

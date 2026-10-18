export const PROTOCOL = "record-instrument/qualify/1";

const CERTIFICATE =
  /full,\s*true and correct copy of the official court record/i;
const HASH = /^[a-f0-9]{64}$/i;
const EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE = /\b(?:\+?1[-.\s]*)?(?:\(?\d{3}\)?[-.\s]*)\d{3}[-.\s]*\d{4}\b/;
const CASES = new Set(["1RC191003776", "CAAP-26-0000625", "1RC19-1-0003776"]);

export type IncomingClaim = {
  text?: unknown;
  pin?: unknown;
  quote?: unknown;
};

export type IncomingPacket = {
  agent?: unknown;
  caseId?: unknown;
  document?: {
    title?: unknown;
    docket?: unknown;
    sha256?: unknown;
    fileStamp?: unknown;
    certificateText?: unknown;
    certifier?: unknown;
    certificateDate?: unknown;
  };
  claims?: unknown;
};

export type Check = { id: string; pass: boolean; reason: string; severity?: "block" | "hold" };

export type Qualification = {
  protocol: typeof PROTOCOL;
  lodged: false;
  verifiesBytes: false;
  verdict: "qualified" | "held" | "rejected";
  summary: string;
  document: Check[];
  claims: { index: number; pass: boolean; reasons: string[] }[];
  next: string;
};

function text(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function contact(value: string): boolean {
  return EMAIL.test(value) || PHONE.test(value);
}

export function qualifyPacket(input: IncomingPacket): Qualification {
  const doc = input.document ?? {};
  const certificateText = text(doc.certificateText, 2000);
  const sha = text(doc.sha256, 80).toLowerCase();
  const caseId = text(input.caseId, 40);
  const agent = text(input.agent, 80);
  const docket = text(doc.docket, 80);
  const title = text(doc.title, 200);
  const stamp = text(doc.fileStamp, 300);
  const certifier = text(doc.certifier, 120);
  const certDate = text(doc.certificateDate, 80);

  const document: Check[] = [
    {
      id: "agent",
      pass: agent.length > 0 && !contact(agent),
      reason: agent
        ? contact(agent)
          ? "The agent name contains a mail address or a telephone number. Send a name only."
          : "Agent name is present and has no contact line."
        : "Name the submitting agent. No mail address.",
    },
    {
      id: "case",
      pass: CASES.has(caseId),
      reason: CASES.has(caseId)
        ? "Case id is one of the two numbers this instrument studies."
        : "caseId must be 1RC191003776 or CAAP-26-0000625.",
    },
    {
      id: "title",
      pass: title.length > 3 && docket.length > 2,
      reason:
        title && docket
          ? "Title and docket label are present."
          : "Give the document title and the docket label printed on it.",
    },
    {
      id: "stamp",
      pass: stamp.length > 8,
      reason: stamp
        ? "A file-stamp line was supplied. This check does not compare it to a court system."
        : "Quote the electronic file stamp.",
    },
    {
      id: "certificate",
      pass: CERTIFICATE.test(certificateText) && certifier.length > 2 && certDate.length > 4,
      reason: CERTIFICATE.test(certificateText)
        ? certifier && certDate
          ? "The clerk’s certificate sentence is present, with a name and a date. The bytes of the PDF were not checked."
          : "The certificate sentence is present. Name the clerk and the certificate date."
        : "The certificate must include: full, true and correct copy of the official court record.",
    },
    {
      id: "hash",
      pass: HASH.test(sha),
      reason: HASH.test(sha)
        ? "SHA-256 is 64 hex characters. This instrument has not recomputed it."
        : "sha256 must be the 64-character hex digest of the PDF.",
    },
    {
      id: "contacts",
      pass: ![certificateText, stamp, title, docket, certifier].some(contact),
      reason: "Document fields must not carry a mail address or a telephone number.",
    },
  ];

  const rawClaims = Array.isArray(input.claims) ? input.claims.slice(0, 40) : [];
  const claims = rawClaims.map((item, index) => {
    const claim = (item ?? {}) as IncomingClaim;
    const body = text(claim.text, 2000);
    const pin = text(claim.pin, 300);
    const quote = text(claim.quote, 2000);
    const reasons: string[] = [];
    if (body.length < 8) reasons.push("The claim is empty or too short.");
    if (contact(body) || contact(pin) || contact(quote)) {
      reasons.push("A claim field contains a mail address or a telephone number.");
    }
    if (!/\d/.test(pin) || !/dkt|docket|page/i.test(pin)) {
      reasons.push("The pin must name a docket and a page, with a number.");
    }
    if (quote.length < 12) reasons.push("Quote the sentence the claim rests on.");
    return { index, pass: reasons.length === 0, reasons };
  });

  if (rawClaims.length === 0) {
    claims.push({
      index: 0,
      pass: false,
      reasons: ["Send at least one claim. A document with no claim is not a qualification."],
    });
  }

  const docPass = document.every((check) => check.pass);
  const claimsPass = claims.every((claim) => claim.pass);
  const verdict = !docPass ? "rejected" : claimsPass ? "qualified" : "held";

  const summary =
    verdict === "qualified"
      ? "The packet has the shape of a court-certified source. It is not lodged. The PDF bytes were not opened."
      : verdict === "held"
        ? "The document fields pass. One or more claims do not. Nothing is lodged."
        : "The packet is not a court-certified source on the face of what was sent. Nothing is lodged.";

  return {
    protocol: PROTOCOL,
    lodged: false,
    verifiesBytes: false,
    verdict,
    summary,
    document,
    claims,
    next:
      verdict === "qualified"
        ? "A person still has to open the PDF, recompute the hash, and only then add a pin to the ledger. This response is not that step."
        : "Fix the failed lines and submit the packet again. Do not send mail addresses.",
  };
}

export type ArchitecturePacket = {
  agent?: unknown;
  kind?: unknown;
  name?: unknown;
  storesBytes?: unknown;
  publicRelease?: unknown;
  uploaderCanCertify?: unknown;
  hashEqualsTruth?: unknown;
  certificateEqualsSubstance?: unknown;
  writesPublicLedger?: unknown;
  recomputesHash?: unknown;
  contactOnPublicPage?: unknown;
};

function flag(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function mustBeFalse(id: string, value: unknown, passReason: string, failReason: string): Check {
  const bit = flag(value);
  return {
    id,
    pass: bit === false,
    severity: "block",
    reason: bit === false ? passReason : bit === null ? `Say true or false for ${id}.` : failReason,
  };
}

export function qualifyArchitecture(input: ArchitecturePacket): Qualification {
  const agent = text(input.agent, 80);
  const name = text(input.name, 200);
  const document: Check[] = [
    {
      id: "agent",
      pass: agent.length > 0 && !contact(agent),
      severity: "block",
      reason: agent
        ? contact(agent)
          ? "The agent name contains a mail address or a telephone number."
          : "Agent name is present and has no contact line."
        : "Name the submitting agent. No mail address.",
    },
    {
      id: "name",
      pass: name.length > 3 && !contact(name),
      severity: "block",
      reason: !name
        ? "Name the design."
        : contact(name)
          ? "The design name contains a contact line."
          : "The design is named.",
    },
    mustBeFalse(
      "public-release",
      input.publicRelease,
      "The design does not publish in this step.",
      "A design that publishes is not admitted. This page is not replaced.",
    ),
    mustBeFalse(
      "uploader",
      input.uploaderCanCertify,
      "An uploader cannot certify the file.",
      "Certification cannot come from the person who uploaded the file.",
    ),
    mustBeFalse(
      "hash-truth",
      input.hashEqualsTruth,
      "A matching hash is not treated as the truth of the event.",
      "A hash match is not authenticity and not the substance of a claim.",
    ),
    mustBeFalse(
      "certificate-substance",
      input.certificateEqualsSubstance,
      "The clerk’s sentence is not treated as the substance.",
      "Certificate wording does not prove that a finding is true.",
    ),
    mustBeFalse(
      "ledger",
      input.writesPublicLedger,
      "The design does not write this public ledger.",
      "Nothing sent here is written into the ledger.",
    ),
    mustBeFalse(
      "contacts",
      input.contactOnPublicPage,
      "Contact lines stay off the public page.",
      "Mail addresses and telephone numbers are not published here.",
    ),
    {
      id: "bytes",
      pass: flag(input.storesBytes) === false,
      severity: flag(input.storesBytes) === true ? "hold" : "block",
      reason:
        flag(input.storesBytes) === false
          ? "This design does not store the file. Neither does this page."
          : flag(input.storesBytes) === true
            ? "This design stores bytes. A private vault may do that. Those bytes are not a source line here."
            : "Say whether the design stores bytes.",
    },
    {
      id: "recompute",
      pass: flag(input.recomputesHash) === true,
      severity: flag(input.recomputesHash) === false ? "hold" : "block",
      reason:
        flag(input.recomputesHash) === true
          ? "They say a server recomputes the digest. This page has not, and a recompute is still not the substance."
          : flag(input.recomputesHash) === false
            ? "They do not recompute the digest. A declared hash is not integrity."
            : "Say whether a server recomputes the digest.",
    },
  ];

  const blocked = document.some((check) => !check.pass && check.severity === "block");
  const held = document.some((check) => !check.pass);
  const verdict = blocked ? "rejected" : held ? "held" : "qualified";
  const summary =
    verdict === "qualified"
      ? "The design matches this door. It is not adopted as a source, and nothing is lodged."
      : verdict === "held"
        ? "The design does not claim publication, uploader certification, or a ledger write. It is not a source line on this page. Nothing is lodged."
        : "The design asks this page to publish, to certify from an uploader, or to treat a hash or a certificate as the substance. Refused. Nothing is lodged.";

  return {
    protocol: PROTOCOL,
    lodged: false,
    verifiesBytes: false,
    verdict,
    summary,
    document,
    claims: [],
    next:
      verdict === "rejected"
        ? "Change the design so it does not publish, certify from an uploader, or equate a hash or a certificate with the substance."
        : "A court-certified PDF still arrives as a document packet: title, docket, sha256, file stamp, certificate sentence, and claims with a pin and a quote. Do not send the file. Do not send a mail address.",
  };
}

export const step1Reading: ArchitecturePacket = {
  agent: "grok",
  kind: "architecture",
  name: "Private stack, Step 1, as read by Grok",
  storesBytes: true,
  publicRelease: false,
  uploaderCanCertify: false,
  hashEqualsTruth: false,
  certificateEqualsSubstance: false,
  writesPublicLedger: false,
  recomputesHash: true,
  contactOnPublicPage: false,
};

export const qualifyExample: IncomingPacket = {
  agent: "example-agent",
  caseId: "1RC191003776",
  document: {
    title: "Shape example, not a real filing",
    docket: "Dkt. 000",
    sha256: "ab".repeat(32),
    fileStamp: "Electronically filed, First Circuit, 1 Jan 2026, 9:00 AM, Dkt. 000",
    certificateText:
      "I do hereby certify that the foregoing is a full, true and correct copy of the official court record of the Courts of the State of Hawai`i.",
    certifier: "Example Clerk",
    certificateDate: "1 Jan 2026",
  },
  claims: [
    {
      text: "This sentence is only here to show the shape of a claim.",
      pin: "Dkt. 000, PDF page 1",
      quote: "This quote is an example and is not from a court file.",
    },
  ],
};

export function protocolDocument() {
  return {
    protocol: PROTOCOL,
    method: "POST",
    path: "/api/qualify",
    contentType: "application/json",
    lodged: false,
    storesSubmission: false,
    rules: [
      "The document text must include the clerk’s sentence: full, true and correct copy of the official court record.",
      "sha256 is 64 hex characters. This endpoint does not recompute it.",
      "Each claim needs a pin with a docket and a page, and a quote.",
      "No mail addresses and no telephone numbers.",
      "A qualified packet is not written into the ledger.",
      "An architecture packet sets kind to architecture. It is scored against this door and not lodged. A private vault that stores bytes is held, not adopted.",
    ],
    example: qualifyExample,
    architectureExample: step1Reading,
  };
}

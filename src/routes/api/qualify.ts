import { createFileRoute } from "@tanstack/react-router";
import { protocolDocument, qualifyArchitecture, qualifyPacket, type ArchitecturePacket, type IncomingPacket } from "@/lib/record/qualify";

const HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: HEADERS });
}

export const Route = createFileRoute("/api/qualify")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: HEADERS }),
      GET: async () => json(protocolDocument()),
      POST: async ({ request }) => {
        const raw = await request.text();
        if (raw.length > 100_000) {
          return json({ lodged: false, verdict: "rejected", summary: "Packet is too large." }, 413);
        }
        let body: IncomingPacket;
        try {
          body = JSON.parse(raw) as IncomingPacket;
        } catch {
          return json(
            { lodged: false, verdict: "rejected", summary: "Body is not JSON." },
            400,
          );
        }
        if (!body || typeof body !== "object" || Array.isArray(body)) {
          return json(
            { lodged: false, verdict: "rejected", summary: "Body must be a JSON object." },
            400,
          );
        }
        if (
          body &&
          typeof body === "object" &&
          !Array.isArray(body) &&
          (body as { kind?: unknown }).kind === "architecture"
        ) {
          return json(qualifyArchitecture(body as ArchitecturePacket));
        }
        return json(qualifyPacket(body));
      },
    },
  },
});

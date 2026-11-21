import { NextResponse } from "next/server";
import { generatePoliceDossier, generateStixBundle } from "@/lib/agents/reportGenerator";
import { FullAegisInvestigation } from "@/lib/types/agent";
import { clientKey, isRateLimited } from "@/lib/security/rateLimit";
import { jsonError, readJson } from "@/lib/security/http";

const FORMATS = ["dossier", "stix", "json"] as const;
type ExportFormat = (typeof FORMATS)[number];

function looksLikeInvestigation(value: unknown): value is FullAegisInvestigation {
  const inv = value as Partial<FullAegisInvestigation> | null;
  return Boolean(
    inv &&
      typeof inv === "object" &&
      typeof inv.investigationId === "string" &&
      inv.forensics &&
      typeof inv.forensics.evidenceId === "string" &&
      inv.riskIntelligence &&
      inv.indicators
  );
}

export async function POST(request: Request) {
  if (isRateLimited(`export:${clientKey(request)}`)) {
    return jsonError("Too many requests. Please wait a minute and try again.", 429);
  }

  const body = await readJson(request);
  if (!body) {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const { investigation } = body;
  const format = (body.format ?? "json") as ExportFormat;

  if (!investigation) {
    return jsonError("Missing investigation data", 400);
  }
  if (!FORMATS.includes(format)) {
    return jsonError("Unsupported format. Use dossier, stix or json.", 400);
  }
  if (!looksLikeInvestigation(investigation)) {
    return jsonError("Investigation data is incomplete or invalid.", 400);
  }

  try {
    if (format === "dossier") {
      const text = generatePoliceDossier(investigation);
      const safeId = investigation.forensics.evidenceId.replace(/[^A-Za-z0-9_-]/g, "");
      return new NextResponse(text, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="aegis-evidence-${safeId}.txt"`,
        },
      });
    }

    if (format === "stix") {
      return NextResponse.json(generateStixBundle(investigation));
    }

    return NextResponse.json(investigation);
  } catch (error) {
    console.error("Aegis Omega export error:", error);
    return jsonError("The export could not be created. Please try again.", 500);
  }
}

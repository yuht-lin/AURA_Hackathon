import { NextResponse } from "next/server";
import { generatePoliceDossier, generateStixBundle } from "@/lib/agents/reportGenerator";
import { FullAegisInvestigation } from "@/lib/types/agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { investigation, format } = body as { investigation: FullAegisInvestigation; format: "dossier" | "stix" | "json" };

    if (!investigation) {
      return NextResponse.json({ error: "Missing investigation data" }, { status: 400 });
    }

    if (format === "dossier") {
      const text = generatePoliceDossier(investigation);
      return new NextResponse(text, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="aegis-evidence-${investigation.forensics.evidenceId}.txt"`,
        },
      });
    }

    if (format === "stix") {
      const stix = generateStixBundle(investigation);
      return NextResponse.json(stix);
    }

    return NextResponse.json(investigation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

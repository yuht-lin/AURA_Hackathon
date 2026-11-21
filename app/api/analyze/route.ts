import { NextResponse } from "next/server";
import { orchestrateInvestigation } from "@/lib/agents/orchestrator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, imageBase64 } = body;

    const rawPayload = content || (imageBase64 ? "Image payload attached: Screenshot of suspicious message" : "");

    if (!rawPayload.trim()) {
      return NextResponse.json(
        { error: "Payload empty. Provide text or image." },
        { status: 400 }
      );
    }

    // Run deterministic multi-agent investigation pipeline
    const investigation = orchestrateInvestigation(rawPayload);

    return NextResponse.json(investigation);
  } catch (error: any) {
    console.error("Aegis Omega Investigation Error:", error);
    return NextResponse.json(
      { error: "Kernel investigation fault", details: error.message },
      { status: 500 }
    );
  }
}

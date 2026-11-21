import { NextResponse } from "next/server";
import { orchestrateInvestigation } from "@/lib/agents/orchestrator";
import { clientKey, isRateLimited } from "@/lib/security/rateLimit";
import { MAX_MESSAGE_LENGTH, jsonError, readJson } from "@/lib/security/http";

export async function POST(request: Request) {
  if (isRateLimited(`analyze:${clientKey(request)}`)) {
    return jsonError("Too many requests. Please wait a minute and try again.", 429);
  }

  const body = await readJson(request);
  if (!body) {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const { content, imageBase64 } = body;
  if (content !== undefined && typeof content !== "string") {
    return jsonError("The message must be text.", 400);
  }

  const rawPayload =
    (content as string | undefined) ||
    (imageBase64 ? "Image payload attached: Screenshot of suspicious message" : "");

  if (!rawPayload.trim()) {
    return jsonError("Payload empty. Provide text or image.", 400);
  }
  if (rawPayload.length > MAX_MESSAGE_LENGTH) {
    return jsonError(`Message is too long. Maximum is ${MAX_MESSAGE_LENGTH} characters.`, 413);
  }

  try {
    // Run deterministic multi-agent investigation pipeline
    const investigation = orchestrateInvestigation(rawPayload);
    return NextResponse.json(investigation);
  } catch (error) {
    console.error("Aegis Omega Investigation Error:", error);
    return jsonError("The investigation could not be completed. Please try again.", 500);
  }
}

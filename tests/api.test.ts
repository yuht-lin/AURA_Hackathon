import { beforeEach, describe, expect, it } from "vitest";
import { POST as analyze } from "@/app/api/analyze/route";
import { GET as communityGet, POST as communityPost } from "@/app/api/community/route";
import { POST as exportPost } from "@/app/api/export/route";
import { resetRateLimits } from "@/lib/security/rateLimit";
import { SCAM_BANK } from "./samples";

const post = (url: string, body: unknown, raw = false) =>
  new Request(`http://localhost${url}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: raw ? (body as string) : JSON.stringify(body),
  });

beforeEach(() => resetRateLimits());

describe("POST /api/analyze", () => {
  it("analyses a message", async () => {
    const res = await analyze(post("/api/analyze", { content: SCAM_BANK }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.riskIntelligence.finalScore).toBeGreaterThan(0);
  });
  it("rejects an empty message", async () => {
    expect((await analyze(post("/api/analyze", { content: "   " }))).status).toBe(400);
  });
  it("rejects invalid JSON", async () => {
    expect((await analyze(post("/api/analyze", "{not json", true))).status).toBe(400);
  });
  it("rejects a message that is not text", async () => {
    expect((await analyze(post("/api/analyze", { content: 123 }))).status).toBe(400);
  });
  it("rejects a message that is too long", async () => {
    expect((await analyze(post("/api/analyze", { content: "a".repeat(5001) }))).status).toBe(413);
  });
  it("rate limits repeated requests", async () => {
    let last = 200;
    for (let i = 0; i < 31; i++) {
      last = (await analyze(post("/api/analyze", { content: "hello there" }))).status;
    }
    expect(last).toBe(429);
  });
});

describe("/api/community", () => {
  it("returns reports and trends", async () => {
    const data = await (await communityGet()).json();
    expect(data.reports.length).toBeGreaterThan(0);
    expect(data.aggregateTrends.length).toBeGreaterThan(0);
  });
  it("removes personal data from submitted reports", async () => {
    const res = await communityPost(post("/api/community", { rawText: "Call 9876543210 and give OTP 123456 please" }));
    const { report } = await res.json();
    expect(report.sanitizedSnippet).not.toContain("9876543210");
    expect(report.sanitizedSnippet).not.toContain("123456");
  });
  it("rejects a report that is too short", async () => {
    expect((await communityPost(post("/api/community", { rawText: "hi" }))).status).toBe(400);
  });
  it("strips HTML from the category", async () => {
    const res = await communityPost(post("/api/community", { rawText: "A long enough report text", category: "<b>Bank</b>" }));
    expect((await res.json()).report.category).toBe("Bank");
  });
});

describe("POST /api/export", () => {
  async function investigation() {
    return (await (await analyze(post("/api/analyze", { content: SCAM_BANK }))).json());
  }

  it("exports a police dossier as a text file", async () => {
    const res = await exportPost(post("/api/export", { investigation: await investigation(), format: "dossier" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-disposition")).toContain("attachment");
  });
  it("exports a STIX bundle", async () => {
    const res = await exportPost(post("/api/export", { investigation: await investigation(), format: "stix" }));
    expect((await res.json()).type).toBe("bundle");
  });
  it("rejects missing data", async () => {
    expect((await exportPost(post("/api/export", { format: "stix" }))).status).toBe(400);
  });
  it("rejects an unknown format", async () => {
    const res = await exportPost(post("/api/export", { investigation: await investigation(), format: "exe" }));
    expect(res.status).toBe(400);
  });
  it("rejects incomplete investigation data", async () => {
    expect((await exportPost(post("/api/export", { investigation: { foo: 1 }, format: "json" }))).status).toBe(400);
  });
});

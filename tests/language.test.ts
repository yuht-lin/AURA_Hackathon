import { describe, expect, it } from "vitest";
import { detectLanguage } from "@/lib/agents/language";
import { ASSAMESE_MESSAGE, HINDI_MESSAGE, SCAM_BANK } from "./samples";

describe("language detection agent", () => {
  it("detects English", () => {
    expect(detectLanguage(SCAM_BANK).detectedLanguage).toBe("en");
  });

  it("detects Hindi in Devanagari", () => {
    const result = detectLanguage(HINDI_MESSAGE);
    expect(result.detectedLanguage).toBe("hi");
    expect(result.detectedScripts.join(" ")).toContain("Devanagari");
  });

  it("detects Assamese in Bengali-Assamese script", () => {
    const result = detectLanguage(ASSAMESE_MESSAGE);
    expect(result.detectedLanguage).toBe("as");
  });

  it("returns a confidence between 0 and 1 (or 0 and 100)", () => {
    const { confidence } = detectLanguage(SCAM_BANK);
    expect(confidence).toBeGreaterThan(0);
    expect(confidence).toBeLessThanOrEqual(100);
  });
});

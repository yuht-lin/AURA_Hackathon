import { beforeEach, describe, expect, it } from "vitest";
import { cleanShortText, sanitizePii } from "@/lib/security/sanitize";
import { isRateLimited, resetRateLimits } from "@/lib/security/rateLimit";

describe("sanitizePii", () => {
  it("redacts phone numbers", () => {
    expect(sanitizePii("Call 9876543210 now")).toBe("Call [REDACTED_PHONE_NUMBER] now");
  });
  it("redacts +91 phone numbers", () => {
    expect(sanitizePii("Call +91 9876543210")).not.toContain("9876543210");
  });
  it("redacts email addresses", () => {
    expect(sanitizePii("mail me at a.b@example.com")).toContain("[REDACTED_EMAIL]");
  });
  it("redacts 6-digit OTPs", () => {
    expect(sanitizePii("Your OTP is 483921")).toContain("[REDACTED_OTP_OR_PIN]");
  });
  it("redacts 16-digit card numbers", () => {
    expect(sanitizePii("card 4111 1111 1111 1111")).toContain("[REDACTED_CARD_NUMBER]");
  });
  it("leaves harmless text alone", () => {
    expect(sanitizePii("Hello world")).toBe("Hello world");
  });
});

describe("cleanShortText", () => {
  it("strips HTML tags", () => {
    expect(cleanShortText("<script>alert(1)</script>Hi", 50)).toBe("alert(1)Hi");
  });
  it("limits length", () => {
    expect(cleanShortText("x".repeat(500), 20)).toHaveLength(20);
  });
  it("returns an empty string for non-strings", () => {
    expect(cleanShortText(42, 20)).toBe("");
  });
});

describe("rate limiter", () => {
  beforeEach(() => resetRateLimits());

  it("allows requests under the limit", () => {
    expect(isRateLimited("k", 3, 1000, 0)).toBe(false);
    expect(isRateLimited("k", 3, 1000, 1)).toBe(false);
  });
  it("blocks requests over the limit", () => {
    for (let i = 0; i < 3; i++) isRateLimited("k", 3, 1000, i);
    expect(isRateLimited("k", 3, 1000, 10)).toBe(true);
  });
  it("allows requests again after the window passes", () => {
    for (let i = 0; i < 3; i++) isRateLimited("k", 3, 1000, i);
    expect(isRateLimited("k", 3, 1000, 5000)).toBe(false);
  });
  it("tracks different clients separately", () => {
    for (let i = 0; i < 3; i++) isRateLimited("a", 3, 1000, i);
    expect(isRateLimited("b", 3, 1000, 10)).toBe(false);
  });
});

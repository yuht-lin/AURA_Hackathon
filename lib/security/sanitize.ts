/** Removes personal data from text before it is stored or shared. */
export function sanitizePii(rawText: string): string {
  return rawText
    .replace(/(?:\+91[\-\s]?)?[6-9]\d{9}/g, "[REDACTED_PHONE_NUMBER]")
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
    .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, "[REDACTED_CARD_NUMBER]")
    .replace(/\b\d{6}\b/g, "[REDACTED_OTP_OR_PIN]");
}

/** Strips HTML tags and control characters, then trims to a maximum length. */
export function cleanShortText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);
}

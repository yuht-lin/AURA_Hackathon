import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA ScamShield | AI-Powered Fraud & Phishing Detection Engine",
  description: "Next-gen multimodal cybersecurity engine detecting suspicious SMS, WhatsApp scams, phishing links, and fake payment receipts. Built for PromptWars PS01.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

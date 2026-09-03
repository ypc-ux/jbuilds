import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentAdSpend — AI that decides your ad spend, and shows its work",
  description:
    "AgentAdSpend manages bids and budget across Meta, Google, and TikTok autonomously, inside hard limits you set. Every action is logged and reversible.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black font-sans">
        {children}
      </body>
    </html>
  );
}

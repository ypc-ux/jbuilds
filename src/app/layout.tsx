import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { motionReadyScript } from "@/components/site/scroll-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentgraphology.com"),
  title: {
    default: "AgentGraphology — Profile Your Tools. Decide with Data.",
    template: "%s — AgentGraphology",
  },
  description:
    "Score any GitHub repository across five dimensions before you integrate it. Local LLM inference, zero cloud cost, open source.",
  keywords: [
    "integration protocol",
    "repository evaluation",
    "build vs buy",
    "technical debt",
    "developer productivity",
    "open source",
  ],
  openGraph: {
    title: "AgentGraphology",
    description: "Profile Your Tools. Decide with Data.",
    url: "https://agentgraphology.com",
    siteName: "AgentGraphology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentGraphology",
    description: "Profile Your Tools. Decide with Data.",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionReadyScript }} />
      </head>
      <body className="bg-void text-ink font-sans">{children}</body>
    </html>
  );
}

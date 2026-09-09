import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentGraphology - Repository Evaluation Tool",
  description: "Evaluate GitHub repositories using the Business Integration Protocol. Profile your tools, decide with data.",
  keywords: ["integration", "evaluation", "github", "business", "protocol"],
  openGraph: {
    title: "AgentGraphology",
    description: "Profile Your Tools. Decide with Data.",
    url: "https://agentgraphology.com",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white font-sans">{children}</body>
    </html>
  );
}

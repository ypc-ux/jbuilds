import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}

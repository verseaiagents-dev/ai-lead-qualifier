import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Lead Qualifier | Instant Lead Scoring",
  description: "Instantly qualify sales leads using AI-powered scoring. Get actionable insights and prioritize your sales efforts.",
  keywords: ["lead scoring", "AI", "sales automation", "lead qualification", "CRM"],
  authors: [{ name: "Kadir Burak Durmazlar" }],
  openGraph: {
    title: "AI Lead Qualifier",
    description: "AI-powered lead scoring in seconds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

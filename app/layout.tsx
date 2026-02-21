import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omnixai.co.uk"),
  title: {
    default: "OmnixAI – AI Sales Assistants",
    template: "%s | OmnixAI",
  },
  description:
    "Turn website visitors into qualified leads automatically with AI-powered sales assistants.",
  applicationName: "OmnixAI",
  keywords: [
    "AI sales assistant",
    "AI chatbot for websites",
    "lead generation AI",
    "website chatbot",
    "AI lead capture",
    "OmnixAI",
  ],
  authors: [{ name: "OmnixAI" }],
  creator: "OmnixAI",
  icons: {
    icon: "/favicon-v3.png",
    shortcut: "/favicon-v3.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://omnixai.co.uk",
    title: "OmnixAI – AI Sales Assistants",
    description:
      "Turn website visitors into qualified leads automatically with AI-powered sales assistants.",
    siteName: "OmnixAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmnixAI – AI Sales Assistants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmnixAI – AI Sales Assistants",
    description:
      "Turn website visitors into qualified leads automatically with AI-powered sales assistants.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E14", // update to your brand color
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon-v3.png" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white`}>
        {children}

        {/* 
          Mount your AI Assistant widget here so it persists across routes:
          <AiAssistantWidget />
        */}

        {/* Optional: analytics or tracking */}
        {/*
        <Script
          src="https://your-analytics-script.js"
          strategy="afterInteractive"
        />
        */}
      </body>
    </html>
  );
}
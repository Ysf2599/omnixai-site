import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import OmnixAssistant from "@/components/OmnixAssistant";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OmnixAI – AI Sales Assistants",
  description: "Turn website visitors into leads automatically.",
  icons: {
    icon: "/favicon-v3.png",
    shortcut: "/favicon-v3.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "OmnixAI – AI Sales Assistants",
    description: "Turn website visitors into leads automatically.",
    images: ["/og-image.png"], // optional – remove if you don’t have this file
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* OmnixAI Assistant – mounted on every page */}
        <OmnixAssistant />
      </body>
    </html>
  );
}
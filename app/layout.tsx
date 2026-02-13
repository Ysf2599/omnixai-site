import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OmnixAI – AI Sales Assistants",
  description: "Turn website visitors into leads automatically.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "OmnixAI – AI Sales Assistants",
    description: "Turn website visitors into leads automatically.",
    images: ["/og-image.png"], // optional, you can remove this line if you don't have og-image.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { DM_Mono, Inter, Playfair_Display } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
});

export const metadata: Metadata = {
  title: "DEFACT 3D",
  description: "3D-printed ritual objects by DEFACT.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmMono.variable} ${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap"
        />
      </head>
      <body id="top" className="bg-void text-signal font-sans selection:bg-blood selection:text-white overflow-x-hidden">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

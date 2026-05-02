import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-quote",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DEFACT — Objects of Distinction",
  description: "DEFACT crafts sculptural artifacts through advanced 3D printing and traditional metal casting. Each piece is a meditation on material, form, and the boundary between object and idea.",
  keywords: ["3D printing", "artifacts", "sculptural", "bronze", "contemporary art", "design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;1,400&family=Inter:wght@400;500&family=Playfair+Display:ital,wght@1,400;1,500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col has-custom-cursor" style={{ background: 'var(--void)' }}>
        <style>{`
          :root {
            --font-display: 'Clash Grotesk', -apple-system, sans-serif;
            --font-mono: 'DM Mono', monospace;
            --font-body: 'Inter', sans-serif;
            --font-quote: 'Playfair Display', serif;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
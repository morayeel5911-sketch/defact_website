import { DM_Mono } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  preload: true,
});

// Font Preloading für LCP-Optimierung
export const metadata = {
  other: {
    'link': [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmMono.variable} antialiased`}>
      <body id="top" className="bg-void text-signal font-sans selection:bg-blood selection:text-white overflow-x-hidden">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

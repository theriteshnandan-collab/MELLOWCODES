import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mellow Code Studios | Elite Creative Digital Agency",
  description:
    "Mellow Code Studios is a premium creative digital studio engineering high-fidelity web experiences where strategy meets craft. Specializing in UI/UX, Web Development, and Digital Strategy.",
  keywords: "digital agency, Mellow Code Studios, UI UX design, web development, branding, elite creative studio",
  openGraph: {
    title: "Mellow Code Studios | Elite Creative Digital Agency",
    description:
      "A premium creative digital studio engineering high-fidelity web experiences for forward-thinking brands.",
    type: "website",
  },
};

import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SideIndex from "@/components/SideIndex";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll />
        <ScrollProgress />
        <SideIndex />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

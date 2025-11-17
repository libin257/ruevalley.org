import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rue Valley - Complete Guide & Walkthrough Portal",
  description: "Your ultimate resource for the time loop RPG Rue Valley - Complete walkthrough, character guides, intention tree search, and community insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url(/images/backgrounds/hero-bg.jpg)' }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ClientBody>
      </body>
    </html>
  );
}

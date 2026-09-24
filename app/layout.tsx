import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion. Train hard, log honest.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <FitLogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster theme="dark" position="bottom-right" richColors />
        </FitLogProvider>
      </body>
    </html>
  );
}
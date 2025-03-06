// All font imports and exports
// Imports
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

// Exports
export const inter = Inter({ subsets: ["latin"] });
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

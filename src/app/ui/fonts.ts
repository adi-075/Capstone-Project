// All font imports and exports
// Imports
import { Inter, Geist, Geist_Mono, Roboto } from "next/font/google";

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

export const roboto = Roboto({ subsets: ["latin"] });

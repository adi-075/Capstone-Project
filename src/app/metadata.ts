import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RocketDash",
  description: "RocketDash is a platform for students to manage their courses and resources.",
  keywords: ["app", "next.js", "example"],
  authors: [{ name: "Team A-5" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32' },
      { url: '/favicon.png', sizes: '192x192' }
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180' }
    ]
  }
}; 
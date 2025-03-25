import React from 'react';
import { inter } from "@/app/fonts/fonts";
import "@/app/globals.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} min-h-screen flex items-center justify-center bg-stone-100`}>
      <main className="w-full max-w-md p-4">
        {children}
      </main>
    </div>
  );
}
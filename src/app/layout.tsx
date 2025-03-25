"use client";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import "@/app/globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} text-stone-950 bg-stone-100`}>
        {pathname !== "/login" ? (
          <main className="md:grid gap-4 p-4 grid-cols-[220px_1fr]">
            <Sidebar />
            {children}
          </main>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
"use client";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import "@/app/globals.css";
import { usePathname } from "next/navigation";
import { metadata } from "@/app/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description || ""} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : ""} />
        <meta name="author" content={Array.isArray(metadata.authors) ? metadata.authors.map(author => author.name ?? "").join(", ") : ""} />
      </head>
      <body className={`${inter.className} text-stone-950 bg-stone-100 dark:bg-[#081028]`}>
        {pathname !== "/login" && pathname !== "/signup" ? (
          <main className="md:grid gap-4 p-4 grid-cols-[240px_1fr]">
            <Sidebar />
            {children}
          </main>
        ) : (
          <main>{children}</main>
        )}
        {/* <main className="md:grid gap-4 p-4 grid-cols-[220px_1fr]">
          <Sidebar />
          {children}
        </main> */}
      </body>
    </html>
  );
}
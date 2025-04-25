"use client";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import "@/app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { metadata } from "@/app/metadata";
import { useEffect, useState } from "react";
import { setupAutoLogout } from "@/app/utils/autoLogout";
import { createClient } from "@/app/utils/supabase/client";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const publicRoutes = ['/login', '/signup', '/auth/callback', '/404'];
      const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
      
      if (!isPublicRoute) {
        try {
          // Get Supabase client
          const supabase = createClient();
          
          // Check session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (!session) {
            // Redirect to login if no session
            router.push('/login');
          }
        } catch (error) {
          console.error('Auth check error:', error);
          router.push('/login');
        }
      }
      
      setIsChecking(false);
    };
    
    checkAuth();
  }, [pathname, router]);

  // Set up auto-logout functionality
  useEffect(() => {
    // Only setup auto-logout for authenticated routes
    if (pathname !== "/login" && pathname !== "/signup" && pathname !== "/404" && !isChecking) {
      const cleanupAutoLogout = setupAutoLogout();
      
      // Clean up event listeners when component unmounts
      return cleanupAutoLogout;
    }
  }, [pathname, isChecking]);

  // Show loading state while checking auth
  if (isChecking && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
    return (
      <html lang="en">
        <body className={`${inter.className} text-stone-950 bg-stone-100 dark:bg-[#081028] flex items-center justify-center h-screen`}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-600 dark:border-stone-400"></div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description || ""} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : ""} />
        <meta name="author" content={Array.isArray(metadata.authors) ? metadata.authors.map(author => author.name ?? "").join(", ") : ""} />
      </head>
      <body className={`${inter.className} text-stone-950 bg-stone-100 dark:bg-[#081028]`}>
        {pathname !== "/login" && pathname !== "/signup" && pathname !== "/404" ? (
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
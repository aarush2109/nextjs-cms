import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
// import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI Powered Blog Platform",
    description: "A modern platform for AI assisted content creation.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50 min-h-screen`}
            >
                <AuthProvider>
                    {/* We are removing SidebarProvider, Toaster temporarily for Phase 1 as we are rebuilding the base UI structure. They can be re-added later. */}
                    <Navbar />
                    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}

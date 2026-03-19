"use client";

import Link from "next/link";
import { PenSquare, LogIn, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl text-white tracking-tight flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                        <PenSquare size={18} />
                    </div>
                    BlogAI
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                        Dashboard
                    </Link>
                    <Link href="/editor" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                        Write
                    </Link>
                    <div className="h-4 w-px bg-zinc-800" />
                    
                    {session ? (
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            {session.user?.image ? (
                                <img src={session.user.image} alt={session.user.name || "User"} className="h-8 w-8 rounded-full border border-zinc-800" />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium text-white border border-zinc-700">
                                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                            {/* Logout */}
                            <button 
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition-colors">
                            <LogIn size={16} />
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (data.success) {
                // Redirect to login on success
                router.push("/login?registered=true");
            } else {
                setError(data.error || "Failed to sign up.");
            }
        } catch (err: any) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
                    <p className="text-zinc-400">Join BlogAI today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 text-sm border border-red-500/20 rounded-md p-3 mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-zinc-500" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-10 pr-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-zinc-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-10 pr-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-zinc-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-10 pr-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        {loading ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

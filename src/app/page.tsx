"use client";

import { useEffect, useState } from "react";
import PostCard, { Post } from "@/components/PostCard";
import { Loader2 } from "lucide-react";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");
                if (!res.ok) throw new Error("Failed to fetch posts");
                const result = await res.json();
                
                if (result.success) {
                    setPosts(result.data);
                } else {
                    setError(result.error || "Failed to load posts.");
                }
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading the latest stories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-400">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <header className="py-12 md:py-20 text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Insights</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
                    The latest stories, ideas, and perspectives exploring the frontiers of technology and design.
                </p>
            </header>

            {posts.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                    <p className="text-zinc-400 text-lg">No posts have been published yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}

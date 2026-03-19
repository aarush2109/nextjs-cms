"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Post } from "@/components/PostCard";

export default function DashboardPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Fetch ALL posts including drafts by passing status=all
            const res = await fetch("/api/posts?status=all");
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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        
        setDeleteLoading(id);
        
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            
            const result = await res.json();
            
            if (result.success) {
                // Update UI optimistically after deletion
                setPosts(posts.filter(post => post._id !== id));
            } else {
                alert(result.error || "Failed to delete post");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting.");
        } finally {
            setDeleteLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-zinc-400 mt-1">Manage your blog posts and drafts.</p>
                </div>
                <Link 
                    href="/editor" 
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full sm:w-auto"
                >
                    <Plus size={18} />
                    New Post
                </Link>
            </header>

            {error && (
                <div className="bg-red-950/50 text-red-400 border border-red-900/50 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}

            {posts.length === 0 && !error ? (
                <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
                    <p className="text-zinc-400 text-lg">You haven't written any posts yet.</p>
                    <Link 
                        href="/editor" 
                        className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                        <Plus size={18} />
                        Start Writing
                    </Link>
                </div>
            ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-zinc-400">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50 border-b border-zinc-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Title</th>
                                    <th scope="col" className="px-6 py-4">Status</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {posts.map((post) => (
                                    <tr key={post._id} className="hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-zinc-200">
                                            <div className="flex items-center gap-2">
                                                <span className="truncate max-w-[200px] sm:max-w-sm md:max-w-md">{post.title}</span>
                                                {post.status === "published" && (
                                                    <Link href={`/post/${post.slug}`} target="_blank" className="text-zinc-500 hover:text-blue-400 transition-colors" title="View Published Post">
                                                        <ExternalLink size={14} />
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                post.status === "published" 
                                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            }`}>
                                                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                            <Link href="/editor" className="text-zinc-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1" title="Edit (Placeholder)">
                                                <Edit2 size={16} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(post._id)}
                                                disabled={deleteLoading === post._id}
                                                className="text-zinc-400 hover:text-red-400 transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                                                title="Delete Post"
                                            >
                                                {deleteLoading === post._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

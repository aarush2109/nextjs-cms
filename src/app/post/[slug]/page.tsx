"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Post } from "@/components/PostCard";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            if (!params?.slug) return;
            
            try {
                const res = await fetch(`/api/posts/slug/${params.slug}`);
                if (!res.ok) {
                    if (res.status === 404) throw new Error("Post not found");
                    throw new Error("Failed to fetch post");
                }
                
                const result = await res.json();
                if (result.success) {
                    setPost(result.data);
                } else {
                    setError(result.error || "Failed to load post");
                }
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params?.slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading post...</p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400 space-y-4">
                <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-xl">
                    <p>{error || "Post not found."}</p>
                </div>
                <button 
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>
            </div>
        );
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return (
        <article className="max-w-4xl mx-auto py-8 md:py-12 space-y-8 px-4">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium mb-4">
                <ArrowLeft size={16} /> Back to stories
            </Link>

            <header className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 border-b border-zinc-800 pb-8">
                    <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-zinc-500" />
                        <span className="font-medium text-zinc-300">{post.author?.name || "Unknown Author"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarIcon size={16} className="text-zinc-500" />
                        <time>{formattedDate}</time>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-xs">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {post.coverImage && (
                <div className="w-full aspect-[21/9] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div 
                className="prose prose-invert prose-lg max-w-none prose-img:rounded-xl prose-a:text-blue-400 hover:prose-a:text-blue-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}

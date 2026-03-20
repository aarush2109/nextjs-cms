import Link from "next/link";
import { CalendarIcon, UserIcon } from "lucide-react";

interface Author {
    name: string;
    email?: string;
    avatar?: string;
}

export interface Post {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    author: Author;
    createdAt: string;
    status: string;
}

export default function PostCard({ post }: { post: Post }) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <article className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col h-full group block relative">
            <Link href={`/post/${post.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">Read {post.title}</span>
            </Link>
            
            {post.coverImage && (
                <div className="w-full h-48 bg-zinc-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            
            <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-zinc-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                </h2>
                
                <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-1">
                    {post.excerpt || "No excerpt available..."}
                </p>
                
                <div className="flex items-center justify-between text-xs text-zinc-500 mt-auto pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center gap-2">
                        <UserIcon size={14} />
                        <span>{post.author?.name || "Unknown Author"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarIcon size={14} />
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>
            
            {/* Added for accessibility since a link covers the entire card, this ensures screen readers get the action */}
            <div className="sr-only">
                Read More
            </div>
        </article>
    );
}

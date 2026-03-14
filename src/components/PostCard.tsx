import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PostCardProps {
    title: string;
    excerpt: string;
    slug: string;
    author: string;
    date: string;
}

export default function PostCard({ title, excerpt, slug, author, date }: PostCardProps) {
    return (
        <article className="group relative flex flex-col justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
            <div>
                <div className="flex items-center gap-x-4 text-xs mb-4 text-zinc-400">
                    <time dateTime={date}>{date}</time>
                    <span className="bg-zinc-800 px-2 py-1 rounded-full">{author}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold leading-6 text-white group-hover:text-blue-400 transition-colors">
                    <Link href={`/post/${slug}`}>
                        <span className="absolute inset-0" />
                        {title}
                    </Link>
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400 line-clamp-3">
                    {excerpt}
                </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-medium text-blue-400">
                Read more <ArrowRight className="ml-1 h-4 w-4" />
            </div>
        </article>
    );
}

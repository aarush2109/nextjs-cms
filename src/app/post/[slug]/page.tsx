import { notFound } from "next/navigation";

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto py-10">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
                    Placeholder Blog Post for {slug}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-zinc-400 text-sm">
                    <span>By Author Name</span>
                    <span>•</span>
                    <time dateTime="2023-10-01">October 1, 2023</time>
                    <span>•</span>
                    <span>5 min read</span>
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                    This is a placeholder for the blog post content. The slug for this post is <strong>{slug}</strong>.
                    In a future phase, this content will be loaded dynamically from the database using Next.js
                    Server Components and displayed here with full rich text rendering.
                </p>
            </div>
        </article>
    );
}

import PostCard from "./PostCard";

const PLACEHOLDER_POSTS = [
    {
        title: "Understanding React Server Components",
        excerpt: "A deep dive into how Server Components change the way we build React applications, improving performance and developer experience.",
        slug: "understanding-react-server-components",
        author: "Alice Johnson",
        date: "Oct 12, 2023",
    },
    {
        title: "Mastering Tailwind CSS in 2024",
        excerpt: "Explore the latest features of Tailwind CSS v4 and learn how to build modern, responsive, and beautiful UIs faster than ever.",
        slug: "mastering-tailwind-css",
        author: "Bob Smith",
        date: "Nov 5, 2023",
    },
    {
        title: "The Future of AI in Content Creation",
        excerpt: "How generative AI models are reshaping the blogging landscape and what it means for writers and developers.",
        slug: "future-of-ai-content",
        author: "Eve Adams",
        date: "Dec 20, 2023",
    },
];

export default function PostList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_POSTS.map((post) => (
                <PostCard key={post.slug} {...post} />
            ))}
        </div>
    );
}

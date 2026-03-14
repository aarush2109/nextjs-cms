import PostList from "@/components/PostList";

export default function Home() {
    return (
        <div className="space-y-12 pb-16">
            <section className="space-y-4 pt-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
                    Manage your content with ease
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-zinc-400">
                    Streamline your content workflow, publish with confidence, or let AI generate the ideas for you.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold tracking-tight mb-8">Latest Posts</h2>
                <PostList />
            </section>
        </div>
    );
}

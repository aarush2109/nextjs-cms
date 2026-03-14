import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Sidebar />

            <main className="flex-1 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Your Posts</h1>
                    <a href="/editor" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-zinc-200 transition-colors">
                        New Post
                    </a>
                </div>
                <PostList />
            </main>
        </div>
    );
}

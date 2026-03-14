import Link from "next/link";
import { CopyPlus, Folders, Settings, User } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-full md:w-64 shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col h-full min-h-[50vh]">
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-white px-3 flex items-center gap-2">
                    <User size={18} className="text-blue-500" />
                    Dashboard
                </h2>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-medium">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors bg-zinc-800"
                >
                    <Folders size={18} />
                    My Posts
                </Link>

                <Link
                    href="/editor"
                    className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                >
                    <CopyPlus size={18} />
                    Write New Post
                </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-800 text-sm font-medium">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                >
                    <Settings size={18} />
                    Settings
                </Link>
            </div>
        </aside>
    );
}

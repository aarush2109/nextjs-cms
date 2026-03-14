"use client";

import Editor from "@/components/Editor";
import AIContentGenerator from "@/components/AIContentGenerator";
import { useState } from "react";

export default function EditorPage() {
    const [content, setContent] = useState("");

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <main className="flex-1 space-y-6">
                <input
                    type="text"
                    placeholder="New Post Title..."
                    className="text-4xl font-bold bg-transparent border-none outline-none w-full text-zinc-100 placeholder:text-zinc-600 mb-4"
                />
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl min-h-[60vh] p-4 text-zinc-300">
                    <Editor content={content} onChange={setContent} />
                </div>
            </main>

            <aside className="w-full lg:w-80 shrink-0 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                        <span className="text-blue-400">✨</span> AI Assistant
                    </h3>
                    <AIContentGenerator onGenerate={(text) => setContent((prev) => prev + text)} />
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-zinc-100">Publish Flow</h3>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                        Publish Post
                    </button>
                    <button className="w-full bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium py-2 px-4 rounded-md transition-colors">
                        Save Draft
                    </button>
                </div>
            </aside>
        </div>
    );
}

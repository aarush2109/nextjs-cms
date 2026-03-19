"use client";

import Editor from "@/components/Editor";
import AIContentGenerator from "@/components/AIContentGenerator";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditorPage() {
    const router = useRouter();
    
    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [tags, setTags] = useState("");
    
    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [loadingType, setLoadingType] = useState<"published" | "draft" | null>(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleSubmit = async (publishStatus: "published" | "draft") => {
        setMessage({ type: "", text: "" });
        
        if (!title.trim() || !content.trim()) {
            setMessage({ type: "error", text: "Title and content are required." });
            return;
        }

        setIsLoading(true);
        setLoadingType(publishStatus);

        try {
            // Process tags: split by comma, trim whitespace, and filter empty strings
            const tagsArray = tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");

            const data = {
                title,
                content,
                excerpt,
                coverImage,
                tags: tagsArray,
                status: publishStatus,
            };

            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: "success", text: `Post successfully ${publishStatus === "published" ? "published" : "saved as draft"}!` });
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            } else {
                setMessage({ type: "error", text: result.error || "Failed to create post." });
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setMessage({ type: "error", text: "An error occurred while submitting." });
        } finally {
            setIsLoading(false);
            setLoadingType(null);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-4 md:p-8">
            <main className="flex-1 space-y-6">
                {/* Title Input */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Post Title..."
                    className="text-4xl font-bold bg-transparent border-none outline-none w-full text-zinc-100 placeholder:text-zinc-600 mb-2 focus:ring-0 px-0"
                />
                
                {/* Slug Preview (Optional Feature as requested) */}
                {title && (
                    <div className="text-zinc-500 text-sm mb-4 bg-zinc-900 px-3 py-1.5 rounded-md inline-block">
                        <span className="font-semibold text-zinc-400">Slug Preview: </span> 
                        /blog/{title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}
                    </div>
                )}

                {/* Editor container */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl min-h-[60vh] p-4 text-zinc-300">
                    <Editor content={content} onChange={setContent} />
                </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-96 shrink-0 space-y-6">
                
                {/* Message display */}
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm transition-all duration-300 ${message.type === 'error' ? 'bg-red-950/50 text-red-400 border border-red-900/50' : 'bg-green-950/50 text-green-400 border border-green-900/50'}`}>
                        {message.text}
                    </div>
                )}

                {/* Publish Flow */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-zinc-100 mb-4">Publish Flow</h3>
                    
                    <button 
                        onClick={() => handleSubmit("published")}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isLoading && loadingType === "published" ? "Publishing..." : "Publish Post"}
                    </button>
                    
                    <button 
                        onClick={() => handleSubmit("draft")}
                        disabled={isLoading}
                        className="w-full bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isLoading && loadingType === "draft" ? "Saving..." : "Save Draft"}
                    </button>
                </div>

                {/* Post Settings */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-zinc-100 mb-4">
                        Post Settings
                    </h3>
                    
                    <div className="space-y-4 text-sm">
                        {/* Excerpt */}
                        <div>
                            <label className="block text-zinc-400 mb-1.5 font-medium">Excerpt</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Short summary of the post..."
                                rows={3}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-zinc-600"
                            />
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-zinc-400 mb-1.5 font-medium">Cover Image URL</label>
                            <input
                                type="text"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-zinc-400 mb-1.5 font-medium">Tags (comma-separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g. ai, web development, nextjs"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                            />
                        </div>
                    </div>
                </div>

                {/* AI Assistant */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                        <span className="text-blue-400">✨</span> AI Tool
                    </h3>
                    <AIContentGenerator onGenerate={(text) => setContent((prev) => prev + text)} />
                </div>

            </aside>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AIContentGeneratorProps {
    onGenerateBlog: (content: string, action: "append" | "replace") => void;
    onGenerateTitle: (title: string) => void;
    onGenerateSummary: (summary: string) => void;
    editorContent: string;
}

export default function AIContentGenerator({
    onGenerateBlog,
    onGenerateTitle,
    onGenerateSummary,
    editorContent,
}: AIContentGeneratorProps) {
    const [prompt, setPrompt] = useState("");
    const [tone, setTone] = useState("professional");
    const [action, setAction] = useState<"append" | "replace">("replace");
    const [loadingType, setLoadingType] = useState<"blog" | "title" | "summary" | "improve" | null>(null);
    const [error, setError] = useState("");

    const handleGenerate = async (type: "blog" | "title" | "summary" | "improve") => {
        const inputMap = {
            blog: prompt,
            title: prompt,
            summary: editorContent,
            improve: editorContent,
        };

        const currentInput = inputMap[type];

        if (!currentInput) {
            setError(type === "blog" || type === "title" ? "Please enter a prompt first." : "Please write some content in the editor first to use this feature.");
            return;
        }

        setError("");
        setLoadingType(type);

        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, input: currentInput, tone }),
            });

            const result = await res.json();

            if (!result.success) {
                throw new Error(result.error || "Failed to generate content.");
            }

            switch (type) {
                case "blog":
                case "improve":
                    onGenerateBlog(result.data, action);
                    break;
                case "title":
                    const formattedTitle = result.data.replace(/<\/?[^>]+(>|$)/g, "").replace(/\*\*/g, "").replace(/-/g, "").trim();
                    onGenerateTitle(formattedTitle);
                    break;
                case "summary":
                    onGenerateSummary(result.data.replace(/<\/?[^>]+(>|$)/g, "").replace(/\*\*/g, "").trim());
                    break;
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoadingType(null);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                <span className="text-blue-400"><Sparkles size={18} /></span> AI Assistant
            </h3>
            
            {error && <div className="text-red-400 text-sm mb-4 px-3 py-2 bg-red-900/20 rounded-md border border-red-900/30">{error}</div>}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">What should I write about?</label>
                    <input
                        type="text"
                        placeholder="e.g., The Future of AI in Healthcare"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Tone</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="enthusiastic">Enthusiastic</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Blog Action</label>
                        <select
                            value={action}
                            onChange={(e) => setAction(e.target.value as "append" | "replace")}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="replace">Replace Editor</option>
                            <option value="append">Append to Editor</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={() => handleGenerate("blog")}
                        disabled={!!loadingType}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loadingType === "blog" && <Loader2 size={16} className="animate-spin" />}
                        Generate Blog
                    </button>
                    <button
                        onClick={() => handleGenerate("title")}
                        disabled={!!loadingType}
                        className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium py-2 px-3 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loadingType === "title" && <Loader2 size={16} className="animate-spin" />}
                        Generate Title
                    </button>
                    <button
                        onClick={() => handleGenerate("summary")}
                        disabled={!!loadingType}
                        className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium py-2 px-3 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loadingType === "summary" && <Loader2 size={16} className="animate-spin" />}
                        Get Summary
                    </button>
                    <button
                        onClick={() => handleGenerate("improve")}
                        disabled={!!loadingType}
                        className="flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-900/50 text-sm font-medium py-2 px-3 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loadingType === "improve" && <Loader2 size={16} className="animate-spin" />}
                        Improve Draft
                    </button>
                </div>
            </div>
        </div>
    );
}

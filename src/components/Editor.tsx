"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough, Heading2, List, ListOrdered, Quote, Code } from 'lucide-react';
import { useEffect } from 'react';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-lg max-w-none min-h-[50vh] focus:outline-none p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content when external content changes (like from AI)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    const MenuButton = ({
        onClick,
        isActive = false,
        children
    }: {
        onClick: () => void;
        isActive?: boolean;
        children: React.ReactNode
    }) => (
        <button
            onClick={onClick}
            className={`p-2 rounded-md hover:bg-zinc-800 transition-colors ${isActive ? 'bg-zinc-800 text-blue-400' : 'text-zinc-400'
                }`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-2 mb-2 p-2">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                >
                    <Bold size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                >
                    <Italic size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                >
                    <Strikethrough size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-zinc-800 mx-2 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                >
                    <Heading2 size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                >
                    <List size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-zinc-800 mx-2 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                >
                    <Quote size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                >
                    <Code size={18} />
                </MenuButton>
            </div>

            <EditorContent editor={editor} className="flex-1 cursor-text" />
        </div>
    );
}

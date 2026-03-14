"use client";
import { useState } from "react";
import { useForm } from "react-hook-form"


export default function EditorForm() {
    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState("")
    const handleForm = (data) => {
        console.log(data, 'data from hook form')
    }
    return <section>
        <form onSubmit={handleSubmit(handleForm)}>
            <input {...register('title')} placeholder="Enter the title" className="w-full bg-zinc-600" />
            <input {...register('keywords')} placeholder="Enter the keywords" className="w-full bg-zinc-600" />
            <button type="submit" className="rounded cursor-pointer px-4 py-4 bg-zinc-500 justify-center items-center">Save</button>
        </form>
    </section>
}
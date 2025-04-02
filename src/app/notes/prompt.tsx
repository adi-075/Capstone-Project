'use client'

import { useState, useRef, useEffect } from 'react'
import { FiUpload, FiSend, FiX } from 'react-icons/fi'

interface PromptProps {
    onSubmit: (note: string) => void;
}

export function Prompt({ onSubmit }: PromptProps) {
    const [note, setNote] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0])
    }

    const handleSubmit = () => {
        if (!note.trim() && !file) return
        onSubmit(note)
        setNote('')
        setFile(null)
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [note])

    return (
        <div className="fixed bottom-4 left-[260px] right-4 max-w-3xl mx-auto z-50">
            {file && (
                <div className="flex items-center justify-between bg-gray-100 py-1 px-3 rounded-t-md border border-b-0 border-gray-200 text-sm text-gray-600">
                    <span>{file.name}</span>
                    <button onClick={() => setFile(null)}>
                        <FiX className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
            )}
            <div className="flex items-end bg-white border border-gray-200 rounded-xl shadow-md p-3 gap-2">
                <label className="cursor-pointer p-2 text-gray-500 hover:text-gray-700">
                    <FiUpload className="text-lg" />
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Send a message or attach notes..."
                    className="flex-grow resize-none outline-none text-sm py-2"
                />
                <button
                    onClick={handleSubmit}
                    className="p-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition"
                >
                    <FiSend />
                </button>
            </div>
        </div>
    )
}
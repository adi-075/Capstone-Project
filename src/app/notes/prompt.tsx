'use client'

import { useState, useRef, useEffect } from 'react'
import { FiPlus, FiSend, FiX } from 'react-icons/fi'

interface PromptProps {
    onSubmit: (note: string, file?: File) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export function Prompt({ onSubmit, isLoading = false, disabled = false }: PromptProps) {
    const [note, setNote] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
            } else {
                alert('Please upload a PDF file');
                e.target.value = ''; // Clear the input
            }
        }
    }

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!note.trim() && !file) return
        onSubmit(note, file || undefined)
        setNote('')
        setFile(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            const maxHeight = 200 // Maximum height in pixels
            const scrollHeight = textareaRef.current.scrollHeight
            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
        }
    }, [note])

    return (
        <div className="sticky bottom-0 left-0 right-0 bg-stone-100 dark:bg-[#0A1535] border-t border-stone-300/50 dark:border-white/10">
            <div className="max-w-3xl mx-auto py-4 px-4">
                {file && (
                    <div className="flex items-center justify-between bg-stone-200/50 dark:bg-[#0F1F4A] py-2 px-3 rounded-md mb-2 text-sm text-stone-600 dark:text-[#AEB9E1]">
                        <span className="truncate">{file.name}</span>
                        <button onClick={() => setFile(null)}>
                            <FiX className="text-stone-500 hover:text-stone-700 dark:hover:text-[#AEB9E1]" />
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="relative">
                    <div className="relative flex items-center">
                        <label className="absolute left-3 cursor-pointer text-stone-500 hover:text-stone-700 dark:hover:text-[#AEB9E1]">
                            <FiPlus className="text-xl" />
                            <input
                                type="file"
                                className="hidden" 
                                onChange={handleFileChange}
                                accept=".pdf"
                            />
                        </label>
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message..."
                            className="w-full resize-none rounded-lg border border-stone-300/50 dark:border-white/10 bg-white/70 dark:bg-[#0F1F4A] text-stone-950 dark:text-white/80 py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-[#2563EB] overflow-hidden"
                            style={{ maxHeight: '200px' }}
                            disabled={isLoading || disabled}
                        />
                        <div className="absolute right-2 bottom-2">
                            <button
                                type="submit"
                                disabled={!note.trim() && !file || isLoading || disabled}
                                className={`p-2 rounded-md ${
                                    (note.trim() || file) && !isLoading && !disabled
                                        ? 'bg-stone-700 text-white hover:bg-stone-800 dark:bg-[#2563EB] dark:hover:bg-[#1E3A8A]'
                                        : 'bg-stone-200 dark:bg-[#0F1F4A] text-stone-400 dark:text-stone-500'
                                } transition-colors`}
                            >
                                <FiSend className={`text-xl ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
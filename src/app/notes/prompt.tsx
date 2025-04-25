'use client'

import { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'

interface PromptProps {
    onSubmit: (note: string) => void;
    isLoading?: boolean;
}

export function Prompt({ onSubmit, isLoading = false }: PromptProps) {
    const [note, setNote] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!note.trim()) return
        onSubmit(note)
        setNote('')
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
                <form onSubmit={handleSubmit} className="relative">
                    <div className="relative flex items-center">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type something to get summary..."
                            className="w-full resize-none rounded-lg border border-stone-300/50 dark:border-white/10 bg-white/70 dark:bg-[#0F1F4A] text-stone-950 dark:text-white/80 py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-[#2563EB] overflow-hidden"
                            style={{ maxHeight: '200px' }}
                            disabled={isLoading}
                        />
                        <div className="absolute right-2 bottom-2">
                            <button
                                type="submit"
                                disabled={!note.trim() || isLoading}
                                className={`p-2 rounded-md ${
                                    note.trim() && !isLoading
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
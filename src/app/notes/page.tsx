'use client'

import { useState } from 'react'
import { Prompt } from './prompt'

export default function NotesPage() {
    const [noteHistory, setNoteHistory] = useState<string[]>([]) // placeholder for real content

    return (
        <div className="relative h-screen flex flex-col bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 rounded-lg p-4 border border-stone-300/50 dark:border-white/10">
            <div className="flex-grow overflow-y-auto">
                {noteHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 dark:text-[#AEB9E1]">
                        {/* <img src="/empty-state.svg" alt="No notes" className="w-40 mb-4 opacity-80" /> */}
                        <h2 className="text-lg font-medium mb-2">No notes summarized yet</h2>
                        <p className="text-sm">Type a message or upload a file to summarize your notes.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 py-4">
                        {noteHistory.map((note, i) => (
                            <div
                                key={i}
                                className="max-w-prose bg-white/70 dark:bg-[#0B1739] px-4 py-3 rounded-md border border-stone-300/50 dark:border-white/10 text-sm text-stone-950 dark:text-white/80"
                            >
                                {note}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Prompt
                onSubmit={(note) => {
                    if (!note.trim()) return
                    setNoteHistory((prev) => [...prev, note])
                }}
            />
        </div>
    )
}
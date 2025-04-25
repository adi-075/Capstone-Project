'use client'

import { useState } from 'react'
import { Prompt } from './prompt'
import { createClient } from '@/app/utils/supabase/client'
import ReactMarkdown from 'react-markdown'

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function NotesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (content: string, file?: File) => {
        if (!content.trim() && !file) return

        try {
            setIsLoading(true)
            // Add user message
            setMessages(prev => [...prev, { 
                role: 'user', 
                content: file ? `[PDF: ${file.name}] ${content}` : content 
            }])

            // Get user's session
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                throw new Error('Not authenticated')
            }

            // Prepare form data
            const formData = new FormData()
            if (content.trim()) {
                formData.append('message', content)
            }
            if (file) {
                formData.append('file', file)
            }

            // Call OpenAI API
            const response = await fetch('/api/openai', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorText = await response.text()
                try {
                    const errorData = JSON.parse(errorText)
                    throw new Error(errorData.error || 'Failed to get response from OpenAI')
                } catch {
                    throw new Error(`Server error: ${response.status}`)
                }
            }

            const data = await response.json()
            
            // Add assistant message
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
        } catch (error) {
            console.error('Error:', error)
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.' 
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative h-screen flex flex-col bg-stone-100 dark:bg-[#0A1535]">
            <div className="flex-grow overflow-y-auto">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 dark:text-[#AEB9E1]">
                        <h2 className="text-2xl font-medium mb-2">How can I help you today?</h2>
                        <p className="text-sm">Type a message or upload a PDF file to get started.</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {messages.map((message, i) => (
                            <div
                                key={i}
                                className={`py-6 px-4 ${
                                    message.role === 'user' 
                                        ? 'bg-stone-100 dark:bg-[#0A1535]' 
                                        : 'bg-stone-50 dark:bg-[#0F1F4A]'
                                }`}
                            >
                                <div className="max-w-3xl mx-auto flex gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        message.role === 'user' 
                                            ? 'bg-stone-700 dark:bg-[#1E3A8A]' 
                                            : 'bg-stone-600 dark:bg-[#2563EB]'
                                    }`}>
                                        {message.role === 'user' ? 'U' : 'A'}
                                    </div>
                                    <div className="flex-1 text-stone-950 dark:text-white/90 prose dark:prose-invert max-w-none">
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Prompt
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    )
}
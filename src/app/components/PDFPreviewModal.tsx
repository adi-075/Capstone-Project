'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface PDFPreviewModalProps {
    pdfUrl: string
    onClose: () => void
}

export default function PDFPreviewModal({ pdfUrl, onClose }: PDFPreviewModalProps) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-6xl h-[95vh] bg-white dark:bg-[#0A1535] rounded-none shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-end px-4 border-b border-stone-200 dark:border-stone-800">
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        <X className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                    </button>
                </div>
                
                <div className="h-full pt-12">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-200 dark:border-stone-800 border-t-stone-500 dark:border-t-stone-400"></div>
                        </div>
                    )}
                    <iframe
                        src={`${pdfUrl}#toolbar=0`}
                        className="w-full h-full"
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
            </div>
        </div>
    )
} 
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Plus } from 'lucide-react'
import PDFPreviewModal from '../components/PDFPreviewModal'

interface PDFFile {
    name: string
    path: string
    size: number
    lastModified: string
}

export default function NotesPage() {
    const [pdfs, setPdfs] = useState<PDFFile[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null)

    useEffect(() => {
        const fetchPDFs = async () => {
            try {
                const response = await fetch('/api/pdfs')
                if (!response.ok) {
                    throw new Error('Failed to fetch PDFs')
                }
                const data = await response.json()
                setPdfs(data)
            } catch (error) {
                console.error('Error fetching PDFs:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPDFs()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-600 dark:border-stone-400"></div>
            </div>
        )
    }

    return (
        <div className='bg-white dark:bg-[#101935] rounded-lg shadow p-2 border border-stone-300 dark:border-white/10'>
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-stone-900 dark:text-white">My Notes</h1>
                    <Link 
                        href="/notes/ai"
                        className="flex items-center gap-2 px-4 py-2 bg-stone-700 dark:bg-[#1E3A8A] text-white rounded-lg hover:bg-stone-800 dark:hover:bg-[#1E40AF] transition-colors"
                    >
                        <Plus size={20} />
                        New Note with AI
                    </Link>
                </div>

                {pdfs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-stone-500 dark:text-stone-400">No PDF notes yet. Create your first note with AI!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pdfs.map((pdf) => (
                            <div 
                                key={pdf.name}
                                onClick={() => setSelectedPDF(pdf)}
                                className="bg-white dark:bg-[#101935] rounded-lg shadow p-4 border border-stone-300 dark:border-white/10 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-stone-100 dark:bg-[#1E3A8A] rounded-lg">
                                        <FileText className="w-6 h-6 text-stone-700 dark:text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-stone-900 dark:text-white mb-2 line-clamp-1">
                                            {pdf.name}
                                        </h2>
                                        <div className="text-sm text-stone-500 dark:text-stone-400">
                                            <p>Size: {(pdf.size / 1024).toFixed(2)} KB</p>
                                            <p>Last modified: {new Date(pdf.lastModified).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedPDF && (
                <PDFPreviewModal
                    pdfUrl={selectedPDF.path}
                    onClose={() => setSelectedPDF(null)}
                />
            )}
        </div>
    )
}
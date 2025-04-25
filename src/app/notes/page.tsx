'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Filter, FolderIcon, X, ArrowUpDown } from 'lucide-react'
import PDFPreviewModal from '../components/PDFPreviewModal'

interface PDFFile {
    name: string
    path: string
    size: number
    lastModified: string
}

type SortOption = 'name' | 'date' | 'size';
type SortDirection = 'asc' | 'desc';

export default function NotesPage() {
    const [pdfs, setPdfs] = useState<PDFFile[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null)
    const [showFilterMenu, setShowFilterMenu] = useState(false)
    const [sortBy, setSortBy] = useState<SortOption>('date')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

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

    // Sort PDFs based on current sort criteria
    const sortedPDFs = [...pdfs].sort((a, b) => {
        if (sortBy === 'name') {
            return sortDirection === 'asc' 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortBy === 'date') {
            return sortDirection === 'asc'
                ? new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
                : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        } else if (sortBy === 'size') {
            return sortDirection === 'asc'
                ? a.size - b.size
                : b.size - a.size;
        }
        return 0;
    });

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const setSortOption = (option: SortOption) => {
        if (sortBy === option) {
            toggleSortDirection();
        } else {
            setSortBy(option);
            setSortDirection('desc');
        }
        setShowFilterMenu(false);
    };

    const getSortLabel = () => {
        switch (sortBy) {
            case 'name': return 'Name';
            case 'date': return 'Date modified';
            case 'size': return 'Size';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-600 dark:border-stone-400"></div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">Folders</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <Filter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <Link 
                        href="/notes/ai"
                        className="flex items-center gap-2 px-4 py-2 bg-stone-700 dark:bg-blue-700 text-white rounded-md hover:bg-stone-800 dark:hover:bg-blue-800 transition-colors"
                    >
                        <Plus size={18} />
                        Chat with AI
                    </Link>
                </div>
            </header>

            {/* Main content with navigation tabs */}
            <div className="px-4 py-3">
                {/* Navigation tabs */}
                <div className="flex items-center space-x-6 mb-6 pb-2 overflow-x-auto">
                    <div className="flex flex-col items-center">
                        <div className="text-sm font-medium text-gray-800 dark:text-white">All</div>
                        <div className="mt-1 h-1 w-8 bg-blue-500 rounded-full"></div>
                    </div>
                </div>

                {/* Folder grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedPDFs.map((pdf, index) => {
                        // Generate a random color for the folder accent
                        const colors = ["bg-blue-500", "bg-yellow-500", "bg-green-500", "bg-red-500", "bg-purple-500"];
                        const colorIndex = index % colors.length;
                        const folderColor = colors[colorIndex];
                        
                        return (
                            <div 
                                key={pdf.name}
                                onClick={() => setSelectedPDF(pdf)}
                                className="cursor-pointer"
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className={`h-2 ${folderColor}`}></div>
                                    <div className="p-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {pdf.name.replace('.pdf', '')}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {new Date(pdf.lastModified).toLocaleDateString()}
                                        </div>
                                        {sortBy === 'size' && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {(pdf.size / 1024).toFixed(1)} KB
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {sortedPDFs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="text-gray-400 dark:text-gray-500 mb-3">
                            <FolderIcon size={48} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            No folders yet. Create your first folder!
                        </p>
                    </div>
                )}
            </div>

            {/* Sort by indicator */}
            <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="fixed bottom-6 right-6 z-10 flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 border border-gray-200 dark:border-gray-700"
            >
                <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">{getSortLabel()}</span>
                <span className="ml-1 text-gray-500">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
            </button>

            {/* Filter menu */}
            {showFilterMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-20 flex items-end justify-center md:items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-t-lg md:rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sort by</h3>
                            <button onClick={() => setShowFilterMenu(false)}>
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setSortOption('name')}
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${sortBy === 'name' ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                                >
                                    <span className={`font-medium ${sortBy === 'name' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>Name</span>
                                    {sortBy === 'name' && (
                                        <ArrowUpDown className={`w-4 h-4 text-blue-600 dark:text-blue-400`} />
                                    )}
                                </button>
                                
                                <button 
                                    onClick={() => setSortOption('date')}
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${sortBy === 'date' ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                                >
                                    <span className={`font-medium ${sortBy === 'date' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>Date modified</span>
                                    {sortBy === 'date' && (
                                        <ArrowUpDown className={`w-4 h-4 text-blue-600 dark:text-blue-400`} />
                                    )}
                                </button>
                                
                                <button 
                                    onClick={() => setSortOption('size')}
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${sortBy === 'size' ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                                >
                                    <span className={`font-medium ${sortBy === 'size' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>Size</span>
                                    {sortBy === 'size' && (
                                        <ArrowUpDown className={`w-4 h-4 text-blue-600 dark:text-blue-400`} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedPDF && (
                <PDFPreviewModal
                    pdfUrl={selectedPDF.path}
                    onClose={() => setSelectedPDF(null)}
                />
            )}
        </div>
    )
}
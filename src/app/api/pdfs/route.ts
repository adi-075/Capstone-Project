import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'pdfs')
        
        // Check if directory exists
        if (!fs.existsSync(uploadsDir)) {
            return NextResponse.json([])
        }

        // Read directory contents
        const files = fs.readdirSync(uploadsDir)
        
        // Filter and map PDF files
        const pdfFiles = files
            .filter(file => file.toLowerCase().endsWith('.pdf'))
            .map(file => {
                const filePath = path.join(uploadsDir, file)
                const stats = fs.statSync(filePath)
                
                return {
                    name: file,
                    path: `/uploads/pdfs/${file}`,
                    size: stats.size,
                    lastModified: stats.mtime.toISOString()
                }
            })

        return NextResponse.json(pdfFiles)
    } catch (error) {
        console.error('Error reading PDF files:', error)
        return NextResponse.json(
            { error: 'Failed to read PDF files' },
            { status: 500 }
        )
    }
} 
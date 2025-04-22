import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Add route configuration
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Maximum content length for free tier
// const MAX_CONTENT_LENGTH = 10000;

export async function POST(request: Request) {
    try {
        // Check API key
        if (!apiKey) {
            console.error('GEMINI_API_KEY is missing');
            return NextResponse.json(
                { error: 'Gemini API key is not configured' },
                { status: 500 }
            );
        }

        // Parse form data
        const formData = await request.formData();
        const message = formData.get('message') as string;
        const file = formData.get('file') as File | null;

        console.log('Received request:', { 
            hasMessage: !!message, 
            hasFile: !!file,
            fileType: file?.type 
        });

        if (!message && !file) {
            return NextResponse.json(
                { error: 'No message or file provided' },
                { status: 400 }
            );
        }

        let content = message || '';

        // Handle PDF file if present
        if (file) {
            if (file.type !== 'application/pdf') {
                return NextResponse.json(
                    { error: 'Only PDF files are supported' },
                    { status: 400 }
                );
            }

            try {
                console.log('Processing PDF file:', file.name);
                // For now, we'll just acknowledge the PDF file
                content = `I received a PDF file named "${file.name}". Currently, PDF processing is under development. Please try again later or send a text message instead.`;
                console.log('PDF processing message sent');
            } catch (error) {
                console.error('Error handling PDF:', error);
                return NextResponse.json(
                    { error: 'Failed to process PDF file' },
                    { status: 400 }
                );
            }
        }

        // Generate content with Gemini
        try {
            console.log('Sending request to Gemini API');
            const result = await model.generateContent(content);
            const response = await result.response;
            const text = response.text();
            console.log('Received response from Gemini API');

            return NextResponse.json({ response: text });
        } catch (error) {
            console.error('Gemini API Error:', error);
            return NextResponse.json(
                { error: 'Failed to generate response from Gemini API' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

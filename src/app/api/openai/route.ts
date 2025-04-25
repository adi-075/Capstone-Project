import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI API
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error('OPENAI_API_KEY is not configured in environment variables');
}

const openai = new OpenAI({
    apiKey: apiKey,
});

// Add route configuration
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // Check API key
        if (!apiKey) {
            console.error('OPENAI_API_KEY is missing');
            return NextResponse.json(
                { error: 'OpenAI API key is not configured' },
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

        // Generate content with OpenAI
        try {
            console.log('Sending request to OpenAI API');
            const completion = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [
                    {
                        role: "system",
                        content: "Summarize the following student notes clearly and concisely. Preserve the original meaning and intent while removing any redundancy or informal language. Structure the summary in a coherent, academic tone suitable for formal documentation. Ensure all essential elements are retained to support understanding for someone unfamiliar with the source material."
                    },
                    {
                        role: "user",
                        content: content
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000,
            });

            const response = completion.choices[0].message.content;
            console.log('Received response from OpenAI API');

            return NextResponse.json({ response });
        } catch (error) {
            console.error('OpenAI API Error:', error);
            return NextResponse.json(
                { error: 'Failed to generate response from OpenAI API' },
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
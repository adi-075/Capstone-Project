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

        // Parse request body
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'No message provided' },
                { status: 400 }
            );
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
                        content: message
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
// Use environment variables for deployment URLs
const getBaseUrl = () => {
  // For Netlify and Vercel deployment
  if (process.env.NETLIFY || process.env.VERCEL) {
    return process.env.URL || '';   
  }
  // For local development
  return process.env.API_URL || 'http://localhost:3000';
};

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const baseUrl = getBaseUrl();
    // Always use absolute URLs for server-side fetch
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            // Add cache: 'no-store' for dynamic data
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
} 
 

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
    method: HttpMethod;
    headers?: HeadersInit;
    body?: BodyInit;
}

export async function hit(url: string, options: RequestOptions = { method: "GET"}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
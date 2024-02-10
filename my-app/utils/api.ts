import { notFound } from "next/navigation";


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestOptions extends RequestInit {
    method: HttpMethod;
    headers?: HeadersInit;
    body?: BodyInit | null
}

export async function hit(url: string, options: ApiRequestOptions = { method: "GET" }) {
    try {
        const response = await fetch(url, options);

        const data = await response.json();
        return { data, serverRes: response };
    } catch (error: any) {
          
        console.error('Error:', error.message);
        throw error;
    }
}


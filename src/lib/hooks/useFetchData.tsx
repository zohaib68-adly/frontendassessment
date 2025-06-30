import { useState } from 'react';

interface UseFetchDataReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (url: string) => void;
    setData: (data: T) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: string | FormData | Blob | ArrayBuffer | Record<string, unknown>;
    fetchOnMount?: boolean;
}

export function useFetchData<T = unknown>(
): UseFetchDataReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url: string, options?: FetchOptions) => {
        if (!url) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: options?.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...(options?.body && { body: JSON.stringify(options.body) }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };



  

    return {
        data,
        loading,
        error,
        fetchData,
        setData,
        setLoading,
        setError
    };
}

export default useFetchData;

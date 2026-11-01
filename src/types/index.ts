export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}


export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface LoaderOptions {
    apiKey: string;
    sources: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<LoaderOptions>;
}

export type Callback<T> = (data: T) => void;
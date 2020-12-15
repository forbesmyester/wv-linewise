import { WvLinewise } from "./wv-linewise";
export declare class WvLinewiseResponse implements Response {
    readonly url: string;
    private readonly resp_text;
    readonly status: number;
    readonly ok: boolean;
    headers: Headers;
    readonly redirected = false;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    constructor(url: string, resp_text: string, status: number, headers: {
        [k: string]: string;
    });
    clone(): Response;
    json(): Promise<any>;
    text(): Promise<string>;
    private getStatusText;
}
export interface WvLinewiseRequest {
    opts: RequestInit;
    url: string;
    id: number;
}
export interface WvLinewiseFetchCurrent {
    id: number;
    status?: number;
    headers?: {
        [k: string]: string;
    };
    body?: string[];
    end?: boolean;
}
export declare function getWvLinewiseFetch(wvl: WvLinewise, responseStream: string): {
    (url: string, opts: RequestInit): Promise<Response>;
    request: (url: string, opts: RequestInit) => WvLinewiseRequest;
    serialize: (request: WvLinewiseRequest) => string;
    process: () => Promise<boolean>;
    parse: (current: WvLinewiseFetchCurrent, command: string, lineStripped: string) => WvLinewiseFetchCurrent;
    pendingCount(): number;
};
export declare function getWvLinewiseManagedFetch(wvl: WvLinewise, responseStream: string, getTimeout: (n: number) => number): {
    (url: string, opts: RequestInit): Promise<Response>;
    running(): boolean;
};

import { WvLinewiseBuffer } from "./wv-linewise-buffer";
import { WvLinewise } from "./wv-linewise";

interface ZZZ { [k: string]: any }

class WvHeaders implements Headers, ZZZ {
    [k: string]: any; 
    append(_name: string, _value: string) { throw new Error("Not Implemented"); }
    delete(_name: string) { throw new Error("Not Implemented"); }
    get(name: string) {
        if (this.hasOwnProperty(name)) {
            return (this[name] as string);
        }
        return null;
    }
    has(name: string) { return this.hasOwnProperty(name); }
    set(_name: string, _value: string) { throw new Error("Not Implemented"); }
    forEach(callbackfn: (this: Headers, value: string, key: string, parent: Headers) => void, thisArg?: any) {
        let x: Headers = this;
        Object.getOwnPropertyNames(this).forEach(
            (k) => {
                let v: string | null = x.get(k);
                if (typeof v === 'string') {
                    callbackfn.call(thisArg || x, v, k, x);
                }
            },
            {}
        );
    }
    constructor(kv: { [k: string]: string }) {
        Object.getOwnPropertyNames(kv).forEach((k) => {
            this[k] = kv[k];
        });
    }
}


export class WvLinewiseResponse implements Response {

    public readonly ok: boolean;
    public headers: Headers;
    public readonly redirected = false;
    public readonly statusText: string;
    public readonly trailer: Promise<Headers> = Promise.resolve(new WvHeaders({}));
    public readonly type: ResponseType = "basic";

    readonly body: ReadableStream<Uint8Array> | null = null;
    readonly bodyUsed: boolean = true;
    arrayBuffer(): Promise<ArrayBuffer> { throw new Error("WvLinewiseResponse: Unimplemented: arrayBuffer()"); }
    blob(): Promise<Blob> { throw new Error("WvLinewiseResponse: Unimplemented: blob()"); }
    formData(): Promise<FormData> { throw new Error("WvLinewiseResponse: Unimplemented: formData()"); }

    constructor(public readonly url: string, private readonly resp_text: string, public readonly status: number, headers: { [k: string]: string }) {
        this.ok = (status >= 200) && (status < 300);
        this.statusText = this.getStatusText(status);
        this.headers = new WvHeaders(headers);
    }

    clone(): Response {
        let headers: { [k: string]: string } = {};
        Object.getOwnPropertyNames(this.headers).forEach((k) => {
            headers[k + ""] = headers[k] + "";
        });
        return new WvLinewiseResponse(
            this.url + "",
            this.resp_text + "",
            this.status,
            headers
        );
    }

    json(): Promise<any> { return JSON.parse(this.resp_text); }

    text(): Promise<string> { return Promise.resolve(this.resp_text); }

    private getStatusText(n: number): string {
        const statuses: { [k: string]: number } = {
            CONTINUE: 100,
            SWITCHING_PROTOCOLS: 101,
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NON_AUTHORITATIVE_INFORMATION: 203,
            NO_CONTENT: 204,
            RESET_CONTENT: 205,
            PARTIAL_CONTENT: 206,
            MULTIPLE_CHOICES: 300,
            MOVED_PERMANENTLY: 301,
            FOUND: 302,
            SEE_OTHER: 303,
            NOT_MODIFIED: 304,
            USE_PROXY: 305,
            TEMPORARY_REDIRECT: 307,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAYMENT_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            NOT_ACCEPTABLE: 406,
            PROXY_AUTHENTICATION_REQUIRED: 407,
            REQUEST_TIMEOUT: 408,
            CONFLICT: 409,
            GONE: 410,
            LENGTH_REQUIRED: 411,
            PRECONDITION_FAILED: 412,
            REQUEST_ENTITY_TOO_LARGE: 413,
            REQUEST_URI_TOO_LONG: 414,
            UNSUPPORTED_MEDIA_TYPE: 415,
            REQUESTED_RANGE_NOT_SATISFIABLE: 416,
            EXPECTATION_FAILED: 417,
            UNPROCESSABLE_ENTITY: 422,
            TOO_MANY_REQUESTS: 429,
            INTERNAL_SERVER_ERROR: 500,
            NOT_IMPLEMENTED: 501,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503,
            GATEWAY_TIMEOUT: 504,
            HTTP_VERSION_NOT_SUPPORTED: 505,
        };

        for (let [k, v] of Object.entries(statuses)) {
            if (v == n) {
                return k;
            }
        }
        throw new Error("Status code " + n + " not expected");
    }

}


export interface WvLinewiseRequest {
    opts: RequestInit;
    url: string;
    id: number;
}


export interface WvLinewiseFetchCurrent {
    id: number;
    status?: number;
    headers?: { [k: string]: string }
    body?: string[];
    end?: boolean;
}


export function getWvLinewiseFetch(wvl: WvLinewise, responseStream: string) {

    interface PromStruct {
        resolve: (x: WvLinewiseResponse) => void;
        reject: (e: Error) => void;
        url: string;
    };

    let id = 1;
    let wvlBuffer = new WvLinewiseBuffer(wvl, responseStream, 16, 32);
    let requestOffset = 1;
    let promises: (null|PromStruct)[] = [];
    let currents: Map<number, WvLinewiseFetchCurrent> = new Map();
    const mainRegex = /^RESPONSE\: *([0-9]+)\: *([A-Z]{2,12})\:?/;

    function wvLinewiseFetch(url: string, opts: RequestInit): Promise<Response> {
        wvl.out(wvLinewiseFetchSerialize(wvLinewiseFetchRequest(url, opts)));
        let r = new Promise((resolve: (x: WvLinewiseResponse) => void, reject) => {
            promises.push({ resolve, reject, url });
        });
        return r;
    }

    function stripCommand(m: RegExpMatchArray, line: string): string {
        line = line.substr(m[0].length);
        return line;
    }

    function stripPreWhitespace(line: string) {
        while ((line.length) && ((line[0] == ' ') || (line[0] == "\t"))) {
            line = line.substr(1);
        }
        return line;
    }

    function wvLinewiseFetchParseLine(current: WvLinewiseFetchCurrent, command: string, lineStripped: string): WvLinewiseFetchCurrent {

        if (command == 'END') {
            return { ...current, end: true, body: current.body || [], headers: current.headers || {} };
        }

        if (command == 'STATUS') {
            if (!current.hasOwnProperty('body')) {
                current.body = [];
            }
            lineStripped = stripPreWhitespace(lineStripped);
            let n = parseInt(lineStripped, 10);
            if (isNaN(n)) { throw new Error(`wvLinewiseFetchParseLine: Id ${lineStripped} is not an integer`); }
            return { ...current, status: n }
        }

        if (command == 'BODY') {
            if (!current.hasOwnProperty('body')) {
                current.body = [];
            }
            return { ...current, body: [...current.body || []].concat([lineStripped]) };
        }

        if (command == 'HEADERS') {
            let c = {...current};
            c.headers = c.headers || {};
            let parsed: {[k: string]: any} = {};
            try {
                parsed = JSON.parse(stripPreWhitespace(lineStripped));
            } catch (e) {
                throw new Error(`wvLinewiseFetchParseLine: HEADERS supplied must be in JSON: '${lineStripped}'`);
            }
            for (let [k, v] of Object.entries(parsed)) {
                c.headers["" + k] = "" + v;
            }
            return c;
        }
        throw new Error(`wvLinewiseFetchParseLine: Line not recognized: '${lineStripped}' '${command}'`);
    }


    function extractFromLine(line: string): { n: number, command: string, lineStripped: string } {
        const m = line.match(mainRegex);
        if (!m) { throw new Error("wvLinewiseFetchParseLine: Invalid line: " + line); }

        const n = parseInt(m[1], 10);
        if (isNaN(n)) { throw new Error(`wvLinewiseFetchParseLine: Id ${line} is not an integer`); }
        if ((n < requestOffset) || (n > requestOffset + promises.length)) {
            throw new Error(`wvLinewiseFetchParseLine: Id ${line} was not expected`);
        }
        return { n, command: stripPreWhitespace(m[2]), lineStripped: line.substr(m[0].length) };
    }


    function initializeAndReturn(n: number): WvLinewiseFetchCurrent {

        const r = currents.get(n);
        if (r) {
            return r;
        }

        const current = { id: n };
        currents.set(n, current);
        return current;

    }

    async function wvLinewiseFetchProcess(): Promise<boolean> {
        let line = await wvlBuffer.shift();
        if (line === null) { return false; }
        const { n, command, lineStripped } = extractFromLine(line);
        let current = initializeAndReturn(n);
        current = wvLinewiseFetchParseLine(current, command, lineStripped);
        if (current.end) {
            let index = (current.id || 0) - requestOffset;
            let ps = promises[index];
            if (ps === null) {
                throw new Error(`wvLinewiseFetchProcess: The promise at index ${index} seems to have been already used!`);
            }
            let resolve = ps.resolve;
            let url = ps.url;
            promises[index] = null;
            while (promises.length && (promises[0] === null)) {
                promises.shift();
                requestOffset = requestOffset + 1;
            }
            let { body, status, headers } = current;
            resolve(new WvLinewiseResponse(url, (body || []).join("\n"), status || 200, headers || {}));
            currents.delete(current.id as number);
        }
        currents.set(current.id, current);
        return true;
    }

    function wvLinewiseFetchRequest(url: string, opts: RequestInit): WvLinewiseRequest {
        return { id: id++, url, opts };
    }

    function wvLinewiseFetchSerialize(request: WvLinewiseRequest): string {
        let m = (request.opts.method || 'GET').toUpperCase();
        return `REQUEST: ${request.id}: ${m}: ${request.url} ${request.opts.body || '{}'}`;
    }

    wvLinewiseFetch.request = wvLinewiseFetchRequest;
    wvLinewiseFetch.serialize = wvLinewiseFetchSerialize;
    wvLinewiseFetch.process = wvLinewiseFetchProcess;
    wvLinewiseFetch.parse = wvLinewiseFetchParseLine;
    wvLinewiseFetch.pendingCount = function wvLinewiseFetchPendingCount() {
        return promises.length;
    };
    return wvLinewiseFetch;
}


export function getWvLinewiseManagedFetch(wvl: WvLinewise, responseStream: string, getTimeout: (n: number) => number) {

    let wvLinewiseFetch = getWvLinewiseFetch(wvl, responseStream);
    let processing = false;
    let running: null | NodeJS.Timeout = null;
    let backoffNumber = 0;

    function delay(n: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), n);
        });
    }

    async function looper() {
        backoffNumber = 0;
        if (processing) {
            return
        }
        processing = true;
        if ((await wvLinewiseFetch.process()) == true) {
            backoffNumber = 0;
        }
        await delay(getTimeout(backoffNumber));
        backoffNumber = backoffNumber + 1;
        processing = false;
    }

    function end() {
        if (wvLinewiseFetch.pendingCount() == 0) {
            running && clearInterval(running);
            running = null;
        }
    }

    async function wvLinewiseManagedFetch(url: string, opts: RequestInit): Promise<Response> {
        if (!running) {
            let rp = wvLinewiseFetch(url, opts);
            running = setInterval(looper, 10);
            let r = await rp;
            end();
            return r;
        }
        backoffNumber = 0;
        let r = await wvLinewiseFetch(url, opts);
        end();
        return r;
    }

    wvLinewiseManagedFetch.running = function() {
        return running !== null;
    }


    return wvLinewiseManagedFetch;
}

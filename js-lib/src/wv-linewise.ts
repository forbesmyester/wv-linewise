/**
 * Communication from the web-view to WV Linewise is sent via a Request and responeded to via a {@link Response}
 */
export type Request = StreamStartRequest | StreamContinueRequest | ParamsRequest | OutRequest | ExitRequest | StreamListRequest;


/**
 * Every {@link Request} includes a `msg` which will from this enum.
 */
export enum REQUEST_TYPE {
    EXIT = "exit",
    STREAM_LIST = "streamList",
    STREAM_START = "streamStart",
    STREAM_CONTINUE = "streamContinue",
    PARAMS = "params",
    OUT = "out",
}

/**
 * {@link Request} to start a named stream.
 */
export interface StreamStartRequest {
    msg: REQUEST_TYPE.STREAM_START,
    /** The name of the stream to start */
    name: string,
    /** How many lines to read before the stream is {@link PausedResponse} */
    count: number,
}

/**
 * {@link Request} that the program exits (and the web view is closed).
 */
export interface ExitRequest {
    msg: REQUEST_TYPE.EXIT,
    /** This is the exit status returned to the software which started the webview, 0 is success */
    status: number,
}

/**
 * {@link Request} To get a list of streams.
 */
export interface StreamListRequest {
    msg: REQUEST_TYPE.STREAM_LIST,
}

/**
 * Once a stream has been started, then {@link PausedResponse} because
 * {@link StreamStartRequest.count} lines had been read you can restart it with
 * this {@link Request}
 */
export interface StreamContinueRequest {
    msg: REQUEST_TYPE.STREAM_CONTINUE,
    name: string,
}

/**
 * {@link Request} the command line parameters passed in when starting the wv-linewise
 */
export interface ParamsRequest {
    msg: REQUEST_TYPE.PARAMS,
}

/**
 * Used by {@link OutRequest} to control which UNIX stream to write to.
 */
export enum OUT_REQUEST_DESCRIPTOR {
    STDOUT = 1,
    STDERR = 2,
    DESCRIPTOR_3 = 3,
    DESCRIPTOR_4 = 4,
    DESCRIPTOR_5 = 5,
    DESCRIPTOR_6 = 6,
    DESCRIPTOR_7 = 7,
    DESCRIPTOR_8 = 8,
    DESCRIPTOR_9 = 9,
}

/**
 * {@link Request} that wv-linewise send {@link OutRequest.data} to
 * {@link OutRequest.descriptor} so it can be picked up by other programs
 * further down the pipeline.
 */
export interface OutRequest {
    msg: REQUEST_TYPE.OUT,
    descriptor: OUT_REQUEST_DESCRIPTOR,
    data: string,
}

/**
 * Communication from the WV Linewise to the webview, usually in response to a {@link Request} is sent via a Response.
 */
export type Response = ParamsResponse | PausedResponse | FinishedResponse | DetailsResponse | LineResponse | MessageErrorResponse | ErrorResponse | StreamListResponse;

/**
 * Every {@link Response} includes a `type` which will from this enum.
 */
export enum RESPONSE_TYPE {
    PARAMS = 'params',
    LINE = 'line',
    STREAM_LIST = 'streamList',
    DETAILS = 'details',
    FINISHED = 'finished',
    PAUSED = 'paused',
    ERROR = 'error',
    MESSAGE_ERROR = 'messageError',
}

/**
 * This is a key/value pair which is embedded in a {@link ParamsResponse}.
 */
export interface Param {
    name: string,
    value: string,
}

/**
 * The parameters that were passed to WV Linewise, perhaps in BASH when it was started.
 */
export interface ParamsResponse {
    type: RESPONSE_TYPE.PARAMS,
    params: Param[],
}

/**
 * A list of streams, in response to a {@link StreamListRequest}
 */
export interface StreamListResponse {
    type: RESPONSE_TYPE.STREAM_LIST,
    streams: string[],
}

/**
 * After we have read {@link StreamStartRequest.count} lines we will
 * {@link PausedResponse}.
 *
 * To restart the stream use an {@link StreamContinueRequest}.
 */
export interface PausedResponse {
    type: RESPONSE_TYPE.PAUSED,
    name: string,
}

/**
 * The stream of data started via a {@link StreamStartRequest} may be infinate,
 * but it may also have an end. This marks the end.
 */
export interface FinishedResponse {
    type: RESPONSE_TYPE.FINISHED,
    name: string,
}

/**
 * Once a {@link StreamStartRequest} has been received, we will respond with
 * the details about that stream before sending {@link LineResponse}s.
 *
 * In future streams from files will likely be rewindable, but currently
 * {@link rewindable} is always false.
 */
export interface DetailsResponse {
    type: RESPONSE_TYPE.DETAILS,
    name: string,
    rewindable: boolean,
}

/**
 * Once a {@link StreamStartRequest} has been received this message will contain
 * the actual data from the file or STDIN.
 */
export interface LineResponse {
    type: RESPONSE_TYPE.LINE,
    name: string,
    data: string,
}

/**
 * This {@link Response} is sent after a {@link Request} is received that is
 * invalid.
 */
export interface MessageErrorResponse {
    type: RESPONSE_TYPE.MESSAGE_ERROR
    error: string,
}

/**
 * This {@link Response} is sent in response to errors which can be pinned down
 * to a specific stream, or a request to a non-existing stream.
 */
export interface ErrorResponse {
    type: RESPONSE_TYPE.ERROR
    error: string,
    name: string,
}

export interface ResponseDispatcher<Response> {
    (evt: Response): void,
}

export class RawWvLinewise {

    private respFnsOnce = {
        error: [] as ResponseDispatcher<ErrorResponse>[],
        messageError: [] as ResponseDispatcher<MessageErrorResponse>[],
        params: [] as ResponseDispatcher<ParamsResponse>[],
        streamList: [] as ResponseDispatcher<StreamListResponse>[],
        paused: [] as ResponseDispatcher<PausedResponse>[],
        details: [] as ResponseDispatcher<DetailsResponse>[],
        line: [] as ResponseDispatcher<LineResponse>[],
        finished: [] as ResponseDispatcher<FinishedResponse>[],
    }

    private respFns = {
        error: [] as ResponseDispatcher<ErrorResponse>[],
        messageError: [] as ResponseDispatcher<MessageErrorResponse>[],
        params: [] as ResponseDispatcher<ParamsResponse>[],
        streamList: [] as ResponseDispatcher<StreamListResponse>[],
        paused: [] as ResponseDispatcher<PausedResponse>[],
        details: [] as ResponseDispatcher<DetailsResponse>[],
        line: [] as ResponseDispatcher<LineResponse>[],
        finished: [] as ResponseDispatcher<FinishedResponse>[],
    }

    constructor(private external: { invoke: (e: string) => void }) {
        if (typeof window !== "undefined") {
            (window as any)._globalWvLinewise = (d: Response) => this.fire(d);
        }
    }

    private getResponseDispatcher<T extends Response>(e: T["type"]): ResponseDispatcher<T>[] {
        let r = this.respFns[e] as ResponseDispatcher<T>[];
        while (this.respFnsOnce[e].length) {
            r = r.concat([this.respFnsOnce[e].shift() as ResponseDispatcher<T>]);
        }
        return r;
    }

    protected fire(d: Response) {
        let fires = this.getResponseDispatcher(d.type);
        if (!fires.length) {
            return;
        }
        for (let i = 0; i < fires.length; i++) {
            fires[i].call(null, d);
        }
    }

    public request(j: Request) {
        this.external.invoke(JSON.stringify(j));
    }

    public on<T extends Response>(type: T["type"], f: ResponseDispatcher<T>) {
        (this.respFns[type] as ResponseDispatcher<T>[]).push(f);
    }

    public once<T extends Response>(type: T["type"], f: ResponseDispatcher<T>) {
        (this.respFnsOnce[type] as ResponseDispatcher<T>[]).push(f);
    }

    public clear<T extends Response>(type: T["type"]) {
        this.respFns[type] = [];
        this.respFnsOnce[type] = [];
    }

    public off<T extends Response>(type: T["type"], f: ResponseDispatcher<T>) {

        for (let i = this.respFns[type].length - 1; i >= 0; i--) {
            if (this.respFns[type][i] == f) {
                this.respFns[type].splice(i, 1);
            }
        }

        for (let i = this.respFnsOnce[type].length - 1; i >= 0; i--) {
            if (this.respFnsOnce[type][i] == f) {
                this.respFnsOnce[type].splice(i, 1);
            }
        }
    }

}

export class RawWvLinewiseMock extends RawWvLinewise {

    private streamData: Map<LineResponse["name"], LineResponse["data"][]> = new Map();
    private params: Param[] = [];
    private running: Set<StreamStartRequest["name"]> = new Set();
    private started: Set<StreamStartRequest["name"]> = new Set();
    private startedCounts: Map<LineResponse["name"], number> = new Map();

    constructor() {
        super({ invoke: (_s) => {} });
    }

    addStreamData(streamName: LineResponse["name"], data: LineResponse["data"][]) {
        if (!this.streamData.has(streamName)) {
            this.streamData.set(streamName, []);
        }
        this.streamData.set(streamName, (this.streamData.get(streamName) || []).concat(data));
    }

    addParam(name: Param["name"], value: Param["value"]) {
        this.params.push({ name, value });
    }

    start(name: string, count: number) {
        this.startedCounts.set(name, count);
        this.running.add(name);
        if (!this.started.has(name)) {
            this.fire({ name: name, rewindable: false, type: RESPONSE_TYPE.DETAILS });
            this.started.add(name);
        }
        let stream = this.streamData.get(name) || [];
        let lineNumber = 0;
        while ((lineNumber++ < count) && stream.length) {
            let line = stream.shift() as string;
            this.fire({ name: name, data: line, type: RESPONSE_TYPE.LINE });
        }
        this.running.delete(name);
        if (stream.length) {
            this.fire({ name: name, type: RESPONSE_TYPE.PAUSED });
        } else {
            this.fire({ name: name, type: RESPONSE_TYPE.FINISHED });
        }
    }

    async request(j: Request) {
        switch (j.msg) {
            case REQUEST_TYPE.EXIT:
                window.document.body.innerText = "EXIT DONE";
                break;
            case REQUEST_TYPE.STREAM_LIST:
                this.fire({ type: RESPONSE_TYPE.STREAM_LIST, streams: Array.from(this.streamData.keys()) });
                break;
            case REQUEST_TYPE.PARAMS:
                this.fire({ type: RESPONSE_TYPE.PARAMS, params: this.params });
                break;
            case REQUEST_TYPE.STREAM_CONTINUE:
                this.start(j.name, this.startedCounts.get(j.name) || 0);
                break;
            case REQUEST_TYPE.OUT:
                if (j.descriptor == 2) {
                    console.log(`STDERR: ${j.data}`);
                }
                if (j.descriptor == 1) {
                    console.log(`STDOUT: ${j.data}`);
                }
                if ((j.descriptor > 2) && (j.descriptor < 10)) {
                    console.log(`STD${j.descriptor}: ${j.data}`);
                }
                break;
            case REQUEST_TYPE.STREAM_START:
                if (!j.hasOwnProperty("name") || !j.hasOwnProperty("count")) {
                    return;
                }
                if (!this.streamData.has(j.name)) {
                    this.fire({ name: j.name, error: "No such stream", type: RESPONSE_TYPE.ERROR });
                    return;
                }
                if ((this.running.has(j.name)) || !this.streamData.has(j.name)) {
                    return;
                }
                this.start(j.name, j.count);
                break;
        }
    }

}

export class WvLinewise {

    constructor(public raw: RawWvLinewise) {
    }

    streamStart(streamName: string, count: number) {
        this.raw.request({msg: REQUEST_TYPE.STREAM_START, name: streamName, count });
    }

    streamContinue(streamName: string) {
        this.raw.request({msg: REQUEST_TYPE.STREAM_CONTINUE, name: streamName });
    }

    requestParams() {
        this.raw.request({msg: REQUEST_TYPE.PARAMS});
    }

    exit(status: number) {
        this.raw.request({ msg: REQUEST_TYPE.EXIT, status });
    }

    requestStreamList() {
        this.raw.request({ msg: REQUEST_TYPE.STREAM_LIST });
    }

    out(text: string, descriptor: OutRequest["descriptor"] = OUT_REQUEST_DESCRIPTOR.STDOUT) {
        this.raw.request({ msg: REQUEST_TYPE.OUT, descriptor, data: text });
    }

    public on<T extends Response>(type: T["type"], f: ResponseDispatcher<T>) {
        this.raw.on(type, f);
    }

    public once<T extends Response>(type: T["type"], f: ResponseDispatcher<T>) {
        this.raw.once(type, f);
    }

    public clear<T extends Response>(type: T["type"]) {
        this.raw.clear(type);
    }

    public off<T extends Response>(type: T["type"], f: ResponseDispatcher<T>) {
        this.raw.off(type, f);
    }

}

export function runningInWvLinewise(): boolean {

    if ((window as any).webkit && (window as any).webkit.messageHandlers && (window as any).webkit.messageHandlers.external && (window as any).webkit.messageHandlers.external.postMessage) {
        (window as any).external = {
            invoke: (e: string) => {
                (window as any).webkit.messageHandlers.external.postMessage(e);
            }
        };
        return true;
    }

    return !!((window as any).external && (window.external as any).invoke);
}

export function externalInvoke(e: any) {

    if ((window as any).webkit && (window as any).webkit.messageHandlers && (window as any).webkit.messageHandlers.external && (window as any).webkit.messageHandlers.external.postMessage) {
        return (window as any).webkit.messageHandlers.external.postMessage(e);
    }

    if ((window as any).external && (window.external as any).invoke) {
        return (window.external as any).invoke(e);
    }

    throw new Error("WV Linewise: Could not post message: " + JSON.stringify(e));
}


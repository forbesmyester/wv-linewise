/**
 * Communication from the web-view to WV Linewise is sent via a Request and responeded to via a {@link Response}
 */
export declare type Request = StreamStartRequest | StreamContinueRequest | ParamsRequest | OutRequest | ExitRequest | StreamListRequest;
/**
 * Every {@link Request} includes a `msg` which will from this enum.
 */
export declare enum REQUEST_TYPE {
    EXIT = "exit",
    STREAM_LIST = "streamList",
    STREAM_START = "streamStart",
    STREAM_CONTINUE = "streamContinue",
    PARAMS = "params",
    OUT = "out"
}
/**
 * {@link Request} to start a named stream.
 */
export interface StreamStartRequest {
    msg: REQUEST_TYPE.STREAM_START;
    /** The name of the stream to start */
    name: string;
    /** How many lines to read before the stream is {@link PausedResponse} */
    count: number;
}
/**
 * {@link Request} that the program exits (and the web view is closed).
 */
export interface ExitRequest {
    msg: REQUEST_TYPE.EXIT;
    /** This is the exit status returned to the software which started the webview, 0 is success */
    status: number;
}
/**
 * {@link Request} To get a list of streams.
 */
export interface StreamListRequest {
    msg: REQUEST_TYPE.STREAM_LIST;
}
/**
 * Once a stream has been started, then {@link PausedResponse} because
 * {@link StreamStartRequest.count} lines had been read you can restart it with
 * this {@link Request}
 */
export interface StreamContinueRequest {
    msg: REQUEST_TYPE.STREAM_CONTINUE;
    name: string;
}
/**
 * {@link Request} the command line parameters passed in when starting the wv-linewise
 */
export interface ParamsRequest {
    msg: REQUEST_TYPE.PARAMS;
}
/**
 * Used by {@link OutRequest} to control which UNIX stream to write to.
 */
export declare enum OUT_REQUEST_DESCRIPTOR {
    STDOUT = 1,
    STDERR = 2,
    DESCRIPTOR_3 = 3,
    DESCRIPTOR_4 = 4,
    DESCRIPTOR_5 = 5,
    DESCRIPTOR_6 = 6,
    DESCRIPTOR_7 = 7,
    DESCRIPTOR_8 = 8,
    DESCRIPTOR_9 = 9
}
/**
 * {@link Request} that wv-linewise send {@link OutRequest.data} to
 * {@link OutRequest.descriptor} so it can be picked up by other programs
 * further down the pipeline.
 */
export interface OutRequest {
    msg: REQUEST_TYPE.OUT;
    descriptor: OUT_REQUEST_DESCRIPTOR;
    data: string;
}
/**
 * Communication from the WV Linewise to the webview, usually in response to a {@link Request} is sent via a Response.
 */
export declare type Response = ParamsResponse | PausedResponse | FinishedResponse | DetailsResponse | LineResponse | MessageErrorResponse | ErrorResponse | StreamListResponse;
/**
 * Every {@link Response} includes a `type` which will from this enum.
 */
export declare enum RESPONSE_TYPE {
    PARAMS = "params",
    LINE = "line",
    STREAM_LIST = "streamList",
    DETAILS = "details",
    FINISHED = "finished",
    PAUSED = "paused",
    ERROR = "error",
    MESSAGE_ERROR = "messageError"
}
/**
 * This is a key/value pair which is embedded in a {@link ParamsResponse}.
 */
export interface Param {
    name: string;
    value: string;
}
/**
 * The parameters that were passed to WV Linewise, perhaps in BASH when it was started.
 */
export interface ParamsResponse {
    type: RESPONSE_TYPE.PARAMS;
    params: Param[];
}
/**
 * A list of streams, in response to a {@link StreamListRequest}
 */
export interface StreamListResponse {
    type: RESPONSE_TYPE.STREAM_LIST;
    streams: string[];
}
/**
 * After we have read {@link StreamStartRequest.count} lines we will
 * {@link PausedResponse}.
 *
 * To restart the stream use an {@link StreamContinueRequest}.
 */
export interface PausedResponse {
    type: RESPONSE_TYPE.PAUSED;
    name: string;
}
/**
 * The stream of data started via a {@link StreamStartRequest} may be infinate,
 * but it may also have an end. This marks the end.
 */
export interface FinishedResponse {
    type: RESPONSE_TYPE.FINISHED;
    name: string;
}
/**
 * Once a {@link StreamStartRequest} has been received, we will respond with
 * the details about that stream before sending {@link LineResponse}s.
 *
 * In future streams from files will likely be rewindable, but currently
 * {@link rewindable} is always false.
 */
export interface DetailsResponse {
    type: RESPONSE_TYPE.DETAILS;
    name: string;
    rewindable: boolean;
}
/**
 * Once a {@link StreamStartRequest} has been received this message will contain
 * the actual data from the file or STDIN.
 */
export interface LineResponse {
    type: RESPONSE_TYPE.LINE;
    name: string;
    data: string;
}
/**
 * This {@link Response} is sent after a {@link Request} is received that is
 * invalid.
 */
export interface MessageErrorResponse {
    type: RESPONSE_TYPE.MESSAGE_ERROR;
    error: string;
}
/**
 * This {@link Response} is sent in response to errors which can be pinned down
 * to a specific stream, or a request to a non-existing stream.
 */
export interface ErrorResponse {
    type: RESPONSE_TYPE.ERROR;
    error: string;
    name: string;
}
export interface ResponseDispatcher<Response> {
    (evt: Response): void;
}
export declare class RawWvLinewise {
    private external;
    private respFnsOnce;
    private respFns;
    constructor(external: {
        invoke: (e: string) => void;
    });
    private getResponseDispatcher;
    protected fire(d: Response): void;
    request(j: Request): void;
    on<T extends Response>(type: T["type"], f: ResponseDispatcher<T>): void;
    once<T extends Response>(type: T["type"], f: ResponseDispatcher<T>): void;
    clear<T extends Response>(type: T["type"]): void;
    off<T extends Response>(type: T["type"], f: ResponseDispatcher<T>): void;
}
export declare class RawWvLinewiseMock extends RawWvLinewise {
    private streamData;
    private params;
    private running;
    private started;
    private startedCounts;
    constructor();
    addStreamData(streamName: LineResponse["name"], data: LineResponse["data"][]): void;
    addParam(name: Param["name"], value: Param["value"]): void;
    start(name: string, count: number): Promise<void>;
    request(j: Request): Promise<void>;
}
export declare class WvLinewise {
    raw: RawWvLinewise;
    constructor(raw: RawWvLinewise);
    streamStart(streamName: string, count: number): void;
    streamContinue(streamName: string): void;
    requestParams(): void;
    exit(status: number): void;
    requestStreamList(): void;
    out(text: string, descriptor?: OutRequest["descriptor"]): void;
    on<T extends Response>(type: T["type"], f: ResponseDispatcher<T>): void;
    once<T extends Response>(type: T["type"], f: ResponseDispatcher<T>): void;
    clear<T extends Response>(type: T["type"]): void;
    off<T extends Response>(type: T["type"], f: ResponseDispatcher<T>): void;
}
export declare function runningInWvLinewise(): boolean;

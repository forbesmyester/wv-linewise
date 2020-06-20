import { WvLinewise } from "./wv-linewise";
export declare class WvLinewiseBuffer {
    private wvl;
    private streamName;
    private lowWaterMark;
    private countToRequest;
    private buffer;
    private state;
    constructor(wvl: WvLinewise, streamName: string, lowWaterMark: number, countToRequest: number);
    notify(): Promise<unknown>;
    request(): void;
    shift(): Promise<string | null>;
}

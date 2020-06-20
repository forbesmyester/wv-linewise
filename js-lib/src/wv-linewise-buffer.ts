import { Response, RawWvLinewise, RESPONSE_TYPE, LineResponse, FinishedResponse, PausedResponse, WvLinewise } from "./wv-linewise";

function onlyOnce(f: Function) {
    let called = false;
    return function onlyOnceImp(...args: any[]) {
        if (called) { return; }
        called = true;
        return f.apply(null, args);
    }
}

enum WvLinewiseBufferState {
    NotStarted = 0,
    Running = 1,
    Requesting = 2,
    End = 3,
}

export class WvLinewiseBuffer {

    private buffer: string[] = [];
    private state: WvLinewiseBufferState = WvLinewiseBufferState.NotStarted;

    constructor(private wvl: WvLinewise, private streamName: string, private lowWaterMark: number, private countToRequest: number) {
        this.state = 0; // 1 = running, 2 = requesting, 3 = end
        if (countToRequest == 0) {
            throw new Error("WvLinewiseBuffer: countToRequest must be a positive number");
        }
        this.wvl.on(RESPONSE_TYPE.LINE, ({ name, data }: LineResponse) => {
            if (name == this.streamName) {
                this.buffer.push(data);
            }
        });
        this.wvl.on(RESPONSE_TYPE.FINISHED, () => {
            this.state = 3;
        });
        this.wvl.on(RESPONSE_TYPE.PAUSED, () => {
            this.state = 1;
        });
    }

    notify() {

        return new Promise((resolve) => {

            let onlyOnceResolve = onlyOnce(resolve);

            let eventNotification = ({ name, type }: PausedResponse | LineResponse | FinishedResponse) => {

                if (name !== this.streamName) {
                    return;
                }

                if (type == RESPONSE_TYPE.FINISHED) { this.state = 3; }
                if (type == RESPONSE_TYPE.PAUSED) {
                    this.state = 1;
                    return this.request();
                }

                this.wvl.off(RESPONSE_TYPE.FINISHED, eventNotification);
                this.wvl.off(RESPONSE_TYPE.LINE, eventNotification);
                this.wvl.off(RESPONSE_TYPE.PAUSED, eventNotification);
                onlyOnceResolve();
            };

            this.wvl.on(RESPONSE_TYPE.FINISHED, eventNotification);
            this.wvl.on(RESPONSE_TYPE.LINE, eventNotification);
            this.wvl.on(RESPONSE_TYPE.PAUSED, eventNotification);

        });
    }

    request() {
        if (this.state >= 2) {
            return;
        }

        if (this.state == 0) {
            this.state = 2;
            this.wvl.streamStart(this.streamName, this.countToRequest);
        }
        else {
            this.state = 2;
            this.wvl.streamContinue(this.streamName);
        }

    }

    async shift(): Promise<string|null> {
        let now = () => {
            let r = this.buffer.length ? this.buffer.shift() : null;
            if (r === undefined) {
                return null;
            }
            return r;
        }
        if ((this.state < 2) && (this.buffer.length <= this.lowWaterMark)) {
            this.request();
        }
        if (this.buffer.length == 0) {
            if (this.state == 2) {
                return this.notify().then(() => {
                    return now();
                });
            }
            return Promise.resolve(null);
        }
        return Promise.resolve(now());
    }

}


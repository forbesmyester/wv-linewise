"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WvLinewiseBuffer = void 0;
const wv_linewise_1 = require("./wv-linewise");
function onlyOnce(f) {
    let called = false;
    return function onlyOnceImp(...args) {
        if (called) {
            return;
        }
        called = true;
        return f.apply(null, args);
    };
}
var WvLinewiseBufferState;
(function (WvLinewiseBufferState) {
    WvLinewiseBufferState[WvLinewiseBufferState["NotStarted"] = 0] = "NotStarted";
    WvLinewiseBufferState[WvLinewiseBufferState["Running"] = 1] = "Running";
    WvLinewiseBufferState[WvLinewiseBufferState["Requesting"] = 2] = "Requesting";
    WvLinewiseBufferState[WvLinewiseBufferState["End"] = 3] = "End";
})(WvLinewiseBufferState || (WvLinewiseBufferState = {}));
function sleep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 1);
    });
}
class WvLinewiseBuffer {
    constructor(wvl, streamName, lowWaterMark, countToRequest) {
        this.wvl = wvl;
        this.streamName = streamName;
        this.lowWaterMark = lowWaterMark;
        this.countToRequest = countToRequest;
        this.buffer = [];
        this.state = WvLinewiseBufferState.NotStarted;
        this.noSleep = false;
        this.state = 0; // 1 = running, 2 = requesting, 3 = end
        if (countToRequest == 0) {
            throw new Error("WvLinewiseBuffer: countToRequest must be a positive number");
        }
        this.wvl.on(wv_linewise_1.RESPONSE_TYPE.LINE, ({ name, data }) => {
            if (name == this.streamName) {
                this.buffer.push(data);
            }
        });
        this.wvl.on(wv_linewise_1.RESPONSE_TYPE.FINISHED, () => {
            this.state = 3;
        });
        this.wvl.on(wv_linewise_1.RESPONSE_TYPE.PAUSED, () => {
            this.state = 1;
        });
    }
    notify() {
        return new Promise((resolve) => {
            let onlyOnceResolve = onlyOnce(resolve);
            let eventNotification = ({ name, type }) => __awaiter(this, void 0, void 0, function* () {
                if (name !== this.streamName) {
                    return;
                }
                if (type == wv_linewise_1.RESPONSE_TYPE.FINISHED) {
                    this.state = 3;
                }
                if (type == wv_linewise_1.RESPONSE_TYPE.PAUSED) {
                    this.state = 1;
                    if (!this.noSleep) {
                        yield sleep();
                    }
                    return this.request();
                }
                this.wvl.off(wv_linewise_1.RESPONSE_TYPE.FINISHED, eventNotification);
                this.wvl.off(wv_linewise_1.RESPONSE_TYPE.LINE, eventNotification);
                this.wvl.off(wv_linewise_1.RESPONSE_TYPE.PAUSED, eventNotification);
                onlyOnceResolve();
            });
            this.wvl.on(wv_linewise_1.RESPONSE_TYPE.FINISHED, eventNotification);
            this.wvl.on(wv_linewise_1.RESPONSE_TYPE.LINE, eventNotification);
            this.wvl.on(wv_linewise_1.RESPONSE_TYPE.PAUSED, eventNotification);
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
    shift() {
        return __awaiter(this, void 0, void 0, function* () {
            let now = () => {
                let r = this.buffer.length ? this.buffer.shift() : null;
                if (r === undefined) {
                    return null;
                }
                return r;
            };
            if ((this.state < 2) && (this.buffer.length <= this.lowWaterMark)) {
                this.request();
            }
            if (this.buffer.length == 0) {
                if (this.state == 2) {
                    yield this.notify();
                    return now();
                }
                return Promise.resolve(null);
            }
            return Promise.resolve(now());
        });
    }
}
exports.WvLinewiseBuffer = WvLinewiseBuffer;

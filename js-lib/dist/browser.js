(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['wv-linewise-js-lib'] = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    (function (REQUEST_TYPE) {
        REQUEST_TYPE["EXIT"] = "exit";
        REQUEST_TYPE["STREAM_LIST"] = "streamList";
        REQUEST_TYPE["STREAM_START"] = "streamStart";
        REQUEST_TYPE["STREAM_CONTINUE"] = "streamContinue";
        REQUEST_TYPE["PARAMS"] = "params";
        REQUEST_TYPE["OUT"] = "out";
    })(exports.REQUEST_TYPE || (exports.REQUEST_TYPE = {}));
    (function (OUT_REQUEST_DESCRIPTOR) {
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["STDOUT"] = 1] = "STDOUT";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["STDERR"] = 2] = "STDERR";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_3"] = 3] = "DESCRIPTOR_3";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_4"] = 4] = "DESCRIPTOR_4";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_5"] = 5] = "DESCRIPTOR_5";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_6"] = 6] = "DESCRIPTOR_6";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_7"] = 7] = "DESCRIPTOR_7";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_8"] = 8] = "DESCRIPTOR_8";
        OUT_REQUEST_DESCRIPTOR[OUT_REQUEST_DESCRIPTOR["DESCRIPTOR_9"] = 9] = "DESCRIPTOR_9";
    })(exports.OUT_REQUEST_DESCRIPTOR || (exports.OUT_REQUEST_DESCRIPTOR = {}));
    (function (RESPONSE_TYPE) {
        RESPONSE_TYPE["PARAMS"] = "params";
        RESPONSE_TYPE["LINE"] = "line";
        RESPONSE_TYPE["STREAM_LIST"] = "streamList";
        RESPONSE_TYPE["DETAILS"] = "details";
        RESPONSE_TYPE["FINISHED"] = "finished";
        RESPONSE_TYPE["PAUSED"] = "paused";
        RESPONSE_TYPE["ERROR"] = "error";
        RESPONSE_TYPE["MESSAGE_ERROR"] = "messageError";
    })(exports.RESPONSE_TYPE || (exports.RESPONSE_TYPE = {}));
    class RawWvLinewise {
        constructor(external) {
            this.external = external;
            this.respFnsOnce = {
                error: [],
                messageError: [],
                params: [],
                streamList: [],
                paused: [],
                details: [],
                line: [],
                finished: [],
            };
            this.respFns = {
                error: [],
                messageError: [],
                params: [],
                streamList: [],
                paused: [],
                details: [],
                line: [],
                finished: [],
            };
            if (typeof window !== "undefined") {
                window._globalWvLinewise = (d) => this.fire(d);
            }
        }
        getResponseDispatcher(e) {
            let r = this.respFns[e];
            while (this.respFnsOnce[e].length) {
                r = r.concat([this.respFnsOnce[e].shift()]);
            }
            return r;
        }
        fire(d) {
            let fires = this.getResponseDispatcher(d.type);
            if (!fires.length) {
                return;
            }
            for (let i = 0; i < fires.length; i++) {
                fires[i].call(null, d);
            }
        }
        request(j) {
            this.external.invoke(JSON.stringify(j));
        }
        on(type, f) {
            this.respFns[type].push(f);
        }
        once(type, f) {
            this.respFnsOnce[type].push(f);
        }
        clear(type) {
            this.respFns[type] = [];
            this.respFnsOnce[type] = [];
        }
        off(type, f) {
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
    class RawWvLinewiseMock extends RawWvLinewise {
        constructor() {
            super({ invoke: (_s) => { } });
            this.streamData = new Map();
            this.params = [];
            this.running = new Set();
            this.started = new Set();
            this.startedCounts = new Map();
        }
        addStreamData(streamName, data) {
            if (!this.streamData.has(streamName)) {
                this.streamData.set(streamName, []);
            }
            this.streamData.set(streamName, data);
        }
        addParam(name, value) {
            this.params.push({ name, value });
        }
        start(name, count) {
            return __awaiter(this, void 0, void 0, function* () {
                this.startedCounts.set(name, count);
                this.running.add(name);
                if (!this.started.has(name)) {
                    this.fire({ name: name, rewindable: false, type: exports.RESPONSE_TYPE.DETAILS });
                    this.started.add(name);
                }
                let stream = this.streamData.get(name) || [];
                let lineNumber = 0;
                while ((lineNumber++ < count) && stream.length) {
                    let line = stream.shift();
                    this.fire({ name: name, data: line, type: exports.RESPONSE_TYPE.LINE });
                }
                this.running.delete(name);
                if (stream.length) {
                    this.fire({ name: name, type: exports.RESPONSE_TYPE.PAUSED });
                }
                else {
                    this.fire({ name: name, type: exports.RESPONSE_TYPE.FINISHED });
                }
            });
        }
        request(j) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (j.msg) {
                    case exports.REQUEST_TYPE.EXIT:
                        window.document.body.innerText = "EXIT DONE";
                        break;
                    case exports.REQUEST_TYPE.STREAM_LIST:
                        this.fire({ type: exports.RESPONSE_TYPE.STREAM_LIST, streams: Array.from(this.streamData.keys()) });
                        break;
                    case exports.REQUEST_TYPE.PARAMS:
                        this.fire({ type: exports.RESPONSE_TYPE.PARAMS, params: this.params });
                        break;
                    case exports.REQUEST_TYPE.STREAM_CONTINUE:
                        this.start(j.name, this.startedCounts.get(j.name) || 0);
                        break;
                    case exports.REQUEST_TYPE.OUT:
                        if (j.descriptor == 2) {
                            console.log("STDERR: ", j.data);
                        }
                        if (j.descriptor == 1) {
                            console.log("STDOUT: ", j.data);
                        }
                        if ((j.descriptor > 2) && (j.descriptor < 10)) {
                            console.log(`STD${j.descriptor}: `, j.data);
                        }
                        break;
                    case exports.REQUEST_TYPE.STREAM_START:
                        if (!j.hasOwnProperty("name") || !j.hasOwnProperty("count")) {
                            return;
                        }
                        if (!this.streamData.has(j.name)) {
                            this.fire({ name: j.name, error: "No such stream", type: exports.RESPONSE_TYPE.ERROR });
                            return;
                        }
                        if ((this.running.has(j.name)) || !this.streamData.has(j.name)) {
                            return;
                        }
                        this.start(j.name, j.count);
                        break;
                }
            });
        }
    }
    class WvLinewise {
        constructor(raw) {
            this.raw = raw;
        }
        streamStart(streamName, count) {
            this.raw.request({ msg: exports.REQUEST_TYPE.STREAM_START, name: streamName, count });
        }
        streamContinue(streamName) {
            this.raw.request({ msg: exports.REQUEST_TYPE.STREAM_CONTINUE, name: streamName });
        }
        requestParams() {
            this.raw.request({ msg: exports.REQUEST_TYPE.PARAMS });
        }
        exit(status) {
            this.raw.request({ msg: exports.REQUEST_TYPE.EXIT, status });
        }
        requestStreamList() {
            this.raw.request({ msg: exports.REQUEST_TYPE.STREAM_LIST });
        }
        out(text, descriptor = exports.OUT_REQUEST_DESCRIPTOR.STDOUT) {
            this.raw.request({ msg: exports.REQUEST_TYPE.OUT, descriptor, data: text });
        }
        on(type, f) {
            this.raw.on(type, f);
        }
        once(type, f) {
            this.raw.once(type, f);
        }
        clear(type) {
            this.raw.clear(type);
        }
        off(type, f) {
            this.raw.off(type, f);
        }
    }
    function runningInWvLinewise() {
        return !!(window.external && window.external.invoke);
    }

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
    class WvLinewiseBuffer {
        constructor(wvl, streamName, lowWaterMark, countToRequest) {
            this.wvl = wvl;
            this.streamName = streamName;
            this.lowWaterMark = lowWaterMark;
            this.countToRequest = countToRequest;
            this.buffer = [];
            this.state = WvLinewiseBufferState.NotStarted;
            this.state = 0; // 1 = running, 2 = requesting, 3 = end
            if (countToRequest == 0) {
                throw new Error("WvLinewiseBuffer: countToRequest must be a positive number");
            }
            this.wvl.on(exports.RESPONSE_TYPE.LINE, ({ name, data }) => {
                if (name == this.streamName) {
                    this.buffer.push(data);
                }
            });
            this.wvl.on(exports.RESPONSE_TYPE.FINISHED, () => {
                this.state = 3;
            });
            this.wvl.on(exports.RESPONSE_TYPE.PAUSED, () => {
                this.state = 1;
            });
        }
        notify() {
            return new Promise((resolve) => {
                let onlyOnceResolve = onlyOnce(resolve);
                let eventNotification = ({ name, type }) => {
                    if (name !== this.streamName) {
                        return;
                    }
                    if (type == exports.RESPONSE_TYPE.FINISHED) {
                        this.state = 3;
                    }
                    if (type == exports.RESPONSE_TYPE.PAUSED) {
                        this.state = 1;
                        return this.request();
                    }
                    this.wvl.off(exports.RESPONSE_TYPE.FINISHED, eventNotification);
                    this.wvl.off(exports.RESPONSE_TYPE.LINE, eventNotification);
                    this.wvl.off(exports.RESPONSE_TYPE.PAUSED, eventNotification);
                    onlyOnceResolve();
                };
                this.wvl.on(exports.RESPONSE_TYPE.FINISHED, eventNotification);
                this.wvl.on(exports.RESPONSE_TYPE.LINE, eventNotification);
                this.wvl.on(exports.RESPONSE_TYPE.PAUSED, eventNotification);
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
                        return this.notify().then(() => {
                            return now();
                        });
                    }
                    return Promise.resolve(null);
                }
                return Promise.resolve(now());
            });
        }
    }

    exports.RawWvLinewise = RawWvLinewise;
    exports.RawWvLinewiseMock = RawWvLinewiseMock;
    exports.WvLinewise = WvLinewise;
    exports.WvLinewiseBuffer = WvLinewiseBuffer;
    exports.runningInWvLinewise = runningInWvLinewise;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

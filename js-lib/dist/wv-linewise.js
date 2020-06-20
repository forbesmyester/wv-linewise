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
exports.runningInWvLinewise = exports.WvLinewise = exports.RawWvLinewiseMock = exports.RawWvLinewise = exports.RESPONSE_TYPE = exports.OUT_REQUEST_DESCRIPTOR = exports.REQUEST_TYPE = void 0;
/**
 * Every {@link Request} includes a `msg` which will from this enum.
 */
var REQUEST_TYPE;
(function (REQUEST_TYPE) {
    REQUEST_TYPE["EXIT"] = "exit";
    REQUEST_TYPE["STREAM_LIST"] = "streamList";
    REQUEST_TYPE["STREAM_START"] = "streamStart";
    REQUEST_TYPE["STREAM_CONTINUE"] = "streamContinue";
    REQUEST_TYPE["PARAMS"] = "params";
    REQUEST_TYPE["OUT"] = "out";
})(REQUEST_TYPE = exports.REQUEST_TYPE || (exports.REQUEST_TYPE = {}));
/**
 * Used by {@link OutRequest} to control which UNIX stream to write to.
 */
var OUT_REQUEST_DESCRIPTOR;
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
})(OUT_REQUEST_DESCRIPTOR = exports.OUT_REQUEST_DESCRIPTOR || (exports.OUT_REQUEST_DESCRIPTOR = {}));
/**
 * Every {@link Response} includes a `type` which will from this enum.
 */
var RESPONSE_TYPE;
(function (RESPONSE_TYPE) {
    RESPONSE_TYPE["PARAMS"] = "params";
    RESPONSE_TYPE["LINE"] = "line";
    RESPONSE_TYPE["STREAM_LIST"] = "streamList";
    RESPONSE_TYPE["DETAILS"] = "details";
    RESPONSE_TYPE["FINISHED"] = "finished";
    RESPONSE_TYPE["PAUSED"] = "paused";
    RESPONSE_TYPE["ERROR"] = "error";
    RESPONSE_TYPE["MESSAGE_ERROR"] = "messageError";
})(RESPONSE_TYPE = exports.RESPONSE_TYPE || (exports.RESPONSE_TYPE = {}));
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
exports.RawWvLinewise = RawWvLinewise;
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
                this.fire({ name: name, rewindable: false, type: RESPONSE_TYPE.DETAILS });
                this.started.add(name);
            }
            let stream = this.streamData.get(name) || [];
            let lineNumber = 0;
            while ((lineNumber++ < count) && stream.length) {
                let line = stream.shift();
                this.fire({ name: name, data: line, type: RESPONSE_TYPE.LINE });
            }
            this.running.delete(name);
            if (stream.length) {
                this.fire({ name: name, type: RESPONSE_TYPE.PAUSED });
            }
            else {
                this.fire({ name: name, type: RESPONSE_TYPE.FINISHED });
            }
        });
    }
    request(j) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        console.log("STDERR: ", j.data);
                    }
                    if (j.descriptor == 1) {
                        console.log("STDOUT: ", j.data);
                    }
                    if ((j.descriptor > 2) && (j.descriptor < 10)) {
                        console.log(`STD${j.descriptor}: `, j.data);
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
        });
    }
}
exports.RawWvLinewiseMock = RawWvLinewiseMock;
class WvLinewise {
    constructor(raw) {
        this.raw = raw;
    }
    streamStart(streamName, count) {
        this.raw.request({ msg: REQUEST_TYPE.STREAM_START, name: streamName, count });
    }
    streamContinue(streamName) {
        this.raw.request({ msg: REQUEST_TYPE.STREAM_CONTINUE, name: streamName });
    }
    requestParams() {
        this.raw.request({ msg: REQUEST_TYPE.PARAMS });
    }
    exit(status) {
        this.raw.request({ msg: REQUEST_TYPE.EXIT, status });
    }
    requestStreamList() {
        this.raw.request({ msg: REQUEST_TYPE.STREAM_LIST });
    }
    out(text, descriptor = OUT_REQUEST_DESCRIPTOR.STDOUT) {
        this.raw.request({ msg: REQUEST_TYPE.OUT, descriptor, data: text });
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
exports.WvLinewise = WvLinewise;
function runningInWvLinewise() {
    return !!(window.external && window.external.invoke);
}
exports.runningInWvLinewise = runningInWvLinewise;

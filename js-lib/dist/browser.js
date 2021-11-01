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
            this.streamData.set(streamName, (this.streamData.get(streamName) || []).concat(data));
        }
        addParam(name, value) {
            this.params.push({ name, value });
        }
        start(name, count) {
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
                            console.log(`STDERR: ${j.data}`);
                        }
                        if (j.descriptor == 1) {
                            console.log(`STDOUT: ${j.data}`);
                        }
                        if ((j.descriptor > 2) && (j.descriptor < 10)) {
                            console.log(`STD${j.descriptor}: ${j.data}`);
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
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.external && window.webkit.messageHandlers.external.postMessage) {
            window.external = {
                invoke: (e) => {
                    window.webkit.messageHandlers.external.postMessage(e);
                }
            };
            return true;
        }
        return !!(window.external && window.external.invoke);
    }
    function externalInvoke(e) {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.external && window.webkit.messageHandlers.external.postMessage) {
            return window.webkit.messageHandlers.external.postMessage(e);
        }
        if (window.external && window.external.invoke) {
            return window.external.invoke(e);
        }
        throw new Error("WV Linewise: Could not post message: " + JSON.stringify(e));
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
                let eventNotification = ({ name, type }) => __awaiter(this, void 0, void 0, function* () {
                    if (name !== this.streamName) {
                        return;
                    }
                    if (type == exports.RESPONSE_TYPE.FINISHED) {
                        this.state = 3;
                    }
                    if (type == exports.RESPONSE_TYPE.PAUSED) {
                        this.state = 1;
                        if (!this.noSleep) {
                            yield sleep();
                        }
                        return this.request();
                    }
                    this.wvl.off(exports.RESPONSE_TYPE.FINISHED, eventNotification);
                    this.wvl.off(exports.RESPONSE_TYPE.LINE, eventNotification);
                    this.wvl.off(exports.RESPONSE_TYPE.PAUSED, eventNotification);
                    onlyOnceResolve();
                });
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
                        yield this.notify();
                        return now();
                    }
                    return Promise.resolve(null);
                }
                return Promise.resolve(now());
            });
        }
    }

    class WvHeaders {
        append(_name, _value) { throw new Error("Not Implemented"); }
        delete(_name) { throw new Error("Not Implemented"); }
        get(name) {
            if (this.hasOwnProperty(name)) {
                return this[name];
            }
            return null;
        }
        has(name) { return this.hasOwnProperty(name); }
        set(_name, _value) { throw new Error("Not Implemented"); }
        forEach(callbackfn, thisArg) {
            let x = this;
            Object.getOwnPropertyNames(this).forEach((k) => {
                let v = x.get(k);
                if (typeof v === 'string') {
                    callbackfn.call(thisArg || x, v, k, x);
                }
            }, {});
        }
        constructor(kv) {
            Object.getOwnPropertyNames(kv).forEach((k) => {
                this[k] = kv[k];
            });
        }
    }
    class WvLinewiseResponse {
        constructor(url, resp_text, status, headers) {
            this.url = url;
            this.resp_text = resp_text;
            this.status = status;
            this.redirected = false;
            this.trailer = Promise.resolve(new WvHeaders({}));
            this.type = "basic";
            this.body = null;
            this.bodyUsed = true;
            this.ok = (status >= 200) && (status < 300);
            this.statusText = this.getStatusText(status);
            this.headers = new WvHeaders(headers);
        }
        arrayBuffer() { throw new Error("WvLinewiseResponse: Unimplemented: arrayBuffer()"); }
        blob() { throw new Error("WvLinewiseResponse: Unimplemented: blob()"); }
        formData() { throw new Error("WvLinewiseResponse: Unimplemented: formData()"); }
        clone() {
            let headers = {};
            Object.getOwnPropertyNames(this.headers).forEach((k) => {
                headers[k + ""] = headers[k] + "";
            });
            return new WvLinewiseResponse(this.url + "", this.resp_text + "", this.status, headers);
        }
        json() { return JSON.parse(this.resp_text); }
        text() { return Promise.resolve(this.resp_text); }
        getStatusText(n) {
            const statuses = {
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
    function getWvLinewiseFetch(wvl, responseStream) {
        let id = 1;
        let wvlBuffer = new WvLinewiseBuffer(wvl, responseStream, 16, 32);
        let requestOffset = 1;
        let promises = [];
        let currents = new Map();
        const mainRegex = /^RESPONSE\: *([0-9]+)\: *([A-Z]{2,12})\:?/;
        function wvLinewiseFetch(url, opts) {
            wvl.out(wvLinewiseFetchSerialize(wvLinewiseFetchRequest(url, opts)));
            let r = new Promise((resolve, reject) => {
                promises.push({ resolve, reject, url });
            });
            return r;
        }
        function stripPreWhitespace(line) {
            while ((line.length) && ((line[0] == ' ') || (line[0] == "\t"))) {
                line = line.substr(1);
            }
            return line;
        }
        function wvLinewiseFetchParseLine(current, command, lineStripped) {
            if (command == 'END') {
                return Object.assign(Object.assign({}, current), { end: true, body: current.body || [], headers: current.headers || {} });
            }
            if (command == 'STATUS') {
                if (!current.hasOwnProperty('body')) {
                    current.body = [];
                }
                lineStripped = stripPreWhitespace(lineStripped);
                let n = parseInt(lineStripped, 10);
                if (isNaN(n)) {
                    throw new Error(`wvLinewiseFetchParseLine: Id ${lineStripped} is not an integer`);
                }
                return Object.assign(Object.assign({}, current), { status: n });
            }
            if (command == 'BODY') {
                if (!current.hasOwnProperty('body')) {
                    current.body = [];
                }
                return Object.assign(Object.assign({}, current), { body: [...current.body || []].concat([lineStripped]) });
            }
            if (command == 'HEADERS') {
                let c = Object.assign({}, current);
                c.headers = c.headers || {};
                let parsed = {};
                try {
                    parsed = JSON.parse(stripPreWhitespace(lineStripped));
                }
                catch (e) {
                    throw new Error(`wvLinewiseFetchParseLine: HEADERS supplied must be in JSON: '${lineStripped}'`);
                }
                for (let [k, v] of Object.entries(parsed)) {
                    c.headers["" + k] = "" + v;
                }
                return c;
            }
            throw new Error(`wvLinewiseFetchParseLine: Line not recognized: '${lineStripped}' '${command}'`);
        }
        function extractFromLine(line) {
            const m = line.match(mainRegex);
            if (!m) {
                throw new Error("wvLinewiseFetchParseLine: Invalid line: " + line);
            }
            const n = parseInt(m[1], 10);
            if (isNaN(n)) {
                throw new Error(`wvLinewiseFetchParseLine: Id ${line} is not an integer`);
            }
            if ((n < requestOffset) || (n > requestOffset + promises.length)) {
                throw new Error(`wvLinewiseFetchParseLine: Id ${line} was not expected`);
            }
            return { n, command: stripPreWhitespace(m[2]), lineStripped: line.substr(m[0].length) };
        }
        function initializeAndReturn(n) {
            const r = currents.get(n);
            if (r) {
                return r;
            }
            const current = { id: n };
            currents.set(n, current);
            return current;
        }
        function wvLinewiseFetchProcess() {
            return __awaiter(this, void 0, void 0, function* () {
                let line = yield wvlBuffer.shift();
                if (line === null) {
                    return false;
                }
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
                    currents.delete(current.id);
                }
                currents.set(current.id, current);
                return true;
            });
        }
        function wvLinewiseFetchRequest(url, opts) {
            return { id: id++, url, opts };
        }
        function wvLinewiseFetchSerialize(request) {
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
    function getWvLinewiseManagedFetch(wvl, responseStream, getTimeout) {
        let wvLinewiseFetch = getWvLinewiseFetch(wvl, responseStream);
        let processing = false;
        let running = null;
        let backoffNumber = 0;
        function delay(n) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(true), n);
            });
        }
        function looper() {
            return __awaiter(this, void 0, void 0, function* () {
                backoffNumber = 0;
                if (processing) {
                    return;
                }
                processing = true;
                if ((yield wvLinewiseFetch.process()) == true) {
                    backoffNumber = 0;
                }
                yield delay(getTimeout(backoffNumber));
                backoffNumber = backoffNumber + 1;
                processing = false;
            });
        }
        function end() {
            if (wvLinewiseFetch.pendingCount() == 0) {
                running && clearInterval(running);
                running = null;
            }
        }
        function wvLinewiseManagedFetch(url, opts) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!running) {
                    let rp = wvLinewiseFetch(url, opts);
                    running = setInterval(looper, 10);
                    let r = yield rp;
                    end();
                    return r;
                }
                backoffNumber = 0;
                let r = yield wvLinewiseFetch(url, opts);
                end();
                return r;
            });
        }
        wvLinewiseManagedFetch.running = function () {
            return running !== null;
        };
        return wvLinewiseManagedFetch;
    }

    exports.RawWvLinewise = RawWvLinewise;
    exports.RawWvLinewiseMock = RawWvLinewiseMock;
    exports.WvLinewise = WvLinewise;
    exports.WvLinewiseBuffer = WvLinewiseBuffer;
    exports.WvLinewiseResponse = WvLinewiseResponse;
    exports.externalInvoke = externalInvoke;
    exports.getWvLinewiseFetch = getWvLinewiseFetch;
    exports.getWvLinewiseManagedFetch = getWvLinewiseManagedFetch;
    exports.runningInWvLinewise = runningInWvLinewise;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

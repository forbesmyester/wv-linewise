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
exports.getWvLinewiseManagedFetch = exports.getWvLinewiseFetch = exports.WvLinewiseResponse = void 0;
const wv_linewise_buffer_1 = require("./wv-linewise-buffer");
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
exports.WvLinewiseResponse = WvLinewiseResponse;
function getWvLinewiseFetch(wvl, responseStream) {
    ;
    let id = 1;
    let wvlBuffer = new wv_linewise_buffer_1.WvLinewiseBuffer(wvl, responseStream, 16, 32);
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
    function stripCommand(m, line) {
        line = line.substr(m[0].length);
        return line;
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
        let o = Object.assign({}, request.opts);
        delete o.method;
        return `REQUEST: ${request.id}: ${m}: ${request.url} ${JSON.stringify(o)}`;
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
exports.getWvLinewiseFetch = getWvLinewiseFetch;
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
exports.getWvLinewiseManagedFetch = getWvLinewiseManagedFetch;

import { RawWvLinewise, WvLinewise, WvLinewiseBuffer, RESPONSE_TYPE, MessageErrorResponse, ErrorResponse, ParamsResponse, LineResponse, PausedResponse } from "wv-linewise-js-lib";

async function processLightWeight() {

let lineCount = 0;
const wvl: WvLinewise = new WvLinewise(new RawWvLinewise(external as any));

// Upon error, just raise it so it's caught by the global error handler.
wvl.on(RESPONSE_TYPE.MESSAGE_ERROR, (msg: MessageErrorResponse) => {
    throw new Error(`MSG ERROR: ${JSON.stringify(msg)}`)
});

// Upon error, just raise it so it's caught by the global error handler.
wvl.on(RESPONSE_TYPE.ERROR, (msg: ErrorResponse) => {
    throw new Error(`MSG ERROR: ${JSON.stringify(msg)}`)
});

// Request the parameters the user passed in on the command line
function getParams(wvl: WvLinewise): Promise<ParamsResponse> {
    return new Promise((resolve) => {
        let f = (resp: ParamsResponse) => {
            resolve(resp);
        };
        wvl.once(RESPONSE_TYPE.PARAMS, f);
        wvl.requestParams();
    });
}

function getRequestQuantity(paramsResponse: ParamsResponse): number {
    for (let p of paramsResponse.params) {
        if (p.name == "quantity") {
            return parseInt(p.value, 10);
        }
    }
    return 1000;
}

// Because all of our code is blocking (we're not waiting for animations etc)
// we're going to have processed the data immediately, so when WV Linewise
// pauses we can just start it right up again.
wvl.on(RESPONSE_TYPE.PAUSED, (resp: PausedResponse) => {
    if (resp.name == "in") {
        wvl.streamContinue("in");
    }
});

// This function will get fired on every line, with the line that came from
// the "in" stream, which could be STDIN or a file.
wvl.on(RESPONSE_TYPE.LINE, (resp: LineResponse) => {
    if (resp.name == "in") {
        lineCount = lineCount + 1;
    }
    document.body.innerText = `The file has ${lineCount} lines and the last line was ${line}`;
});


// Start WV Linewise processing lines
wvl.streamStart("in", getRequestQuantity(await getParams(wvl)));

}

processLightWeight();


async function processBuffer(wvl: WvLinewise) {

    let buffer = new WvLinewiseBuffer(wvl, "in", 100, 200);
    let line: string|null = "";
    let lineCount = 0;

    while (line !== null) {
        line = await buffer.shift();
        if (line === null) {
            continue;
        }
        document.body.innerText = `The file has ${lineCount} lines and the last line was ${line}`;
    }
}

processBuffer();

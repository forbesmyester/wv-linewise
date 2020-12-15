import tap from "tap";
import { Response, RawWvLinewise, RESPONSE_TYPE, WvLinewise, RawWvLinewiseMock } from "../src/wv-linewise";
import { WvLinewiseBuffer } from "../src/wv-linewise-buffer";

tap.test('testWvLinewiseBuffer', async function testWvLinewiseBuffer({is: assert, end}) {

    let progress = 0;

    class RawWvlTest extends RawWvLinewiseMock {

        constructor() {
            let x = {
                invoke: (s: string) => {
                }
            };
            super();
        }

        public fire(d: Response) {
            super.fire(d);
        }
    }

    class WvlTest extends WvLinewise {

        streamStart(name: string, count: number) {
            assert(name, "in");
            assert(count, 3);
            progress++;
        }

        streamContinue(name: string) {
            assert(name, "in");
            progress = progress + 10;
        }

    }

    class MyWvLinewiseBuffer extends WvLinewiseBuffer {
        protected noSleep = true;
    }

    let wvlr = new RawWvlTest();
    let wvl = new WvlTest(wvlr);
    let wvlb = new MyWvLinewiseBuffer(wvl, "in", 3, 3);

    // Initial Get will start the Wvl
    // Get Count: 1, Requests: 1, Buffer: 3 - 1
    let p = wvlb.shift();
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "A", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "B", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "C", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.PAUSED, name: "in" });
    let line1: string = await p as string;
    assert(progress, 1);
    assert(line1, "A");

    // The 2nd Get will be fulfillable via the buffer but will cause a Continue
    //
    // Get Count: 2, Requests: 2(in progress), Buffer: 3 - 2
    assert(await wvlb.shift(), "B");
    assert(progress, 11);

    // The 3rd Get will be fulfillable via the buffer and not cause a Continue
    // because we have not finished the previous
    //
    // Get Count: 3, Requests: 2(in progress), Buffer: 3 - 3
    assert(await wvlb.shift(), "C");
    assert(progress, 11);

    // The 4th Get requires the completion of the request from the second GET as
    // we have an empty buffer
    //
    // Get Count: 4, Requests: 2, Buffer: 6 - 4
    let line2 = wvlb.shift() as Promise<string>;
    assert(progress, 11);
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "D", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "E", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "F", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.PAUSED, name: "in" });
    assert(await line2, "D");

    // 5th Get fulfillable from buffer but causes Continue as below water mark
    //
    // Get Count: 5, Requests: 3(In progress), Buffer: 6 - 5
    assert(await wvlb.shift(), "E");
    assert(progress, 21);

    // Before the 6th Get our buffer gets filled with more items than we asked
    // for (which is fine) to put us over the low water mark... The Get will
    // cause no Continue.
    //
    // Get Count: 6, Requests: 3, Buffer: 10 - 6
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "G", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "H", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "I", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "J", name: "in" });
    wvlr.fire({ type: RESPONSE_TYPE.PAUSED, name: "in" });
    assert(await wvlb.shift(), "F");
    assert(progress, 21);

    // 7th Get From Buffer
    //
    // Get Count: 7, Requests: 3, Buffer: 10 - 7
    assert(await wvlb.shift(), "G");
    assert(progress, 21);

    // 8th Get From Buffer - But fallen below low water mark - Continue
    //
    // Get Count: 8, Requests: 4(in progress), Buffer: 10 - 8
    assert(await wvlb.shift(), "H");
    assert(progress, 31);

    // Finish up, checking we shift null at end
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "K", name: "in" });
    assert(await wvlb.shift(), "I");
    assert(await wvlb.shift(), "J");
    assert(await wvlb.shift(), "K");

    // Check we can deal with a PAUSE directly after a shift, then restart
    let line3 = wvlb.shift() as Promise<string>;
    wvlr.fire({ type: RESPONSE_TYPE.PAUSED, name: "in" });
    assert(progress, 41);
    wvlr.fire({ type: RESPONSE_TYPE.LINE, data: "L", name: "in" });
    assert(await line3, "L");

    // Clean finish.
    wvlr.fire({ type: RESPONSE_TYPE.FINISHED, name: "in" });
    assert(await wvlb.shift(), null);
    assert(progress, 41);

    end();
});


import tap from "tap";
import { Test } from "tap";
import { Response, WvLinewise, RawWvLinewiseMock, RESPONSE_TYPE } from "../src/wv-linewise";
import { getWvLinewiseFetch, getWvLinewiseManagedFetch } from "../src/wv-linewise-fetch";

tap.test('testFetchOutput', async function testFetchOutput(test) {

    let raw = new RawWvLinewiseMock();
    let wvl = new WvLinewise(raw);
    let fet = getWvLinewiseFetch(wvl, 'responses');
    raw.addStreamData(
        "responses",
        [
            'RESPONSE: 1: HEADERS: {"Content-Type": "text/csv"}',
            'RESPONSE: 1: STATUS:  201',
            'RESPONSE: 1: BODY:content,temperature',
            'RESPONSE: 1: BODY:water,-1',
            'RESPONSE: 2: BODY:content,temperature',
            'RESPONSE: 1: END',
            'RESPONSE: 2: BODY:steam,101',
            'RESPONSE: 2: END',
        ]
    );

    test.is(fet.pendingCount(), 0);
    let respP1 = fet('/snow', { cache: "default" });
    test.is(fet.pendingCount(), 1);
    for (let i = 0; i < 6; i++) {
        await fet.process();
    }
    let resp1 = await respP1;
    test.is(resp1.status, 201);
    test.is(await resp1.text(), "content,temperature\nwater,-1");
    test.is(resp1.headers.get('Content-Type'), 'text/csv');
    test.is(resp1.url, '/snow');
    test.is(fet.pendingCount(), 0);


    test.is(fet.pendingCount(), 0);
    let respP2 = fet('/steam', { cache: "default" });
    test.is(fet.pendingCount(), 1);
    for (let i = 0; i < 2; i++) {
        await fet.process();
    }
    let resp2 = await respP2;
    test.is(resp2.status, 200);
    test.is(resp2.url, '/steam');
    test.is(await resp2.text(), "content,temperature\nsteam,101");
    test.is(fet.pendingCount(), 0);

    test.end();

});


tap.test('testSerialize', function testSerialize(test) {

    let raw = new RawWvLinewiseMock();
    let wvl = new WvLinewise(raw);
    let fet = getWvLinewiseFetch(wvl, 'responses');

    test.is(
        fet.serialize({ opts: { cache: "no-cache", method: "post", body: JSON.stringify({ a: 2 }) }, id: 3, url: '/snow' }),
        'REQUEST: 3: POST: /snow {"cache":"no-cache","body":"{\\"a\\":2}"}'
    );
    test.end()

});

tap.test('testFetchOutputParse', function testFetchOutputParse(test) {


    let raw = new RawWvLinewiseMock();
    let wvl = new WvLinewise(raw);
    let f1 = getWvLinewiseFetch(wvl, 'responses');

    test.deepEquals(f1.parse({id: 1}, 'BODY', ' hello'),{id: 1, body: [' hello'] });
    test.deepEquals(f1.parse({id: 1, body: ['one']}, 'BODY', 'two'),{id: 1, body: ['one', 'two'] });
    test.deepEquals(f1.parse({id: 1}, 'HEADERS', ' {"x":1}'),{id: 1, headers: {"x": "1"}});
    test.deepEquals(f1.parse({id: 1, headers: {"y": "2"}}, 'HEADERS', '{"x":1}'),{id: 1, headers: {"x": "1", "y": "2"}});
    test.deepEquals(f1.parse({id: 1}, 'END', ''),{id: 1, headers: {}, body: [], end: true});

    test.end();

});


tap.test('testManagedFetchOutput', async function testManagedFetchOutput(test) {

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

    function getTimeout(n: number): number {
        return 10;
    }

    function delay(n: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), n);
        });
    }

    function delayAndAdd(n: number, data: string[]) {
        setTimeout(
            () => {
                raw.addStreamData(
                    "responses",
                    data
                );
            },
            n
        );
    }

    let raw = new RawWvlTest();
    let wvl = new WvLinewise(raw);
    let fet = getWvLinewiseManagedFetch(wvl, 'responses', getTimeout);

    // delayAndAdd(
    //     25, 
    //     [
    //         'RESPONSE: 2: BODY:content,temperature',
    //         'RESPONSE: 2: BODY:water,10',
    //         'RESPONSE: 2: END',
    //     ]
    // );

    // delayAndAdd(
    //     35, 
    //     [
    //         'RESPONSE: 3: BODY:content,temperature',
    //         'RESPONSE: 3: BODY:steam,101',
    //         'RESPONSE: 3: END',
    //     ]
    // );

    test.is(fet.running(), false);
    let resp1P = fet('/snow', { cache: "default" });
    test.is(fet.running(), true);
    raw.fire({
        type: RESPONSE_TYPE.LINE,
        data: 'RESPONSE: 1: HEADERS: {"Content-Type": "text/csv"}',
        name: "responses"
    });
    raw.fire({
        type: RESPONSE_TYPE.LINE,
        data: 'RESPONSE: 1: STATUS:  201',
        name: "responses"
    });
    raw.fire({
        type: RESPONSE_TYPE.LINE,
        data: 'RESPONSE: 1: BODY:content,temperature',
        name: "responses"
    });
    raw.fire({
        type: RESPONSE_TYPE.LINE,
        data: 'RESPONSE: 1: BODY:ice,-1',
        name: "responses"
    });
    setTimeout(() => {
    raw.fire({
        type: RESPONSE_TYPE.LINE,
        data: 'RESPONSE: 1: END',
        name: "responses"
    });
    }, 100);
    let resp1 = await resp1P
    test.is(fet.running(), false);
    test.is(await resp1.text(), "content,temperature\nice,-1");
    test.is(resp1.headers.get('Content-Type'), 'text/csv');
    test.end();

        // let resp2P = fet('/snow', { cache: "default" });
        // test.is(fet.running(), true);
        // console.log(resp2P);
        // resp2P.then(async (resp2) => {
        //     test.is(fet.running(), true);
        //     test.is(await resp2.text(), "content,temperature\nwater,10");
        // });

        // let resp3P = fet('/snow', { cache: "default" });
        // test.is(fet.running(), true);
        // console.log(resp3P);
        // resp2P.then(async (resp3) => {
        //     test.is(fet.running(), false);
        //     test.is(await resp3.text(), "content,temperature\nsteam,101");
        //     console.log("END");
        //     test.end();
        // });

    // });
    // test.is(fet.running(), false);




    // for (let i = 0; i < 6; i++) {
    //     await fet.process();
    // }
    // let resp1 = await respP1;
    // test.is(resp1.status, 201);
    // test.is(await resp1.text(), "content,temperature\nwater,-1");
    // test.is(resp1.headers.get('Content-Type'), 'text/csv');
    // test.is(resp1.url, '/snow');
    // test.is(fet.pendingCount(), 0);


    // test.is(fet.pendingCount(), 0);
    // let respP2 = fet('/steam', { cache: "default" });
    // test.is(fet.pendingCount(), 1);
    // for (let i = 0; i < 2; i++) {
    //     await fet.process();
    // }
    // let resp2 = await respP2;
    // test.is(resp2.status, 200);
    // test.is(resp2.url, '/steam');
    // test.is(await resp2.text(), "content,temperature\nsteam,101");
    // test.is(fet.pendingCount(), 0);

});



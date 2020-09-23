import React, {ChangeEvent} from 'react';
import { getErrorHandler } from './error-handler';
import { parse } from "csvrow";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProps, Field, MODE, TypeMatcherSpec } from "./Types"; 
import { getReducer, getTypeMatcher, NEW_BUFFER_LINE, MyReducer, MARK_RECORDS_OLD, SHIFT, MARK_FINISHED, STATS_FOR_FIELD, START_LOADING, FINISH_LOADING, TOGGLE_CONTINUOUS_MODE, isContinuous, getInitialState, SET_HELP_SHOWING } from "./reducer";
import { RawWvLinewise, RawWvLinewiseMock, WvLinewise, runningInWvLinewise, WvLinewiseBuffer, RESPONSE_TYPE, MessageErrorResponse, ErrorResponse, ParamsResponse, StreamListResponse } from "wv-linewise-js-lib";
import {typeMatchesToTypeName} from './lib';

function redraw(state: AppProps) {
  ReactDOM.render(
    <React.StrictMode>
      <App continuousMode={state.continuousMode} loading={state.loading} showingFieldDetails={state.showingFieldDetails} finished={state.finished} totalRecordCount={state.totalRecordCount} oldRecordCount={state.oldRecordCount} records={state.records} header={state.header} deps={state.deps} events={state.events} showingHelp={state.showingHelp}/>
    </React.StrictMode>,
    document.getElementById('react-mount')
  );
}

function needToDisplayMore(): boolean {

  const els = Array.from(document.querySelectorAll("#data-table tbody tr"));
    const rects = els.map(
        (tr) => tr.getBoundingClientRect()
    );

    if (rects.length < 3) { return true; }

    const startAcc = {
        prevBottom: rects[0].bottom,
        count: 0,
        total: 0,
        max: 0,
    }

    const stats = rects.slice(1).reduce(
        (acc: typeof startAcc, rect) => {
            return {
                max: (rect.bottom - acc.prevBottom) > acc.max ?
                    (rect.bottom - acc.prevBottom) :
                    acc.max,
                count: acc.count + 1,
                total: acc.total + (rect.bottom - acc.prevBottom),
                prevBottom: rect.bottom,
            }
        },
        startAcc
    );

    function getHeight(id: string) {
      let  el = document.getElementById(id);
      if (el === null) {
        return 0;
      }
      return el.getBoundingClientRect().height
    }

    let bottom = window.innerHeight - (getHeight("footer") * 1.2)

    if (rects[rects.length - 1].bottom + stats.max <= bottom) {
        return true;
    }

    return false;
}

function tooBig(): boolean {
  const els = Array.from(document.querySelectorAll("#data-table tbody tr:last-child"));
  if (els.length === 0) {
    return false;
  }
  return els[els.length - 1].getBoundingClientRect().bottom > window.innerHeight;
}

async function scroll(state: AppProps, reducer: MyReducer, buffer: WvLinewiseBuffer): Promise<AppProps> {

  state = reducer(state, { type: MARK_RECORDS_OLD });
  state = reducer(state, { type: START_LOADING });
  let line: string | null = "";

  redraw(state);
  while ((line !== null)) {

    line = await buffer.shift();
    if (line === null) {
      state = reducer(state, { type: MARK_FINISHED });
      redraw(state);
      break;
    }

    while ((state.oldRecordCount) && (tooBig())) {
      state = reducer(state, { type: SHIFT });
    }

    if ((state.oldRecordCount) && (state.records.length > 2)) {
      state = reducer(state, { type: SHIFT });
    }

    state = reducer(state, { type: NEW_BUFFER_LINE, line });

    redraw(state);

    if (needToDisplayMore()) {
      continue;
    }

    if (state.oldRecordCount) {
      continue;
    }

    break;
  }

  state = reducer(state, { type: FINISH_LOADING });
  redraw(state);
  return state
}

function getCsvData(typeMatcherSpec: Array<TypeMatcherSpec>, state: AppProps): Array<string|number>[] {

  const headings: (string|number)[][] = [["Column", "Types", "Count", "Total Record Count"]];

  return state.header.reduce(
    (acc: (string|number)[][], head: Field) => {
      const toAdd = head.stats.toArray().map(([th, count]) => {
        return [
          head.name,
          JSON.stringify(typeMatchesToTypeName(typeMatcherSpec, th)),
          count,
          state.totalRecordCount,
        ];
      });
      return acc.concat(toAdd);
    },
    headings
  );

}

function csvEncode(v: string|number) {
  if (typeof v == "string") {
    return '"' + v.replace(/"/g, "\"\"") + '"';
  }
  return v;
}

interface Settings {
  types: TypeMatcherSpec[];
  mode: MODE;
}

async function loadTypes(wvLinewise: WvLinewise): Promise<TypeMatcherSpec[]> {
  if ((await listStreams(wvLinewise)).streams.indexOf("types") === -1) {
    return [];
  }
  let buffer = new WvLinewiseBuffer(wvLinewise, "types", 2, 4);
  let line: string|null = "";
  let headers: Map<string, number> = new Map([["name", -1], ["regexp", -1]]);
  let lineNumber = 1;
  let r: TypeMatcherSpec[] = [];
  while (line !== null) {
    line = await buffer.shift();
    if (line === null) {
      continue;
    }
    if (lineNumber++ === 1) {
      const headerLine = parse(line);
      if ((headerLine.indexOf("regexp") === -1) || (headerLine.indexOf("name") === -1)) {
        wvLinewise.out('ERROR: types CSV must include both a "name" and "regexp" column');
        return [];
      }
      headers.set("regexp", headerLine.indexOf("regexp"));
      headers.set("name", headerLine.indexOf("name"));
      continue;
    }
    let parsed = [];
    try {
      parsed = parse(line);
      r = r.concat(getSpec(
        parsed[headers.get("name") as number],
        parsed[headers.get("regexp") as number]
      ));
    } catch (e) {
      throw new Error(`The types CSV has an invalid line ${line}`);
    }
  }
  return r;
}

interface Spec { name: string; regexp: RegExp; }

function getSpec(name: string, re: string): Spec[] {
  let spec = { name: "", regexp: new RegExp(".") };
  try {
    spec = { name, regexp: new RegExp(re) };
  } catch (e) {
    throw new Error(`The regular expression for type "${name} is ${re}, which is invalid`);
  }
  if (spec.name && spec.name.length > 0) {
    return [spec];
  }
  return [];
}

function getParams(wvl: WvLinewise): Promise<ParamsResponse> {
  return new Promise((resolve) => {
    let f = (resp: ParamsResponse) => {
        resolve(resp);
    };
    wvl.once(RESPONSE_TYPE.PARAMS, f);
    wvl.requestParams();
  });
}

function listStreams(wvl: WvLinewise): Promise<StreamListResponse> {
  return new Promise((resolve) => {
    let f = (resp: StreamListResponse) => {
        resolve(resp);
    };
    wvl.once(RESPONSE_TYPE.STREAM_LIST, f);
    wvl.requestStreamList();
  });
}

async function getSettings(wvLinewise: WvLinewise): Promise<Settings> {

  const paramsResponse = await getParams(wvLinewise);
  const typesRe = /^([^=]+)=(.*)/;

  return paramsResponse.params.reduce(
    (acc: Settings, param) => {
      switch (param.name) {
        case "mode":
          const converter: {[k: string]: MODE} = {
            "manual": MODE.MANUAL,
            "continuous": MODE.CONTINUOUS,
            "continuous-and-exit": MODE.CONTINUOUS_AND_EXIT,
          };
          if (converter.hasOwnProperty(param.value)) {
            return {...acc, mode: converter[param.value]};
          }
          break;
        case "type":
          const m = param.value.match(typesRe);
          if (m) {
            return {...acc, types: acc.types.concat(getSpec(m[1], m[2])) };
          }
          break;
        default:
          return {...acc, types: acc.types.concat(getSpec(param.name, param.value)) };
      }
      return acc;
    },
    { types: await loadTypes(wvLinewise), mode: MODE.MANUAL } as Settings
  );

}

async function run(wvLinewise: WvLinewise) {

  wvLinewise.on(RESPONSE_TYPE.MESSAGE_ERROR, (msg: MessageErrorResponse) => {
    handleError(new Error(`MESSAGE ERROR: ${JSON.stringify(msg)}`), 4);
  });

  wvLinewise.on(RESPONSE_TYPE.ERROR, (msg: ErrorResponse) => {
    handleError(new Error(`Error "${msg.error}" reading stream "${msg.name}"`), 4);
  });

  const settings = await getSettings(wvLinewise);

  let buffer = new WvLinewiseBuffer(wvLinewise, "in", 128, 256);
  let reducer = getReducer(getTypeMatcher(settings.types));

  let more = async () => {
    let cont = true;
    while (cont) {
      state = await scroll(state, reducer, buffer);
      cont = isContinuous(state.continuousMode) && (!state.finished);
    }
    if ((state.continuousMode === MODE.CONTINUOUS_AND_EXIT) && (state.finished)) {
      state.events.exit();
    }
  };

  let state: AppProps = getInitialState(
    settings.types,
    settings.mode,
    (evt: ChangeEvent<HTMLSelectElement>) => {
      let m: MODE = MODE.MANUAL;
      if (evt.target.value === MODE.CONTINUOUS) { m = MODE.CONTINUOUS; }
      if (evt.target.value === MODE.CONTINUOUS_AND_EXIT) { m = MODE.CONTINUOUS_AND_EXIT; }
      state = reducer(state, { type: TOGGLE_CONTINUOUS_MODE, mode: m });
      if (state.continuousMode !== MODE.MANUAL) {
        more();
      }
    },
    more,
    () => {
      const csvData = getCsvData(settings.types, state);
      const csvLines = csvData.map((line) => line.map(csvEncode).join(","));
      csvLines.forEach((line) => {
        wvLinewise.out(line);
      });
      wvLinewise.exit(0)
    },
    (name: Field["name"] | false) => {
      state = reducer(state, { type: STATS_FOR_FIELD, name });
      redraw(state);
    },
    (showing: boolean) => {
      return () => {
        state = reducer(state, { type: SET_HELP_SHOWING, showing });
        redraw(state);
      };
    }
  );

  more();
}

function configureRawWvLinewise(runningInWvLinewise: boolean) {

    if (runningInWvLinewise) {
      // eslint-disable-next-line no-restricted-globals
      return new RawWvLinewise(external as any);
    }

    let mock = new RawWvLinewiseMock();

    const dataIn = [
      "salesPerson,date,orderId,item,cost,price,profit",
      "Jack,8/6/2020,3,Burger,2.99,3,0.01",
      "Jack,8/6/2020,3,Chips,0.99,2,1.01",
      "Jim,9/6/2020,4,Cake,1.49,2,0.51",
      "Alice,,5,Fish,1.19,2,0.81",
      "Alice,11/6/2020,5,Chips,0.99,2,1.01",
      "Alice,11/6/2020,5,Mushy Peas,0.19,0.5,0.31",
      "Kate,11/6/2020,6,Cake,1.49,2,0.51",
      "\"Sam \"\"The Dude\"\" Smith\",8/6/2020,7,Ice Cream,0.79,1.5,0.71",
      "\"Sam \"\"The Dude\"\" Smith\",8/6/2020,8,Cake,1.49,2,0.51",
      "Kate,13/6/2020,9,Chocolate,0.3,0.6,0.3",
      "Kate,14/6/2020,9,Chips,0.49,2,1.51",
      "Kate,15/6/2020,9,Chips,0.39,2,1.61",
      "Kate,15/6/2020,10,Drink,0.1,1,0.9",
    ];
    const dataTypes = [
      "name,regexp",
      "Integer,^-?[0-9]+$",
      "NULL,^$",
      "String,.",
    ]
    mock.addStreamData("in", dataIn)
    mock.addStreamData("types", dataTypes)
    mock.addParam("Full US Date", "^0*[0-9][0-2]?/[0-9]+/[0-9]{4}$");
    mock.addParam("type", "Full UK Date=^[0-9]+/0*[0-9][0-2]?/[0-9]{4}$");
    mock.addParam("mode", "manual");
    return mock;
}

const handleError = getErrorHandler();
window.onerror = (e: Event|string) => {
  handleError(e, 4);
}

run(new WvLinewise(configureRawWvLinewise(runningInWvLinewise())))
  .catch((e: Error) => {
    handleError(e, 4);
  });

// Deliberate commented out - problems with webview
// serviceWorker.unregister();

import { AppProps, TypeMatches, TypeMatcherSpec, Field, TypeName, MODE } from "./Types"; 
import { parse } from "csvrow";
import Im from "immutable";
import { colorScale, typeMatchesToTypeName } from "./lib";
import {Reducer} from "react";

export const NEW_BUFFER_LINE = 'NEW_BUFFER_LINE';
interface ReducerActionNewBufferLine {
    type: typeof NEW_BUFFER_LINE;
    line: string;
}

export const SHIFT = 'SHIFT';
interface ReducerActionShift {
    type: typeof SHIFT;
}

export const MARK_FINISHED = 'MARK_FINISHED';
interface ReducerActionMarkFinished {
    type: typeof MARK_FINISHED;
}

export const START_LOADING = 'START_LOADING';
interface ReducerActionStartLoading {
    type: typeof START_LOADING;
}

export const FINISH_LOADING = 'FINISH_LOADING';
interface ReducerActionFinishLoading {
    type: typeof FINISH_LOADING;
}

export const MARK_RECORDS_OLD = 'MARK_RECORDS_OLD';
interface ReducerActionMarkRecordsOld {
    type: typeof MARK_RECORDS_OLD;
}

export const STATS_FOR_FIELD = 'STATS_FOR_FIELD';
interface ReducerActionStatsForField {
    type: typeof STATS_FOR_FIELD;
    name: string | false;
}

export const TOGGLE_CONTINUOUS_MODE = 'TOGGLE_CONTINUOUS_MODE';
interface ReducerActionToggleContinuousMode {
    type: typeof TOGGLE_CONTINUOUS_MODE;
    mode: MODE;
}

export const SET_HELP_SHOWING = 'SET_HELP_SHOWING';
interface ReducerActionSetHelpShowing {
    type: typeof SET_HELP_SHOWING;
    showing: boolean;
}

type ReducerAction = ReducerActionNewBufferLine | ReducerActionMarkRecordsOld | ReducerActionShift | ReducerActionMarkFinished | ReducerActionStatsForField | ReducerActionStartLoading | ReducerActionFinishLoading | ReducerActionToggleContinuousMode | ReducerActionSetHelpShowing;

interface TypeMatcher {
    (s: TypeName): TypeMatches
}

export function getTypeMatcher(typeMatchers: TypeMatcherSpec[]): TypeMatcher {
    return function typeMatcher(s: string) {
        return typeMatchers.reduce(
            (acc: TypeMatches, tm: TypeMatcherSpec, index) => {
                if (s.match(tm.regexp)) {
                    const bitwise = Math.pow(2, index);
                    return acc | bitwise;
                }
                return acc;
            },
            0 as TypeMatches
        ) as TypeMatches;
    }
}

export function updateFieldStats(header: Field[], typeMatches: TypeMatches[]): Field[] {
    return header.map((head, index) => {
        return {...head,
            stats: head.stats.set(
                typeMatches[index],
                (head.stats.get(typeMatches[index]) || 0) + 1
            )
        };
    })
}

export function isContinuous(mode: MODE): boolean {
  return mode !== MODE.MANUAL;
}

export type MyReducer = Reducer<AppProps, ReducerAction>;

export function getInitialState(tm: TypeMatcherSpec[], continuousMode: MODE, toggleContinuousMode: AppProps["events"]["toggleContinuousMode"], scroll: AppProps["events"]["scroll"], exit: AppProps["events"]["exit"], onClickTableHeading: AppProps["events"]["onClickTableHeading"], help: AppProps["events"]["help"]): AppProps {
  return {
    continuousMode: continuousMode,
    loading: false,
    showingFieldDetails: false,
    finished: false,
    header: [],
    events: {
      help,
      toggleContinuousMode,
      scroll,
      exit,
      onClickTableHeading,
    },
    deps: {
      colorScale,
      typeMatchesToTypeNameBound: typeMatchesToTypeName.bind(null, tm),
    },
    totalRecordCount: 0,
    oldRecordCount: 0,
    records: [],
    showingHelp: false,
  };
}

export function getReducer(typeMatcher: TypeMatcher): MyReducer {
    return function reducer(state: AppProps, action: ReducerAction): AppProps {
        switch (action.type) {
            case SET_HELP_SHOWING:
                return {...state, showingHelp: action.showing };
            case TOGGLE_CONTINUOUS_MODE:
                return {...state, continuousMode: action.mode };
            case START_LOADING:
                return {...state, loading: true };
            case FINISH_LOADING:
                return {...state, loading: false };
            case MARK_FINISHED:
                return {...state, finished: true };
            case SHIFT:
                return {...state,
                    records: state.records.slice(1),
                    oldRecordCount: state.oldRecordCount - 1,
                };
            case MARK_RECORDS_OLD:
                return {...state,
                    oldRecordCount: state.records.length,
                };
            case NEW_BUFFER_LINE:
                let parsed: string[] = parse(action.line);
                if (state.header.length === 0) {
                    return {...state,
                        header: parsed.map((name) => {
                            return {
                                name,
                                stats: Im.Map() as Im.Map<TypeMatches, number>,
                            };
                        }),
                    };
                }
                return {...state,
                    records: state.records.concat([
                        { key: state.totalRecordCount + 1, values: parsed.map((value) => ({ value })), }
                    ]),
                    totalRecordCount: state.totalRecordCount + 1,
                    header: updateFieldStats(
                        state.header,
                        parsed.map((fv) => typeMatcher(fv))
                    )
                };
            case STATS_FOR_FIELD:
                return {...state, showingFieldDetails: action.name };
        }
    }
}


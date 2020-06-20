import Im from "immutable";
import { ChangeEvent } from "react";

export interface TypeMatcherSpec {
    name: TypeName,
    regexp: RegExp
}

export type TypeMatches = number;
export type TypeName = string;

export type FieldStats = Im.Map<TypeMatches, number>;

export interface Field {
  name: string,
  stats: FieldStats,
}

export interface FieldValue {
  value: string,
}

export interface Record {
  key: number;
  values: FieldValue[];
}

export enum MODE {
    MANUAL = "M",
    CONTINUOUS = "C",
    CONTINUOUS_AND_EXIT= "CE",
}

export type AppProps = {
    showingHelp: boolean;
    continuousMode: MODE;
    loading: boolean;
    finished: boolean;
    showingFieldDetails: string | false;
    events: {
        toggleContinuousMode: (evt: ChangeEvent<HTMLSelectElement>) => void;
        scroll: () => void;
        exit: () => void;
        onClickTableHeading: (name: Field["name"] | false) => void;
        help: (b: boolean) => () => void;
    }
    deps: {
        typeMatchesToTypeNameBound: (typeMatches: TypeMatches) => TypeName[];
        colorScale: (i: number) => string;
    },
    totalRecordCount: number;
    oldRecordCount: number;
    header: Field[];
    records: Record[];
}


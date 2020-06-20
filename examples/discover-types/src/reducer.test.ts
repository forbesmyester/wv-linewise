import React from 'react';
import {getTypeMatcher, updateFieldStats, typeMatchesToTypeName} from './reducer';
import {Field} from './Types';
import Im from "immutable";

test('TypeMatcher returns the types that match', () => {
    expect(1).toBe(1);
    const tm = getTypeMatcher([
        { name: "null", regexp: /^$/ },
        { name: "int", regexp: /^-?[0-9]+$/ },
        { name: "string", regexp: /./}
    ]);
    expect(tm("2")).toBe(6);
    expect(tm("")).toBe(1);
    expect(tm("hello")).toBe(4);
});

function forMapComparison<A, B>(m: Map<A, B>): Array<[A, B]> {
    let r: Array<[A, B]> = [];
    for (const [a, b] of m) {
        r.push([a, b]);
    }
    return r;
}

test('updateFieldStats', () => {
    const header: Field[] = [
        { name: "Id", stats: Im.Map([[6,2],[4,1]]) },
        { name: "Name", stats: Im.Map([[4,3]]) },
    ];
    expect(
        updateFieldStats(header, [6, 1]).map(({stats}) => forMapComparison(stats))
    ).toEqual(
        [
            [[6, 3], [4, 1]],
            [[4, 3], [1, 1]]
        ]
    );
});

test('typeMatchesToTypeName', () => {
    const tm = [
        { name: "null", regexp: /^$/ },
        { name: "int", regexp: /^-?[0-9]+$/ },
        { name: "string", regexp: /./}
    ];
    expect(typeMatchesToTypeName(tm, 6)).toEqual(["int", "string"]);
});

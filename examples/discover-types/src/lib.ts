import {TypeMatcherSpec, TypeMatches, TypeName} from "./Types";

export function colorScale(i: number): string {
  const colors = [ '#0b5077', '#e9a380', '#e8c794', '#2eb855', '#e9675c', '#052ab3', '#0205e4', '#50cd4a', '#eb2d4b', '#167f72', '#0f6773'];
  return colors[i % colors.length];
}

export function typeMatchesToTypeName(spec: TypeMatcherSpec[], typeMatches: TypeMatches): TypeName[] {
    let r: TypeName[] = [];
    let index = 0;
    while (typeMatches > 0) {
        if (typeMatches & 1) {
            r.push(spec[index].name);
        }
        typeMatches = typeMatches >> 1;
        index++;
    }
    return r;
}

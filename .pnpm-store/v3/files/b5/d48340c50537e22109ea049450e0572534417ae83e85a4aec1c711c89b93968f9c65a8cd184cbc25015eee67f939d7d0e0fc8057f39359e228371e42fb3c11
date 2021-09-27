export function degrees2radians(n : number) : number {
    return n * (Math.PI / 180);
}

export function max3(a : number, b : number, c : number) {
    let m = a;
    (m < b) && (m = b);
    (m < c) && (m = c);
    return m;
}

export function min3(a : number, b : number, c : number) {
    let m = a;
    (m > b) && (m = b);
    (m > c) && (m = c);
    return m;
}

export function intInRange(value : number, low : number, high : number) {
    if (value > high) value = high;
    if (value < low) value = low;
    return value | 0;
}

export function inRange0to255Rounded(n : number) {
    n = Math.round(n);
    if (n > 255) n = 255;
    else if (n < 0) n = 0;
    return n;
}

export function inRange0to255(n : number) {
    if (n > 255) n = 255;
    else if (n < 0) n = 0;
    return n;
}

export function stableSort<T>(arrayToSort : T[], callback : (a : T, b : T) => number) : T[] {
    const type = typeof arrayToSort[ 0 ];
    let sorted : T[];

    if (type === "number" || type === "string") {
        const ord = Object.create(null);
        for (let i = 0, l = arrayToSort.length; i < l; i++) {
            const val : string = <any>arrayToSort[ i ];
            if (ord[ val ] || ord[ val ] === 0) continue;
            ord[ val ] = i;
        }

        sorted = arrayToSort.sort(function (a, b) {
            return callback(a, b) || ord[ <any>a ] - ord[ <any>b ];
        });
    } else {
        const ord2 : T[] = arrayToSort.slice(0);
        sorted           = arrayToSort.sort(function (a, b) {
            return callback(a, b) || ord2.indexOf(a) - ord2.indexOf(b);
        });
    }

    return sorted;
}


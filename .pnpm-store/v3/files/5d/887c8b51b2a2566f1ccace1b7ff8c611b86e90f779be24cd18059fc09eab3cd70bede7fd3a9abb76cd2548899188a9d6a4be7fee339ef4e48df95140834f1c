/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * wuQuant.ts - part of Image Quantization Library
 */
import { Palette } from "../../utils/palette"
import { Point } from "../../utils/point"
import { PointContainer } from "../../utils/pointContainer"
import { AbstractDistanceCalculator } from "../../distance/abstractDistanceCalculator"

function createArray1D(dimension1 : number) {
    const a : number[] = [];
    for (let k = 0; k < dimension1; k++) {
        a[ k ] = 0;
    }
    return a;
}

function createArray4D(dimension1 : number, dimension2 : number, dimension3 : number, dimension4 : number) : number[][][][] {
    const a = new Array(dimension1);
    for (let i = 0; i < dimension1; i++) {
        a[ i ] = new Array(dimension2);
        for (let j = 0; j < dimension2; j++) {
            a[ i ][ j ] = new Array(dimension3);
            for (let k = 0; k < dimension3; k++) {
                a[ i ][ j ][ k ] = new Array(dimension4);
                for (let l = 0; l < dimension4; l++) {
                    a[ i ][ j ][ k ][ l ] = 0;
                }
            }
        }
    }
    return a;
}

function createArray3D(dimension1 : number, dimension2 : number, dimension3 : number) : number[][][] {
    const a = new Array(dimension1);
    for (let i = 0; i < dimension1; i++) {
        a[ i ] = new Array(dimension2);
        for (let j = 0; j < dimension2; j++) {
            a[ i ][ j ] = new Array(dimension3);
            for (let k = 0; k < dimension3; k++) {
                a[ i ][ j ][ k ] = 0;
            }
        }
    }
    return a;
}

function fillArray3D<T>(a : T[][][], dimension1 : number, dimension2 : number, dimension3 : number, value : T) : void {
    for (let i = 0; i < dimension1; i++) {
        a[ i ] = [];
        for (let j = 0; j < dimension2; j++) {
            a[ i ][ j ] = [];
            for (let k = 0; k < dimension3; k++) {
                a[ i ][ j ][ k ] = value;
            }
        }
    }
}

function fillArray1D<T>(a : T[], dimension1 : number, value : T) : void {
    for (let i = 0; i < dimension1; i++) {
        a[ i ] = value;
    }
}

export class WuColorCube {
    redMinimum : number;
    redMaximum : number;
    greenMinimum : number;
    greenMaximum : number;
    blueMinimum : number;
    blueMaximum : number;
    volume : number;
    alphaMinimum : number;
    alphaMaximum : number;
}

export class WuQuant {

    private static readonly alpha = 3;
    private static readonly red   = 2;
    private static readonly green = 1;
    private static readonly blue  = 0;

    private _reds : number[];
    private _greens : number[];
    private _blues : number[];
    private _alphas : number[];
    private _sums : number[];

    private _weights : number[][][][];
    private _momentsRed : number[][][][];
    private _momentsGreen : number[][][][];
    private _momentsBlue : number[][][][];
    private _momentsAlpha : number[][][][];
    private _moments : number[][][][];

    private _table : number[];
    private _pixels : Point[];

    private _cubes : WuColorCube[];
    private _colors : number;

    private _significantBitsPerChannel : number;
    private _maxSideIndex : number;
    private _alphaMaxSideIndex : number;
    private _sideSize : number;
    private _alphaSideSize : number;

    private readonly _distance : AbstractDistanceCalculator;

    constructor(colorDistanceCalculator : AbstractDistanceCalculator, colors : number = 256, significantBitsPerChannel : number = 5) {
        this._distance = colorDistanceCalculator;
        this._setQuality(significantBitsPerChannel);
        this._initialize(colors);
    }

    sample(image : PointContainer) : void {
        const pointArray = image.getPointArray();

        for (let i = 0, l = pointArray.length; i < l; i++) {
            this._addColor(pointArray[ i ]);
        }

        this._pixels = this._pixels.concat(pointArray);
    }

    quantize() : Palette {
        this._preparePalette();

        const palette : Palette = new Palette();

        // generates palette
        for (let paletteIndex = 0; paletteIndex < this._colors; paletteIndex++) {
            if (this._sums[ paletteIndex ] > 0) {
                const sum = this._sums[ paletteIndex ],
                      r   = this._reds[ paletteIndex ] / sum,
                      g   = this._greens[ paletteIndex ] / sum,
                      b   = this._blues[ paletteIndex ] / sum,
                      a   = this._alphas[ paletteIndex ] / sum;

                const color = Point.createByRGBA(r | 0, g | 0, b | 0, a | 0);
                palette.add(color);
            }
        }

        palette.sort();
        return palette;
    }

    private _preparePalette() : void {
        // preprocess the colors
        this._calculateMoments();

        let next           = 0,
            volumeVariance = createArray1D(this._colors);

        // processes the cubes
        for (let cubeIndex = 1; cubeIndex < this._colors; ++cubeIndex) {
            // if cut is possible; make it
            if (this._cut(this._cubes[ next ], this._cubes[ cubeIndex ])) {
                volumeVariance[ next ]      = this._cubes[ next ].volume > 1 ? this._calculateVariance(this._cubes[ next ]) : 0.0;
                volumeVariance[ cubeIndex ] = this._cubes[ cubeIndex ].volume > 1 ? this._calculateVariance(this._cubes[ cubeIndex ]) : 0.0;
            } else {
                // the cut was not possible, revert the index
                volumeVariance[ next ] = 0.0;
                cubeIndex--;
            }

            next     = 0;
            let temp = volumeVariance[ 0 ];

            for (let index = 1; index <= cubeIndex; ++index) {
                if (volumeVariance[ index ] > temp) {
                    temp = volumeVariance[ index ];
                    next = index;
                }
            }

            if (temp <= 0.0) {
                this._colors = cubeIndex + 1;
                break;
            }
        }

        const lookupRed : number[]   = [],
              lookupGreen : number[] = [],
              lookupBlue : number[]  = [],
              lookupAlpha : number[] = [];

        // precalculates lookup tables
        for (let k = 0; k < this._colors; ++k) {

            const weight = WuQuant._volume(this._cubes[ k ], this._weights);

            if (weight > 0) {
                lookupRed[ k ]   = (WuQuant._volume(this._cubes[ k ], this._momentsRed) / weight) | 0;
                lookupGreen[ k ] = (WuQuant._volume(this._cubes[ k ], this._momentsGreen) / weight) | 0;
                lookupBlue[ k ]  = (WuQuant._volume(this._cubes[ k ], this._momentsBlue) / weight) | 0;
                lookupAlpha[ k ] = (WuQuant._volume(this._cubes[ k ], this._momentsAlpha) / weight) | 0;
            } else {
                lookupRed[ k ]   = 0;
                lookupGreen[ k ] = 0;
                lookupBlue[ k ]  = 0;
                lookupAlpha[ k ] = 0;
            }
        }

        this._reds   = createArray1D(this._colors + 1);
        this._greens = createArray1D(this._colors + 1);
        this._blues  = createArray1D(this._colors + 1);
        this._alphas = createArray1D(this._colors + 1);
        this._sums   = createArray1D(this._colors + 1);

        // scans and adds colors
        for (let index = 0, l = this._pixels.length; index < l; index++) {
            const color : Point = this._pixels[ index ];

            const match = -1;

            let bestMatch    = match,
                bestDistance = Number.MAX_VALUE;

            for (let lookup = 0; lookup < this._colors; lookup++) {
                const foundRed   = lookupRed[ lookup ],
                      foundGreen = lookupGreen[ lookup ],
                      foundBlue  = lookupBlue[ lookup ],
                      foundAlpha = lookupAlpha[ lookup ];

                const distance = this._distance.calculateRaw(foundRed, foundGreen, foundBlue, foundAlpha, color.r, color.g, color.b, color.a);
                //var distance = this._distance.calculateRaw(Utils.Point.createByRGBA(foundRed, foundGreen, foundBlue, foundAlpha), color);
                //deltaRed   = color.r - foundRed,
                //deltaGreen = color.g - foundGreen,
                //deltaBlue  = color.b - foundBlue,
                //deltaAlpha = color.a - foundAlpha,

                //distance   = deltaRed * deltaRed + deltaGreen * deltaGreen + deltaBlue * deltaBlue + deltaAlpha * deltaAlpha;

                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestMatch    = lookup;
                }
            }

            this._reds[ bestMatch ] += color.r;
            this._greens[ bestMatch ] += color.g;
            this._blues[ bestMatch ] += color.b;
            this._alphas[ bestMatch ] += color.a;
            this._sums[ bestMatch ]++;
        }
    }

    private _addColor(color : Point) : void {
        const bitsToRemove = 8 - this._significantBitsPerChannel,
              indexRed     = (color.r >> bitsToRemove) + 1,
              indexGreen   = (color.g >> bitsToRemove) + 1,
              indexBlue    = (color.b >> bitsToRemove) + 1,
              indexAlpha   = (color.a >> bitsToRemove) + 1;

        //if(color.a > 10) {
        this._weights[ indexAlpha ][ indexRed ][ indexGreen ][ indexBlue ]++;
        this._momentsRed[ indexAlpha ][ indexRed ][ indexGreen ][ indexBlue ] += color.r;
        this._momentsGreen[ indexAlpha ][ indexRed ][ indexGreen ][ indexBlue ] += color.g;
        this._momentsBlue[ indexAlpha ][ indexRed ][ indexGreen ][ indexBlue ] += color.b;
        this._momentsAlpha[ indexAlpha ][ indexRed ][ indexGreen ][ indexBlue ] += color.a;
        this._moments[ indexAlpha ][ indexRed ][ indexGreen ][ indexBlue ] += this._table[ color.r ] + this._table[ color.g ] + this._table[ color.b ] + this._table[ color.a ];
//			}
    }

    /**
     * Converts the histogram to a series of _moments.
     */
    private _calculateMoments() : void {
        const area : number[]      = [],
              areaRed : number[]   = [],
              areaGreen : number[] = [],
              areaBlue : number[]  = [],
              areaAlpha : number[] = [],
              area2 : number[]     = [];

        const xarea : number[][][]      = createArray3D(this._sideSize, this._sideSize, this._sideSize),
              xareaRed : number[][][]   = createArray3D(this._sideSize, this._sideSize, this._sideSize),
              xareaGreen : number[][][] = createArray3D(this._sideSize, this._sideSize, this._sideSize),
              xareaBlue : number[][][]  = createArray3D(this._sideSize, this._sideSize, this._sideSize),
              xareaAlpha : number[][][] = createArray3D(this._sideSize, this._sideSize, this._sideSize),
              xarea2 : number[][][]     = createArray3D(this._sideSize, this._sideSize, this._sideSize);

        for (let alphaIndex = 1; alphaIndex <= this._alphaMaxSideIndex; ++alphaIndex) {
            fillArray3D<number>(xarea, this._sideSize, this._sideSize, this._sideSize, 0);
            fillArray3D<number>(xareaRed, this._sideSize, this._sideSize, this._sideSize, 0);
            fillArray3D<number>(xareaGreen, this._sideSize, this._sideSize, this._sideSize, 0);
            fillArray3D<number>(xareaBlue, this._sideSize, this._sideSize, this._sideSize, 0);
            fillArray3D<number>(xareaAlpha, this._sideSize, this._sideSize, this._sideSize, 0);
            fillArray3D<number>(xarea2, this._sideSize, this._sideSize, this._sideSize, 0);

            for (let redIndex = 1; redIndex <= this._maxSideIndex; ++redIndex) {
                fillArray1D<number>(area, this._sideSize, 0);
                fillArray1D<number>(areaRed, this._sideSize, 0);
                fillArray1D<number>(areaGreen, this._sideSize, 0);
                fillArray1D<number>(areaBlue, this._sideSize, 0);
                fillArray1D<number>(areaAlpha, this._sideSize, 0);
                fillArray1D<number>(area2, this._sideSize, 0);

                for (let greenIndex = 1; greenIndex <= this._maxSideIndex; ++greenIndex) {
                    let line      = 0,
                        lineRed   = 0,
                        lineGreen = 0,
                        lineBlue  = 0,
                        lineAlpha = 0,
                        line2     = 0.0;

                    for (let blueIndex = 1; blueIndex <= this._maxSideIndex; ++blueIndex) {
                        line += this._weights[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ];
                        lineRed += this._momentsRed[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ];
                        lineGreen += this._momentsGreen[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ];
                        lineBlue += this._momentsBlue[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ];
                        lineAlpha += this._momentsAlpha[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ];
                        line2 += this._moments[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ];

                        area[ blueIndex ] += line;
                        areaRed[ blueIndex ] += lineRed;
                        areaGreen[ blueIndex ] += lineGreen;
                        areaBlue[ blueIndex ] += lineBlue;
                        areaAlpha[ blueIndex ] += lineAlpha;
                        area2[ blueIndex ] += line2;

                        xarea[ redIndex ][ greenIndex ][ blueIndex ]      = xarea[ redIndex - 1 ][ greenIndex ][ blueIndex ] + area[ blueIndex ];
                        xareaRed[ redIndex ][ greenIndex ][ blueIndex ]   = xareaRed[ redIndex - 1 ][ greenIndex ][ blueIndex ] + areaRed[ blueIndex ];
                        xareaGreen[ redIndex ][ greenIndex ][ blueIndex ] = xareaGreen[ redIndex - 1 ][ greenIndex ][ blueIndex ] + areaGreen[ blueIndex ];
                        xareaBlue[ redIndex ][ greenIndex ][ blueIndex ]  = xareaBlue[ redIndex - 1 ][ greenIndex ][ blueIndex ] + areaBlue[ blueIndex ];
                        xareaAlpha[ redIndex ][ greenIndex ][ blueIndex ] = xareaAlpha[ redIndex - 1 ][ greenIndex ][ blueIndex ] + areaAlpha[ blueIndex ];
                        xarea2[ redIndex ][ greenIndex ][ blueIndex ]     = xarea2[ redIndex - 1 ][ greenIndex ][ blueIndex ] + area2[ blueIndex ];

                        this._weights[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ]      = this._weights[ alphaIndex - 1 ][ redIndex ][ greenIndex ][ blueIndex ] + xarea[ redIndex ][ greenIndex ][ blueIndex ];
                        this._momentsRed[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ]   = this._momentsRed[ alphaIndex - 1 ][ redIndex ][ greenIndex ][ blueIndex ] + xareaRed[ redIndex ][ greenIndex ][ blueIndex ];
                        this._momentsGreen[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ] = this._momentsGreen[ alphaIndex - 1 ][ redIndex ][ greenIndex ][ blueIndex ] + xareaGreen[ redIndex ][ greenIndex ][ blueIndex ];
                        this._momentsBlue[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ]  = this._momentsBlue[ alphaIndex - 1 ][ redIndex ][ greenIndex ][ blueIndex ] + xareaBlue[ redIndex ][ greenIndex ][ blueIndex ];
                        this._momentsAlpha[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ] = this._momentsAlpha[ alphaIndex - 1 ][ redIndex ][ greenIndex ][ blueIndex ] + xareaAlpha[ redIndex ][ greenIndex ][ blueIndex ];
                        this._moments[ alphaIndex ][ redIndex ][ greenIndex ][ blueIndex ]      = this._moments[ alphaIndex - 1 ][ redIndex ][ greenIndex ][ blueIndex ] + xarea2[ redIndex ][ greenIndex ][ blueIndex ];
                    }
                }
            }
        }
    }

    /**
     * Computes the volume of the cube in a specific moment.
     */
    private static _volumeFloat(cube : WuColorCube, moment : number[][][][]) : number {
        return (moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMaximum ] -
            moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMaximum ] -
            moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMaximum ] +
            moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ] -
            moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMaximum ] +
            moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMaximum ] +
            moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMaximum ] -
            moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ]) -

            (moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMinimum ] -
            moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMinimum ] -
            moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] +
            moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] -
            moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] +
            moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] +
            moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ] -
            moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]);
    }

    /**
     * Computes the volume of the cube in a specific moment.
     */
    private static _volume(cube : WuColorCube, moment : number[][][][]) : number {
        return WuQuant._volumeFloat(cube, moment) | 0;
    }

    /**
     * Splits the cube in given position][and color direction.
     */
    private static _top(cube : WuColorCube, direction : number, position : number, moment : number[][][][]) : number {
        let result : number;
        switch (direction) {
            case WuQuant.alpha:
                result = (moment[ position ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMaximum ] -
                    moment[ position ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMaximum ] -
                    moment[ position ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMaximum ] +
                    moment[ position ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ]) -
                    (moment[ position ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMinimum ] -
                    moment[ position ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] -
                    moment[ position ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] +
                    moment[ position ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]);
                break;

            case WuQuant.red:
                result = (moment[ cube.alphaMaximum ][ position ][ cube.greenMaximum ][ cube.blueMaximum ] -
                    moment[ cube.alphaMaximum ][ position ][ cube.greenMinimum ][ cube.blueMaximum ] -
                    moment[ cube.alphaMinimum ][ position ][ cube.greenMaximum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMinimum ][ position ][ cube.greenMinimum ][ cube.blueMaximum ]) -
                    (moment[ cube.alphaMaximum ][ position ][ cube.greenMaximum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMaximum ][ position ][ cube.greenMinimum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMinimum ][ position ][ cube.greenMaximum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ position ][ cube.greenMinimum ][ cube.blueMinimum ]);
                break;

            case WuQuant.green:
                result = (moment[ cube.alphaMaximum ][ cube.redMaximum ][ position ][ cube.blueMaximum ] -
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ position ][ cube.blueMaximum ] -
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ position ][ cube.blueMaximum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ position ][ cube.blueMaximum ]) -
                    (moment[ cube.alphaMaximum ][ cube.redMaximum ][ position ][ cube.blueMinimum ] -
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ position ][ cube.blueMinimum ] -
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ position ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ position ][ cube.blueMinimum ]);
                break;

            case WuQuant.blue:
                result = (moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMaximum ][ position ] -
                    moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMinimum ][ position ] -
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMaximum ][ position ] +
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ position ]) -
                    (moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMaximum ][ position ] -
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ position ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ position ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ position ]);
                break;
            default:
                throw new Error("impossible")
        }

        return result | 0;
    }

    /**
     * Splits the cube in a given color direction at its minimum.
     */
    private static _bottom(cube : WuColorCube, direction : number, moment : number[][][][]) : number {
        switch (direction) {
            case WuQuant.alpha:
                return (-moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMaximum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ]) -
                    (-moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]);

            case WuQuant.red:
                return (-moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMaximum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ]) -
                    (-moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]);

            case WuQuant.green:
                return (-moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ] +
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMaximum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMaximum ]) -
                    (-moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]);

            case WuQuant.blue:
                return (-moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMaximum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMaximum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]) -
                    (-moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMaximum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMaximum ][ cube.greenMinimum ][ cube.blueMinimum ] +
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMaximum ][ cube.blueMinimum ] -
                    moment[ cube.alphaMinimum ][ cube.redMinimum ][ cube.greenMinimum ][ cube.blueMinimum ]);

            default:
                // TODO: why here is return 0, and in this._top there is no default at all (now it is throw error)?
                return 0;
        }
    }

    /**
     * Calculates statistical variance for a given cube.
     */
    private  _calculateVariance(cube : WuColorCube) : number {
        const volumeRed    = WuQuant._volume(cube, this._momentsRed),
              volumeGreen  = WuQuant._volume(cube, this._momentsGreen),
              volumeBlue   = WuQuant._volume(cube, this._momentsBlue),
              volumeAlpha  = WuQuant._volume(cube, this._momentsAlpha),
              volumeMoment = WuQuant._volumeFloat(cube, this._moments),
              volumeWeight = WuQuant._volume(cube, this._weights),
              distance     = volumeRed * volumeRed + volumeGreen * volumeGreen + volumeBlue * volumeBlue + volumeAlpha * volumeAlpha;

        return volumeMoment - (distance / volumeWeight);
    }

    /**
     * Finds the optimal (maximal) position for the cut.
     */
    private _maximize(cube : WuColorCube, direction : number, first : number, last : number, wholeRed : number, wholeGreen : number, wholeBlue : number, wholeAlpha : number, wholeWeight : number) : {max : number; position : number} {
        const bottomRed    = WuQuant._bottom(cube, direction, this._momentsRed) | 0,
              bottomGreen  = WuQuant._bottom(cube, direction, this._momentsGreen) | 0,
              bottomBlue   = WuQuant._bottom(cube, direction, this._momentsBlue) | 0,
              bottomAlpha  = WuQuant._bottom(cube, direction, this._momentsAlpha) | 0,
              bottomWeight = WuQuant._bottom(cube, direction, this._weights) | 0;

        let result      = 0.0,
            cutPosition = -1;

        for (let position = first; position < last; ++position) {
            // determines the cube cut at a certain position
            let halfRed    = bottomRed + WuQuant._top(cube, direction, position, this._momentsRed),
                halfGreen  = bottomGreen + WuQuant._top(cube, direction, position, this._momentsGreen),
                halfBlue   = bottomBlue + WuQuant._top(cube, direction, position, this._momentsBlue),
                halfAlpha  = bottomAlpha + WuQuant._top(cube, direction, position, this._momentsAlpha),
                halfWeight = bottomWeight + WuQuant._top(cube, direction, position, this._weights);

            // the cube cannot be cut at bottom (this would lead to empty cube)
            if (halfWeight != 0) {
                let halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha,
                    temp         = halfDistance / halfWeight;

                halfRed    = wholeRed - halfRed;
                halfGreen  = wholeGreen - halfGreen;
                halfBlue   = wholeBlue - halfBlue;
                halfAlpha  = wholeAlpha - halfAlpha;
                halfWeight = wholeWeight - halfWeight;

                if (halfWeight != 0) {
                    halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
                    temp += halfDistance / halfWeight;

                    if (temp > result) {
                        result      = temp;
                        cutPosition = position;
                    }
                }
            }
        }

        return { max : result, position : cutPosition };
    }

    // Cuts a cube with another one.
    private _cut(first : WuColorCube, second : WuColorCube) : boolean {
        let direction : number;

        const wholeRed    = WuQuant._volume(first, this._momentsRed),
              wholeGreen  = WuQuant._volume(first, this._momentsGreen),
              wholeBlue   = WuQuant._volume(first, this._momentsBlue),
              wholeAlpha  = WuQuant._volume(first, this._momentsAlpha),
              wholeWeight = WuQuant._volume(first, this._weights),

              red         = this._maximize(first, WuQuant.red, first.redMinimum + 1, first.redMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight),
              green       = this._maximize(first, WuQuant.green, first.greenMinimum + 1, first.greenMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight),
              blue        = this._maximize(first, WuQuant.blue, first.blueMinimum + 1, first.blueMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight),
              alpha       = this._maximize(first, WuQuant.alpha, first.alphaMinimum + 1, first.alphaMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);

        if (alpha.max >= red.max && alpha.max >= green.max && alpha.max >= blue.max) {
            direction = WuQuant.alpha;

            // cannot split empty cube
            if (alpha.position < 0) return false;
        } else {
            if (red.max >= alpha.max && red.max >= green.max && red.max >= blue.max) {
                direction = WuQuant.red;
            } else if (green.max >= alpha.max && green.max >= red.max && green.max >= blue.max) {
                direction = WuQuant.green;
            } else {
                direction = WuQuant.blue;
            }
        }

        second.redMaximum   = first.redMaximum;
        second.greenMaximum = first.greenMaximum;
        second.blueMaximum  = first.blueMaximum;
        second.alphaMaximum = first.alphaMaximum;

        // cuts in a certain direction
        switch (direction) {
            case WuQuant.red:
                second.redMinimum = first.redMaximum = red.position;
                second.greenMinimum = first.greenMinimum;
                second.blueMinimum  = first.blueMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;

            case WuQuant.green:
                second.greenMinimum = first.greenMaximum = green.position;
                second.redMinimum   = first.redMinimum;
                second.blueMinimum  = first.blueMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;

            case WuQuant.blue:
                second.blueMinimum = first.blueMaximum = blue.position;
                second.redMinimum   = first.redMinimum;
                second.greenMinimum = first.greenMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;

            case WuQuant.alpha:
                second.alphaMinimum = first.alphaMaximum = alpha.position;
                second.blueMinimum  = first.blueMinimum;
                second.redMinimum   = first.redMinimum;
                second.greenMinimum = first.greenMinimum;
                break;
        }

        // determines the volumes after cut
        first.volume  = (first.redMaximum - first.redMinimum) * (first.greenMaximum - first.greenMinimum) * (first.blueMaximum - first.blueMinimum) * (first.alphaMaximum - first.alphaMinimum);
        second.volume = (second.redMaximum - second.redMinimum) * (second.greenMaximum - second.greenMinimum) * (second.blueMaximum - second.blueMinimum) * (second.alphaMaximum - second.alphaMinimum);

        // the cut was successful
        return true;
    }

    private _initialize(colors : number) : void {
        this._colors = colors;

        // creates all the _cubes
        this._cubes = [];

        // initializes all the _cubes
        for (let cubeIndex = 0; cubeIndex < colors; cubeIndex++) {
            this._cubes[ cubeIndex ] = new WuColorCube();
        }

        // resets the reference minimums
        this._cubes[ 0 ].redMinimum   = 0;
        this._cubes[ 0 ].greenMinimum = 0;
        this._cubes[ 0 ].blueMinimum  = 0;
        this._cubes[ 0 ].alphaMinimum = 0;

        // resets the reference maximums
        this._cubes[ 0 ].redMaximum   = this._maxSideIndex;
        this._cubes[ 0 ].greenMaximum = this._maxSideIndex;
        this._cubes[ 0 ].blueMaximum  = this._maxSideIndex;
        this._cubes[ 0 ].alphaMaximum = this._alphaMaxSideIndex;

        this._weights      = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsRed   = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsGreen = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsBlue  = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsAlpha = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._moments      = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);

        this._table = [];
        for (let tableIndex = 0; tableIndex < 256; ++tableIndex) {
            this._table[ tableIndex ] = tableIndex * tableIndex;
        }

        this._pixels = [];
    }

    private _setQuality(significantBitsPerChannel : number = 5) : void {
        this._significantBitsPerChannel = significantBitsPerChannel;
        this._maxSideIndex              = 1 << this._significantBitsPerChannel;
        this._alphaMaxSideIndex         = this._maxSideIndex;

        this._sideSize      = this._maxSideIndex + 1;
        this._alphaSideSize = this._alphaMaxSideIndex + 1;
    }

}


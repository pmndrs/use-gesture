/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ditherErrorDiffusionArray.ts - part of Image Quantization Library
 */
import { IImageDitherer } from "./common"
import { AbstractDistanceCalculator } from "../distance/abstractDistanceCalculator"
import { PointContainer } from "../utils/pointContainer"
import { Palette } from "../utils/palette"
import { Point } from "../utils/point"
import { inRange0to255Rounded } from "../utils/arithmetic"

// TODO: is it the best name for this enum "kernel"?
export enum ErrorDiffusionArrayKernel {
    FloydSteinberg = 0,
    FalseFloydSteinberg,
    Stucki,
    Atkinson,
    Jarvis,
    Burkes,
    Sierra,
    TwoSierra,
    SierraLite
}

// http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
export class ErrorDiffusionArray implements IImageDitherer {
    private _minColorDistance : number;
    private _serpentine : boolean;
    private _kernel : number[][];
    /** true = GIMP, false = XNVIEW */
            private _calculateErrorLikeGIMP : boolean;

    private _distance : AbstractDistanceCalculator;

    constructor(colorDistanceCalculator : AbstractDistanceCalculator, kernel : ErrorDiffusionArrayKernel, serpentine : boolean = true, minimumColorDistanceToDither : number = 0, calculateErrorLikeGIMP : boolean = false) {
        this._setKernel(kernel);

        this._distance               = colorDistanceCalculator;
        this._minColorDistance       = minimumColorDistanceToDither;
        this._serpentine             = serpentine;
        this._calculateErrorLikeGIMP = calculateErrorLikeGIMP;
    }

    // adapted from http://jsbin.com/iXofIji/2/edit by PAEz
    // fixed version. it doesn't use image pixels as error storage, also it doesn't have 0.3 + 0.3 + 0.3 + 0.3 = 0 error
    quantize(pointBuffer : PointContainer, palette : Palette) : PointContainer {
        const pointArray                = pointBuffer.getPointArray(),
              originalPoint             = new Point(),
              width                     = pointBuffer.getWidth(),
              height                    = pointBuffer.getHeight(),
              errorLines : number[][][] = [];

        let dir           = 1,
            maxErrorLines = 1;

        // initial error lines (number is taken from dithering kernel)
        for (let i = 0; i < this._kernel.length; i++) {
            const kernelErrorLines = this._kernel[ i ][ 2 ] + 1;
            if (maxErrorLines < kernelErrorLines) maxErrorLines = kernelErrorLines;
        }
        for (let i = 0; i < maxErrorLines; i++) {
            this._fillErrorLine(errorLines[ i ] = [], width);
        }

        for (let y = 0; y < height; y++) {
            // always serpentine
            if (this._serpentine) dir = dir * -1;

            const lni    = y * width,
                  xStart = dir == 1 ? 0 : width - 1,
                  xEnd   = dir == 1 ? width : -1;

            // cyclic shift with erasing
            this._fillErrorLine(errorLines[ 0 ], width);
            // TODO: why it is needed to cast types here?
            errorLines.push(<number[][]>errorLines.shift());

            const errorLine = errorLines[ 0 ];
            for (let x = xStart, idx = lni + xStart; x !== xEnd; x += dir, idx += dir) {
                // Image pixel
                const point = pointArray[ idx ],
                      //originalPoint = new Utils.Point(),
                      error = errorLine[ x ];

                originalPoint.from(point);

                const correctedPoint = Point.createByRGBA(
                    inRange0to255Rounded(point.r + error[ 0 ]),
                    inRange0to255Rounded(point.g + error[ 1 ]),
                    inRange0to255Rounded(point.b + error[ 2 ]),
                    inRange0to255Rounded(point.a + error[ 3 ])
                );

                // Reduced pixel
                const palettePoint = palette.getNearestColor(this._distance, correctedPoint);
                point.from(palettePoint);

                // dithering strength
                if (this._minColorDistance) {
                    const dist = this._distance.calculateNormalized(point, palettePoint);
                    if (dist < this._minColorDistance) continue;
                }

                // Component distance
                let er : number, eg : number, eb : number, ea : number;
                if (this._calculateErrorLikeGIMP) {
                    er = correctedPoint.r - palettePoint.r;
                    eg = correctedPoint.g - palettePoint.g;
                    eb = correctedPoint.b - palettePoint.b;
                    ea = correctedPoint.a - palettePoint.a;
                } else {
                    er = originalPoint.r - palettePoint.r;
                    eg = originalPoint.g - palettePoint.g;
                    eb = originalPoint.b - palettePoint.b;
                    ea = originalPoint.a - palettePoint.a;
                }

                const dStart = dir == 1 ? 0 : this._kernel.length - 1,
                      dEnd   = dir == 1 ? this._kernel.length : -1;

                for (let i = dStart; i !== dEnd; i += dir) {
                    const x1 = this._kernel[ i ][ 1 ] * dir,
                          y1 = this._kernel[ i ][ 2 ];

                    if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
                        const d = this._kernel[ i ][ 0 ],
                              e = errorLines[ y1 ][ x1 + x ];

                        e[ 0 ] = e[ 0 ] + er * d;
                        e[ 1 ] = e[ 1 ] + eg * d;
                        e[ 2 ] = e[ 2 ] + eb * d;
                        e[ 3 ] = e[ 3 ] + ea * d;
                    }
                }
            }
        }

        return pointBuffer;
    }

    private _fillErrorLine(errorLine : number[][], width : number) : void {
        // shrink
        if (errorLine.length > width) {
            errorLine.length = width;
        }

        // reuse existing arrays
        const l = errorLine.length;
        for (let i = 0; i < l; i++) {
            const error = errorLine[ i ];
            error[ 0 ]  = error[ 1 ] = error[ 2 ] = error[ 3 ] = 0;
        }

        // create missing arrays
        for (let i = l; i < width; i++) {
            errorLine[ i ] = [ 0.0, 0.0, 0.0, 0.0 ];
        }
    }

    private _setKernel(kernel : ErrorDiffusionArrayKernel) {
        switch (kernel) {
            case ErrorDiffusionArrayKernel.FloydSteinberg:
                this._kernel = [
                    [ 7 / 16, 1, 0 ],
                    [ 3 / 16, -1, 1 ],
                    [ 5 / 16, 0, 1 ],
                    [ 1 / 16, 1, 1 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.FalseFloydSteinberg:
                this._kernel = [
                    [ 3 / 8, 1, 0 ],
                    [ 3 / 8, 0, 1 ],
                    [ 2 / 8, 1, 1 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.Stucki:
                this._kernel = [
                    [ 8 / 42, 1, 0 ],
                    [ 4 / 42, 2, 0 ],
                    [ 2 / 42, -2, 1 ],
                    [ 4 / 42, -1, 1 ],
                    [ 8 / 42, 0, 1 ],
                    [ 4 / 42, 1, 1 ],
                    [ 2 / 42, 2, 1 ],
                    [ 1 / 42, -2, 2 ],
                    [ 2 / 42, -1, 2 ],
                    [ 4 / 42, 0, 2 ],
                    [ 2 / 42, 1, 2 ],
                    [ 1 / 42, 2, 2 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.Atkinson:
                this._kernel = [
                    [ 1 / 8, 1, 0 ],
                    [ 1 / 8, 2, 0 ],
                    [ 1 / 8, -1, 1 ],
                    [ 1 / 8, 0, 1 ],
                    [ 1 / 8, 1, 1 ],
                    [ 1 / 8, 0, 2 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.Jarvis:
                this._kernel = [			// Jarvis, Judice, and Ninke / JJN?
                    [ 7 / 48, 1, 0 ],
                    [ 5 / 48, 2, 0 ],
                    [ 3 / 48, -2, 1 ],
                    [ 5 / 48, -1, 1 ],
                    [ 7 / 48, 0, 1 ],
                    [ 5 / 48, 1, 1 ],
                    [ 3 / 48, 2, 1 ],
                    [ 1 / 48, -2, 2 ],
                    [ 3 / 48, -1, 2 ],
                    [ 5 / 48, 0, 2 ],
                    [ 3 / 48, 1, 2 ],
                    [ 1 / 48, 2, 2 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.Burkes:
                this._kernel = [
                    [ 8 / 32, 1, 0 ],
                    [ 4 / 32, 2, 0 ],
                    [ 2 / 32, -2, 1 ],
                    [ 4 / 32, -1, 1 ],
                    [ 8 / 32, 0, 1 ],
                    [ 4 / 32, 1, 1 ],
                    [ 2 / 32, 2, 1 ],
                ];
                break;

            case ErrorDiffusionArrayKernel.Sierra:
                this._kernel = [
                    [ 5 / 32, 1, 0 ],
                    [ 3 / 32, 2, 0 ],
                    [ 2 / 32, -2, 1 ],
                    [ 4 / 32, -1, 1 ],
                    [ 5 / 32, 0, 1 ],
                    [ 4 / 32, 1, 1 ],
                    [ 2 / 32, 2, 1 ],
                    [ 2 / 32, -1, 2 ],
                    [ 3 / 32, 0, 2 ],
                    [ 2 / 32, 1, 2 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.TwoSierra:
                this._kernel = [
                    [ 4 / 16, 1, 0 ],
                    [ 3 / 16, 2, 0 ],
                    [ 1 / 16, -2, 1 ],
                    [ 2 / 16, -1, 1 ],
                    [ 3 / 16, 0, 1 ],
                    [ 2 / 16, 1, 1 ],
                    [ 1 / 16, 2, 1 ]
                ];
                break;

            case ErrorDiffusionArrayKernel.SierraLite:
                this._kernel = [
                    [ 2 / 4, 1, 0 ],
                    [ 1 / 4, -1, 1 ],
                    [ 1 / 4, 0, 1 ]
                ];
                break;

            default:
                throw new Error("ErrorDiffusionArray: unknown kernel = " + kernel);
        }
    }
}



/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cie94.ts - part of Image Quantization Library
 */
import { AbstractDistanceCalculator } from "./abstractDistanceCalculator"
import { rgb2lab } from "../conversion/rgb2lab"
import { inRange0to255 } from "../utils/arithmetic"

/**
 * CIE94 method of delta-e
 * http://en.wikipedia.org/wiki/Color_difference#CIE94
 */
export abstract class AbstractCIE94 extends AbstractDistanceCalculator {
    /**
     * Weight in distance: 0.25
     * Max DeltaE: 100
     * Max DeltaA: 255
     */
    protected _kA : number;
    protected _Kl : number;
    protected _K1 : number;
    protected _K2 : number;

    calculateRaw(r1 : number, g1 : number, b1 : number, a1 : number, r2 : number, g2 : number, b2 : number, a2 : number) : number {
        const lab1 = rgb2lab(inRange0to255(r1 * this._whitePoint.r), inRange0to255(g1 * this._whitePoint.g), inRange0to255(b1 * this._whitePoint.b)),
              lab2 = rgb2lab(inRange0to255(r2 * this._whitePoint.r), inRange0to255(g2 * this._whitePoint.g), inRange0to255(b2 * this._whitePoint.b));

        const dL = lab1.L - lab2.L,
              dA = lab1.a - lab2.a,
              dB = lab1.b - lab2.b,
              c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b),
              c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b),
              dC = c1 - c2;

        let deltaH = dA * dA + dB * dB - dC * dC;
        deltaH     = deltaH < 0 ? 0 : Math.sqrt(deltaH);

        const dAlpha = (a2 - a1) * this._whitePoint.a * this._kA;

        // TODO: add alpha channel support
        return Math.sqrt(
            Math.pow(dL / this._Kl, 2) +
            Math.pow(dC / (1.0 + this._K1 * c1), 2) +
            Math.pow(deltaH / (1.0 + this._K2 * c1), 2) +
            Math.pow(dAlpha, 2)
        );
    }
}

export class CIE94Textiles extends AbstractCIE94 {
    protected _setDefaults() {
        this._Kl = 2.0;
        this._K1 = 0.048;
        this._K2 = 0.014;
        this._kA = 0.25 * 50 / 255;
    }
}

export class CIE94GraphicArts extends AbstractCIE94 {
    protected _setDefaults() {
        this._Kl = 1.0;
        this._K1 = 0.045;
        this._K2 = 0.015;
        this._kA = 0.25 * 100 / 255;
    }
}

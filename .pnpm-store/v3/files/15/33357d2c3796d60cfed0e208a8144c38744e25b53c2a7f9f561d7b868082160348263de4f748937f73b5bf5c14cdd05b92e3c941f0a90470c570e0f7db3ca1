/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * euclidean.ts - part of Image Quantization Library
 */
import { AbstractDistanceCalculator } from "./abstractDistanceCalculator"
import { Y } from "../constants/bt709"

/**
 * Euclidean color distance
 */
export class AbstractEuclidean extends AbstractDistanceCalculator {
    protected _kR : number;
    protected _kG : number;
    protected _kB : number;
    protected _kA : number;

    calculateRaw(r1 : number, g1 : number, b1 : number, a1 : number, r2 : number, g2 : number, b2 : number, a2 : number) : number {
        const dR = r2 - r1, dG = g2 - g1, dB = b2 - b1, dA = a2 - a1;
        return Math.sqrt(this._kR * dR * dR + this._kG * dG * dG + this._kB * dB * dB + this._kA * dA * dA);
    }
}

export class Euclidean extends AbstractEuclidean {
    protected _setDefaults() {
        this._kR = 1;
        this._kG = 1;
        this._kB = 1;
        this._kA = 1;
    }
}

/**
 * Euclidean color distance (RgbQuant modification w Alpha)
 */
export class EuclideanRgbQuantWithAlpha extends AbstractEuclidean {
    protected _setDefaults() {
        this._kR = Y.RED;
        this._kG = Y.GREEN;
        this._kB = Y.BLUE;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    }
}

/**
 * Euclidean color distance (RgbQuant modification w/o Alpha)
 */
export class EuclideanRgbQuantWOAlpha extends AbstractEuclidean {
    protected _setDefaults() {
        this._kR = Y.RED;
        this._kG = Y.GREEN;
        this._kB = Y.BLUE;
        this._kA = 0;
    }
}

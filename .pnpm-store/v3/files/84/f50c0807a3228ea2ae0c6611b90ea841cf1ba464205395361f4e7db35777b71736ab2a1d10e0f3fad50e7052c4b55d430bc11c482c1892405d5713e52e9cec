/*
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */

/**
 * @preserve TypeScript port:
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */

import { Palette } from "../../utils/palette"
import { Point } from "../../utils/point"
import { PointContainer } from "../../utils/pointContainer"
import { AbstractDistanceCalculator } from "../../distance/abstractDistanceCalculator"
import { IPaletteQuantizer } from "../common"

// bias for colour values
const networkBiasShift = 3;

class Neuron {
    r : number;
    g : number;
    b : number;
    a : number;

    constructor(defaultValue : number) {
        this.r = this.g = this.b = this.a = defaultValue;
    }

    /**
     * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
     * @example
     * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
     */
    toPoint() : Point {
        return Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
    }

    subtract(r : number, g : number, b : number, a : number) : void {
        this.r -= r | 0;
        this.g -= g | 0;
        this.b -= b | 0;
        this.a -= a | 0;
    }

    /*
     public subtract(r : number, g : number, b : number, a : number) : void {
     this.r = (-r + this.r) | 0;
     this.g = (-g + this.g) | 0;
     this.b = (-b + this.b) | 0;
     this.a = (-a + this.a) | 0;

     this.r -= r;
     this.g -= g;
     this.b -= b;
     this.a -= a;

     this.r -= r | 0;
     this.g -= g | 0;
     this.b -= b | 0;
     this.a -= a | 0;
     }
     */
}

export class NeuQuant implements IPaletteQuantizer {
    /*
     four primes near 500 - assume no image has a length so large
     that it is divisible by all four primes
     */
    private static readonly _prime1 : number          = 499;
    private static readonly _prime2 : number          = 491;
    private static readonly _prime3 : number          = 487;
    private static readonly _prime4 : number          = 503;
    private static readonly _minpicturebytes : number = NeuQuant._prime4;

    // no. of learning cycles
    private static readonly _nCycles : number = 100;

    // defs for freq and bias
    private static readonly _initialBiasShift : number = 16;

    // bias for fractions
    private static readonly _initialBias : number = (1 << NeuQuant._initialBiasShift);
    private static readonly _gammaShift : number  = 10;

    // gamma = 1024
    // TODO: why gamma is never used?
    //private static _gamma : number     = (1 << NeuQuant._gammaShift);
    private static readonly _betaShift : number = 10;
    private static readonly _beta : number      = (NeuQuant._initialBias >> NeuQuant._betaShift);

    // beta = 1/1024
    private static readonly _betaGamma : number = (NeuQuant._initialBias << (NeuQuant._gammaShift - NeuQuant._betaShift));

    /*
     * for 256 cols, radius starts
     */
    private static readonly _radiusBiasShift : number = 6;

    // at 32.0 biased by 6 bits
    private static readonly _radiusBias : number = 1 << NeuQuant._radiusBiasShift;

    // and decreases by a factor of 1/30 each cycle
    private static readonly _radiusDecrease : number = 30;

    /* defs for decreasing alpha factor */

    // alpha starts at 1.0
    private static readonly _alphaBiasShift : number = 10;

    // biased by 10 bits
    private static readonly _initAlpha : number = (1 << NeuQuant._alphaBiasShift);

    /* radBias and alphaRadBias used for radpower calculation */
    private static readonly _radBiasShift : number      = 8;
    private static readonly _radBias : number           = 1 << NeuQuant._radBiasShift;
    private static readonly _alphaRadBiasShift : number = NeuQuant._alphaBiasShift + NeuQuant._radBiasShift;
    private static readonly _alphaRadBias : number      = 1 << NeuQuant._alphaRadBiasShift;

    private _pointArray : Point[];
    private readonly _networkSize : number;
    private _network : Neuron[];

    /** sampling factor 1..30 */
    private readonly _sampleFactor : number;
    private _radPower : number[];

    // bias and freq arrays for learning
    private _freq : number[];

    /* for network lookup - really 256 */
    private _bias : number[];
    private readonly _distance : AbstractDistanceCalculator;

    constructor(colorDistanceCalculator : AbstractDistanceCalculator, colors : number = 256) {
        this._distance     = colorDistanceCalculator;
        this._pointArray   = [];
        this._sampleFactor = 1;
        this._networkSize  = colors;

        this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
    }

    sample(pointBuffer : PointContainer) : void {
        this._pointArray = this._pointArray.concat(pointBuffer.getPointArray());
    }

    quantize() : Palette {
        this._init();
        this._learn();

        return this._buildPalette();
    }

    private _init() : void {
        this._freq     = [];
        this._bias     = [];
        this._radPower = [];
        this._network  = [];
        for (let i = 0; i < this._networkSize; i++) {
            this._network[ i ] = new Neuron((i << (networkBiasShift + 8)) / this._networkSize | 0);

            // 1/this._networkSize
            this._freq[ i ] = NeuQuant._initialBias / this._networkSize | 0;
            this._bias[ i ] = 0;
        }
    }

    /**
     * Main Learning Loop
     */
    private _learn() : void {
        let sampleFactor   = this._sampleFactor;
        const pointsNumber = this._pointArray.length;
        if (pointsNumber < NeuQuant._minpicturebytes) sampleFactor = 1;

        const alphadec       = 30 + (sampleFactor - 1) / 3 | 0,
              pointsToSample = pointsNumber / sampleFactor | 0;

        let delta  = pointsToSample / NeuQuant._nCycles | 0,
            alpha  = NeuQuant._initAlpha,
            radius = (this._networkSize >> 3) * NeuQuant._radiusBias;

        let rad = radius >> NeuQuant._radiusBiasShift;
        if (rad <= 1) rad = 0;

        for (let i = 0; i < rad; i++) {
            this._radPower[ i ] = alpha * (((rad * rad - i * i) * NeuQuant._radBias) / (rad * rad)) >>> 0;
        }

        let step : number;
        if (pointsNumber < NeuQuant._minpicturebytes) {
            step = 1;
        } else if (pointsNumber % NeuQuant._prime1 != 0) {
            step = NeuQuant._prime1;
        } else if ((pointsNumber % NeuQuant._prime2) != 0) {
            step = NeuQuant._prime2;
        } else if ((pointsNumber % NeuQuant._prime3) != 0) {
            step = NeuQuant._prime3;
        } else {
            step = NeuQuant._prime4;
        }

        for (let i = 0, pointIndex = 0; i < pointsToSample;) {
            const point       = this._pointArray[ pointIndex ],
                  b           = point.b << networkBiasShift,
                  g           = point.g << networkBiasShift,
                  r           = point.r << networkBiasShift,
                  a           = point.a << networkBiasShift,
                  neuronIndex = this._contest(b, g, r, a);

            this._alterSingle(alpha, neuronIndex, b, g, r, a);
            if (rad !== 0) this._alterNeighbour(rad, neuronIndex, b, g, r, a);

            /* alter neighbours */
            pointIndex += step;
            if (pointIndex >= pointsNumber) pointIndex -= pointsNumber;
            i++;

            if (delta === 0) delta = 1;

            if (i % delta === 0) {
                alpha -= (alpha / alphadec) | 0;
                radius -= (radius / NeuQuant._radiusDecrease) | 0;
                rad = radius >> NeuQuant._radiusBiasShift;

                if (rad <= 1) rad = 0;
                for (let j = 0; j < rad; j++) this._radPower[ j ] = alpha * (((rad * rad - j * j) * NeuQuant._radBias) / (rad * rad)) >>> 0;
            }
        }
    }

    private _buildPalette() : Palette {
        const palette = new Palette();

        this._network.forEach(neuron => {
            palette.add(neuron.toPoint());
        });

        palette.sort();
        return palette;
    }

    /**
     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
     */
    private _alterNeighbour(rad : number, i : number, b : number, g : number, r : number, al : number) : void {
        let lo = i - rad;
        if (lo < -1) lo = -1;

        let hi = i + rad;
        if (hi > this._networkSize) hi = this._networkSize;

        let j = i + 1,
            k = i - 1,
            m = 1;

        while (j < hi || k > lo) {
            const a = this._radPower[ m++ ] / NeuQuant._alphaRadBias;
            if (j < hi) {
                const p = this._network[ j++ ];
                p.subtract(
                    a * (p.r - r),
                    a * (p.g - g),
                    a * (p.b - b),
                    a * (p.a - al)
                );
            }

            if (k > lo) {
                const p = this._network[ k-- ];
                p.subtract(
                    a * (p.r - r),
                    a * (p.g - g),
                    a * (p.b - b),
                    a * (p.a - al)
                );
            }
        }
    }

    /**
     * Move neuron i towards biased (b,g,r) by factor alpha
     */
    private _alterSingle(alpha : number, i : number, b : number, g : number, r : number, a : number) : void {
        alpha /= NeuQuant._initAlpha;

        /* alter hit neuron */
        const n = this._network[ i ];
        n.subtract(
            alpha * (n.r - r),
            alpha * (n.g - g),
            alpha * (n.b - b),
            alpha * (n.a - a)
        );
    }

    /**
     * Search for biased BGR values
     * description:
     *    finds closest neuron (min dist) and updates freq
     *    finds best neuron (min dist-bias) and returns position
     *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
     *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
     *
     * Original distance equation:
     *        dist = abs(dR) + abs(dG) + abs(dB)
     */
    private _contest(b : number, g : number, r : number, a : number) : number {
        const multiplier = (255 * 4) << networkBiasShift;

        let bestd       = ~(1 << 31),
            bestbiasd   = bestd,
            bestpos     = -1,
            bestbiaspos = bestpos;

        for (let i = 0; i < this._networkSize; i++) {
            const n    = this._network[ i ],
                  dist = this._distance.calculateNormalized(<any>n, <any>{ r, g, b, a }) * multiplier | 0;

            if (dist < bestd) {
                bestd   = dist;
                bestpos = i;
            }

            const biasdist = dist - ((this._bias[ i ]) >> (NeuQuant._initialBiasShift - networkBiasShift));
            if (biasdist < bestbiasd) {
                bestbiasd   = biasdist;
                bestbiaspos = i;
            }
            const betafreq = (this._freq[ i ] >> NeuQuant._betaShift);
            this._freq[ i ] -= betafreq;
            this._bias[ i ] += (betafreq << NeuQuant._gammaShift);
        }
        this._freq[ bestpos ] += NeuQuant._beta;
        this._bias[ bestpos ] -= NeuQuant._betaGamma;
        return bestbiaspos;
    }
}


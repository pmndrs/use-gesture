/**
 * @preserve TypeScript port:
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */
import { Palette } from "../../utils/palette";
import { PointContainer } from "../../utils/pointContainer";
import { AbstractDistanceCalculator } from "../../distance/abstractDistanceCalculator";
import { IPaletteQuantizer } from "../common";
export declare class NeuQuantFloat implements IPaletteQuantizer {
    private static readonly _prime1;
    private static readonly _prime2;
    private static readonly _prime3;
    private static readonly _prime4;
    private static readonly _minpicturebytes;
    private static readonly _nCycles;
    private static readonly _initialBiasShift;
    private static readonly _initialBias;
    private static readonly _gammaShift;
    private static readonly _betaShift;
    private static readonly _beta;
    private static readonly _betaGamma;
    private static readonly _radiusBiasShift;
    private static readonly _radiusBias;
    private static readonly _radiusDecrease;
    private static readonly _alphaBiasShift;
    private static readonly _initAlpha;
    private static readonly _radBiasShift;
    private static readonly _radBias;
    private static readonly _alphaRadBiasShift;
    private static readonly _alphaRadBias;
    private _pointArray;
    private readonly _networkSize;
    private _network;
    /** sampling factor 1..30 */
    private readonly _sampleFactor;
    private _radPower;
    private _freq;
    private _bias;
    private readonly _distance;
    constructor(colorDistanceCalculator: AbstractDistanceCalculator, colors?: number);
    sample(pointBuffer: PointContainer): void;
    quantize(): Palette;
    private _init();
    /**
     * Main Learning Loop
     */
    private _learn();
    private _buildPalette();
    /**
     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
     */
    private _alterNeighbour(rad, i, b, g, r, al);
    /**
     * Move neuron i towards biased (b,g,r) by factor alpha
     */
    private _alterSingle(alpha, i, b, g, r, a);
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
    private _contest(b, g, r, al);
}

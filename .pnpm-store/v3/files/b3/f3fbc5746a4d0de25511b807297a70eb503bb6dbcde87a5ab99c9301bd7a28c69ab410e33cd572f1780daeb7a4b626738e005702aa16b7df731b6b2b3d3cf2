/**
 * @preserve TypeScript port:
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgbquant.ts - part of Image Quantization Library
 */
import { Palette } from "../../utils/palette";
import { PointContainer } from "../../utils/pointContainer";
import { AbstractDistanceCalculator } from "../../distance/abstractDistanceCalculator";
import { IPaletteQuantizer } from "../common";
export declare class RGBQuant implements IPaletteQuantizer {
    private readonly _colors;
    private readonly _initialDistance;
    private readonly _distanceIncrement;
    private readonly _histogram;
    private readonly _distance;
    constructor(colorDistanceCalculator: AbstractDistanceCalculator, colors?: number, method?: number);
    sample(image: PointContainer): void;
    quantize(): Palette;
    private _buildPalette(idxi32);
}

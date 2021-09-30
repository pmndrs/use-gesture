/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */
import { IPaletteQuantizer } from "./palette/common";
import { AbstractDistanceCalculator } from "./distance/abstractDistanceCalculator";
import { IImageDitherer } from "./image/common";
import { PointContainer } from "./utils/pointContainer";
import { Palette } from "./utils/palette";
export declare class IQ {
    private paletteQuantizer;
    private distanceCalculator;
    private ditherer;
    constructor(colors: number, DistanceCalculator: new () => AbstractDistanceCalculator, Quantizer: new (distanceCalculator: AbstractDistanceCalculator, color: number) => IPaletteQuantizer, ditherer: IImageDitherer);
    sample(image: PointContainer): void;
    buildPalette(): Palette;
    buildImage(image: PointContainer, palette: Palette): PointContainer;
    compare(image1: PointContainer, image2: PointContainer): number;
}

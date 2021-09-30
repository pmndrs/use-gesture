/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */
// TODO: do we need this helper?

import { IPaletteQuantizer } from "./palette/common"
import { AbstractDistanceCalculator } from "./distance/abstractDistanceCalculator"
import { IImageDitherer } from "./image/common"
import { PointContainer } from "./utils/pointContainer"
import { Palette } from "./utils/palette"
import { SSIM } from "./quality/ssim"

export class IQ {
    private paletteQuantizer : IPaletteQuantizer;
    private distanceCalculator : AbstractDistanceCalculator;
    private ditherer : IImageDitherer;

    constructor(colors : number, DistanceCalculator : new() => AbstractDistanceCalculator, Quantizer : new(distanceCalculator : AbstractDistanceCalculator, color : number) => IPaletteQuantizer, ditherer : IImageDitherer) {
        this.ditherer           = ditherer;
        this.distanceCalculator = new DistanceCalculator();
        this.paletteQuantizer   = new Quantizer(this.distanceCalculator, colors);
    }

    sample(image : PointContainer) : void {
        this.paletteQuantizer.sample(image);
    }

    buildPalette() : Palette {
        return this.paletteQuantizer.quantize();
    }

    buildImage(image : PointContainer, palette : Palette) : PointContainer {
        return this.ditherer.quantize(image, palette);
    }

    compare(image1 : PointContainer, image2 : PointContainer) {
        return new SSIM().compare(image1, image2)
    }
}


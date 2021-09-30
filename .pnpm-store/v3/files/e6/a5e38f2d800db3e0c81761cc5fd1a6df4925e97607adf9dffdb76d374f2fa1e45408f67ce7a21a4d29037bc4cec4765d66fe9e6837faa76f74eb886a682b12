/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * nearestColor.ts - part of Image Quantization Library
 */
import { IImageDitherer } from "./common"
import { AbstractDistanceCalculator } from "../distance/abstractDistanceCalculator"
import { PointContainer } from "../utils/pointContainer"
import { Palette } from "../utils/palette"

export class NearestColor implements IImageDitherer {
    private _distance : AbstractDistanceCalculator;

    constructor(colorDistanceCalculator : AbstractDistanceCalculator) {
        this._distance = colorDistanceCalculator;
    }

    quantize(pointBuffer : PointContainer, palette : Palette) : PointContainer {
        const pointArray = pointBuffer.getPointArray(),
              width      = pointBuffer.getWidth(),
              height     = pointBuffer.getHeight();

        for (let y = 0; y < height; y++) {
            for (let x = 0, idx = y * width; x < width; x++, idx++) {
                // Image pixel
                const point = pointArray[ idx ];
                // Reduced pixel
                point.from(palette.getNearestColor(this._distance, point));
            }
        }
        return pointBuffer;
    }
}



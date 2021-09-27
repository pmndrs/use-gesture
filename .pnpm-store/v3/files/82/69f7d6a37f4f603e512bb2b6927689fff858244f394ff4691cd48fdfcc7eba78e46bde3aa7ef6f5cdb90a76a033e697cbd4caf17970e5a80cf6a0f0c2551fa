/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ssim.ts - part of Image Quantization Library
 */
import { PointContainer } from "../utils/pointContainer"
import { Y } from "../constants/bt709"

// based on https://github.com/rhys-e/structural-similarity
// http://en.wikipedia.org/wiki/Structural_similarity
const K1 = 0.01,
      K2 = 0.03;

export class SSIM {
    compare(image1 : PointContainer, image2 : PointContainer) {
        if (image1.getHeight() !== image2.getHeight() || image1.getWidth() !== image2.getWidth()) {
            throw new Error("Images have different sizes!");
        }

        const bitsPerComponent = 8,
              L                = (1 << bitsPerComponent) - 1,
              c1               = Math.pow((K1 * L), 2),
              c2               = Math.pow((K2 * L), 2);

        let numWindows = 0,
            mssim      = 0.0;

        //calculate ssim for each window
        this._iterate(image1, image2, (lumaValues1 : number[], lumaValues2 : number[], averageLumaValue1 : number, averageLumaValue2 : number) => {
            //calculate variance and covariance
            let sigxy  = 0.0,
                sigsqx = 0.0,
                sigsqy = 0.0;

            for (let i = 0; i < lumaValues1.length; i++) {
                sigsqx += Math.pow((lumaValues1[ i ] - averageLumaValue1), 2);
                sigsqy += Math.pow((lumaValues2[ i ] - averageLumaValue2), 2);

                sigxy += (lumaValues1[ i ] - averageLumaValue1) * (lumaValues2[ i ] - averageLumaValue2);
            }

            const numPixelsInWin = lumaValues1.length - 1;
            sigsqx /= numPixelsInWin;
            sigsqy /= numPixelsInWin;
            sigxy /= numPixelsInWin;

            //perform ssim calculation on window
            const numerator   = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2),
                  denominator = (Math.pow(averageLumaValue1, 2) + Math.pow(averageLumaValue2, 2) + c1) * (sigsqx + sigsqy + c2),
                  ssim        = numerator / denominator;

            mssim += ssim;
            numWindows++;

        });
        return mssim / numWindows;
    }

    private _iterate(image1 : PointContainer, image2 : PointContainer, callback : (lumaValues1 : number[], lumaValues2 : number[], averageLumaValue1 : number, averageLumaValue2 : number) => void) {
        const windowSize = 8,
              width      = image1.getWidth(),
              height     = image1.getHeight();

        for (let y = 0; y < height; y += windowSize) {
            for (let x = 0; x < width; x += windowSize) {
                // avoid out-of-width/height
                const windowWidth  = Math.min(windowSize, width - x),
                      windowHeight = Math.min(windowSize, height - y);

                const lumaValues1  = this._calculateLumaValuesForWindow(image1, x, y, windowWidth, windowHeight),
                      lumaValues2  = this._calculateLumaValuesForWindow(image2, x, y, windowWidth, windowHeight),
                      averageLuma1 = this._calculateAverageLuma(lumaValues1),
                      averageLuma2 = this._calculateAverageLuma(lumaValues2);

                callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
            }
        }
    }

    private _calculateLumaValuesForWindow(image : PointContainer, x : number, y : number, width : number, height : number) : number[] {
        const pointArray            = image.getPointArray(),
              lumaValues : number[] = [];

        let counter = 0;

        for (let j = y; j < y + height; j++) {
            const offset = j * image.getWidth();
            for (let i = x; i < x + width; i++) {
                const point           = pointArray[ offset + i ];
                lumaValues[ counter ] = point.r * Y.RED + point.g * Y.GREEN + point.b * Y.BLUE;
                counter++;
            }
        }

        return lumaValues;
    }

    private _calculateAverageLuma(lumaValues : number[]) : number {
        let sumLuma = 0.0;
        for (let i = 0; i < lumaValues.length; i++) {
            sumLuma += lumaValues[ i ];
        }

        return sumLuma / lumaValues.length;
    }

}


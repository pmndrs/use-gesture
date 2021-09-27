/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ciede2000.ts - part of Image Quantization Library
 */
import { AbstractDistanceCalculator } from "./abstractDistanceCalculator";
import { rgb2lab } from "../conversion/rgb2lab";
import { degrees2radians, inRange0to255 } from "../utils/arithmetic";

/**
 * CIEDE2000 algorithm - Adapted from Sharma et al's MATLAB implementation at
 * http://www.ece.rochester.edu/~gsharma/ciede2000/
 */
export class CIEDE2000 extends AbstractDistanceCalculator {
    /**
     * Weight in distance: 0.25
     * Max DeltaE: 100
     * Max DeltaA: 255
     */
    private static readonly _kA                   = 0.25 * 100 / 255;
    private static readonly _pow25to7 : number    = Math.pow(25, 7);
    private static readonly _deg360InRad : number = degrees2radians(360);
    private static readonly _deg180InRad : number = degrees2radians(180);
    private static readonly _deg30InRad : number  = degrees2radians(30);
    private static readonly _deg6InRad : number   = degrees2radians(6);
    private static readonly _deg63InRad : number  = degrees2radians(63);
    private static readonly _deg275InRad : number = degrees2radians(275);
    private static readonly _deg25InRad : number  = degrees2radians(25);

    calculateRaw(r1 : number, g1 : number, b1 : number, a1 : number, r2 : number, g2 : number, b2 : number, a2 : number) : number {
        const lab1 = rgb2lab(inRange0to255(r1 * this._whitePoint.r), inRange0to255(g1 * this._whitePoint.g), inRange0to255(b1 * this._whitePoint.b)),
              lab2 = rgb2lab(inRange0to255(r2 * this._whitePoint.r), inRange0to255(g2 * this._whitePoint.g), inRange0to255(b2 * this._whitePoint.b)),
              dA   = (a2 - a1) * this._whitePoint.a * CIEDE2000._kA,
              dE2  = this.calculateRawInLab(lab1, lab2);

        return Math.sqrt(dE2 + dA * dA);
    }

    calculateRawInLab(Lab1 : {L : number; a : number; b : number}, Lab2 : {L : number; a : number; b : number}) : number {
        // Get L,a,b values for color 1
        const L1 = Lab1.L,
              a1 = Lab1.a,
              b1 = Lab1.b;

        // Get L,a,b values for color 2
        const L2 = Lab2.L,
              a2 = Lab2.a,
              b2 = Lab2.b;

        // Calculate Cprime1, Cprime2, Cabbar
        const C1                  = Math.sqrt(a1 * a1 + b1 * b1),
              C2                  = Math.sqrt(a2 * a2 + b2 * b2),
              pow_a_C1_C2_to_7    = Math.pow((C1 + C2) / 2.0, 7.0),

              G                   = 0.5 * (1.0 - Math.sqrt(pow_a_C1_C2_to_7 / (pow_a_C1_C2_to_7 + CIEDE2000._pow25to7))), //25^7
              a1p                 = (1.0 + G) * a1,
              a2p                 = (1.0 + G) * a2,

              C1p                 = Math.sqrt(a1p * a1p + b1 * b1),
              C2p                 = Math.sqrt(a2p * a2p + b2 * b2),
              C1pC2p              = C1p * C2p,

              // Angles in Degree.
              h1p                 = CIEDE2000._calculatehp(b1, a1p),
              h2p                 = CIEDE2000._calculatehp(b2, a2p),
              h_bar               = Math.abs(h1p - h2p),
              dLp                 = L2 - L1,
              dCp                 = C2p - C1p,
              dHp                 = CIEDE2000._calculate_dHp(C1pC2p, h_bar, h2p, h1p),
              ahp                 = CIEDE2000._calculate_ahp(C1pC2p, h_bar, h1p, h2p),

              T                   = CIEDE2000._calculateT(ahp),

              aCp                 = (C1p + C2p) / 2.0,
              aLp_minus_50_square = Math.pow((L1 + L2) / 2.0 - 50.0, 2.0),
              S_L                 = 1.0 + (.015 * aLp_minus_50_square) / Math.sqrt(20.0 + aLp_minus_50_square),
              S_C                 = 1.0 + .045 * aCp,
              S_H                 = 1.0 + .015 * T * aCp,

              R_T                 = CIEDE2000._calculateRT(ahp, aCp),

              dLpSL               = dLp / S_L, // S_L * kL, where kL is 1.0
              dCpSC               = dCp / S_C, // S_C * kC, where kC is 1.0
              dHpSH               = dHp / S_H; // S_H * kH, where kH is 1.0

        return Math.pow(dLpSL, 2) + Math.pow(dCpSC, 2) + Math.pow(dHpSH, 2) + R_T * dCpSC * dHpSH;
    }

    private static _calculatehp(b : number, ap : number) {
        const hp = Math.atan2(b, ap);
        if (hp >= 0) return hp;
        return hp + CIEDE2000._deg360InRad;
    }

    private static _calculateRT(ahp : number, aCp : number) {
        const aCp_to_7    = Math.pow(aCp, 7.0),
              R_C         = 2.0 * Math.sqrt(aCp_to_7 / (aCp_to_7 + CIEDE2000._pow25to7)), // 25^7
              delta_theta = CIEDE2000._deg30InRad * Math.exp(-Math.pow((ahp - CIEDE2000._deg275InRad) / CIEDE2000._deg25InRad, 2.0));
        return -Math.sin(2.0 * delta_theta) * R_C;
    }

    private static _calculateT(ahp : number) {
        return 1.0 - .17 * Math.cos(ahp - CIEDE2000._deg30InRad) + .24 * Math.cos(ahp * 2.0) + .32 * Math.cos(ahp * 3.0 + CIEDE2000._deg6InRad) - .2 * Math.cos(ahp * 4.0 - CIEDE2000._deg63InRad);
    }

    private static _calculate_ahp(C1pC2p : number, h_bar : number, h1p : number, h2p : number) {
        const hpSum = h1p + h2p;
        if (C1pC2p == 0) return hpSum;
        if (h_bar <= CIEDE2000._deg180InRad) return hpSum / 2.0;
        if (hpSum < CIEDE2000._deg360InRad) return (hpSum + CIEDE2000._deg360InRad) / 2.0;
        return (hpSum - CIEDE2000._deg360InRad) / 2.0;
    }

    private static _calculate_dHp(C1pC2p : number, h_bar : number, h2p : number, h1p : number) {
        let dhp : number;
        if (C1pC2p == 0) {
            dhp = 0;
        } else if (h_bar <= CIEDE2000._deg180InRad) {
            dhp = h2p - h1p;
        } else if (h2p <= h1p) {
            dhp = h2p - h1p + CIEDE2000._deg360InRad;
        } else {
            dhp = h2p - h1p - CIEDE2000._deg360InRad;
        }
        return 2.0 * Math.sqrt(C1pC2p) * Math.sin(dhp / 2.0);
    }
}

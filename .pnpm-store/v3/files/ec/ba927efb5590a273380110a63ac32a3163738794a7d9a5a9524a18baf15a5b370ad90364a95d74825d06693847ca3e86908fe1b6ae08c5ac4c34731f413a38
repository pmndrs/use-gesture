import { PointContainer } from "../../utils/pointContainer";
export declare class ColorHistogram {
    private static _boxSize;
    private static _boxPixels;
    private static _hueGroups;
    private _method;
    private _hueStats;
    private _histogram;
    private _initColors;
    private _minHueCols;
    constructor(method: number, colors: number);
    sample(pointBuffer: PointContainer): void;
    getImportanceSortedColorsIDXI32(): number[];
    private _colorStats1D(pointBuffer);
    private _colorStats2D(pointBuffer);
    private _iterateBox(bbox, wid, fn);
    /**
     *    partitions a rectangle of width x height into
     *    array of boxes stepX x stepY (or less)
     */
    private _makeBoxes(width, height, stepX, stepY);
}

import { IGatsbyImageData } from ".";
export declare const DEFAULT_BREAKPOINTS: number[];
export declare const EVERY_BREAKPOINT: number[];
export declare type Fit = "cover" | "fill" | "inside" | "outside" | "contain";
export declare type Layout = "fixed" | "fullWidth" | "constrained";
export declare type ImageFormat = "jpg" | "png" | "webp" | "avif" | "auto" | "";
/**
 * The minimal required reporter, as we don't want to import it from gatsby-cli
 */
export interface IReporter {
    warn(message: string): void;
}
export interface ISharpGatsbyImageArgs {
    layout?: Layout;
    formats?: Array<ImageFormat>;
    placeholder?: "tracedSVG" | "dominantColor" | "blurred" | "none";
    tracedSVGOptions?: Record<string, unknown>;
    width?: number;
    height?: number;
    aspectRatio?: number;
    sizes?: string;
    quality?: number;
    transformOptions?: {
        fit?: Fit;
        cropFocus?: number | string;
    };
    jpgOptions?: Record<string, unknown>;
    pngOptions?: Record<string, unknown>;
    webpOptions?: Record<string, unknown>;
    avifOptions?: Record<string, unknown>;
    blurredOptions?: {
        width?: number;
        toFormat?: ImageFormat;
    };
    breakpoints?: Array<number>;
    backgroundColor?: string;
}
export interface IImageSizeArgs {
    width?: number;
    height?: number;
    layout?: Layout;
    filename: string;
    outputPixelDensities?: Array<number>;
    breakpoints?: Array<number>;
    fit?: Fit;
    reporter?: IReporter;
    sourceMetadata: {
        width: number;
        height: number;
    };
}
export interface IImageSizes {
    sizes: Array<number>;
    presentationWidth: number;
    presentationHeight: number;
    aspectRatio: number;
    unscaledWidth: number;
}
export interface IImage {
    src: string;
    width: number;
    height: number;
    format: ImageFormat;
}
export interface IGatsbyImageHelperArgs {
    pluginName: string;
    generateImageSource: (filename: string, width: number, height: number, format: ImageFormat, fit?: Fit, options?: Record<string, unknown>) => IImage;
    layout?: Layout;
    formats?: Array<ImageFormat>;
    filename: string;
    placeholderURL?: string;
    width?: number;
    height?: number;
    sizes?: string;
    reporter?: IReporter;
    sourceMetadata?: {
        width: number;
        height: number;
        format: ImageFormat;
    };
    fit?: Fit;
    options?: Record<string, unknown>;
    breakpoints?: Array<number>;
    backgroundColor?: string;
    aspectRatio?: number;
}
export declare const getSizes: (width: number, layout: Layout) => string | undefined;
export declare const getSrcSet: (images: Array<IImage>) => string;
export declare function formatFromFilename(filename: string): ImageFormat | undefined;
export declare function setDefaultDimensions(args: IGatsbyImageHelperArgs): IGatsbyImageHelperArgs;
/**
 * Use this for getting an image for the blurred placeholder. This ensures the
 * aspect ratio and crop match the main image
 */
export declare function getLowResolutionImageURL(args: IGatsbyImageHelperArgs, width?: number): string;
export declare function generateImageData(args: IGatsbyImageHelperArgs): IGatsbyImageData;
export declare function calculateImageSizes(args: IImageSizeArgs): IImageSizes;
export declare function fixedImageSizes({ filename, sourceMetadata: imgDimensions, width, height, fit, outputPixelDensities, reporter, }: IImageSizeArgs): IImageSizes;
export declare function responsiveImageSizes({ sourceMetadata: imgDimensions, width, height, fit, outputPixelDensities, breakpoints, layout, }: IImageSizeArgs): IImageSizes;
export declare function getDimensionsAndAspectRatio(dimensions: any, options: any): {
    width: number;
    height: number;
    aspectRatio: number;
};
//# sourceMappingURL=image-utils.d.ts.map
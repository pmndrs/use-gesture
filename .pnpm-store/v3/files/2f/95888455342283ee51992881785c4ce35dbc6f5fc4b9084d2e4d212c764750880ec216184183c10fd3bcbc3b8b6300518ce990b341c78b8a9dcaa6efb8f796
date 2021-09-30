import { CSSProperties, HTMLAttributes, ImgHTMLAttributes, SetStateAction, Dispatch, RefObject } from "react";
import { Node } from "gatsby";
import { PlaceholderProps } from "./placeholder";
import { MainImageProps } from "./main-image";
import type { IGatsbyImageData } from "./gatsby-image.browser";
import { Layout, ImageFormat } from "../image-utils";
export declare const hasNativeLazyLoadSupport: () => boolean;
export declare function gatsbyImageIsInstalled(): boolean;
export declare function storeImageloaded(cacheKey?: string): void;
export declare function hasImageLoaded(cacheKey: string): boolean;
export declare type IGatsbyImageDataParent<T = never> = T & {
    gatsbyImageData: IGatsbyImageData;
};
export declare type FileNode = Node & {
    childImageSharp?: IGatsbyImageDataParent<Node>;
};
export declare type ImageDataLike = FileNode | IGatsbyImageDataParent | IGatsbyImageData;
export declare const getImage: (node: ImageDataLike) => IGatsbyImageData | undefined;
export declare const getSrc: (node: ImageDataLike) => string | undefined;
export declare const getSrcSet: (node: ImageDataLike) => string | undefined;
export declare function getWrapperProps(width: number, height: number, layout: Layout): Pick<HTMLAttributes<HTMLElement>, "className" | "style"> & {
    "data-gatsby-image-wrapper": string;
};
export declare function applyPolyfill(ref: RefObject<HTMLImageElement>): Promise<void>;
export interface IUrlBuilderArgs<OptionsType> {
    width: number;
    height: number;
    baseUrl: string;
    format: ImageFormat;
    options: OptionsType;
}
export interface IGetImageDataArgs<OptionsType = Record<string, unknown>> {
    baseUrl: string;
    /**
     * For constrained and fixed images, the size of the image element
     */
    width?: number;
    height?: number;
    /**
     * If available, pass the source image width and height
     */
    sourceWidth?: number;
    sourceHeight?: number;
    /**
     * If only one dimension is passed, then this will be used to calculate the other.
     */
    aspectRatio?: number;
    layout?: Layout;
    /**
     * Returns a URL based on the passed arguments. Should be a pure function
     */
    urlBuilder: (args: IUrlBuilderArgs<OptionsType>) => string;
    /**
     * Should be a data URI
     */
    placeholderURL?: string;
    backgroundColor?: string;
    /**
     * Used in error messages etc
     */
    pluginName?: string;
    /**
     * If you do not support auto-format, pass an array of image types here
     */
    formats?: Array<ImageFormat>;
    breakpoints?: Array<number>;
    /**
     * Passed to the urlBuilder function
     */
    options?: OptionsType;
}
/**
 * Use this hook to generate gatsby-plugin-image data in the browser.
 */
export declare function getImageData<OptionsType>({ baseUrl, urlBuilder, sourceWidth, sourceHeight, pluginName, formats, breakpoints, options, ...props }: IGetImageDataArgs<OptionsType>): IGatsbyImageData;
export declare function getMainProps(isLoading: boolean, isLoaded: boolean, images: IGatsbyImageData["images"], loading?: "eager" | "lazy", toggleLoaded?: (loaded: boolean) => void, cacheKey?: string, ref?: RefObject<HTMLImageElement>, style?: CSSProperties): Partial<MainImageProps>;
export declare type PlaceholderImageAttrs = ImgHTMLAttributes<HTMLImageElement> & Pick<PlaceholderProps, "sources" | "fallback"> & {
    "data-placeholder-image"?: string;
};
export declare function getPlaceholderProps(placeholder: PlaceholderImageAttrs | undefined, isLoaded: boolean, layout: Layout, width?: number, height?: number, backgroundColor?: string, objectFit?: CSSProperties["objectFit"], objectPosition?: CSSProperties["objectPosition"]): PlaceholderImageAttrs;
export declare function useImageLoaded(cacheKey: string, loading: "lazy" | "eager", ref: any): {
    isLoaded: boolean;
    isLoading: boolean;
    toggleLoaded: Dispatch<SetStateAction<boolean>>;
};
export interface IArtDirectedImage {
    media: string;
    image: IGatsbyImageData;
}
/**
 * Generate a Gatsby image data object with multiple, art-directed images that display at different
 * resolutions.
 *
 * @param defaultImage The image displayed when no media query matches.
 * It is also used for all other settings applied to the image, such as width, height and layout.
 * You should pass a className to the component with media queries to adjust the size of the container,
 * as this cannot be adjusted automatically.
 * @param artDirected Array of objects which each contains a `media` string which is a media query
 * such as `(min-width: 320px)`, and the image object to use when that query matches.
 */
export declare function withArtDirection(defaultImage: IGatsbyImageData, artDirected: Array<IArtDirectedImage>): IGatsbyImageData;
//# sourceMappingURL=hooks.d.ts.map
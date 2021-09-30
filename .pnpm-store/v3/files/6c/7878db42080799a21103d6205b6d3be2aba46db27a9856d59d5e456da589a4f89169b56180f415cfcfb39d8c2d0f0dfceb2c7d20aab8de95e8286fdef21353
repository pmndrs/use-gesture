import React, { ImgHTMLAttributes } from "react";
export interface IResponsiveImageProps {
    sizes?: string;
    srcSet: string;
}
export declare type SourceProps = IResponsiveImageProps & ({
    media: string;
    type?: string;
} | {
    media?: string;
    type: string;
});
declare type FallbackProps = {
    src: string;
} & Partial<IResponsiveImageProps>;
export declare type PictureProps = ImgHTMLAttributes<HTMLImageElement> & {
    fallback?: FallbackProps;
    sources?: Array<SourceProps>;
    alt: string;
    shouldLoad?: boolean;
};
export declare const Picture: React.ForwardRefExoticComponent<React.ImgHTMLAttributes<HTMLImageElement> & {
    fallback?: FallbackProps;
    sources?: Array<SourceProps>;
    alt: string;
    shouldLoad?: boolean;
} & React.RefAttributes<HTMLImageElement>>;
export {};
//# sourceMappingURL=picture.d.ts.map
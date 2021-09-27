import { ElementType, FunctionComponent, ImgHTMLAttributes, CSSProperties } from "react";
import { PlaceholderProps } from "./placeholder";
import { MainImageProps } from "./main-image";
import { Layout } from "../image-utils";
export interface GatsbyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "placeholder" | "onLoad" | "src" | "srcSet" | "width" | "height"> {
    alt: string;
    as?: ElementType;
    className?: string;
    class?: string;
    imgClassName?: string;
    image: IGatsbyImageData;
    imgStyle?: CSSProperties;
    backgroundColor?: string;
    objectFit?: CSSProperties["objectFit"];
    objectPosition?: CSSProperties["objectPosition"];
    onLoad?: () => void;
    onError?: () => void;
    onStartLoad?: (props: {
        wasCached?: boolean;
    }) => void;
}
export interface IGatsbyImageData {
    layout: Layout;
    width: number;
    height: number;
    backgroundColor?: string;
    images: Pick<MainImageProps, "sources" | "fallback">;
    placeholder?: Pick<PlaceholderProps, "sources" | "fallback">;
}
export declare const GatsbyImage: FunctionComponent<GatsbyImageProps>;
//# sourceMappingURL=gatsby-image.browser.d.ts.map
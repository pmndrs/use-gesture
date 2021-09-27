import React, { FunctionComponent } from "react";
import { GatsbyImageProps, IGatsbyImageData } from "./gatsby-image.browser";
import PropTypes from "prop-types";
import { ISharpGatsbyImageArgs } from "../image-utils";
export interface IStaticImageProps extends Omit<GatsbyImageProps, "image">, Omit<ISharpGatsbyImageArgs, "backgroundColor"> {
    src: string;
}
interface IPrivateProps {
    __imageData?: IGatsbyImageData;
    __error?: string;
}
export declare function _getStaticImage(GatsbyImage: FunctionComponent<GatsbyImageProps>): React.FC<IStaticImageProps & IPrivateProps>;
declare const StaticImage: React.FC<IStaticImageProps & IPrivateProps>;
export declare const propTypes: {
    src: PropTypes.Validator<string>;
    alt: PropTypes.Validator<string>;
    width: PropTypes.Validator<number>;
    height: PropTypes.Validator<number>;
    sizes: PropTypes.Requireable<string>;
    layout: (props: IStaticImageProps & IPrivateProps) => Error | undefined;
};
export { StaticImage };
//# sourceMappingURL=static-image.server.d.ts.map
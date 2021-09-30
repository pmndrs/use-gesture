import { NodePath } from "@babel/core";
import { ParserOptions } from "@babel/parser";
import babel from "@babel/core";
import { IStaticImageProps } from "../components/static-image.server";
export declare function getBabelParserOptions(filePath: string): ParserOptions;
export declare function babelParseToAst(contents: string, filePath: string): babel.types.File;
/**
 * Traverses the parsed source, looking for StaticImage components.
 * Extracts and returns the props from any that are found
 */
export declare const extractStaticImageProps: (ast: babel.types.File, onError?: (prop: string, nodePath: NodePath) => void) => Map<string, IStaticImageProps>;

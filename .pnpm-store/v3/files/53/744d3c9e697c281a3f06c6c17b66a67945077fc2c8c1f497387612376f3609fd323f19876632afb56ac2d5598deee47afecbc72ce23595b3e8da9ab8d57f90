import { Plugin } from "../extend";
declare module "../colord" {
    interface Colord {
        toName(): string | undefined;
    }
}
/**
 * Plugin to work with named colors.
 * Adds a parser to read CSS color names and `toName` method.
 * See https://www.w3.org/TR/css-color-4/#named-colors
 * Supports 'transparent' string as defined in
 * https://drafts.csswg.org/css-color/#transparent-color
 */
declare const namesPlugin: Plugin;
export default namesPlugin;

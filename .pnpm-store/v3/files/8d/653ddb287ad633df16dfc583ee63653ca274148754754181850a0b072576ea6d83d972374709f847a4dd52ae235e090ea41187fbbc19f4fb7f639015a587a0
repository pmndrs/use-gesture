import { CheerioOptions, InternalOptions } from './options';
import type { Node, Document, Element } from 'domhandler';
import * as Static from './static';
import type { load } from './load';
import { SelectorType, BasicAcceptedElems } from './types';
import * as Attributes from './api/attributes';
import * as Traversing from './api/traversing';
import * as Manipulation from './api/manipulation';
import * as Css from './api/css';
import * as Forms from './api/forms';
declare type AttributesType = typeof Attributes;
declare type TraversingType = typeof Traversing;
declare type ManipulationType = typeof Manipulation;
declare type CssType = typeof Css;
declare type FormsType = typeof Forms;
export declare class Cheerio<T> implements ArrayLike<T> {
    length: number;
    [index: number]: T;
    options: InternalOptions;
    /**
     * The root of the document. Can be overwritten by using the `root` argument
     * of the constructor.
     *
     * @private
     */
    _root: Cheerio<Document> | undefined;
    /** @function */
    find: typeof Traversing.find;
    /**
     * The root the document was originally loaded with. Same as the static
     * `_root` property.
     *
     * @private
     */
    _originalRoot: Document | undefined;
    /**
     * The root the document was originally loaded with. Set in `.load`.
     *
     * @private
     */
    static _root: Document | undefined;
    /**
     * The options the document was originally loaded with. Set in `.load`.
     *
     * @private
     */
    static _options: InternalOptions | undefined;
    static html: typeof Static.html;
    static xml: typeof Static.xml;
    static text: typeof Static.text;
    static parseHTML: typeof Static.parseHTML;
    static root: typeof Static.root;
    static contains: typeof Static.contains;
    static merge: typeof Static.merge;
    static load: typeof load;
    /** Mimic jQuery's prototype alias for plugin authors. */
    static fn: Cheerio<any>;
    /**
     * Instance of cheerio. Methods are specified in the modules. Usage of this
     * constructor is not recommended. Please use $.load instead.
     *
     * @private
     * @param selector - The new selection.
     * @param context - Context of the selection.
     * @param root - Sets the root node.
     * @param options - Options for the instance.
     */
    constructor(selector?: T extends Node ? BasicAcceptedElems<T> : Cheerio<T> | T[], context?: BasicAcceptedElems<Node> | null, root?: BasicAcceptedElems<Document>, options?: CheerioOptions);
    prevObject: Cheerio<Node> | undefined;
    /**
     * Make a cheerio object.
     *
     * @private
     * @param dom - The contents of the new object.
     * @param context - The context of the new object.
     * @returns The new cheerio object.
     */
    _make<T>(dom: Cheerio<T> | T[] | T | string, context?: BasicAcceptedElems<Node> | null, root?: BasicAcceptedElems<Document> | undefined): Cheerio<T>;
    /**
     * Retrieve all the DOM elements contained in the jQuery set as an array.
     *
     * @example
     *
     * ```js
     * $('li').toArray();
     * //=> [ {...}, {...}, {...} ]
     * ```
     *
     * @returns The contained items.
     */
    toArray(): T[];
}
export interface Cheerio<T> extends AttributesType, TraversingType, ManipulationType, CssType, FormsType {
    cheerio: '[cheerio object]';
    splice: typeof Array.prototype.slice;
    [Symbol.iterator](): Iterator<T>;
}
declare type CheerioClassType = typeof Cheerio;
/**
 * Wrapper around the `Cheerio` class, making it possible to create a new
 * instance without using `new`.
 */
export interface CheerioAPI extends CheerioClassType {
    <T extends Node, S extends string>(selector?: S | BasicAcceptedElems<T>, context?: BasicAcceptedElems<Node> | null, root?: BasicAcceptedElems<Document>, options?: CheerioOptions): Cheerio<S extends SelectorType ? Element : T>;
}
declare const _default: CheerioAPI;
export default _default;
//# sourceMappingURL=cheerio.d.ts.map
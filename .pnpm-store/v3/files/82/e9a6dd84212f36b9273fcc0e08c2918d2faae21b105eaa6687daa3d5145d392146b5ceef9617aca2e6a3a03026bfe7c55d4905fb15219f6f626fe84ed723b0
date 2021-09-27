/**
 * interface for an options-bag where `window.getComputedStyle` can be mocked
 */
export interface ComputeTextAlternativeOptions {
    compute?: "description" | "name";
    /**
     * Set to true if window.computedStyle supports the second argument.
     * This should be false in JSDOM. Otherwise JSDOM will log console errors.
     */
    computedStyleSupportsPseudoElements?: boolean;
    getComputedStyle?: typeof window.getComputedStyle;
}
/**
 * implements https://w3c.github.io/accname/#mapping_additional_nd_te
 * @param root
 * @param [options]
 * @param [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
 */
export declare function computeTextAlternative(root: Element, options?: ComputeTextAlternativeOptions): string;
//# sourceMappingURL=accessible-name-and-description.d.ts.map
import * as React from "react";
import { DisclosureContentOptions, DisclosureContentHTMLProps } from "../Disclosure/DisclosureContent";
import { DialogStateReturn } from "./DialogState";
export declare type DialogOptions = DisclosureContentOptions & Pick<Partial<DialogStateReturn>, "modal" | "hide" | "unstable_disclosureRef"> & Pick<DialogStateReturn, "baseId"> & {
    /**
     * When enabled, user can hide the dialog by pressing `Escape`.
     */
    hideOnEsc?: boolean;
    /**
     * When enabled, user can hide the dialog by clicking outside it.
     */
    hideOnClickOutside?: boolean;
    /**
     * When enabled, user can't scroll on body when the dialog is visible.
     * This option doesn't work if the dialog isn't modal.
     */
    preventBodyScroll?: boolean;
    /**
     * The element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used.
     */
    unstable_initialFocusRef?: React.RefObject<HTMLElement>;
    /**
     * The element that will be focused when the dialog hides.
     * When not set, the disclosure component will be used.
     */
    unstable_finalFocusRef?: React.RefObject<HTMLElement>;
    /**
     * Whether or not the dialog should be a child of its parent.
     * Opening a nested orphan dialog will close its parent dialog if
     * `hideOnClickOutside` is set to `true` on the parent.
     * It will be set to `false` if `modal` is `false`.
     */
    unstable_orphan?: boolean;
    /**
     * Whether or not to move focus when the dialog shows.
     * @private
     */
    unstable_autoFocusOnShow?: boolean;
    /**
     * Whether or not to move focus when the dialog hides.
     * @private
     */
    unstable_autoFocusOnHide?: boolean;
};
export declare type DialogHTMLProps = DisclosureContentHTMLProps;
export declare type DialogProps = DialogOptions & DialogHTMLProps;
export declare const useDialog: {
    (options?: DialogOptions | undefined, htmlProps?: import("..").RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").RoleHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & Pick<Partial<import("..").DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & Pick<Partial<DialogStateReturn>, "hide" | "modal" | "unstable_disclosureRef"> & Pick<DialogStateReturn, "baseId"> & {
        /**
         * When enabled, user can hide the dialog by pressing `Escape`.
         */
        hideOnEsc?: boolean | undefined;
        /**
         * When enabled, user can hide the dialog by clicking outside it.
         */
        hideOnClickOutside?: boolean | undefined;
        /**
         * When enabled, user can't scroll on body when the dialog is visible.
         * This option doesn't work if the dialog isn't modal.
         */
        preventBodyScroll?: boolean | undefined;
        /**
         * The element that will be focused when the dialog shows.
         * When not set, the first tabbable element within the dialog will be used.
         */
        unstable_initialFocusRef?: React.RefObject<HTMLElement> | undefined;
        /**
         * The element that will be focused when the dialog hides.
         * When not set, the disclosure component will be used.
         */
        unstable_finalFocusRef?: React.RefObject<HTMLElement> | undefined;
        /**
         * Whether or not the dialog should be a child of its parent.
         * Opening a nested orphan dialog will close its parent dialog if
         * `hideOnClickOutside` is set to `true` on the parent.
         * It will be set to `false` if `modal` is `false`.
         */
        unstable_orphan?: boolean | undefined;
        /**
         * Whether or not to move focus when the dialog shows.
         * @private
         */
        unstable_autoFocusOnShow?: boolean | undefined;
        /**
         * Whether or not to move focus when the dialog hides.
         * @private
         */
        unstable_autoFocusOnHide?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: import("..").RoleOptions & Pick<Partial<import("..").DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & Pick<Partial<DialogStateReturn>, "hide" | "modal" | "unstable_disclosureRef"> & Pick<DialogStateReturn, "baseId"> & {
        /**
         * When enabled, user can hide the dialog by pressing `Escape`.
         */
        hideOnEsc?: boolean | undefined;
        /**
         * When enabled, user can hide the dialog by clicking outside it.
         */
        hideOnClickOutside?: boolean | undefined;
        /**
         * When enabled, user can't scroll on body when the dialog is visible.
         * This option doesn't work if the dialog isn't modal.
         */
        preventBodyScroll?: boolean | undefined;
        /**
         * The element that will be focused when the dialog shows.
         * When not set, the first tabbable element within the dialog will be used.
         */
        unstable_initialFocusRef?: React.RefObject<HTMLElement> | undefined;
        /**
         * The element that will be focused when the dialog hides.
         * When not set, the disclosure component will be used.
         */
        unstable_finalFocusRef?: React.RefObject<HTMLElement> | undefined;
        /**
         * Whether or not the dialog should be a child of its parent.
         * Opening a nested orphan dialog will close its parent dialog if
         * `hideOnClickOutside` is set to `true` on the parent.
         * It will be set to `false` if `modal` is `false`.
         */
        unstable_orphan?: boolean | undefined;
        /**
         * Whether or not to move focus when the dialog shows.
         * @private
         */
        unstable_autoFocusOnShow?: boolean | undefined;
        /**
         * Whether or not to move focus when the dialog hides.
         * @private
         */
        unstable_autoFocusOnHide?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: DialogOptions, htmlProps: import("..").RoleHTMLProps) => DialogOptions;
};
export declare const Dialog: import("reakit-system/ts/createComponent").Component<"div", DialogOptions>;

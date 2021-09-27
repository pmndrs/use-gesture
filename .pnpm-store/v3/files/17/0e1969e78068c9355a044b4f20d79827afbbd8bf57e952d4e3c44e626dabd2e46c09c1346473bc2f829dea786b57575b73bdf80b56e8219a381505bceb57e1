import * as React from 'react';
import { OnChangeCallback } from './eventManager';
import { ToastContent, ToastOptions, Id, ToastContainerProps, UpdateOptions, ClearWaitingQueueParams, TypeOptions } from '../types';
declare const toast: {
    (content: ToastContent, options?: ToastOptions<{}> | undefined): React.ReactText;
    loading(content: ToastContent, options?: ToastOptions<{}> | undefined): React.ReactText;
    promise: typeof handlePromise;
    success: (content: ToastContent, options?: ToastOptions<{}> | undefined) => React.ReactText;
    info: (content: ToastContent, options?: ToastOptions<{}> | undefined) => React.ReactText;
    error: (content: ToastContent, options?: ToastOptions<{}> | undefined) => React.ReactText;
    warning: (content: ToastContent, options?: ToastOptions<{}> | undefined) => React.ReactText;
    warn: (content: ToastContent, options?: ToastOptions<{}> | undefined) => React.ReactText;
    dark(content: ToastContent, options?: ToastOptions<{}> | undefined): React.ReactText;
    /**
     * Remove toast programmaticaly
     */
    dismiss(id?: string | number | undefined): void;
    /**
     * Clear waiting queue when limit is used
     */
    clearWaitingQueue(params?: ClearWaitingQueueParams): void;
    /**
     * return true if one container is displaying the toast
     */
    isActive(id: Id): boolean;
    update(toastId: Id, options?: UpdateOptions): void;
    /**
     * Used for controlled progress bar.
     */
    done(id: Id): void;
    /**
     * Track changes. The callback get the number of toast displayed
     *
     */
    onChange(callback: OnChangeCallback): () => void;
    /**
     * Configure the ToastContainer when lazy mounted
     */
    configure(config?: ToastContainerProps): void;
    POSITION: {
        TOP_LEFT: import("../types").ToastPosition;
        TOP_RIGHT: import("../types").ToastPosition;
        TOP_CENTER: import("../types").ToastPosition;
        BOTTOM_LEFT: import("../types").ToastPosition;
        BOTTOM_RIGHT: import("../types").ToastPosition;
        BOTTOM_CENTER: import("../types").ToastPosition;
    };
    TYPE: {
        INFO: TypeOptions;
        SUCCESS: TypeOptions;
        WARNING: TypeOptions;
        ERROR: TypeOptions;
        DEFAULT: TypeOptions;
    };
};
interface ToastPromiseParams {
    pending: string | UpdateOptions;
    success: string | UpdateOptions;
    error: string | UpdateOptions;
}
declare function handlePromise<T>(promise: Promise<T> | (() => Promise<T>), { pending, error, success }: ToastPromiseParams, options?: ToastOptions): Promise<T>;
export { toast };

/// <reference types="react" />
import { Id, ToastContainerProps, Toast, ToastPosition } from '../types';
export interface ContainerInstance {
    toastKey: number;
    displayedToast: number;
    props: ToastContainerProps;
    containerId?: Id | null;
    isToastActive: (toastId: Id) => boolean;
    getToast: (id: Id) => Toast | null;
}
export declare function useToastContainer(props: ToastContainerProps): {
    getToastToRender: <T>(cb: (position: ToastPosition, toastList: Toast[]) => T) => T[];
    collection: Record<Id, Toast>;
    containerRef: import("react").MutableRefObject<null>;
    isToastActive: (id: Id) => boolean;
};

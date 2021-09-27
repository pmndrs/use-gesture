/// <reference types="react" />
import CoordinatesRecognizer from './CoordinatesRecognizer';
export declare const TAP_DISTANCE_THRESHOLD = 3;
export declare const SWIPE_MAX_ELAPSED_TIME = 220;
export declare class DragRecognizer extends CoordinatesRecognizer<'drag'> {
    readonly ingKey = "dragging";
    readonly stateKey = "drag";
    private setPointerCapture;
    private releasePointerCapture;
    private preventScroll;
    private getEventId;
    private isValidEvent;
    private shouldPreventWindowScrollY;
    private setUpWindowScrollDetection;
    private setUpDelayedDragTrigger;
    private setStartState;
    onDragStart: (event: React.PointerEvent | PointerEvent) => void;
    startDrag(event: React.PointerEvent | PointerEvent, onDragIsStart?: boolean): void;
    onDragChange: (event: PointerEvent) => void;
    onDragEnd: (event: PointerEvent) => void;
    clean: () => void;
    onCancel: () => void;
    onClick: (event: React.UIEvent | UIEvent) => void;
    addBindings(bindings: any): void;
}

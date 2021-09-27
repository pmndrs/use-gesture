import DistanceAngleRecognizer from './DistanceAngleRecognizer';
import { WebKitGestureEvent } from '../types';
export declare class PinchRecognizer extends DistanceAngleRecognizer<'pinch'> {
    readonly ingKey = "pinching";
    readonly stateKey = "pinch";
    onPinchStart: (event: React.TouchEvent | TouchEvent) => void;
    onPinchChange: (event: React.TouchEvent | TouchEvent) => void;
    onPinchEnd: (event: React.TouchEvent | TouchEvent) => void;
    onCancel: () => void;
    /**
     * PINCH WITH WEBKIT GESTURES
     */
    onGestureStart: (event: WebKitGestureEvent) => void;
    onGestureChange: (event: WebKitGestureEvent) => void;
    onGestureEnd: (event: WebKitGestureEvent) => void;
    /**
     * PINCH WITH WHEEL
     */
    private wheelShouldRun;
    private getWheelValuesFromEvent;
    onWheel: (event: React.WheelEvent | WheelEvent) => void;
    onWheelStart: (event: React.WheelEvent | WheelEvent) => void;
    onWheelChange: (event: React.WheelEvent | WheelEvent) => void;
    onWheelEnd: () => void;
    addBindings(bindings: any): void;
}

import CoordinatesRecognizer from './CoordinatesRecognizer';
export declare class MoveRecognizer extends CoordinatesRecognizer<'move'> {
    readonly ingKey = "moving";
    readonly stateKey = "move";
    debounced: boolean;
    onMove: (event: React.PointerEvent | PointerEvent) => void;
    onMoveStart: (event: React.PointerEvent | PointerEvent) => void;
    onMoveChange: (event: React.PointerEvent | PointerEvent) => void;
    onMoveEnd: () => void;
    hoverTransform: () => ((v: import("../types").Vector2) => import("../types").Vector2) | undefined;
    onPointerEnter: (event: React.PointerEvent | PointerEvent) => void;
    onPointerLeave: (event: React.PointerEvent | PointerEvent) => void;
    addBindings(bindings: any): void;
}

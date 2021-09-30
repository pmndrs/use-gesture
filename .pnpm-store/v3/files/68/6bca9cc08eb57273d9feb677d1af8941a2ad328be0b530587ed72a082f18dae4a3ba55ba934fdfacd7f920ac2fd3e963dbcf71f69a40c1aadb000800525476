import { Intersection, Raycaster, Vector3 } from 'three';
declare type GizmoHelperContext = {
    tweenCamera: (direction: Vector3) => void;
    raycast: (raycaster: Raycaster, intersects: Intersection[]) => void;
};
export declare const useGizmoContext: () => GizmoHelperContext;
export declare type GizmoHelperProps = JSX.IntrinsicElements['group'] & {
    alignment?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
    margin?: [number, number];
    onUpdate: () => void;
    onTarget?: () => Vector3;
};
export declare const GizmoHelper: ({ alignment, margin, onUpdate, onTarget, children: GizmoHelperComponent, }: GizmoHelperProps) => any;
export {};

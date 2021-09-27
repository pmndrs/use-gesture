import { Mesh, Raycaster, Vector3, Intersection } from 'three';
import { LineSegmentsGeometry } from '../lines/LineSegmentsGeometry';
import { LineMaterial } from '../lines/LineMaterial';
declare class LineSegments2 extends Mesh<LineSegmentsGeometry, LineMaterial> {
    type: string;
    private isLineSegments2;
    constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial);
    private distStart;
    private distEnd;
    computeLineDistances: () => this;
    private rayStart;
    private rayEnd;
    private ssOrigin;
    private ssOrigin3;
    private mvMatrix;
    private line;
    private closestPoint;
    raycast: (raycaster: Raycaster, intersects: Array<Intersection & {
        pointOnLine: Vector3;
    }>) => void;
}
export { LineSegments2 };

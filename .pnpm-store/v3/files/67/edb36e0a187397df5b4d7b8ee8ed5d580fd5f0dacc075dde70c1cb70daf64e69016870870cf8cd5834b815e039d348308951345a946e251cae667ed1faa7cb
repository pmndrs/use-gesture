import { Box3, BufferGeometry, InstancedBufferGeometry, LineSegments, Matrix4, Mesh, Sphere } from 'three';
declare class LineSegmentsGeometry extends InstancedBufferGeometry {
    readonly isLineSegmentsGeometry = true;
    type: string;
    boundingBox: Box3 | null;
    boundingSphere: Sphere | null;
    constructor();
    applyMatrix4(matrix: Matrix4): this;
    setPositions(array: number[] | Float32Array): this;
    setColors(array: number[] | Float32Array): this;
    fromWireframeGeometry(geometry: BufferGeometry): this;
    fromEdgesGeometry(geometry: BufferGeometry): this;
    fromMesh(mesh: Mesh): this;
    fromLineSegments(lineSegments: LineSegments): this;
    private box;
    computeBoundingBox(): void;
    private vector;
    computeBoundingSphere(): void;
    toJSON(): void;
}
export { LineSegmentsGeometry };

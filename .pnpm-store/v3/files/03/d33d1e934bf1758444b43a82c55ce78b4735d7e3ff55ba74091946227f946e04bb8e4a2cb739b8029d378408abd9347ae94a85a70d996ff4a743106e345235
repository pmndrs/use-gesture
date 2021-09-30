import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Mesh, Vector3, InstancedInterleavedBuffer, InterleavedBufferAttribute, Vector4, Matrix4, Line3, MathUtils } from 'three';
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';
import { LineMaterial } from './LineMaterial.js';

class LineSegments2 extends Mesh {
  constructor(_geometry = new LineSegmentsGeometry(), _material = new LineMaterial({
    color: Math.random() * 0xffffff
  })) {
    super(_geometry, _material);

    _defineProperty(this, "type", 'LineSegments2');

    _defineProperty(this, "isLineSegments2", true);

    _defineProperty(this, "distStart", new Vector3());

    _defineProperty(this, "distEnd", new Vector3());

    _defineProperty(this, "computeLineDistances", () => {
      const geometry = this.geometry;
      const instanceStart = geometry.attributes.instanceStart;
      const instanceEnd = geometry.attributes.instanceEnd;
      const lineDistances = new Float32Array(2 * instanceStart.data.count);

      for (let i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {
        this.distStart.fromBufferAttribute(instanceStart, i);
        this.distEnd.fromBufferAttribute(instanceEnd, i);
        lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
        lineDistances[j + 1] = lineDistances[j] + this.distStart.distanceTo(this.distEnd);
      }

      const instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

      geometry.setAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0

      geometry.setAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

      return this;
    });

    _defineProperty(this, "rayStart", new Vector4());

    _defineProperty(this, "rayEnd", new Vector4());

    _defineProperty(this, "ssOrigin", new Vector4());

    _defineProperty(this, "ssOrigin3", new Vector3());

    _defineProperty(this, "mvMatrix", new Matrix4());

    _defineProperty(this, "line", new Line3());

    _defineProperty(this, "closestPoint", new Vector3());

    _defineProperty(this, "raycast", (raycaster, intersects) => {
      if (raycaster.camera === null) {
        console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.');
      }

      const threshold = 0;
      const ray = raycaster.ray;
      const camera = raycaster.camera;
      const projectionMatrix = camera.projectionMatrix;
      const geometry = this.geometry;
      const material = this.material;
      const resolution = material.resolution;
      const lineWidth = material.linewidth + threshold;
      const instanceStart = geometry.attributes.instanceStart;
      const instanceEnd = geometry.attributes.instanceEnd; // camera forward is negative

      const near = -camera.near; // pick a point 1 unit out along the ray to avoid the ray origin
      // sitting at the camera origin which will cause "w" to be 0 when
      // applying the projection matrix.

      ray.at(1, this.ssOrigin); // ndc space [ - 1.0, 1.0 ]

      this.ssOrigin.w = 1;
      this.ssOrigin.applyMatrix4(camera.matrixWorldInverse);
      this.ssOrigin.applyMatrix4(projectionMatrix);
      this.ssOrigin.multiplyScalar(1 / this.ssOrigin.w); // screen space

      this.ssOrigin.x *= resolution.x / 2;
      this.ssOrigin.y *= resolution.y / 2;
      this.ssOrigin.z = 0;
      this.ssOrigin3.set(this.ssOrigin.x, this.ssOrigin.y, this.ssOrigin.z);
      const matrixWorld = this.matrixWorld;
      this.mvMatrix.multiplyMatrices(camera.matrixWorldInverse, matrixWorld);

      for (let i = 0, l = instanceStart.count; i < l; i++) {
        this.rayStart.fromBufferAttribute(instanceStart, i);
        this.rayEnd.fromBufferAttribute(instanceEnd, i);
        this.rayStart.w = 1;
        this.rayEnd.w = 1; // camera space

        this.rayStart.applyMatrix4(this.mvMatrix);
        this.rayEnd.applyMatrix4(this.mvMatrix); // skip the segment if it's entirely behind the camera

        const isBehindCameraNear = this.rayStart.z > near && this.rayEnd.z > near;

        if (isBehindCameraNear) {
          continue;
        } // trim the segment if it extends behind camera near


        if (this.rayStart.z > near) {
          const deltaDist = this.rayStart.z - this.rayEnd.z;
          const t = (this.rayStart.z - near) / deltaDist;
          this.rayStart.lerp(this.rayEnd, t);
        } else if (this.rayEnd.z > near) {
          const deltaDist = this.rayEnd.z - this.rayStart.z;
          const t = (this.rayEnd.z - near) / deltaDist;
          this.rayEnd.lerp(this.rayStart, t);
        } // clip space


        this.rayStart.applyMatrix4(projectionMatrix);
        this.rayEnd.applyMatrix4(projectionMatrix); // ndc space [ - 1.0, 1.0 ]

        this.rayStart.multiplyScalar(1 / this.rayStart.w);
        this.rayEnd.multiplyScalar(1 / this.rayEnd.w); // screen space

        this.rayStart.x *= resolution.x / 2;
        this.rayStart.y *= resolution.y / 2;
        this.rayEnd.x *= resolution.x / 2;
        this.rayEnd.y *= resolution.y / 2; // create 2d segment

        this.line.start.set(this.rayStart.x, this.rayStart.y, this.rayStart.z);
        this.line.start.z = 0;
        this.line.end.set(this.rayEnd.x, this.rayEnd.y, this.rayEnd.z);
        this.line.end.z = 0; // get closest point on ray to segment

        const param = this.line.closestPointToPointParameter(this.ssOrigin3, true);
        this.line.at(param, this.closestPoint); // check if the intersection point is within clip space

        const zPos = MathUtils.lerp(this.rayStart.z, this.rayEnd.z, param);
        const isInClipSpace = zPos >= -1 && zPos <= 1;
        const isInside = this.ssOrigin3.distanceTo(this.closestPoint) < lineWidth * 0.5;

        if (isInClipSpace && isInside) {
          this.line.start.fromBufferAttribute(instanceStart, i);
          this.line.end.fromBufferAttribute(instanceEnd, i);
          this.line.start.applyMatrix4(matrixWorld);
          this.line.end.applyMatrix4(matrixWorld);
          const pointOnLine = new Vector3();
          const point = new Vector3();
          ray.distanceSqToSegment(this.line.start, this.line.end, point, pointOnLine);
          intersects.push({
            distance: ray.origin.distanceTo(point),
            point: point,
            face: null,
            faceIndex: i,
            object: this,
            uv: undefined,
            pointOnLine
          });
        }
      }
    });
  }

}

export { LineSegments2 };

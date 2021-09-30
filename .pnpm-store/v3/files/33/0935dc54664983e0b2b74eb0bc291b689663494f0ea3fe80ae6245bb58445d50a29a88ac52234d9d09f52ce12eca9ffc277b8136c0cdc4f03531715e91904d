import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { InstancedBufferGeometry, Box3, Vector3, Float32BufferAttribute, InstancedInterleavedBuffer, InterleavedBufferAttribute, WireframeGeometry, Sphere } from 'three';

class LineSegmentsGeometry extends InstancedBufferGeometry {
  constructor() {
    super();

    _defineProperty(this, "isLineSegmentsGeometry", true);

    _defineProperty(this, "type", 'LineSegmentsGeometry');

    _defineProperty(this, "boundingBox", null);

    _defineProperty(this, "boundingSphere", null);

    _defineProperty(this, "box", new Box3());

    _defineProperty(this, "vector", new Vector3());

    const positions = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0];
    const uvs = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2];
    const index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(index);
    this.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  }

  applyMatrix4(matrix) {
    const start = this.attributes.instanceStart;
    const end = this.attributes.instanceEnd;

    if (start !== undefined) {
      start.applyMatrix4(matrix);
      end.applyMatrix4(matrix);
      start.needsUpdate = true;
    }

    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }

    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }

    return this;
  }

  setPositions(array) {
    let lineSegments;

    if (array instanceof Float32Array) {
      lineSegments = array;
    } else if (Array.isArray(array)) {
      lineSegments = new Float32Array(array);
    } else {
      console.error('LineSegmentsGeometry.setPosition requires either a Float32Array or regular array of numbers');
      return this;
    }

    const instanceBuffer = new InstancedInterleavedBuffer(lineSegments, 6, 1); // xyz, xyz

    this.setAttribute('instanceStart', new InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz

    this.setAttribute('instanceEnd', new InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz
    //

    this.computeBoundingBox();
    this.computeBoundingSphere();
    return this;
  }

  setColors(array) {
    let colors;

    if (array instanceof Float32Array) {
      colors = array;
    } else if (Array.isArray(array)) {
      colors = new Float32Array(array);
    } else {
      console.error('LineSegmentsGeometry.setColors requires either a Float32Array or regular array of numbers');
      return this;
    }

    const instanceColorBuffer = new InstancedInterleavedBuffer(colors, 6, 1); // rgb, rgb

    this.setAttribute('instanceColorStart', new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb

    this.setAttribute('instanceColorEnd', new InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

    return this;
  }

  fromWireframeGeometry(geometry) {
    this.setPositions(Array.from(geometry.attributes.position.array));
    return this;
  }

  fromEdgesGeometry(geometry) {
    this.setPositions(Array.from(geometry.attributes.position.array));
    return this;
  }

  fromMesh(mesh) {
    this.fromWireframeGeometry(new WireframeGeometry(mesh.geometry));
    return this;
  }

  fromLineSegments(lineSegments) {
    const geometry = lineSegments.geometry;

    if (geometry.isBufferGeometry) {
      this.setPositions(Array.from(geometry.attributes.position.array)); // assumes non-indexed
    } // set colors, maybe


    return this;
  }

  computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }

    const start = this.attributes.instanceStart;
    const end = this.attributes.instanceEnd;

    if (start !== undefined && end !== undefined) {
      this.boundingBox.setFromBufferAttribute(start);
      this.box.setFromBufferAttribute(end);
      this.boundingBox.union(this.box);
    }
  }

  computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }

    if (this.boundingBox === null) {
      this.computeBoundingBox();
    }

    const start = this.attributes.instanceStart;
    const end = this.attributes.instanceEnd;

    if (start !== undefined && end !== undefined) {
      const center = this.boundingSphere.center;

      if (this.boundingBox) {
        this.boundingBox.getCenter(center);
      }

      let maxRadiusSq = 0;

      for (let i = 0, il = start.count; i < il; i++) {
        this.vector.fromBufferAttribute(start, i);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(this.vector));
        this.vector.fromBufferAttribute(end, i);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(this.vector));
      }

      this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

      if (isNaN(this.boundingSphere.radius)) {
        console.error('THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this);
      }
    }
  }

  toJSON() {// todo
  }

}

export { LineSegmentsGeometry };

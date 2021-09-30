import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Vector3, Mesh, SkinnedMesh } from 'three';

/**
 * Usage:
 *  const exporter = new STLExporter();
 *
 *  // second argument is a list of options
 *  const data = exporter.parse( mesh, { binary: true } );
 *
 */
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/f7ec78508c6797e42f87a4390735bc2c650a1bfd/types/three/examples/jsm/exporters/STLExporter.d.ts

class STLExporter {
  constructor() {
    _defineProperty(this, "binary", void 0);

    _defineProperty(this, "output", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "objects", void 0);

    _defineProperty(this, "triangles", void 0);

    _defineProperty(this, "vA", void 0);

    _defineProperty(this, "vB", void 0);

    _defineProperty(this, "vC", void 0);

    _defineProperty(this, "cb", void 0);

    _defineProperty(this, "ab", void 0);

    _defineProperty(this, "normal", void 0);

    this.binary = false;
    this.output = '';
    this.offset = 80; // skip header

    this.objects = [];
    this.triangles = 0;
    this.vA = new Vector3();
    this.vB = new Vector3();
    this.vC = new Vector3();
    this.cb = new Vector3();
    this.ab = new Vector3();
    this.normal = new Vector3();
  }

  parse(scene, options) {
    this.binary = options.binary !== undefined ? options.binary : false; //

    scene.traverse(function (object) {
      if (object instanceof Mesh && object.isMesh) {
        const geometry = object.geometry;

        if (!geometry.isBufferGeometry) {
          throw new Error('THREE.STLExporter: Geometry is not of type THREE.BufferGeometry.');
        }

        const index = geometry.index;
        const positionAttribute = geometry.getAttribute('position');
        this.triangles += index !== null ? index.count / 3 : positionAttribute.count / 3;
        this.objects.push({
          object3d: object,
          geometry: geometry
        });
      }
    });

    if (this.binary) {
      const bufferLength = this.triangles * 2 + this.triangles * 3 * 4 * 4 + 80 + 4;
      const arrayBuffer = new ArrayBuffer(bufferLength);
      this.output = new DataView(arrayBuffer);
      this.output.setUint32(this.offset, this.triangles, true);
      this.offset += 4;
    } else {
      this.output = '';
      this.output += 'solid exported\n';
    }

    for (let i = 0, il = this.objects.length; i < il; i++) {
      const object = this.objects[i].object3d;
      const geometry = this.objects[i].geometry;
      const index = geometry.index;
      const positionAttribute = geometry.getAttribute('position');

      if (object instanceof SkinnedMesh) {
        if (index !== null) {
          // indexed geometry
          for (let j = 0; j < index.count; j += 3) {
            const a = index.getX(j + 0);
            const b = index.getX(j + 1);
            const c = index.getX(j + 2);
            this.writeFace(a, b, c, positionAttribute, object);
          }
        } else {
          // non-indexed geometry
          for (let j = 0; j < positionAttribute.count; j += 3) {
            const a = j + 0;
            const b = j + 1;
            const c = j + 2;
            this.writeFace(a, b, c, positionAttribute, object);
          }
        }
      }
    }

    if (!this.binary) {
      this.output += 'endsolid exported\n';
    }

    return this.output;
  }

  writeFace(a, b, c, positionAttribute, object) {
    this.vA.fromBufferAttribute(positionAttribute, a);
    this.vB.fromBufferAttribute(positionAttribute, b);
    this.vC.fromBufferAttribute(positionAttribute, c);

    if (object.isSkinnedMesh) {
      object.boneTransform(a, this.vA);
      object.boneTransform(b, this.vB);
      object.boneTransform(c, this.vC);
    }

    this.vA.applyMatrix4(object.matrixWorld);
    this.vB.applyMatrix4(object.matrixWorld);
    this.vC.applyMatrix4(object.matrixWorld);
    this.writeNormal(this.vA, this.vB, this.vC);
    this.writeVertex(this.vA);
    this.writeVertex(this.vB);
    this.writeVertex(this.vC);

    if (this.binary && this.output instanceof DataView) {
      this.output.setUint16(this.offset, 0, true);
      this.offset += 2;
    } else {
      this.output += '\t\tendloop\n';
      this.output += '\tendfacet\n';
    }
  }

  writeNormal(vA, vB, vC) {
    this.cb.subVectors(vC, vB);
    this.ab.subVectors(vA, vB);
    this.cb.cross(this.ab).normalize();
    this.normal.copy(this.cb).normalize();

    if (this.binary && this.output instanceof DataView) {
      this.output.setFloat32(this.offset, this.normal.x, true);
      this.offset += 4;
      this.output.setFloat32(this.offset, this.normal.y, true);
      this.offset += 4;
      this.output.setFloat32(this.offset, this.normal.z, true);
      this.offset += 4;
    } else {
      this.output += `\tfacet normal ${this.normal.x} ${this.normal.y} ${this.normal.z}\n`;
      this.output += '\t\touter loop\n';
    }
  }

  writeVertex(vertex) {
    if (this.binary && this.output instanceof DataView) {
      this.output.setFloat32(this.offset, vertex.x, true);
      this.offset += 4;
      this.output.setFloat32(this.offset, vertex.y, true);
      this.offset += 4;
      this.output.setFloat32(this.offset, vertex.z, true);
      this.offset += 4;
    } else {
      this.output += `\t\t\tvertex vertex.x vertex.y vertex.z\n`;
    }
  }

}

export { STLExporter };

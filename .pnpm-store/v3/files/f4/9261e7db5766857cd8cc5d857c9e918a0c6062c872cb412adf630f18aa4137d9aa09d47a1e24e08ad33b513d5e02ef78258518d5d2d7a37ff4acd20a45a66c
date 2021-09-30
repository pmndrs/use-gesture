import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Vector3, Color, Vector2, Mesh, Line, Points, Matrix3, BufferAttribute } from 'three';

class OBJExporter {
  constructor() {
    _defineProperty(this, "output", void 0);

    _defineProperty(this, "indexVertex", void 0);

    _defineProperty(this, "indexVertexUvs", void 0);

    _defineProperty(this, "indexNormals", void 0);

    _defineProperty(this, "vertex", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "normal", void 0);

    _defineProperty(this, "uv", void 0);

    _defineProperty(this, "face", void 0);

    this.output = '';
    this.indexVertex = 0;
    this.indexVertexUvs = 0;
    this.indexNormals = 0;
    this.vertex = new Vector3();
    this.color = new Color();
    this.normal = new Vector3();
    this.uv = new Vector2();
    this.face = [];
  }

  parse(object) {
    object.traverse(child => {
      if (child instanceof Mesh && child.isMesh) {
        this.parseMesh(child);
      }

      if (child instanceof Line && child.isLine) {
        this.parseLine(child);
      }

      if (child instanceof Points && child.isPoints) {
        this.parsePoints(child);
      }
    });
    return this.output;
  }

  parseMesh(mesh) {
    let nbVertex = 0;
    let nbNormals = 0;
    let nbVertexUvs = 0;
    const geometry = mesh.geometry;
    const normalMatrixWorld = new Matrix3();

    if (!geometry.isBufferGeometry) {
      throw new Error('THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.');
    } // shortcuts


    const vertices = geometry.getAttribute('position');
    const normals = geometry.getAttribute('normal');
    const uvs = geometry.getAttribute('uv');
    const indices = geometry.getIndex(); // name of the mesh object

    this.output += `o ${mesh.name}\n`; // name of the mesh material

    if (mesh.material && !Array.isArray(mesh.material) && mesh.material.name) {
      this.output += `usemtl ${mesh.material.name}\n`;
    } // vertices


    if (vertices !== undefined) {
      for (let i = 0, l = vertices.count; i < l; i++, nbVertex++) {
        this.vertex.x = vertices.getX(i);
        this.vertex.y = vertices.getY(i);
        this.vertex.z = vertices.getZ(i); // transform the vertex to world space

        this.vertex.applyMatrix4(mesh.matrixWorld); // transform the vertex to export format

        this.output += `v ${this.vertex.x} ${this.vertex.y} ${this.vertex.z}\n`;
      }
    } // uvs


    if (uvs !== undefined) {
      for (let i = 0, l = uvs.count; i < l; i++, nbVertexUvs++) {
        this.uv.x = uvs.getX(i);
        this.uv.y = uvs.getY(i); // transform the uv to export format

        this.output += `vt ${this.uv.x} ${this.uv.y}\n`;
      }
    } // normals


    if (normals !== undefined) {
      normalMatrixWorld.getNormalMatrix(mesh.matrixWorld);

      for (let i = 0, l = normals.count; i < l; i++, nbNormals++) {
        this.normal.x = normals.getX(i);
        this.normal.y = normals.getY(i);
        this.normal.z = normals.getZ(i); // transform the normal to world space

        this.normal.applyMatrix3(normalMatrixWorld).normalize(); // transform the normal to export format

        this.output += `vn ${this.normal.x} ${this.normal.y} ${this.normal.z}\n`;
      }
    } // faces


    if (indices !== null) {
      for (let i = 0, l = indices.count; i < l; i += 3) {
        for (let m = 0; m < 3; m++) {
          const j = indices.getX(i + m) + 1;
          this.face[m] = this.indexVertex + j + (normals || uvs ? `/${uvs ? this.indexVertexUvs + j : ''}${normals ? `/${this.indexNormals + j}` : ''}` : '');
        } // transform the face to export format


        this.output += `f ${this.face.join(' ')}\n`;
      }
    } else {
      for (let i = 0, l = vertices.count; i < l; i += 3) {
        for (let m = 0; m < 3; m++) {
          const j = i + m + 1;
          this.face[m] = this.indexVertex + j + (normals || uvs ? `/${uvs ? this.indexVertexUvs + j : ''}${normals ? `/${this.indexNormals + j}` : ''}` : '');
        } // transform the face to export format


        this.output += `f ${this.face.join(' ')}\n`;
      }
    } // update index


    this.indexVertex += nbVertex;
    this.indexVertexUvs += nbVertexUvs;
    this.indexNormals += nbNormals;
  }

  parseLine(line) {
    let nbVertex = 0;
    const geometry = line.geometry;
    const type = line.type;

    if (geometry.isBufferGeometry) {
      throw new Error('THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.');
    } // shortcuts


    const vertices = geometry.getAttribute('position'); // name of the line object

    this.output += `o ${line.name}\n`;

    if (vertices !== undefined) {
      for (let i = 0, l = vertices.count; i < l; i++, nbVertex++) {
        this.vertex.x = vertices.getX(i);
        this.vertex.y = vertices.getY(i);
        this.vertex.z = vertices.getZ(i); // transform the vertex to world space

        this.vertex.applyMatrix4(line.matrixWorld); // transform the vertex to export format

        this.output += `v ${this.vertex.x} ${this.vertex.y} ${this.vertex.z}\n`;
      }
    }

    if (type === 'Line') {
      this.output += 'l ';

      for (let j = 1, l = vertices.count; j <= l; j++) {
        this.output += `${this.indexVertex + j} `;
      }

      this.output += '\n';
    }

    if (type === 'LineSegments') {
      for (let j = 1, k = j + 1, l = vertices.count; j < l; j += 2, k = j + 1) {
        this.output += `l ${this.indexVertex + j} ${this.indexVertex + k}\n`;
      }
    } // update index


    this.indexVertex += nbVertex;
  }

  parsePoints(points) {
    let nbVertex = 0;
    const geometry = points.geometry;

    if (!geometry.isBufferGeometry) {
      throw new Error('THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.');
    }

    const vertices = geometry.getAttribute('position');
    const colors = geometry.getAttribute('color');
    this.output += `o ${points.name}\n`;

    if (vertices !== undefined) {
      for (let i = 0, l = vertices.count; i < l; i++, nbVertex++) {
        this.vertex.fromBufferAttribute(vertices, i);
        this.vertex.applyMatrix4(points.matrixWorld);
        this.output += `v ${this.vertex.x} ${this.vertex.y} ${this.vertex.z}`;

        if (colors !== undefined && colors instanceof BufferAttribute) {
          this.color.fromBufferAttribute(colors, i);
          this.output += ` ${this.color.r} ${this.color.g} ${this.color.b}`;
        }

        this.output += '\n';
      }
    }

    this.output += 'p ';

    for (let j = 1, l = vertices.count; j <= l; j++) {
      this.output += `${this.indexVertex + j} `;
    }

    this.output += '\n'; // update index

    this.indexVertex += nbVertex;
  }

}

export { OBJExporter };

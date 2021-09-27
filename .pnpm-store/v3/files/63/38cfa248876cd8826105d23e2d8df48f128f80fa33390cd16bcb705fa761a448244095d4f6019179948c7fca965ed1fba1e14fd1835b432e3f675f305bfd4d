import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';

class LineGeometry extends LineSegmentsGeometry {
  constructor() {
    super();

    _defineProperty(this, "type", 'LineGeometry');

    _defineProperty(this, "isLineGeometry", true);

    _defineProperty(this, "setColors", array => {
      // converts [ r1, g1, b1,  r2, g2, b2, ... ] to pairs format
      const length = array.length - 3;
      const colors = new Float32Array(2 * length);

      for (let i = 0; i < length; i += 3) {
        colors[2 * i] = array[i];
        colors[2 * i + 1] = array[i + 1];
        colors[2 * i + 2] = array[i + 2];
        colors[2 * i + 3] = array[i + 3];
        colors[2 * i + 4] = array[i + 4];
        colors[2 * i + 5] = array[i + 5];
      }

      super.setColors(colors);
      return this;
    });

    _defineProperty(this, "fromLine", line => {
      const geometry = line.geometry;

      if (geometry.isBufferGeometry) {
        this.setPositions(Array.from(geometry.attributes.position.array)); // assumes non-indexed
      } // set colors, maybe


      return this;
    });

    _defineProperty(this, "copy", () => {
      // todo
      return this;
    });
  }

  setPositions(array) {
    // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
    const length = array.length - 3;
    const points = new Float32Array(2 * length);

    for (let i = 0; i < length; i += 3) {
      points[2 * i] = array[i];
      points[2 * i + 1] = array[i + 1];
      points[2 * i + 2] = array[i + 2];
      points[2 * i + 3] = array[i + 3];
      points[2 * i + 4] = array[i + 4];
      points[2 * i + 5] = array[i + 5];
    }

    super.setPositions(points);
    return this;
  }

}

export { LineGeometry };

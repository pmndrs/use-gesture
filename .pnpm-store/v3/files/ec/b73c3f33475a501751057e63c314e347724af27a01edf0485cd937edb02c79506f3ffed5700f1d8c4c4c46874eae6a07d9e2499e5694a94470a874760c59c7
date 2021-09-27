import InputNode from '../core/InputNode.js';
import { Matrix4 } from 'three';
import '../core/Node.js';
import '../core/constants.js';

class Matrix4Node extends InputNode {
  constructor(value = new Matrix4()) {
    super('mat4');
    this.value = value;
    Object.defineProperty(this, 'isMatrix4Node', {
      value: true
    });
  }

}

export default Matrix4Node;

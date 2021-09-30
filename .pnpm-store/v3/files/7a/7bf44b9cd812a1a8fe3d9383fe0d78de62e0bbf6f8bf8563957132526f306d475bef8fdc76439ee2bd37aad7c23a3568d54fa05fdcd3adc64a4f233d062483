import Node from '../core/Node.js';
import CameraNode from './CameraNode.js';
import ModelNode from './ModelNode.js';
import OperatorNode from '../math/OperatorNode.js';
import PositionNode from './PositionNode.js';
import '../core/constants.js';
import '@babel/runtime/helpers/esm/defineProperty';
import '../inputs/Vector3Node.js';
import '../core/InputNode.js';
import 'three';
import '../inputs/Matrix4Node.js';
import '../inputs/Matrix3Node.js';
import '../core/AttributeNode.js';

class ModelViewProjectionNode extends Node {
  constructor(position = new PositionNode()) {
    super('vec4');
    this.position = position;
    this._mvpMatrix = new OperatorNode('*', new CameraNode(CameraNode.PROJECTION), new ModelNode(ModelNode.VIEW));
  }

  generate(builder, output) {
    const type = this.getType(builder);

    const mvpSnipped = this._mvpMatrix.build(builder);

    const positionSnipped = this.position.build(builder, 'vec3');
    return builder.format(`( ${mvpSnipped} * vec4( ${positionSnipped}, 1.0 ) )`, type, output);
  }

}

export default ModelViewProjectionNode;

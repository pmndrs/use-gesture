import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import Node from '../core/Node.js';
import AttributeNode from '../core/AttributeNode.js';
import '../core/constants.js';

class PositionNode extends Node {
  constructor(scope = PositionNode.POSITION) {
    super('vec3');
    this.scope = scope;
  }

  generate(builder, output) {
    const type = this.getType(builder);
    const nodeData = builder.getDataFromNode(this, builder.shaderStage);
    let positionNode = nodeData.positionNode;

    if (positionNode === undefined) {
      positionNode = new AttributeNode('position', 'vec3');
      nodeData.positionNode = positionNode;
    }

    const positionSnipped = positionNode.build(builder, type);
    return builder.format(positionSnipped, type, output);
  }

}

_defineProperty(PositionNode, "LOCAL", 'local');

export default PositionNode;

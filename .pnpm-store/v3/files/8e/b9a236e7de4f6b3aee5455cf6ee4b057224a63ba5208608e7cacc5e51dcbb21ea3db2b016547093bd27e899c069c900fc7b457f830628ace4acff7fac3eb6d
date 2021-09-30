import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import Node from '../core/Node.js';
import AttributeNode from '../core/AttributeNode.js';
import VaryNode from '../core/VaryNode.js';
import ModelNode from './ModelNode.js';
import CameraNode from './CameraNode.js';
import OperatorNode from '../math/OperatorNode.js';
import MathNode from '../math/MathNode.js';
import '../core/constants.js';
import '../inputs/Matrix4Node.js';
import '../core/InputNode.js';
import 'three';
import '../inputs/Matrix3Node.js';
import '../inputs/Vector3Node.js';

class NormalNode extends Node {
  constructor(scope = NormalNode.LOCAL) {
    super('vec3');
    this.scope = scope;
  }

  generate(builder, output) {
    const type = this.getType(builder);
    const nodeData = builder.getDataFromNode(this, builder.shaderStage);
    const scope = this.scope;
    let localNormalNode = nodeData.localNormalNode;

    if (localNormalNode === undefined) {
      localNormalNode = new AttributeNode('normal', 'vec3');
      nodeData.localNormalNode = localNormalNode;
    }

    let outputNode = localNormalNode;

    if (scope === NormalNode.VIEW) {
      let viewNormalNode = nodeData.viewNormalNode;

      if (viewNormalNode === undefined) {
        const unnormalizedWNNode = new OperatorNode('*', new ModelNode(ModelNode.NORMAL), localNormalNode);
        const vertexNormalNode = new MathNode(MathNode.NORMALIZE, unnormalizedWNNode);
        viewNormalNode = new MathNode(MathNode.NORMALIZE, new VaryNode(vertexNormalNode));
        nodeData.viewNormalNode = viewNormalNode;
      }

      outputNode = viewNormalNode;
    } else if (scope === NormalNode.WORLD) {
      let worldNormalNode = nodeData.worldNormalNode;

      if (worldNormalNode === undefined) {
        const vertexNormalNode = new MathNode(MathNode.INVERSE_TRANSFORM_DIRETION, new NormalNode(NormalNode.VIEW), new CameraNode(CameraNode.VIEW));
        worldNormalNode = new VaryNode(vertexNormalNode);
        nodeData.worldNormalNode = worldNormalNode;
      }

      outputNode = worldNormalNode;
    }

    const normalSnipped = outputNode.build(builder, type);
    return builder.format(normalSnipped, type, output);
  }

}

_defineProperty(NormalNode, "LOCAL", 'local');

_defineProperty(NormalNode, "WORLD", 'world');

_defineProperty(NormalNode, "VIEW", 'view');

export default NormalNode;

import WebGPUNodeBuilder from './WebGPUNodeBuilder.js';
import NodeFrame from '../../nodes/core/NodeFrame.js';
import './WebGPUNodeUniformsGroup.js';
import '../WebGPUUniformsGroup.js';
import '../WebGPUBinding.js';
import '../constants.js';
import './WebGPUNodeUniform.js';
import '../WebGPUUniform.js';
import 'three';
import '../WebGPUSampler.js';
import '../WebGPUSampledTexture.js';
import '../../nodes/core/NodeSlot.js';
import '../../nodes/core/NodeBuilder.js';
import '../../nodes/core/NodeUniform.js';
import '../../nodes/core/NodeAttribute.js';
import '../../nodes/core/NodeVary.js';
import '../../nodes/core/constants.js';
import '../../nodes/accessors/ModelViewProjectionNode.js';
import '../../nodes/core/Node.js';
import '../../nodes/accessors/CameraNode.js';
import '@babel/runtime/helpers/esm/defineProperty';
import '../../nodes/inputs/Vector3Node.js';
import '../../nodes/core/InputNode.js';
import '../../nodes/inputs/Matrix4Node.js';
import '../../nodes/accessors/ModelNode.js';
import '../../nodes/inputs/Matrix3Node.js';
import '../../nodes/math/OperatorNode.js';
import '../../nodes/accessors/PositionNode.js';
import '../../nodes/core/AttributeNode.js';
import './ShaderLib.js';

class WebGPUNodes {
  constructor(renderer) {
    this.renderer = renderer;
    this.nodeFrame = new NodeFrame();
    this.builders = new WeakMap();
  }

  get(material) {
    let nodeBuilder = this.builders.get(material);

    if (nodeBuilder === undefined) {
      nodeBuilder = new WebGPUNodeBuilder(material, this.renderer).build();
      this.builders.set(material, nodeBuilder);
    }

    return nodeBuilder;
  }

  remove(material) {
    this.builders.delete(material);
  }

  updateFrame() {
    this.nodeFrame.update();
  }

  update(object, camera) {
    const material = object.material;
    const nodeBuilder = this.get(material);
    const nodeFrame = this.nodeFrame;
    nodeFrame.material = material;
    nodeFrame.camera = camera;
    nodeFrame.object = object;

    for (let node of nodeBuilder.updateNodes) {
      nodeFrame.updateNode(node);
    }
  }

  dispose() {
    this.builders = new WeakMap();
  }

}

export default WebGPUNodes;

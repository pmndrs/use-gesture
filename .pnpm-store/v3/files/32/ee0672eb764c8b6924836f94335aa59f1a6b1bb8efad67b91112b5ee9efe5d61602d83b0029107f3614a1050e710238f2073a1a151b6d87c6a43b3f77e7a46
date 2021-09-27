import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import Node from '../core/Node.js';
import Vector3Node from '../inputs/Vector3Node.js';
import Matrix4Node from '../inputs/Matrix4Node.js';
import { NodeUpdateType } from '../core/constants.js';
import '../core/InputNode.js';
import 'three';

class CameraNode extends Node {
  constructor(scope = CameraNode.POSITION) {
    super();
    this.updateType = NodeUpdateType.Frame;
    this.scope = scope;
    this._inputNode = null;
  }

  getType() {
    const scope = this.scope;

    if (scope === CameraNode.PROJECTION || scope === CameraNode.VIEW) {
      return 'mat4';
    }

    return 'vec3';
  }

  update(frame) {
    const camera = frame.camera;
    const inputNode = this._inputNode;
    const scope = this.scope;

    if (scope === CameraNode.PROJECTION) {
      inputNode.value = camera.projectionMatrix;
    } else if (scope === CameraNode.VIEW) {
      inputNode.value = camera.matrixWorldInverse;
    } else if (scope === CameraNode.POSITION) {
      camera.getWorldPosition(inputNode.value);
    }
  }

  generate(builder, output) {
    const nodeData = builder.getDataFromNode(this);
    let inputNode = this._inputNode;

    if (nodeData.inputNode === undefined) {
      const scope = this.scope;

      if (scope === CameraNode.PROJECTION || scope === CameraNode.VIEW) {
        if (inputNode === null || inputNode.isMatrix4Node !== true) {
          inputNode = new Matrix4Node(null);
        }
      } else if (scope === CameraNode.POSITION) {
        if (inputNode === null || inputNode.isVector3Node !== true) {
          inputNode = new Vector3Node();
        }
      }

      this._inputNode = inputNode;
      nodeData.inputNode = inputNode;
    }

    return inputNode.build(builder, output);
  }

}

_defineProperty(CameraNode, "POSITION", 'position');

_defineProperty(CameraNode, "PROJECTION", 'projection');

_defineProperty(CameraNode, "VIEW", 'view');

export default CameraNode;

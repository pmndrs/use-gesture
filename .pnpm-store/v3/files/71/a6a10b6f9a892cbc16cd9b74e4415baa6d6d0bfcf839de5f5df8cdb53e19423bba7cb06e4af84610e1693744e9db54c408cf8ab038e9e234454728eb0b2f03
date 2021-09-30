import FloatNode from '../inputs/FloatNode.js';
import { NodeUpdateType } from '../core/constants.js';
import '../core/InputNode.js';
import '../core/Node.js';

class TimerNode extends FloatNode {
  constructor() {
    super();
    this.updateType = NodeUpdateType.Frame;
  }

  update(frame) {
    this.value = frame.time;
  }

}

export default TimerNode;

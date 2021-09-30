import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { Vector3, QuadraticBezierCurve3 } from 'three';
import { Line } from './Line.js';

const QuadraticBezierLine = /*#__PURE__*/React.forwardRef(function QuadraticBezierLine({
  start,
  end,
  mid,
  segments = 20,
  ...rest
}, ref) {
  const points = React.useMemo(() => {
    const startV = start instanceof Vector3 ? start : new Vector3(...start);
    const endV = end instanceof Vector3 ? end : new Vector3(...end);
    const mid2 = mid || startV.clone().add(endV.clone().sub(startV)).add(new Vector3(0, startV.y - endV.y, 0));
    const midV = mid2 instanceof Vector3 ? mid2 : new Vector3(...mid2);
    const interpolatedV = new QuadraticBezierCurve3(startV, midV, endV).getPoints(segments);
    return interpolatedV;
  }, [start, end, mid, segments]);
  return /*#__PURE__*/React.createElement(Line, _extends({
    ref: ref,
    points: points
  }, rest));
});

export { QuadraticBezierLine };

import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { Vector2, Vector3, Color } from 'three';
import { Line2, LineMaterial, LineGeometry } from 'three-stdlib';

const Line = /*#__PURE__*/React.forwardRef(function Line({
  points,
  color = 'black',
  vertexColors,
  lineWidth,
  dashed,
  ...rest
}, ref) {
  const [line2] = React.useState(() => new Line2());
  const [lineMaterial] = React.useState(() => new LineMaterial());
  const [resolution] = React.useState(() => new Vector2(512, 512));
  const lineGeom = React.useMemo(() => {
    const geom = new LineGeometry();
    const pValues = points.map(p => p instanceof Vector3 ? p.toArray() : p);
    geom.setPositions(pValues.flat());

    if (vertexColors) {
      const cValues = vertexColors.map(c => c instanceof Color ? c.toArray() : c);
      geom.setColors(cValues.flat());
    }

    return geom;
  }, [points, vertexColors]);
  React.useLayoutEffect(() => {
    line2.computeLineDistances();
  }, [points, line2]);
  React.useLayoutEffect(() => {
    if (dashed) {
      lineMaterial.defines.USE_DASH = '';
    } else {
      // Setting lineMaterial.defines.USE_DASH to undefined is apparently not sufficient.
      delete lineMaterial.defines.USE_DASH;
    }

    lineMaterial.needsUpdate = true;
  }, [dashed, lineMaterial]);
  React.useEffect(() => {
    return () => lineGeom.dispose();
  }, [lineGeom]);
  return /*#__PURE__*/React.createElement("primitive", _extends({
    object: line2,
    ref: ref
  }, rest), /*#__PURE__*/React.createElement("primitive", {
    object: lineGeom,
    attach: "geometry"
  }), /*#__PURE__*/React.createElement("primitive", _extends({
    object: lineMaterial,
    attach: "material",
    color: color,
    vertexColors: Boolean(vertexColors),
    resolution: resolution,
    linewidth: lineWidth,
    dashed: dashed
  }, rest)));
});

export { Line };

import * as React from 'react';
import { EdgeSplitModifier } from 'three-stdlib';

function useEdgeSplit(cutOffAngle, tryKeepNormals = true) {
  const ref = React.useRef();
  const original = React.useRef();
  const modifier = React.useRef();
  React.useEffect(() => {
    if (!original.current && ref.current) {
      original.current = ref.current.geometry.clone();
      modifier.current = new EdgeSplitModifier();
    }
  }, []);
  React.useEffect(() => {
    if (original.current && ref.current && modifier.current) {
      const modifiedGeometry = modifier.current.modify(original.current, cutOffAngle, tryKeepNormals);
      modifiedGeometry.computeVertexNormals();
      ref.current.geometry = modifiedGeometry;
    }
  }, [cutOffAngle, tryKeepNormals]);
  return ref;
}

export { useEdgeSplit };

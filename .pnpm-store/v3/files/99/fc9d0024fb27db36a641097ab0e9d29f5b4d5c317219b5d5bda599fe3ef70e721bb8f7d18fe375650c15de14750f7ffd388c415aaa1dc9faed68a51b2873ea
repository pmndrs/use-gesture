import * as React from 'react';
import { TessellateModifier } from 'three-stdlib';

function useTessellation(passes = 3, maxEdgeLength) {
  const ref = React.useRef();
  const original = React.useRef();
  const modifier = React.useRef();
  React.useEffect(() => {
    if (!original.current) {
      original.current = ref.current.geometry.clone();
      modifier.current = new TessellateModifier(parseInt(maxEdgeLength), passes);
    }
  }, [maxEdgeLength, passes]);
  React.useEffect(() => {
    modifier.current.maxEdgeLength = maxEdgeLength;
  }, [maxEdgeLength]);
  React.useEffect(() => {
    if (original.current && ref.current) {
      const modifiedGeometry = modifier.current.modify(original.current);
      ref.current.geometry = modifiedGeometry;
    }
  }, [maxEdgeLength, passes]);
  return ref;
}

export { useTessellation };

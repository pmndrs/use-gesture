import * as React from 'react';
import { SimplifyModifier } from 'three-stdlib';

function useSimplification(simplePercent) {
  const ref = React.useRef();
  const original = React.useRef();
  const modifier = React.useRef();
  React.useEffect(() => {
    if (!original.current) {
      original.current = ref.current.geometry.clone();
      modifier.current = new SimplifyModifier();
    }
  }, []);
  React.useEffect(() => {
    if (original.current && ref.current) {
      const geometry = original.current;
      const count = Math.floor(geometry.attributes.position.count * simplePercent); // number of vertices to remove

      ref.current.geometry = modifier.current.modify(geometry, count);
    }
  }, [simplePercent]);
  return ref;
}

export { useSimplification };

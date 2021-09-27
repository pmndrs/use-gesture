import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { Text as Text$1 } from 'troika-three-text';
import { useThree } from '@react-three/fiber';

// eslint-disable-next-line prettier/prettier
const Text = /*#__PURE__*/React.forwardRef(({
  anchorX = 'center',
  anchorY = 'middle',
  children,
  onSync,
  ...props
}, ref) => {
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const [troikaMesh] = React.useState(() => new Text$1());
  const [nodes, text] = React.useMemo(() => {
    const n = [];
    let t = '';
    React.Children.forEach(children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        t += child;
      } else {
        n.push(child);
      }
    });
    return [n, t];
  }, [children]);
  React.useLayoutEffect(() => void troikaMesh.sync(() => {
    invalidate();
    if (onSync) onSync(troikaMesh);
  }));
  React.useEffect(() => {
    return () => troikaMesh.dispose();
  }, [troikaMesh]);
  return /*#__PURE__*/React.createElement("primitive", _extends({
    object: troikaMesh,
    ref: ref,
    text: text,
    anchorX: anchorX,
    anchorY: anchorY
  }, props), nodes);
});

export { Text };

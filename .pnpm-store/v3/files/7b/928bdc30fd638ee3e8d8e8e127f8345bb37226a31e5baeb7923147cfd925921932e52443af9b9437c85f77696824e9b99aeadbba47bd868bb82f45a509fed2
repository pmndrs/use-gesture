import * as React from 'react';
import { useThree, useFrame } from '@react-three/fiber';

function useHelper(object3D, proto, ...args) {
  const helper = React.useRef();
  const scene = useThree(state => state.scene);
  React.useEffect(() => {
    if (proto && object3D.current) {
      helper.current = new proto(object3D.current, ...args);

      if (helper.current) {
        scene.add(helper.current);
      }
    }

    return () => {
      if (helper.current) {
        scene.remove(helper.current);
      }
    };
  }, [scene, proto, object3D, args]);
  useFrame(() => {
    if (helper.current) {
      helper.current.update();
    }
  });
  return helper;
}

export { useHelper };

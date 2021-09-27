import * as React from 'react';
import { useThree } from '@react-three/fiber';

function Preload({
  all,
  scene,
  camera
}) {
  const gl = useThree(({
    gl
  }) => gl);
  const dCamera = useThree(({
    camera
  }) => camera);
  const dScene = useThree(({
    scene
  }) => scene); // Layout effect because it must run before React commits

  React.useLayoutEffect(() => {
    const invisible = [];

    if (all) {
      (scene || dScene).traverse(object => {
        if (object.visible === false) {
          invisible.push(object);
          object.visible = true;
        }
      });
    } // Now compile the scene


    gl.compile(scene || dScene, camera || dCamera); // Flips these objects back

    invisible.forEach(object => object.visible = false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export { Preload };

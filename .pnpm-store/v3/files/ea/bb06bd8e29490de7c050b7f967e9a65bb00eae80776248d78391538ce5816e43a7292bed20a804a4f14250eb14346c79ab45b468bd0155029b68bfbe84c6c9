import { WebGLCubeRenderTarget, LinearFilter, RGBFormat } from 'three';
import * as React from 'react';
import { useThree, useFrame } from '@react-three/fiber';

function CubeCamera({
  children,
  fog,
  frames = Infinity,
  resolution = 256,
  near = 1,
  far = 1000,
  ...props
}) {
  const ref = React.useRef();
  const [camera, setCamera] = React.useState();
  const scene = useThree(({
    scene
  }) => scene);
  const gl = useThree(({
    gl
  }) => gl);
  const fbo = React.useMemo(() => new WebGLCubeRenderTarget(resolution, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBFormat,
    encoding: gl.outputEncoding
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [resolution]);
  let count = 0;
  useFrame(() => {
    if (camera && ref.current && (frames === Infinity || count < frames)) {
      ref.current.traverse(obj => obj.visible = false);
      const originalFog = scene.fog;
      scene.fog = fog || originalFog;
      camera.update(gl, scene);
      scene.fog = originalFog;
      ref.current.traverse(obj => obj.visible = true);
      count++;
    }
  });
  return /*#__PURE__*/React.createElement("group", props, /*#__PURE__*/React.createElement("cubeCamera", {
    ref: setCamera,
    args: [near, far, fbo]
  }), /*#__PURE__*/React.createElement("group", {
    ref: ref
  }, children(fbo.texture)));
}

export { CubeCamera };

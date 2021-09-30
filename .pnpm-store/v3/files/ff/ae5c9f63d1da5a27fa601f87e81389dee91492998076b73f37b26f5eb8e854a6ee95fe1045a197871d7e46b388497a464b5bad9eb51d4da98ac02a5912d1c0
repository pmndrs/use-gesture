import { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

// 👇 uncomment when TS version supports function overloads
// export function useFBO(settings?: FBOSettings)
function useFBO(width, height, settings) {
  const gl = useThree(({
    gl
  }) => gl);
  const size = useThree(({
    size
  }) => size);
  const dpr = useMemo(() => gl.getPixelRatio(), [gl]);

  const _width = typeof width === 'number' ? width : size.width * dpr;

  const _height = typeof height === 'number' ? height : size.height * dpr;

  const _settings = (typeof width === 'number' ? settings : width) || {};

  const target = useMemo(() => {
    const {
      multisample,
      samples,
      ...targetSettings
    } = _settings;
    let target;

    if (multisample && gl.capabilities.isWebGL2) {
      target = new THREE.WebGLMultisampleRenderTarget(_width, _height, targetSettings);
      if (samples) target.samples = samples;
    } else {
      target = new THREE.WebGLRenderTarget(_width, _height, targetSettings);
    }

    return target; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    target.setSize(_width, _height);
  }, [target, _width, _height]);
  useEffect(() => {
    return () => target.dispose(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return target;
}

export { useFBO };

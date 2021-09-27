import _extends from '@babel/runtime/helpers/esm/extends';
import * as THREE from 'three';
import * as React from 'react';

function GradientTexture({
  stops,
  colors,
  size = 2048,
  ...props
}) {
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = size;
    const gradient = context.createLinearGradient(0, 0, 0, size);
    let i = stops.length;

    while (i--) {
      gradient.addColorStop(stops[i], colors[i]);
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, 16, size);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [stops]);
  React.useEffect(() => () => void texture.dispose(), [texture]);
  return /*#__PURE__*/React.createElement("primitive", _extends({
    object: texture,
    attach: "map"
  }, props));
}

export { GradientTexture };

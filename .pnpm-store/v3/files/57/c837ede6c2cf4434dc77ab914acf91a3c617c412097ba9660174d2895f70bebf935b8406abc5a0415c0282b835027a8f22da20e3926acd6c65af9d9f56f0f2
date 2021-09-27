import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from './Billboard.js';
import { useTexture } from './useTexture.js';
import img from '../assets/cloud.base64.js';

function Cloud({
  opacity = 0.5,
  speed = 0.4,
  width = 10,
  length = 1.5,
  segments = 20,
  dir = 1,
  ...props
}) {
  const group = React.useRef();
  const texture = useTexture(img);
  const clouds = React.useMemo(() => [...new Array(segments)].map((_, index) => ({
    x: width / 2 - Math.random() * width,
    y: width / 2 - Math.random() * width,
    scale: 0.4 + Math.sin((index + 1) / segments * Math.PI) * ((0.2 + Math.random()) * 10),
    density: Math.max(0.2, Math.random()),
    rotation: Math.max(0.002, 0.005 * Math.random()) * speed
  })), [width, segments, speed]);
  useFrame(state => {
    var _group$current;

    return (_group$current = group.current) == null ? void 0 : _group$current.children.forEach((cloud, index) => {
      cloud.rotation.z += clouds[index].rotation * dir;
      cloud.scale.setScalar(clouds[index].scale + (1 + Math.sin(state.clock.getElapsedTime() / 10)) / 2 * index / 10);
    });
  });
  return /*#__PURE__*/React.createElement("group", props, /*#__PURE__*/React.createElement("group", {
    position: [0, 0, segments / 2 * length],
    ref: group
  }, clouds.map(({
    x,
    y,
    scale,
    density
  }, index) => /*#__PURE__*/React.createElement(Billboard, {
    key: index,
    scale: [scale, scale, scale],
    position: [x, y, -index * length],
    lockZ: true
  }, /*#__PURE__*/React.createElement("meshStandardMaterial", {
    map: texture,
    transparent: true,
    opacity: scale / 6 * density * opacity,
    depthTest: false
  })))));
}

export { Cloud };

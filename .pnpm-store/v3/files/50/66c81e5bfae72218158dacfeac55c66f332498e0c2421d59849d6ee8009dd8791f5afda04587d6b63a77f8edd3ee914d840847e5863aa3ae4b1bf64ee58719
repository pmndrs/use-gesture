import { addEffect, applyProps } from '@react-three/fiber';
import { Globals } from '@react-spring/core';
export * from '@react-spring/core';
import { createStringInterpolator, colors, raf } from '@react-spring/shared';
import { createHost } from '@react-spring/animated';
import * as THREE from 'three';

const primitives = ['primitive'].concat(Object.keys(THREE).filter(key => /^[A-Z]/.test(key)).map(key => key[0].toLowerCase() + key.slice(1)));

Globals.assign({
  createStringInterpolator,
  colors,
  frameLoop: 'demand'
});
addEffect(() => {
  raf.advance();
});
const host = createHost(primitives, {
  applyAnimatedValues: applyProps
});
const animated = host.animated;

export { animated as a, animated };

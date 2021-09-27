import _extends from '@babel/runtime/helpers/esm/extends';
import * as THREE from 'three';
import * as React from 'react';
import { useFrame, extend } from '@react-three/fiber';
import mergeRefs from 'react-merge-refs';
import { Position } from '../helpers/Position.js';

const context = /*#__PURE__*/React.createContext(null);
const v = new THREE.Vector3();
const c = new THREE.Color();
let i;

function Points({
  children,
  range,
  limit = 1000,
  ...props
}) {
  const ref = React.useRef(null);
  const [refs, setRefs] = React.useState([]);
  const [[positions, colors]] = React.useState(() => {
    const positions = [...new Array(limit * 3)].map(() => 0);
    const colors = [...new Array(limit * 3)].map(() => 1);
    return [new Float32Array(positions), new Float32Array(colors)];
  });
  React.useLayoutEffect(() => void (ref.current.geometry.drawRange.count = Math.min(limit, range !== undefined ? range : limit, refs.length)), [refs, range]);
  useFrame(() => {
    for (i = 0; i < refs.length; i++) {
      refs[i].current.updateMatrix();
      refs[i].current.matrixWorldNeedsUpdate = false;
      refs[i].current.getWorldPosition(v);

      if (v.x !== positions[i * 3] || v.y !== positions[i * 3 + 1] || v.z !== positions[i * 3 + 2]) {
        v.toArray(positions, i * 3);
        ref.current.geometry.attributes.position.needsUpdate = true;
      }

      if (!refs[i].current.color.equals(c.fromArray(colors, i * 3))) {
        refs[i].current.color.toArray(colors, i * 3);
        ref.current.geometry.attributes.color.needsUpdate = true;
      }
    }
  });
  const events = React.useMemo(() => {
    const events = {};

    for (i = 0; i < refs.length; i++) {
      var _refs$i$current;

      Object.assign(events, (_refs$i$current = refs[i].current) == null ? void 0 : _refs$i$current.__r3f.handlers);
    }

    return Object.keys(events).reduce((prev, key) => ({ ...prev,
      [key]: e => {
        var _refs$e$index$current, _refs$e$index$current2, _refs$e$index$current3;

        return (_refs$e$index$current = refs[e.index].current) == null ? void 0 : (_refs$e$index$current2 = _refs$e$index$current.__r3f) == null ? void 0 : (_refs$e$index$current3 = _refs$e$index$current2.handlers) == null ? void 0 : _refs$e$index$current3[key](e);
      }
    }), {});
  }, [refs]);
  const api = React.useMemo(() => ({
    subscribe: ref => {
      setRefs(refs => [...refs, ref]);
      return () => setRefs(refs => refs.filter(item => item.current !== ref.current));
    }
  }), []);
  return /*#__PURE__*/React.createElement("points", _extends({
    ref: ref
  }, events, props), /*#__PURE__*/React.createElement("bufferGeometry", null, /*#__PURE__*/React.createElement("bufferAttribute", {
    attachObject: ['attributes', 'position'],
    count: positions.length / 3,
    array: positions,
    itemSize: 3
  }), /*#__PURE__*/React.createElement("bufferAttribute", {
    attachObject: ['attributes', 'color'],
    count: colors.length / 3,
    array: colors,
    itemSize: 3
  })), /*#__PURE__*/React.createElement(context.Provider, {
    value: api
  }, children));
}

const Point = /*#__PURE__*/React.forwardRef(({
  children,
  ...props
}, ref) => {
  React.useMemo(() => extend({
    Position
  }), []);
  const group = React.useRef();
  const {
    subscribe
  } = React.useContext(context);
  React.useLayoutEffect(() => subscribe(group), []);
  return /*#__PURE__*/React.createElement("position", _extends({
    matrixAutoUpdate: false,
    ref: mergeRefs([ref, group])
  }, props), children);
});

export { Point, Points };

import _extends from '@babel/runtime/helpers/esm/extends';
import * as THREE from 'three';
import * as React from 'react';
import { useFrame, extend } from '@react-three/fiber';
import mergeRefs from 'react-merge-refs';
import { Position } from '../helpers/Position.js';

const context = /*#__PURE__*/React.createContext(null);
const m = new THREE.Matrix4();
const c = new THREE.Color();
let i;

function Instances({
  children,
  range,
  limit = 1000,
  ...props
}) {
  const ref = React.useRef(null);
  const [refs, setRefs] = React.useState([]);
  const [[matrices, colors]] = React.useState(() => {
    const matrices = [...new Array(limit * 16)].map(() => 0);
    const colors = [...new Array(limit * 3)].map(() => 1);
    return [new Float32Array(matrices), new Float32Array(colors)];
  });
  React.useLayoutEffect(() => {
    ref.current.count = ref.current.instanceMatrix.updateRange.count = ref.current.instanceColor.updateRange.count = Math.min(limit, range !== undefined ? range : limit, refs.length);
  }, [refs, range]);
  useFrame(() => {
    for (i = 0; i < refs.length; i++) {
      refs[i].current.updateMatrix();
      refs[i].current.matrixWorldNeedsUpdate = false;

      if (!refs[i].current.matrixWorld.equals(m.fromArray(matrices, i * 16))) {
        refs[i].current.matrixWorld.toArray(matrices, i * 16);
        ref.current.instanceMatrix.needsUpdate = true;
      }

      if (!refs[i].current.color.equals(c.fromArray(colors, i * 3))) {
        refs[i].current.color.toArray(colors, i * 3);
        ref.current.instanceColor.needsUpdate = true;
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
        var _refs$e$instanceId$cu, _refs$e$instanceId$cu2, _refs$e$instanceId$cu3;

        return (_refs$e$instanceId$cu = refs[e.instanceId].current) == null ? void 0 : (_refs$e$instanceId$cu2 = _refs$e$instanceId$cu.__r3f) == null ? void 0 : (_refs$e$instanceId$cu3 = _refs$e$instanceId$cu2.handlers) == null ? void 0 : _refs$e$instanceId$cu3[key](e);
      }
    }), {});
  }, [refs]);
  const api = React.useMemo(() => ({
    subscribe: ref => {
      setRefs(refs => [...refs, ref]);
      return () => setRefs(refs => refs.filter(item => item.current !== ref.current));
    }
  }), []);
  return /*#__PURE__*/React.createElement("instancedMesh", _extends({
    ref: ref,
    args: [null, null, 0]
  }, events, props), /*#__PURE__*/React.createElement("instancedBufferAttribute", {
    attach: "instanceMatrix",
    count: matrices.length / 16,
    array: matrices,
    itemSize: 16
  }), /*#__PURE__*/React.createElement("instancedBufferAttribute", {
    attach: "instanceColor",
    count: colors.length / 3,
    array: colors,
    itemSize: 3
  }), /*#__PURE__*/React.createElement(context.Provider, {
    value: api
  }, children));
}

const Instance = /*#__PURE__*/React.forwardRef(({
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

export { Instance, Instances };

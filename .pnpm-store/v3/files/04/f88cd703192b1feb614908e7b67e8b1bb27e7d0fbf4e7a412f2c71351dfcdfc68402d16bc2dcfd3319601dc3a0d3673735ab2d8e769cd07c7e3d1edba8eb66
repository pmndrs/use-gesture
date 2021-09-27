import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { Vector3, OrthographicCamera, PerspectiveCamera } from 'three';
import { useThree, useFrame } from '@react-three/fiber';

const v1 = new Vector3();
const v2 = new Vector3();
const v3 = new Vector3();

const noReactDomError = () => {
  throw new Error(`Html component requires a 'react-dom' package, please install it`);
};

let ReactDOM = {
  unmountComponentAtNode: noReactDomError,
  render: noReactDomError
}; // workaround to not to break apps that doesn't have react-dom,
// don't use Html component and import from the root
// e.g. `import { OrbitControls } from '@react-three/drei'`

try {
  ReactDOM = require('react-dom');
} catch {// react-dom isn't installed
}

function defaultCalculatePosition(el, camera, size) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf];
}

function isObjectBehindCamera(el, camera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
  const deltaCamObj = objectPos.sub(cameraPos);
  const camDir = camera.getWorldDirection(v3);
  return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}

function isObjectVisible(el, camera, raycaster, occlude) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld);
  const screenPos = elPos.clone();
  screenPos.project(camera);
  raycaster.setFromCamera(screenPos, camera);
  const intersects = raycaster.intersectObjects(occlude, true);

  if (intersects.length) {
    const intersectionDistance = intersects[0].distance;
    const pointDistance = elPos.distanceTo(raycaster.ray.origin);
    return pointDistance < intersectionDistance;
  }

  return true;
}

function objectScale(el, camera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom;
  } else if (camera instanceof PerspectiveCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const vFOV = camera.fov * Math.PI / 180;
    const dist = objectPos.distanceTo(cameraPos);
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
    return 1 / scaleFOV;
  } else {
    return 1;
  }
}

function objectZIndex(el, camera, zIndexRange) {
  if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const dist = objectPos.distanceTo(cameraPos);
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
    const B = zIndexRange[1] - A * camera.far;
    return Math.round(A * dist + B);
  }

  return undefined;
}

const epsilon = value => Math.abs(value) < 1e-10 ? 0 : value;

function getCSSMatrix(matrix, multipliers, prepend = '') {
  let matrix3d = 'matrix3d(';

  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? ',' : ')');
  }

  return prepend + matrix3d;
}

const getCameraCSSMatrix = (multipliers => {
  return matrix => getCSSMatrix(matrix, multipliers);
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]);

const getObjectCSSMatrix = (scaleMultipliers => {
  return (matrix, factor) => getCSSMatrix(matrix, scaleMultipliers(factor), 'translate(-50%,-50%)');
})(f => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1]);

const Html = /*#__PURE__*/React.forwardRef(({
  children,
  eps = 0.001,
  style,
  className,
  prepend,
  center,
  fullscreen,
  portal,
  distanceFactor,
  sprite = false,
  transform = false,
  occlude,
  onOcclude,
  zIndexRange = [16777271, 0],
  calculatePosition = defaultCalculatePosition,
  as = 'div',
  pointerEvents = 'auto',
  ...props
}, ref) => {
  var _portal$current;

  const gl = useThree(({
    gl
  }) => gl);
  const camera = useThree(({
    camera
  }) => camera);
  const scene = useThree(({
    scene
  }) => scene);
  const size = useThree(({
    size
  }) => size);
  const raycaster = useThree(({
    raycaster
  }) => raycaster);
  const [el] = React.useState(() => document.createElement(as));
  const group = React.useRef(null);
  const oldZoom = React.useRef(0);
  const oldPosition = React.useRef([0, 0]);
  const transformOuterRef = React.useRef(null);
  const transformInnerRef = React.useRef(null);
  const target = (_portal$current = portal == null ? void 0 : portal.current) !== null && _portal$current !== void 0 ? _portal$current : gl.domElement.parentNode;
  React.useEffect(() => {
    if (group.current) {
      scene.updateMatrixWorld();

      if (transform) {
        el.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;
      } else {
        const vec = calculatePosition(group.current, camera, size);
        el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`;
      }

      if (target) {
        if (prepend) target.prepend(el);else target.appendChild(el);
      }

      return () => {
        if (target) target.removeChild(el);
        ReactDOM.unmountComponentAtNode(el);
      };
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [target, transform]);
  const styles = React.useMemo(() => {
    if (transform) {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none'
      };
    } else {
      return {
        position: 'absolute',
        transform: center ? 'translate3d(-50%,-50%,0)' : 'none',
        ...(fullscreen && {
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        }),
        ...style
      };
    }
  }, [style, center, fullscreen, size, transform]);
  const transformInnerStyles = React.useMemo(() => ({
    position: 'absolute',
    pointerEvents
  }), [pointerEvents]);
  React.useLayoutEffect(() => {
    if (transform) {
      ReactDOM.render( /*#__PURE__*/React.createElement("div", {
        ref: transformOuterRef,
        style: styles
      }, /*#__PURE__*/React.createElement("div", {
        ref: transformInnerRef,
        style: transformInnerStyles
      }, /*#__PURE__*/React.createElement("div", {
        ref: ref,
        className: className,
        style: style,
        children: children
      }))), el);
    } else {
      ReactDOM.render( /*#__PURE__*/React.createElement("div", {
        ref: ref,
        style: styles,
        className: className,
        children: children
      }), el);
    }
  });
  const visible = React.useRef(true);
  useFrame(() => {
    if (group.current) {
      camera.updateMatrixWorld();
      group.current.updateWorldMatrix(true, false);
      const vec = transform ? oldPosition.current : calculatePosition(group.current, camera, size);

      if (transform || Math.abs(oldZoom.current - camera.zoom) > eps || Math.abs(oldPosition.current[0] - vec[0]) > eps || Math.abs(oldPosition.current[1] - vec[1]) > eps) {
        const isBehindCamera = isObjectBehindCamera(group.current, camera);
        let raytraceTarget = false;

        if (typeof occlude === 'boolean') {
          if (occlude === true) {
            raytraceTarget = [scene];
          }
        } else if (Array.isArray(occlude)) {
          raytraceTarget = occlude.map(item => item.current);
        }

        const previouslyVisible = visible.current;

        if (raytraceTarget) {
          const isvisible = isObjectVisible(group.current, camera, raycaster, raytraceTarget);
          visible.current = isvisible && !isBehindCamera;
        } else {
          visible.current = !isBehindCamera;
        }

        if (previouslyVisible !== visible.current) {
          if (onOcclude) onOcclude(!visible.current);else el.style.display = visible.current ? 'block' : 'none';
        }

        el.style.zIndex = `${objectZIndex(group.current, camera, zIndexRange)}`;

        if (transform) {
          const [widthHalf, heightHalf] = [size.width / 2, size.height / 2];
          const fov = camera.projectionMatrix.elements[5] * heightHalf;
          const {
            isOrthographicCamera,
            top,
            left,
            bottom,
            right
          } = camera;
          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse);
          const cameraTransform = isOrthographicCamera ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)` : `translateZ(${fov}px)`;
          let matrix = group.current.matrixWorld;

          if (sprite) {
            matrix = camera.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(group.current.scale);
            matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0;
            matrix.elements[15] = 1;
          }

          el.style.width = size.width + 'px';
          el.style.height = size.height + 'px';
          el.style.perspective = isOrthographicCamera ? '' : `${fov}px`;

          if (transformOuterRef.current && transformInnerRef.current) {
            transformOuterRef.current.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`;
            transformInnerRef.current.style.transform = getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400));
          }
        } else {
          const scale = distanceFactor === undefined ? 1 : objectScale(group.current, camera) * distanceFactor;
          el.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`;
        }

        oldPosition.current = vec;
        oldZoom.current = camera.zoom;
      }
    }
  });
  return /*#__PURE__*/React.createElement("group", _extends({}, props, {
    ref: group
  }));
});

export { Html };

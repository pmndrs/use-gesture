import * as React from 'react';
import { useThree, useFrame, createPortal } from '@react-three/fiber';
import { Object3D, Matrix4, Quaternion, Vector3, Scene } from 'three';
import { OrthographicCamera } from './OrthographicCamera.js';
import { useCamera } from './useCamera.js';

const Context = /*#__PURE__*/React.createContext({});
const useGizmoContext = () => {
  return React.useContext(Context);
};
const turnRate = 2 * Math.PI; // turn rate in angles per second

const dummy = new Object3D();
const matrix = new Matrix4();
const [q1, q2] = [new Quaternion(), new Quaternion()];
const target = new Vector3();
const targetPosition = new Vector3();
const GizmoHelper = ({
  alignment = 'bottom-right',
  margin = [80, 80],
  onUpdate,
  onTarget,
  children: GizmoHelperComponent
}) => {
  const size = useThree(({
    size
  }) => size);
  const mainCamera = useThree(({
    camera
  }) => camera); // @ts-expect-error new in @react-three/fiber@7.0.5

  const defaultControls = useThree(({
    controls
  }) => controls);
  const gl = useThree(({
    gl
  }) => gl);
  const scene = useThree(({
    scene
  }) => scene);
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const backgroundRef = React.useRef();
  const gizmoRef = React.useRef();
  const virtualCam = React.useRef(null);
  const [virtualScene] = React.useState(() => new Scene());
  const animating = React.useRef(false);
  const radius = React.useRef(0);
  const focusPoint = React.useRef(new Vector3(0, 0, 0));

  const tweenCamera = direction => {
    animating.current = true;
    if (defaultControls || onTarget) focusPoint.current = (defaultControls == null ? void 0 : defaultControls.target) || (onTarget == null ? void 0 : onTarget());
    radius.current = mainCamera.position.distanceTo(target); // Rotate from current camera orientation

    q1.copy(mainCamera.quaternion); // To new current camera orientation

    targetPosition.copy(direction).multiplyScalar(radius.current).add(target);
    dummy.lookAt(targetPosition);
    q2.copy(dummy.quaternion);
    invalidate();
  };

  const animateStep = delta => {
    if (!animating.current) return;

    if (q1.angleTo(q2) < 0.01) {
      animating.current = false;
      return;
    }

    const step = delta * turnRate; // animate position by doing a slerp and then scaling the position on the unit sphere

    q1.rotateTowards(q2, step); // animate orientation

    mainCamera.position.set(0, 0, 1).applyQuaternion(q1).multiplyScalar(radius.current).add(focusPoint.current);
    mainCamera.up.set(0, 1, 0).applyQuaternion(q1).normalize();
    mainCamera.quaternion.copy(q1);
    if (onUpdate) onUpdate();else if (defaultControls) defaultControls.update();
    invalidate();
  };

  React.useEffect(() => {
    if (scene.background) {
      //Interchange the actual scene background with the virtual scene
      backgroundRef.current = scene.background;
      scene.background = null;
      virtualScene.background = backgroundRef.current;
    }

    return () => {
      // reset on unmount
      if (backgroundRef.current) {
        scene.background = backgroundRef.current;
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeRender = () => {
    var _gizmoRef$current;

    // Sync gizmo with main camera orientation
    matrix.copy(mainCamera.matrix).invert();
    (_gizmoRef$current = gizmoRef.current) == null ? void 0 : _gizmoRef$current.quaternion.setFromRotationMatrix(matrix);
  };

  useFrame((_, delta) => {
    if (virtualCam.current && gizmoRef.current) {
      animateStep(delta);
      beforeRender();
      gl.autoClear = false;
      gl.clearDepth();
      gl.render(virtualScene, virtualCam.current);
    }
  });
  const gizmoHelperContext = {
    tweenCamera,
    raycast: useCamera(virtualCam)
  }; // Position gizmo component within scene

  const [marginX, marginY] = margin;
  const x = alignment.endsWith('-left') ? -size.width / 2 + marginX : size.width / 2 - marginX;
  const y = alignment.startsWith('top-') ? size.height / 2 - marginY : -size.height / 2 + marginY;
  return createPortal( /*#__PURE__*/React.createElement(Context.Provider, {
    value: gizmoHelperContext
  }, /*#__PURE__*/React.createElement(OrthographicCamera, {
    ref: virtualCam,
    makeDefault: false,
    position: [0, 0, 200]
  }), /*#__PURE__*/React.createElement("group", {
    ref: gizmoRef,
    position: [x, y, 0]
  }, GizmoHelperComponent)), virtualScene);
};

export { GizmoHelper, useGizmoContext };

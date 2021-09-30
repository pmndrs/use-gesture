import * as React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { SimplexNoise } from 'three-stdlib';

const CameraShake = /*#__PURE__*/React.forwardRef(({
  intensity = 1,
  decay,
  decayRate = 0.65,
  maxYaw = 0.1,
  maxPitch = 0.1,
  maxRoll = 0.1,
  yawFrequency = 1,
  pitchFrequency = 1,
  rollFrequency = 1,
  controls
}, ref) => {
  const camera = useThree(state => state.camera); // @ts-expect-error new in @react-three/fiber@7.0.5

  const defaultControls = useThree(state => state.controls);
  const intensityRef = React.useRef(intensity);
  const initialRotation = React.useRef(camera.rotation.clone());
  const [yawNoise] = React.useState(() => new SimplexNoise());
  const [pitchNoise] = React.useState(() => new SimplexNoise());
  const [rollNoise] = React.useState(() => new SimplexNoise());

  const constrainIntensity = () => {
    if (intensityRef.current < 0 || intensityRef.current > 1) {
      intensityRef.current = intensityRef.current < 0 ? 0 : 1;
    }
  };

  React.useImperativeHandle(ref, () => ({
    getIntensity: () => intensityRef.current,
    setIntensity: val => {
      intensityRef.current = val;
      constrainIntensity();
    }
  }), []);
  React.useEffect(() => {
    const currControls = defaultControls || (controls == null ? void 0 : controls.current);

    const callback = () => void (initialRotation.current = camera.rotation.clone());

    currControls == null ? void 0 : currControls.addEventListener('change', callback);
    return () => void (currControls == null ? void 0 : currControls.removeEventListener('change', callback)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, defaultControls]);
  useFrame(({
    clock
  }, delta) => {
    const shake = Math.pow(intensityRef.current, 2);
    const yaw = maxYaw * shake * yawNoise.noise(clock.elapsedTime * yawFrequency, 1);
    const pitch = maxPitch * shake * pitchNoise.noise(clock.elapsedTime * pitchFrequency, 1);
    const roll = maxRoll * shake * rollNoise.noise(clock.elapsedTime * rollFrequency, 1);
    camera.rotation.set(initialRotation.current.x + pitch, initialRotation.current.y + yaw, initialRotation.current.z + roll);

    if (decay && intensityRef.current > 0) {
      intensityRef.current -= decayRate * delta;
      constrainIntensity();
    }
  });
  return null;
});

export { CameraShake };

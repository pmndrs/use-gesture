import { NumberKeyframeTrack, AnimationClip, Vector3, VectorKeyframeTrack, BooleanKeyframeTrack, ColorKeyframeTrack } from 'three';

const AnimationClipCreator = () => {};

AnimationClipCreator.CreateRotationAnimation = (period, axis) => {
  const times = [0, period],
        values = [0, 360];
  axis = axis || 'x';
  const trackName = `.rotation[${axis}]`;
  const track = new NumberKeyframeTrack(trackName, times, values);
  return new AnimationClip(null, period, [track]);
};

AnimationClipCreator.CreateScaleAxisAnimation = (period, axis) => {
  const times = [0, period],
        values = [0, 1];
  axis = axis || 'x';
  const trackName = `.scale[${axis}]`;
  const track = new NumberKeyframeTrack(trackName, times, values);
  return new AnimationClip(null, period, [track]);
};

AnimationClipCreator.CreateShakeAnimation = (duration, shakeScale) => {
  const times = [],
        values = [],
        tmp = new Vector3();

  for (let i = 0; i < duration * 10; i++) {
    times.push(i / 10);
    tmp.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0).multiply(shakeScale).toArray(values, values.length);
  }

  const trackName = '.position';
  const track = new VectorKeyframeTrack(trackName, times, values);
  return new AnimationClip(null, duration, [track]);
};

AnimationClipCreator.CreatePulsationAnimation = (duration, pulseScale) => {
  const times = [],
        values = [],
        tmp = new Vector3();

  for (let i = 0; i < duration * 10; i++) {
    times.push(i / 10);
    const scaleFactor = Math.random() * pulseScale;
    tmp.set(scaleFactor, scaleFactor, scaleFactor).toArray(values, values.length);
  }

  const trackName = '.scale';
  const track = new VectorKeyframeTrack(trackName, times, values);
  return new AnimationClip(null, duration, [track]);
};

AnimationClipCreator.CreateVisibilityAnimation = duration => {
  const times = [0, duration / 2, duration],
        values = [true, false, true];
  const trackName = '.visible';
  const track = new BooleanKeyframeTrack(trackName, times, values);
  return new AnimationClip(null, duration, [track]);
};

AnimationClipCreator.CreateMaterialColorAnimation = (duration, colors) => {
  const times = [],
        values = [],
        timeStep = duration / colors.length;

  for (let i = 0; i <= colors.length; i++) {
    times.push(i * timeStep);
    values.push(colors[i % colors.length]);
  }

  const trackName = '.material[0].color';
  const track = new ColorKeyframeTrack(trackName, times, values);
  return new AnimationClip(null, duration, [track]);
};

export { AnimationClipCreator };

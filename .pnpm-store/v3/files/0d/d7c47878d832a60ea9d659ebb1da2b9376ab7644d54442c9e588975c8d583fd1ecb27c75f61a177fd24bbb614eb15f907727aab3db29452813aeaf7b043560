import * as React from 'react';
import { Object3D, AnimationMixer } from 'three';
import { useFrame } from '@react-three/fiber';

function useAnimations(clips, root) {
  const ref = React.useRef();
  const [actualRef] = React.useState(() => root ? root instanceof Object3D ? {
    current: root
  } : root : ref); // eslint-disable-next-line prettier/prettier

  const [mixer] = React.useState(() => new AnimationMixer(undefined));
  const lazyActions = React.useRef({});
  const [api] = React.useState(() => {
    const actions = {};
    clips.forEach(clip => Object.defineProperty(actions, clip.name, {
      enumerable: true,

      get() {
        if (actualRef.current) {
          return lazyActions.current[clip.name] || (lazyActions.current[clip.name] = mixer.clipAction(clip, actualRef.current));
        }
      }

    }));
    return {
      ref: actualRef,
      clips,
      actions,
      names: clips.map(c => c.name),
      mixer
    };
  });
  useFrame((state, delta) => mixer.update(delta));
  React.useEffect(() => {
    const currentRoot = actualRef.current;
    return () => {
      // Clean up only when clips change, wipe out lazy actions and uncache clips
      lazyActions.current = {};
      Object.values(api.actions).forEach(action => {
        if (currentRoot) {
          mixer.uncacheAction(action, currentRoot);
        }
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clips]);
  return api;
}

export { useAnimations };

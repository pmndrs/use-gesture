import { FBXLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

function useFBX(path) {
  return useLoader(FBXLoader, path);
}

useFBX.preload = path => useLoader.preload(FBXLoader, path); // @ts-expect-error new in r3f 7.0.5


useFBX.clear = input => useLoader.clear(FBXLoader, input);

export { useFBX };

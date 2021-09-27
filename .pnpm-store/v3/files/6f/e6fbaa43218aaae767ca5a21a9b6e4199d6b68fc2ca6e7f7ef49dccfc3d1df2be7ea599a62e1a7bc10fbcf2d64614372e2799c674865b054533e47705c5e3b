import { CubeTextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

function useCubeTexture(files, {
  path
}) {
  // @ts-ignore
  const [cubeTexture] = useLoader( // @ts-ignore
  CubeTextureLoader, [files], loader => loader.setPath(path));
  return cubeTexture;
}

useCubeTexture.preload = (files, {
  path
}) => useLoader.preload( // @ts-ignore
CubeTextureLoader, [files], loader => loader.setPath(path));

export { useCubeTexture };

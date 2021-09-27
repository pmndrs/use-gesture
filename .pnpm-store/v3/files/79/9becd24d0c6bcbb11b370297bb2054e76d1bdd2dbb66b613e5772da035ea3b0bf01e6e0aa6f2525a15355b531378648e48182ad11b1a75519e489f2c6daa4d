import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

// @ts-ignore

function extensions(useDraco, useMeshopt, extendLoader) {
  return loader => {
    if (extendLoader) {
      extendLoader(loader);
    }

    if (useDraco) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(typeof useDraco === 'string' ? useDraco : 'https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);
    }

    if (useMeshopt) {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  };
}

function useGLTF(path, useDraco = true, useMeshOpt = true, extendLoader) {
  const gltf = useLoader(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader));
  return gltf;
}

useGLTF.preload = (path, useDraco = true, useMeshOpt = true, extendLoader) => useLoader.preload(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader)); // @ts-expect-error new in r3f 7.0.5


useGLTF.clear = input => useLoader.clear(GLTFLoader, input);

export { useGLTF };

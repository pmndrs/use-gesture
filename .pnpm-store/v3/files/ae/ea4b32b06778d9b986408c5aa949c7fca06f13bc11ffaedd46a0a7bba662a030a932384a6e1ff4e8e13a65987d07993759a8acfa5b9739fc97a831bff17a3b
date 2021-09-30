import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const IsObject = url => url === Object(url) && !Array.isArray(url) && typeof url !== 'function';
function useTexture(input) {
  const textures = useLoader(TextureLoader, IsObject(input) ? Object.values(input) : input);

  if (IsObject(input)) {
    const keys = Object.keys(input);
    const keyed = {};
    keys.forEach(key => Object.assign(keyed, {
      [key]: textures[keys.indexOf(key)]
    }));
    return keyed;
  } else {
    return textures;
  }
}

useTexture.preload = url => useLoader.preload(TextureLoader, url); // @ts-expect-error new in r3f 7.0.5


useTexture.clear = input => useLoader.clear(TextureLoader, input);

export { IsObject, useTexture };

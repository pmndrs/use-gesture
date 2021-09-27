import * as THREE from 'three';

function shaderMaterial(uniforms, vertexShader, fragmentShader, onInit) {
  return class extends THREE.ShaderMaterial {
    constructor() {
      const entries = Object.entries(uniforms); // Create unforms and shaders

      super({
        uniforms: entries.reduce((acc, [name, value]) => {
          const uniform = THREE.UniformsUtils.clone({
            [name]: {
              value
            }
          });
          return { ...acc,
            ...uniform
          };
        }, {}),
        vertexShader,
        fragmentShader
      }); // Create getter/setters

      entries.forEach(([name]) => Object.defineProperty(this, name, {
        get: () => this.uniforms[name].value,
        set: v => this.uniforms[name].value = v
      }));
      if (onInit) onInit(this);
    }

  };
}

export { shaderMaterial };

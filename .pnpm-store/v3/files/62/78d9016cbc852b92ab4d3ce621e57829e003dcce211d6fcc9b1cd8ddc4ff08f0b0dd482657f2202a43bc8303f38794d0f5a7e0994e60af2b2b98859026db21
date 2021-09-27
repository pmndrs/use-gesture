import { StereoCamera, Vector2 } from 'three';

const StereoEffect = function (renderer) {
  const _stereo = new StereoCamera();

  _stereo.aspect = 0.5;
  const size = new Vector2();

  this.setEyeSeparation = eyeSep => {
    _stereo.eyeSep = eyeSep;
  };

  this.setSize = (width, height) => {
    renderer.setSize(width, height);
  };

  this.render = (scene, camera) => {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();

    _stereo.update(camera);

    renderer.getSize(size);
    if (renderer.autoClear) renderer.clear();
    renderer.setScissorTest(true);
    renderer.setScissor(0, 0, size.width / 2, size.height);
    renderer.setViewport(0, 0, size.width / 2, size.height);
    renderer.render(scene, _stereo.cameraL);
    renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
    renderer.setViewport(size.width / 2, 0, size.width / 2, size.height);
    renderer.render(scene, _stereo.cameraR);
    renderer.setScissorTest(false);
  };
};

export { StereoEffect };

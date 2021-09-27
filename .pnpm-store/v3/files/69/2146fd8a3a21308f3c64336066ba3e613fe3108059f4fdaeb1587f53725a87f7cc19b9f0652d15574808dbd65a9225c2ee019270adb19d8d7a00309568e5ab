# WebXR Input Profiles - Motion Controllers

[![Build Status](https://travis-ci.com/immersive-web/webxr-input-profiles.svg?branch=master)](https://travis-ci.org/immersive-web/webxr-input-profiles)

## Overview
This package provides a 3D engine agnostic javascript library for synchronizing the status of an `XRInputSource` object with a 3D model representing that `XRInputSource`. The library consumes JSON files in the format published from the [@webxr-input-profiles/assets](../assets/README.md) package to create `MotionController` objects that enable a simple path for developers to:

1. Find the best matching profile for an `XRInputSource`
1. Enumerate the component parts (trigger, squeeze, touchpad, thumbstick, button, etc)
1. If a 3D asset is available for the matching profile, provide a path to load it
1. On each render frame, apply precomputed deformations to the 3D asset to reflect the state `XRInputSource`
1. Optionally attach descriptive explanations to each component that will not overlap the rest of the 3D asset

The state of an XR motion controller's trigger, squeeze, touchnpad, thumbstick, and button components is made available to developers via the `XRInputSource.Gamepad` object. The behavior of this object is described in [WebXR Gamepads Module](https://www.w3.org/TR/webxr-gamepads-module/) and the [Gamepad API](https://www.w3.org/TR/gamepad/). These objects expose detailed state in the `Gamepad.buttons` array and the `Gamepad.axes` array. While this system was adequate for the relatively homogenous console gaming controllers, it is less effective for XR motion controllers as they have not converged on a common form factor. In addition, the `Gamepad` object does not provide any information about the visualization of a `XRInputSource` object which is a requirement to displaying a virtual copy of motion controller on opaque XR headsets.

## Contributing

### Filing a bug
To file bugs, use this [issue template](https://github.com/immersive-web/webxr-input-profiles/issues/new?assignees=&labels=motion-controller&template=motioncontroller-library-bug-report.md&title=)

### Development
In general, this package should be built and tested from the root of the repository using the following command:
> npm run test

To build just this package without running tests, invoke the following command from the root of the repository:
> npm run build -- --scope @webxr-input-profiles/motion-controllers

To test just this package without building anything, invoke the following command from the root of the repository:
> npm run testOnly -- motion-controllers

To visually validate the library behaves as expected, follow the [viewer](../viewer) instructions.

### Licence
See the [LICENSE.md](LICENSE.md).

# Usage
This repo provides a javascript library for managing known motion controller profiles, loading the most ideal known profile for a supplied input source, and creating a MotionController object that binds them together.  Developers can use this library to interact with the conceptual components of an input source, rather than each individual button or axis.

## Getting started
To install this library:
```
npm install @webxr-input-profiles/motion-controllers
```

### Watching for new XRInputSources
As `XRInputSource`s are added to a WebXR session, the `inputsourceschange` event will fire. In response, an `XRMotionController` can be created. When the `XRInputSource` is removed, the associated `MotionController` can be released.

```js
xrSession.addEventListener('inputsourceschange', onInputSourcesChange);

function onInputSourcesChange(event) {
  event.added.forEach((xrInputSource) => {
    createMotionController(xrInputSource);
  });
};
```

### Creating a MotionController
Creating a `MotionController` requires a JSON profile in the format published by the [assets](../assets/README.md) package and, if available, the path to an associated asset. The `fetchProfile` function can be used to fetch this information for a supplied `XRInputSource` from a supplied `basePath`. It will first fetch the `profilesList.json` file at the root of the `basePath`; this file must contain a JSON object with keys for each available profile id whose values are the relative paths to the profiles' locations. It will then iterate through the `XRInputSource.profiles` array to find the first matching profile and retrieve it.

```js
import { fetchProfile, MotionController } from '@webxr-input-profiles/motion-controllers/motion-controllers.module.js'

const uri = 'URI of folder with profiles and assets';
const motionControllers = {};

async function createMotionController(xrInputSource) {
  const { profile, assetPath } = await fetchProfile(xrInputSource, uri);
  const motionController = new MotionController(xrInputSource, profile, assetPath);
  motionControllers[xrInputSource] = motionController;
  addMotionControllerToScene(motionController);
}
```

### Updating the motion controller
Once a `MotionController` has been created, the `updateFromGamepad()` method should be called on every `XRSession.requestAnimationFrame()` callback. This will process the current state of the `gamepad` attribute of the `XRInputSource` the motion controller was created with and update each of the `MotionController`'s `Compontents` accordingly.

```js
function onAnimationFrameCallback(timestamp, xrFrame) {
  // Other frame-loop stuff ...

  Object.keys(motionControllers).forEach((motionController) =>
    motionController.updateFromGamepad();
  )};

  // Other frame-loop stuff ...
}
```

## Components
Developers can use the `MotionController` to interact with its components such as thumbsticks, touchpads, triggers, squeezes, and buttons. These components expose their current values through the `Components.values` object.  The `values.state` key will always be present and describes the overall state of the component as being `pressed`, `touched`, or `default`.  In addition to `values.state`, components may optionally also have a `values.button`, `values.xAxis`, or `values.yAxis`.  Each of values are populated slightly differently based on the underlying component type.

### Trigger, Squeeze, and Button components
Much of the behavior of `trigger`, `squeeze`, and `button` components is identical, though they are often used for different interactions (e.g. a squeeze may often be preferred for picking up objects). The `values.button` is set directly from the associated `GamepadButton.value`.  If the `GamepadButton.pressed` is true or the `GamepadButton.value` is 1, the `values.state` will be set to `pressed`.  Otherwise, if the `GamepadButton.touched` is true or the `GamepadButton.value` is greater than 0, the component's `values.state` will be set to `touched`. Otherwise the `values.state` is set to `default`. 

```js
import { Constants } from './webxr-input-profiles.module.js';
function processTriggerInput(trigger) {
  if (trigger.state === Constants.ComponentState.PRESSED) {
    // Fire ray gun
  } else if (trigger.state === Constants.ComponentState.TOUCHED) {
    const chargeLevel = trigger.buttonValue;
    // Show ray gun charging up
  }
}
```

### Thumbstick and touchpad components
Much of the behavior of `thumbstick` and `touchpad` components is identical, though they are often used for different interactions (e.g. thumbsticks may often be preferred for teleportation). These components must have either an `xAxis`, a `yAxis`, or both. The `values.xAxis` and `values.yAxis` are populated from the associated indices in the `Gamepad.axes` array.  The `value.xAxis` is `-1.0` at the far left of its range of motion and `1.0` at the far right. The `value.yAxis` is `-1.0` at the top of its range of motion and `1.0` at the bottom.  

These components may also be clickable, and if so will have a `value.button` which is populated identically to those of `trigger`, `squeeze`, and `button` components.

The `value.state` is set based on a combination of factors.  If clickable, `value.state` will be populated using an identical algorithm as `trigger`, `squeeze`, and `button` components.  If not clickable, or clickable and set to `default`, `values.state` will be set to `touched` if `values.xAxis` or `values.yAxis` are non-zero.

```js
import { Constants } from './webxr-input-profiles.module.js';
function processThumbstickInput(thumbstick) {
  if (thumbstick.values.state === Constants.ComponentState.PRESSED) {
    // Align the world orientation to the user's current orientation
  } else if (thumbstick.values.state === Constants.ComponentState.TOUCHED
             && thumbstick.values.yAxis !== 0) {
    const scootDistance = thumbstick.values.yAxis * scootIncrement;
    // Scoot the user forward
  }
}
```

## Visual representation

### Adding the asset to the scene
The visualization asset representing a motion controller can loaded once the `MotionController` has been created. The path to the asset can be found in the `MotionController.assetPath`. Assets are available under MIT license in .glTF, .glB, or .fbx formats.

```js
async function addMotionControllerToScene(motionController) {
  const asset = await MyEngine.loadAsset(motionController.assetPath);
  addTouchPointDots(motionController, asset);
  MyEngine.scene.add(asset);
}
```

### Touch point dot
Touchpads have an additional property that enables visualizing the point at which they are touched. To use this property, attach your visualization to the `Touchpad.touchPointNodeName` when the asset is loaded.  This sample uses THREE.js, but can be applied to any 3D engine.

```js
function addTouchPointDots(motionController, asset) {
  Object.values(motionController.components).forEach((component) => {
    if (component.touchPointNodeName) {
      const touchPointRoot = asset.getChildByName(component.touchPointNodeName, true);
      
      const sphereGeometry = new THREE.SphereGeometry(0.001);
      const material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
      const touchPointDot = new THREE.Mesh(sphereGeometry, material);
      touchPointRoot.add(touchPointDot);
    }
  });
}
```

### Animating components
On each frame, the motion controller data must be retrieved from the input source, and the rendering engine must respond accordingly to the new button/axis data. This the same for both WebXR and WebVR

```js
function onAnimationFrameCallback(xrFrame) {
  // Other frame-loop stuff ...

  Object.keys(motionControllers).forEach((motionController) =>
    motionController.updateFromGamepad();
    updateMotionControllerModel(motionController);
  )};

  // Other frame-loop stuff ...
}

function updateMotionControllerModel(motionController) {

  // Update the 3D model to reflect the button, thumbstick, and touchpad state
  const motionControllerRoot = MyEngine.scene.getChildByName(motionController.rootNodeName);
  Object.values(motionController.components).forEach((component) => {
    component.visualResponses.forEach((visualResponse) => {
      // Find the topmost node in the visualization
      const valueNode = motionControllerRoot.getChildByName(visualResponse.valueNodeName);

      // Calculate the new properties based on the weight supplied
      if (visualResponse.valueNodeProperty === 'visibility') {
        valueNode.visible = visualResponse.value;
      } else if (visualResponse.valueNodeProperty === 'transform') {
        const minNode = motionControllerRoot.getObjectByName(visualResponse.minNodeName);
        const maxNode = motionControllerRoot.getObjectByName(visualResponse.maxNodeName);

        THREE.Quaternion.slerp(
          minNode.quaternion,
          maxNode.quaternion,
          valueNode.quaternion,
          visualResponse.value
        );

        valueNode.position.lerpVectors(
          minNode.position,
          maxNode.position,
          visualResponse.value
        );
      }
    });
  });
}
```

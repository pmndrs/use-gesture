import { Constants } from '../constants';
import { MotionController } from '../motionController';

const profile = {
  id: 'mock-one-button',
  layouts: {
    none: {
      components: {
        mockButtonComponent: {
          gamepadIndices: {
            button: 0
          },
          visualResponses: []
        }
      }
    }
  }
};
const assetUrl = 'assetUrl string';
const mockXRInputSource = {
  handedness: Constants.Handedness.NONE,
  gamepad: {
    buttons: [0]
  }
};

test('No xrInputSource', () => {
  expect(() => {
    // eslint-disable-next-line no-unused-vars
    const motionController = new MotionController(undefined, profile, assetUrl);
  }).toThrow();

  expect(() => {
    // eslint-disable-next-line no-unused-vars
    const motionController = new MotionController(null, profile, assetUrl);
  }).toThrow();
});

test('No profile', () => {
  expect(() => {
    // eslint-disable-next-line no-unused-vars
    const motionController = new MotionController(mockXRInputSource, undefined, assetUrl);
  }).toThrow();

  expect(() => {
    // eslint-disable-next-line no-unused-vars
    const motionController = new MotionController(mockXRInputSource, null, assetUrl);
  }).toThrow();
});

test('No gamepad', () => {
  const noGamepadXRInputSource = {
    handedness: Constants.Handedness.NONE
  };
  expect(() => {
    // eslint-disable-next-line no-unused-vars
    const motionController = new MotionController(noGamepadXRInputSource, profile, assetUrl);
  }).toThrow();
});

test('Successful construction', () => {
  const motionController = new MotionController(mockXRInputSource, profile, assetUrl);
  expect(motionController).toBeDefined();
});

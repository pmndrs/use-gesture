import { Constants } from '../constants';
import { Component } from '../components';

const buttonComponent = {
  id: 'buttonComponent',
  description: {
    visualResponses: {},
    gamepadIndices: {
      [Constants.ComponentProperty.BUTTON]: 0
    }
  }
};

const axesComponent = {
  id: 'axesComponent',
  description: {
    visualResponses: {},
    gamepadIndices: {
      [Constants.ComponentProperty.X_AXIS]: 0,
      [Constants.ComponentProperty.Y_AXIS]: 0
    }
  }
};

const axesButtonComponent = {
  id: 'axesButtonComponent',
  description: {
    visualResponses: {},
    gamepadIndices: {
      [Constants.ComponentProperty.BUTTON]: 0,
      [Constants.ComponentProperty.X_AXIS]: 0,
      [Constants.ComponentProperty.Y_AXIS]: 0
    }
  }
};

const oneAxisComponent = {
  id: 'oneAxisComponent',
  description: {
    visualResponses: {},
    gamepadIndices: {
      [Constants.ComponentProperty.Y_AXIS]: 0
    }
  }
};

describe('Construction', () => {
  test('Button created', () => {
    const { id, description } = buttonComponent;
    const component = new Component(id, description);
    expect(component).toBeDefined();
    expect(component.values.button).toEqual(0);
    expect(component.values.xAxis).toBeUndefined();
    expect(component.values.yAxis).toBeUndefined();
    expect(component.values.state).toEqual(Constants.ComponentState.DEFAULT);
  });

  test('Thumbstick/touchpad created with no button', () => {
    const { id, description } = axesComponent;
    const component = new Component(id, description);
    expect(component).toBeDefined();
    expect(component.values.button).toBeUndefined();
    expect(component.values.xAxis).toEqual(0);
    expect(component.values.yAxis).toEqual(0);
    expect(component.values.state).toEqual(Constants.ComponentState.DEFAULT);
  });

  test('Thumbstick/touchpad created with button', () => {
    const { id, description } = axesButtonComponent;
    const component = new Component(id, description);
    expect(component).toBeDefined();
    expect(component.values.button).toEqual(0);
    expect(component.values.xAxis).toEqual(0);
    expect(component.values.yAxis).toEqual(0);
    expect(component.values.state).toEqual(Constants.ComponentState.DEFAULT);
  });

  test('Thumbstick/touchpad created with only one axis', () => {
    const { id, description } = oneAxisComponent;
    const component = new Component(id, description);
    expect(component).toBeDefined();
    expect(component.values.button).toBeUndefined();
    expect(component.values.xAxis).toBeUndefined();
    expect(component.values.yAxis).toEqual(0);
    expect(component.values.state).toEqual(Constants.ComponentState.DEFAULT);
  });

  test('No id', () => {
    const componentDescription = {};
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component(null, componentDescription);
    }).toThrow();

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component(undefined, componentDescription);
    }).toThrow();
  });

  test('No componentDescription', () => {
    const componentId = 'test-component-id';

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component(componentId, null);
    }).toThrow();

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component(componentId, undefined);
    }).toThrow();
  });

  test('Missing visual responses', () => {
    const componentId = 'test-component-id';
    const componentDescription = {
      gamepadIndices: { button: 0 }
    };

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component(componentId, componentDescription);
    }).toThrow();
  });

  test('Missing gamepadIndices', () => {
    const componentId = 'test-component-id';
    const componentDescription = {
      visualResponses: {}
    };

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component(componentId, componentDescription);
    }).toThrow();
  });
});

describe('Update from Gamepad', () => {
  test.todo('something here');
});

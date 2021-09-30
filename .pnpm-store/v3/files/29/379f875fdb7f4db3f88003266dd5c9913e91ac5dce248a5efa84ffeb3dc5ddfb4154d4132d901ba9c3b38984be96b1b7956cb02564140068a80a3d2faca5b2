import React from 'react';
import { generateElement, renderElementAsync } from '../transpile';
import { shallow } from 'enzyme';

describe('transpile', () => {
  describe('generateElement', () => {
    it('should transpile JSX', () => {
      const code = '<div>Hello World!</div>';
      const Component = generateElement({ code });
      const wrapper = shallow(<Component />);

      expect(wrapper.html()).toBe(code);
    });

    it('should transpile PFCs', () => {
      const code = '() => <div>Hello World!</div>';
      const Component = generateElement({ code });
      const wrapper = shallow(<Component />);

      expect(wrapper.html()).toBe('<div>Hello World!</div>');
    });

    it('should transpile components', () => {
      const code =
        'class Test extends React.Component { render() { return <div>Hello World!</div> }}';
      const Component = generateElement({ code });
      const wrapper = shallow(<Component />);

      expect(wrapper.html()).toBe('<div>Hello World!</div>');
    });

    it('should handle trailing semicolons', () => {
      const code = '<div>Hello World!</div>;\n';
      const Component = generateElement({ code });
      const wrapper = shallow(<Component />);

      expect(wrapper.html()).toBe('<div>Hello World!</div>');
    });

    it('should emit errors on error callback', () => {
      expect(() => {
        generateElement({ code: '<div>' });
      }).toThrow();
    });

    it('should not throw on Object.assign usage', () => {
      const code =
        '() => { const props = { b: "b" }; return <div a="a" {...props} /> }';

      expect(() => {
        generateElement({ code });
      }).not.toThrow();
    });

    it('should ignore comments', () => {
      const code = '// Comment\n<div>Hello World!</div>';
      const Component = generateElement({ code });
      const wrapper = shallow(<Component />);

      expect(wrapper.text()).toBe('Hello World!');
    });
  });

  describe('renderElementAsync', () => {
    it('should emit error if render is not called', () => {
      const errorCb = jest.fn();

      renderElementAsync({ code: '' }, null, errorCb);

      expect(errorCb).toHaveBeenCalledWith(
        new SyntaxError('No-Inline evaluations must call `render`.')
      );
    });

    it('should emit error if render is not called with valid JSX', () => {
      const errorCb = jest.fn();

      renderElementAsync({ code: 'render()' }, null, errorCb);
      expect(errorCb).toHaveBeenCalledWith(
        new SyntaxError('`render` must be called with valid JSX.')
      );
    });

    it('should emit result if render is called with a falsey value', () => {
      const resultCb = jest.fn();
      const code = 'render(null)';

      renderElementAsync({ code }, resultCb);

      expect(resultCb).toHaveBeenCalled();

      const Component = resultCb.mock.calls[0][0];
      const wrapper = shallow(<Component />);

      expect(wrapper.html()).toBe(null);
    });

    it('should emit result via the result callback', () => {
      const resultCb = jest.fn();
      const code = 'render(<div>Hello World!</div>)';

      renderElementAsync({ code }, resultCb);

      expect(resultCb).toHaveBeenCalled();

      const Component = resultCb.mock.calls[0][0];
      const wrapper = shallow(<Component />);

      expect(wrapper.html()).toBe('<div>Hello World!</div>');
    });
  });
});

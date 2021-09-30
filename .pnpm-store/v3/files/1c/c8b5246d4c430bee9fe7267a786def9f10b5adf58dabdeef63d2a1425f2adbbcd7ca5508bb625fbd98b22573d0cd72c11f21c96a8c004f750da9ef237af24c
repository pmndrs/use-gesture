import React from 'react';
import errorBoundary from '../transpile/errorBoundary';
import { render } from 'enzyme';

describe('errorBoundary', () => {
  it('should wrap PFCs in an error boundary', () => {
    const errorCb = jest.fn();

    const Component = errorBoundary(() => {
      throw new Error('test');
    }, errorCb);

    expect(() => render(<Component />)).toThrowError('test');
  });

  it('should wrap Components in an error boundary', () => {
    const errorCb = jest.fn();

    const Component = errorBoundary(
      class extends React.Component {
        render() {
          throw new Error('test');
        }
      },
      errorCb
    );

    expect(() => render(<Component />)).toThrowError('test');
  });
});

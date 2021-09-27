import React from 'react';
import LiveContext from './LiveContext';

function LivePreview({ Component, ...rest }) {
  return (
    <Component {...rest}>
      <LiveContext.Consumer>
        {({ element: Element }) => Element && <Element />}
      </LiveContext.Consumer>
    </Component>
  );
}

LivePreview.defaultProps = {
  Component: 'div'
};

export default LivePreview;

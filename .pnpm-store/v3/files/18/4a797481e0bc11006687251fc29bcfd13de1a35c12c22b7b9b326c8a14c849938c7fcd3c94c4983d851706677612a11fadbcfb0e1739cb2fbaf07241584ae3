import React, { Component } from 'react';
import LiveContext from '../components/Live/LiveContext';

export default function withLive(WrappedComponent) {
  class WithLive extends Component {
    render() {
      return (
        <LiveContext.Consumer>
          {live => <WrappedComponent live={live} {...this.props} />}
        </LiveContext.Consumer>
      );
    }
  }

  return WithLive;
}

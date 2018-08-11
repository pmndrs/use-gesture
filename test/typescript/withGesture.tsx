import * as React from 'react';
import { Gesture, GestureState, withGesture } from '../../index';

interface ChildProps {
    testProp: boolean;
}

class ChildComponent extends React.Component<ChildProps> {}

const WrappedComponent = withGesture(
    ChildComponent,
);

const wrappedComponent = <WrappedComponent testProp/>;

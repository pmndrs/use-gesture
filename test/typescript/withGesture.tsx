import * as React from 'react';
import {GestureState, withGesture} from '../../index';

interface ChildProps extends Partial<GestureState> {
    testProp: boolean;
}

class ChildComponent extends React.Component<ChildProps> {
    render() {
        return this.props.children
    }
}

const WithGesture = withGesture({
    onAction(state) {
        return state.delta
    }
})

const WrappedComponent = WithGesture(ChildComponent);

function Test() {
    return (
        <WrappedComponent testProp>
            <div/>
        </WrappedComponent>
    )
}

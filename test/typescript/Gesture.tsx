import * as React from 'react';
import { Gesture, GestureState } from '../../index';

const requiredProps = (
    <Gesture>{() => null}</Gesture>
);

const handleEvent = (gestureState: GestureState) => {
    const {
        x,
        y,
        xDelta,
        yDelta,
        xInitial,
        yInitial,
        xPrev,
        yPrev,
        down,
        xVelocity,
        yVelocity,
    } = gestureState;
    return gestureState;
};

const allProps = (
    <Gesture
        onDown={handleEvent}
        onMove={handleEvent}
        onUp={handleEvent}
        touch={false}
        mouse={true}
    >
        {({
            x,
            y,
            xDelta,
            yDelta,
            xInitial,
            yInitial,
            xPrev,
            yPrev,
            down,
            xVelocity,
            yVelocity,
        }) => (
            <div/>
        )}
    </Gesture>
);

const incorrectHandleEvent = (gestureState: GestureState) => {};
const incorrectEventProp = (
    <Gesture
        // typings:expect-error
        onUp={incorrectHandleEvent}
    >
        {() => null}
    </Gesture>
);

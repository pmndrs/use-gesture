import * as React from 'react';
import {Gesture, GestureState} from '../../index';

const requiredProps = (
    <Gesture>{() => null}</Gesture>
);

const handleEvent = (gestureState: GestureState) => {
    const {
        event,
        target,
        initial,
        xy,
        previous,
        delta,
        direction,
        local,
        time,
        velocity,
        distance,
        down,
        first,
        args,
        temp
    } = gestureState;

    return gestureState;
};

const allProps = (
    <Gesture
        onAction={e => e.delta}
        touch={false}
        mouse={true}
        className={'test'}
        style={{width: 200}}
    >
        {({
              event,
              target,
              initial,
              xy,
              previous,
              delta,
              direction,
              local,
              time,
              velocity,
              distance,
              down,
              first,
              args,
              temp
          }) => (
            <div/>
        )}
    </Gesture>
);

const incorrectEventProp = (
    <Gesture
        // typings:expect-error
        touch={123}
    >
        {() => null}
    </Gesture>
);

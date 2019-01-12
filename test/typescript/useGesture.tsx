import * as React from 'react'
import {useGesture, GestureState} from '../../index'

function useGestureWithFunction(props: any) {
    const bind = useGesture(e => e)
    return <div {...bind(...props)}> gesture hooks with function </div>;
}

function useGetureWithOnAction(props: any) {
    const bind = useGesture({
        onAction(state: GestureState): any {
            return 'test'
        }
    })

    return <div {...bind(...props)}> gesture hooks with on action </div>
}

function useGetureWithoutOnAction(props: any) {
    const [bind, state] = useGesture({mouse: true})

    return <div {...bind(...props)}> gesture hooks without on action </div>
}


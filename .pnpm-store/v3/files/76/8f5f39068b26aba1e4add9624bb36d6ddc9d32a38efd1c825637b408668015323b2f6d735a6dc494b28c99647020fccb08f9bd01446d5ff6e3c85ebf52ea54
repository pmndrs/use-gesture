import { AsyncResult, MatchProp } from './types';
import { RunAsyncState, RunAsyncProps } from './runAsync';
import { AnimationResolver, AnimationTarget, InferProps, InferState } from './types/internal';
declare type DefaultProps<T> = {
    cancel?: MatchProp<T>;
    pause?: MatchProp<T>;
};
interface ScheduledProps<T extends AnimationTarget> {
    key?: string;
    props: InferProps<T>;
    defaultProps?: DefaultProps<InferState<T>>;
    state: RunAsyncState<T>;
    actions: {
        pause: () => void;
        resume: () => void;
        start: (props: RunAsyncProps<T>, resolve: AnimationResolver<T>) => void;
    };
}
/**
 * This function sets a timeout if both the `delay` prop exists and
 * the `cancel` prop is not `true`.
 *
 * The `actions.start` function must handle the `cancel` prop itself,
 * but the `pause` prop is taken care of.
 */
export declare function scheduleProps<T extends AnimationTarget>(callId: number, { key, props, defaultProps, state, actions }: ScheduledProps<T>): AsyncResult<T>;
export {};

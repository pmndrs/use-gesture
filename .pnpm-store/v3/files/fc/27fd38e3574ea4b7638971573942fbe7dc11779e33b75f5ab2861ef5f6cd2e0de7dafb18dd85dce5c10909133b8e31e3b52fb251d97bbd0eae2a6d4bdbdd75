import { EventObject, Subscribable, InvokeDefinition, AnyEventObject, StateMachine, Spawnable, SCXML } from './types';
import { ActorRef, SpawnedActorRef } from '.';
export interface Actor<TContext = any, TEvent extends EventObject = AnyEventObject> extends Subscribable<TContext> {
    id: string;
    send: (event: TEvent) => any;
    stop?: () => any | undefined;
    toJSON: () => {
        id: string;
    };
    meta?: InvokeDefinition<TContext, TEvent>;
    state?: any;
    deferred?: boolean;
}
export declare function createNullActor(id: string): SpawnedActorRef<any>;
/**
 * Creates a deferred actor that is able to be invoked given the provided
 * invocation information in its `.meta` value.
 *
 * @param invokeDefinition The meta information needed to invoke the actor.
 */
export declare function createInvocableActor<TC, TE extends EventObject>(invokeDefinition: InvokeDefinition<TC, TE>, machine: StateMachine<TC, any, TE, any>, context: TC, _event: SCXML.Event<TE>): SpawnedActorRef<any>;
export declare function createDeferredActor(entity: Spawnable, id: string, data?: any): SpawnedActorRef<any, undefined>;
export declare function isActor(item: any): item is ActorRef<any>;
export declare function isSpawnedActor(item: any): item is SpawnedActorRef<any>;
//# sourceMappingURL=Actor.d.ts.map
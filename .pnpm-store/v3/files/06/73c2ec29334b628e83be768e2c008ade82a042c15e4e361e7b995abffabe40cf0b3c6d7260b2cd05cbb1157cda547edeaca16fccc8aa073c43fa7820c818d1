import { StateMachine, MachineOptions, DefaultContext, MachineConfig, StateSchema, EventObject, AnyEventObject, Typestate } from './types';
import { Model, ModelContextFrom, ModelEventsFrom } from './model';
export declare function Machine<TContext = any, TEvent extends EventObject = AnyEventObject>(config: MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, initialContext?: TContext): StateMachine<TContext, any, TEvent>;
export declare function Machine<TContext = DefaultContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = AnyEventObject>(config: MachineConfig<TContext, TStateSchema, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, initialContext?: TContext): StateMachine<TContext, TStateSchema, TEvent>;
export declare function createMachine<TModel extends Model<any, any, any>, TContext = ModelContextFrom<TModel>, TEvent extends EventObject = ModelEventsFrom<TModel>, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(config: MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>): StateMachine<TContext, any, TEvent, TTypestate>;
export declare function createMachine<TContext, TEvent extends EventObject = AnyEventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(config: MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>): StateMachine<TContext, any, TEvent, TTypestate>;
//# sourceMappingURL=Machine.d.ts.map
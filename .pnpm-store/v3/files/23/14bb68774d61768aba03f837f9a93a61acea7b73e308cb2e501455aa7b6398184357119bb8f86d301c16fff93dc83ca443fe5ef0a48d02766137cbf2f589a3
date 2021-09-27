import { StateMachine, MachineOptions, DefaultContext, MachineConfig, StateSchema, EventObject, AnyEventObject, Typestate, EventFrom, BaseActionObject } from './types';
import { Model, ModelContextFrom, ModelActionsFrom } from './model.types';
/**
 * @deprecated Use `createMachine(...)` instead.
 */
export declare function Machine<TContext = any, TEvent extends EventObject = AnyEventObject>(config: MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, initialContext?: TContext): StateMachine<TContext, any, TEvent>;
export declare function Machine<TContext = DefaultContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = AnyEventObject>(config: MachineConfig<TContext, TStateSchema, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, initialContext?: TContext): StateMachine<TContext, TStateSchema, TEvent>;
export declare function createMachine<TModel extends Model<any, any, any, any>, TContext = ModelContextFrom<TModel>, TEvent extends EventObject = EventFrom<TModel>, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}, TAction extends BaseActionObject = ModelActionsFrom<TModel>>(config: MachineConfig<TContext, any, TEvent, TAction> & {
    context: TContext;
}, options?: Partial<MachineOptions<TContext, TEvent, TAction>>): StateMachine<TContext, any, TEvent, TTypestate>;
export declare function createMachine<TContext, TEvent extends EventObject = AnyEventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(config: TContext extends Model<any, any, any, any> ? never : MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>): StateMachine<TContext, any, TEvent, TTypestate>;
//# sourceMappingURL=Machine.d.ts.map
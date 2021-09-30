import { InternalConfig, HookReturnType, InternalHandlers, GenericOptions, NativeHandlers } from '../types';
/**
 * Utility hook called by all gesture hooks and that will be responsible for the internals.
 *
 * @param handlers
 * @param classes
 * @param config
 * @param nativeHandlers - native handlers such as onClick, onMouseDown, etc.
 */
export default function useRecognizers<Config extends Partial<GenericOptions>>(handlers: Partial<InternalHandlers>, config: InternalConfig, nativeHandlers?: Partial<NativeHandlers>): (...args: any[]) => HookReturnType<Config>;

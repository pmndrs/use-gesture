import { ArrayValue } from "reakit-utils/types";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { unstable_IdState, unstable_IdActions, unstable_IdInitialState } from "../Id/IdState";
import { DeepPartial, DeepMap, DeepPath, DeepPathValue } from "./__utils/types";
declare type Messages<V> = DeepPartial<DeepMap<V, string | null | void>>;
declare type ValidateOutput<V> = Messages<V> | null | void;
declare type ValidateReturn<V> = Promise<ValidateOutput<V>> | ValidateOutput<V>;
interface Update<V> {
    <P extends DeepPath<V, P>>(name: P, value: DeepPathValue<V, P>): void;
    <P extends DeepPath<V, P>>(name: P, value: (value: DeepPathValue<V, P>) => DeepPathValue<V, P>): void;
}
export declare type unstable_FormState<V> = unstable_IdState & {
    /**
     * Form values.
     */
    values: V;
    /**
     * An object with the same shape as `form.values` with `boolean` values.
     * This keeps the touched state of each field. That is, whether a field has
     * been blurred.
     */
    touched: DeepPartial<DeepMap<V, boolean>>;
    /**
     * An object with the same shape as `form.values` with string messages.
     * This stores the messages returned by `onValidate` and `onSubmit`.
     */
    messages: Messages<V>;
    /**
     * An object with the same shape as `form.values` with string error messages.
     * This stores the error messages throwed by `onValidate` and `onSubmit`.
     */
    errors: Messages<V>;
    /**
     * Whether form is validating or not.
     */
    validating: boolean;
    /**
     * Whether `form.errors` is empty or not.
     */
    valid: boolean;
    /**
     * Whether form is submitting or not.
     */
    submitting: boolean;
    /**
     * Stores the number of times that the form has been successfully submitted.
     */
    submitSucceed: number;
    /**
     * Stores the number of times that the form submission has failed.
     */
    submitFailed: number;
};
export declare type unstable_FormActions<V> = unstable_IdActions & {
    /**
     * Resets the form state.
     */
    reset: () => void;
    /**
     * Triggers form validation (calling `onValidate` underneath).
     * Optionally, new `values` can be passed in.
     */
    validate: (values?: V) => ValidateReturn<V>;
    /**
     * Triggers form submission (calling `onValidate` and `onSubmit` underneath).
     */
    submit: () => void;
    /**
     * Updates a form value.
     */
    update: Update<V>;
    /**
     * Sets field's touched state to `true`.
     */
    blur: <P extends DeepPath<V, P>>(name: P) => void;
    /**
     * Pushes a new item into `form.values[name]`, which should be an array.
     */
    push: <P extends DeepPath<V, P>>(name: P, value?: ArrayValue<DeepPathValue<V, P>>) => void;
    /**
     * Removes `form.values[name][index]`.
     */
    remove: <P extends DeepPath<V, P>>(name: P, index: number) => void;
};
export declare type unstable_FormInitialState<V> = unstable_IdInitialState & Partial<Pick<unstable_FormState<V>, "values">> & {
    /**
     * Whether the form should trigger `onValidate` on blur.
     */
    validateOnBlur?: boolean;
    /**
     * Whether the form should trigger `onValidate` on change.
     */
    validateOnChange?: boolean;
    /**
     * Whether the form should reset when it has been successfully submitted.
     */
    resetOnSubmitSucceed?: boolean;
    /**
     * Whether the form should reset when the component (which called
     * `useFormState`) has been unmounted.
     */
    resetOnUnmount?: boolean;
    /**
     * A function that receives `form.values` and return or throw messages.
     * If it returns, messages will be interpreted as successful messages.
     * If it throws, they will be interpreted as errors.
     * It can also return a promise for asynchronous validation.
     */
    onValidate?: (values: V) => ValidateReturn<V>;
    /**
     * A function that receives `form.values` and performs form submission.
     * If it's triggered by `form.submit()`, `onValidate` will be called before.
     * If `onValidate` throws, `onSubmit` will not be called.
     * `onSubmit` can also return promises, messages and throw error messages
     * just like `onValidate`. The only difference is that this validation will
     * only occur on submit.
     */
    onSubmit?: (values: V) => ValidateReturn<V>;
};
export declare type unstable_FormStateReturn<V> = unstable_FormState<V> & unstable_FormActions<V>;
export declare function unstable_useFormState<V = Record<any, any>>(initialState?: SealedInitialState<unstable_FormInitialState<V>>): unstable_FormStateReturn<V>;
export {};

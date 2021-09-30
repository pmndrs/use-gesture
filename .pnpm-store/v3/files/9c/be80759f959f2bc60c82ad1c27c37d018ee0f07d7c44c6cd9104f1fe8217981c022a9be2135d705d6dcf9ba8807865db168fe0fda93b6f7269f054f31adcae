import * as React from "react";
import { PropsWithAs, ArrayValue } from "reakit-utils/types";
import { CheckboxOptions, CheckboxHTMLProps } from "../Checkbox/Checkbox";
import { DeepPath, DeepPathValue } from "./__utils/types";
import { unstable_FormStateReturn } from "./FormState";
export declare type unstable_FormCheckboxOptions<V, P extends DeepPath<V, P>> = Omit<CheckboxOptions, "value" | "state" | "setState"> & Pick<unstable_FormStateReturn<V>, "baseId" | "values" | "update" | "blur" | "touched" | "errors"> & {
    /**
     * Checkbox's name as in form values.
     */
    name: P;
    /**
     * Checkbox's value is going to be used when multiple checkboxes share the
     * same state. Checking a checkbox with value will add it to the state
     * array.
     */
    value?: ArrayValue<DeepPathValue<V, P>>;
};
export declare type unstable_FormCheckboxHTMLProps = CheckboxHTMLProps & React.InputHTMLAttributes<any>;
export declare type unstable_FormCheckboxProps<V, P extends DeepPath<V, P>> = unstable_FormCheckboxOptions<V, P> & unstable_FormCheckboxHTMLProps;
export declare const unstable_useFormCheckbox: <V, P extends DeepPath<V, P>>(options: unstable_FormCheckboxOptions<V, P>, htmlProps?: CheckboxHTMLProps | undefined) => unstable_FormCheckboxHTMLProps;
export declare const unstable_FormCheckbox: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "input">(props: PropsWithAs<unstable_FormCheckboxOptions<V, P>, T>) => JSX.Element;

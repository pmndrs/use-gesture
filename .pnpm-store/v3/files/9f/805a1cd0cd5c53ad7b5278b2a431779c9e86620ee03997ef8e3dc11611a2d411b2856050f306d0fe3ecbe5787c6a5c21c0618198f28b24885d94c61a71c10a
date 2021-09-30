import * as React from "react";
import { PropsWithAs } from "reakit-utils/types";
import { CompositeStateReturn } from "../Composite/CompositeState";
import { unstable_FormGroupOptions, unstable_FormGroupHTMLProps } from "./FormGroup";
import { DeepPath } from "./__utils/types";
export declare type unstable_FormRadioGroupOptions<V, P extends DeepPath<V, P>> = unstable_FormGroupOptions<V, P> & {
    /**
     * FormRadioGroup's name as in form values.
     */
    name: P;
};
export declare type unstable_FormRadioGroupHTMLProps = unstable_FormGroupHTMLProps & React.FieldsetHTMLAttributes<any>;
export declare type unstable_FormRadioGroupProps<V, P extends DeepPath<V, P>> = unstable_FormRadioGroupOptions<V, P> & unstable_FormRadioGroupHTMLProps;
export declare const FormRadioGroupContext: React.Context<CompositeStateReturn | null>;
export declare const unstable_useFormRadioGroup: <V, P extends DeepPath<V, P>>(options: unstable_FormRadioGroupOptions<V, P>, htmlProps?: unstable_FormGroupHTMLProps | undefined) => unstable_FormRadioGroupHTMLProps;
export declare const unstable_FormRadioGroup: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "fieldset">(props: PropsWithAs<unstable_FormRadioGroupOptions<V, P>, T>) => JSX.Element;

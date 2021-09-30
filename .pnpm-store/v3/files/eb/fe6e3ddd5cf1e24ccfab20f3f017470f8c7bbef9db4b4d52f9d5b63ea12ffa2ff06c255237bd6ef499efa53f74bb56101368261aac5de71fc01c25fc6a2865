import * as React from "react";
import { PropsWithAs } from "reakit-utils/types";
import { GroupOptions, GroupHTMLProps } from "../Group/Group";
import { DeepPath } from "./__utils/types";
import { unstable_FormStateReturn } from "./FormState";
export declare type unstable_FormGroupOptions<V, P extends DeepPath<V, P>> = GroupOptions & Pick<unstable_FormStateReturn<V>, "baseId" | "touched" | "errors"> & {
    /**
     * FormGroup's name as in form values.
     */
    name: P;
};
export declare type unstable_FormGroupHTMLProps = GroupHTMLProps & React.FieldsetHTMLAttributes<any>;
export declare type unstable_FormGroupProps<V, P extends DeepPath<V, P>> = unstable_FormGroupOptions<V, P> & unstable_FormGroupHTMLProps;
export declare const unstable_useFormGroup: <V, P extends DeepPath<V, P>>(options: unstable_FormGroupOptions<V, P>, htmlProps?: unstable_FormGroupHTMLProps | undefined) => unstable_FormGroupHTMLProps;
export declare const unstable_FormGroup: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "fieldset">(props: PropsWithAs<unstable_FormGroupOptions<V, P>, T>) => JSX.Element;

import * as React from "react";
import { PropsWithAs } from "reakit-utils/types";
import { InputOptions, InputHTMLProps } from "../Input/Input";
import { DeepPath } from "./__utils/types";
import { unstable_FormStateReturn } from "./FormState";
export declare type unstable_FormInputOptions<V, P extends DeepPath<V, P>> = InputOptions & Pick<unstable_FormStateReturn<V>, "baseId" | "values" | "touched" | "errors" | "update" | "blur"> & {
    /**
     * FormInput's name as in form values.
     */
    name: P;
};
export declare type unstable_FormInputHTMLProps = InputHTMLProps & React.InputHTMLAttributes<any>;
export declare type unstable_FormInputProps<V, P extends DeepPath<V, P>> = unstable_FormInputOptions<V, P> & unstable_FormInputHTMLProps;
export declare const unstable_useFormInput: <V, P extends DeepPath<V, P>>(options: unstable_FormInputOptions<V, P>, htmlProps?: import("..").unstable_ComboboxHTMLProps | undefined) => unstable_FormInputHTMLProps;
export declare const unstable_FormInput: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "input">(props: PropsWithAs<unstable_FormInputOptions<V, P>, T>) => JSX.Element;

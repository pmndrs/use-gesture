import * as React from "react";
import { ArrayValue, PropsWithAs } from "reakit-utils/types";
import { ButtonOptions, ButtonHTMLProps } from "../Button/Button";
import { unstable_FormStateReturn } from "./FormState";
import { DeepPath, DeepPathValue } from "./__utils/types";
export declare type unstable_FormPushButtonOptions<V, P extends DeepPath<V, P>> = ButtonOptions & Pick<unstable_FormStateReturn<V>, "baseId" | "values" | "push"> & {
    /**
     * FormInput's name as in form values. This should point to array value.
     */
    name: P;
    /**
     * The value that is going to be pushed to `form.values[name]`.
     */
    value: ArrayValue<DeepPathValue<V, P>>;
};
export declare type unstable_FormPushButtonHTMLProps = ButtonHTMLProps;
export declare type unstable_FormPushButtonProps<V, P extends DeepPath<V, P>> = unstable_FormPushButtonOptions<V, P> & unstable_FormPushButtonHTMLProps;
export declare const unstable_useFormPushButton: <V, P extends DeepPath<V, P>>(options: unstable_FormPushButtonOptions<V, P>, htmlProps?: ButtonHTMLProps | undefined) => unstable_FormPushButtonHTMLProps;
export declare const unstable_FormPushButton: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "button">(props: PropsWithAs<unstable_FormPushButtonOptions<V, P>, T>) => JSX.Element;

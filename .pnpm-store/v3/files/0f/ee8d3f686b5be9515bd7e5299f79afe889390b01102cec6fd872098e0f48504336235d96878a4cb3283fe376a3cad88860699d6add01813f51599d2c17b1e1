import * as React from "react";
import { PropsWithAs } from "reakit-utils/types";
import { ButtonOptions, ButtonHTMLProps } from "../Button/Button";
import { unstable_FormStateReturn } from "./FormState";
import { DeepPath } from "./__utils/types";
export declare type unstable_FormRemoveButtonOptions<V, P extends DeepPath<V, P>> = ButtonOptions & Pick<unstable_FormStateReturn<V>, "baseId" | "values" | "remove"> & {
    /**
     * FormInput's name as in form values. This should point to array value.
     */
    name: P;
    /**
     * The index in `form.values[name]` that will be removed.
     */
    index: number;
};
export declare type unstable_FormRemoveButtonHTMLProps = ButtonHTMLProps;
export declare type unstable_FormRemoveButtonProps<V, P extends DeepPath<V, P>> = unstable_FormRemoveButtonOptions<V, P> & unstable_FormRemoveButtonHTMLProps;
export declare const unstable_useFormRemoveButton: <V, P extends DeepPath<V, P>>(options: unstable_FormRemoveButtonOptions<V, P>, htmlProps?: ButtonHTMLProps | undefined) => unstable_FormRemoveButtonHTMLProps;
export declare const unstable_FormRemoveButton: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "button">(props: PropsWithAs<unstable_FormRemoveButtonOptions<V, P>, T>) => JSX.Element;

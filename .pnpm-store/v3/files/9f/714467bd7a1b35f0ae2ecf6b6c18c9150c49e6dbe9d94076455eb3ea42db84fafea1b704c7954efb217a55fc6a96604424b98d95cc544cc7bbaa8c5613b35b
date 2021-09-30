import * as React from "react";
import { PropsWithAs } from "reakit-utils/types";
import { RadioHTMLProps } from "../Radio/Radio";
import { RoleOptions } from "../Role";
import { unstable_FormStateReturn } from "./FormState";
import { DeepPath, DeepPathValue } from "./__utils/types";
export declare type unstable_FormRadioOptions<V, P extends DeepPath<V, P>> = RoleOptions & Pick<unstable_FormStateReturn<V>, "values" | "update" | "blur"> & {
    /**
     * FormRadio's name as in form values.
     */
    name: P;
    /**
     * FormRadio's value.
     */
    value: DeepPathValue<V, P>;
};
export declare type unstable_FormRadioHTMLProps = RadioHTMLProps;
export declare type unstable_FormRadioProps<V, P extends DeepPath<V, P>> = unstable_FormRadioOptions<V, P> & unstable_FormRadioHTMLProps;
export declare const unstable_useFormRadio: <V, P extends DeepPath<V, P>>(options: unstable_FormRadioOptions<V, P>, htmlProps?: import("..").unstable_ComboboxHTMLProps | undefined) => unstable_FormRadioHTMLProps;
export declare const unstable_FormRadio: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "input">(props: PropsWithAs<unstable_FormRadioOptions<V, P>, T>) => JSX.Element;

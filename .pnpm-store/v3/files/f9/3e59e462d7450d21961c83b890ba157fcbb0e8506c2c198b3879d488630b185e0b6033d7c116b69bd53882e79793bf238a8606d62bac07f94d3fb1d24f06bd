import * as React from "react";
import { PropsWithAs } from "reakit-utils/types";
import { RoleOptions, RoleHTMLProps } from "../Role/Role";
import { DeepPath } from "./__utils/types";
import { unstable_FormStateReturn } from "./FormState";
export declare type unstable_FormLabelOptions<V, P extends DeepPath<V, P>> = RoleOptions & Pick<unstable_FormStateReturn<V>, "baseId" | "values"> & {
    /**
     * FormInput's name as in form values.
     */
    name: P;
    /**
     * Label can be passed as the `label` prop or `children`.
     */
    label?: any;
};
export declare type unstable_FormLabelHTMLProps = RoleHTMLProps & React.LabelHTMLAttributes<any>;
export declare type unstable_FormLabelProps<V, P extends DeepPath<V, P>> = unstable_FormLabelOptions<V, P> & unstable_FormLabelHTMLProps;
export declare const unstable_useFormLabel: <V, P extends DeepPath<V, P>>(options: unstable_FormLabelOptions<V, P>, htmlProps?: unstable_FormLabelHTMLProps | undefined) => unstable_FormLabelHTMLProps;
export declare const unstable_FormLabel: <V, P extends DeepPath<V, P>, T extends React.ElementType<any> = "label">(props: PropsWithAs<unstable_FormLabelOptions<V, P>, T>) => JSX.Element;

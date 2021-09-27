import * as React from "react";
import { As, PropsWithAs } from "reakit-utils/types";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { GroupOptions, GroupHTMLProps, useGroup } from "../Group/Group";
import { DeepPath } from "./__utils/types";
import { getInputId } from "./__utils/getInputId";
import { getMessageId } from "./__utils/getMessageId";
import { getLabelId } from "./__utils/getLabelId";
import { shouldShowError } from "./__utils/shouldShowError";
import { unstable_FormStateReturn } from "./FormState";
import { FORM_GROUP_KEYS } from "./__keys";

export type unstable_FormGroupOptions<
  V,
  P extends DeepPath<V, P>
> = GroupOptions &
  Pick<unstable_FormStateReturn<V>, "baseId" | "touched" | "errors"> & {
    /**
     * FormGroup's name as in form values.
     */
    name: P;
  };

export type unstable_FormGroupHTMLProps = GroupHTMLProps &
  React.FieldsetHTMLAttributes<any>;

export type unstable_FormGroupProps<
  V,
  P extends DeepPath<V, P>
> = unstable_FormGroupOptions<V, P> & unstable_FormGroupHTMLProps;

export const unstable_useFormGroup = createHook<
  unstable_FormGroupOptions<any, any>,
  unstable_FormGroupHTMLProps
>({
  name: "FormGroup",
  compose: useGroup,
  keys: FORM_GROUP_KEYS,

  useProps(options, htmlProps) {
    return {
      id: getInputId(options.name, options.baseId),
      tabIndex: -1,
      "aria-describedby": getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId(options.name, options.baseId),
      "aria-invalid": shouldShowError(options, options.name),
      ...htmlProps,
    };
  },
}) as <V, P extends DeepPath<V, P>>(
  options: unstable_FormGroupOptions<V, P>,
  htmlProps?: unstable_FormGroupHTMLProps
) => unstable_FormGroupHTMLProps;

export const unstable_FormGroup = (createComponent({
  as: "fieldset",
  useHook: unstable_useFormGroup,
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "fieldset">(
  props: PropsWithAs<unstable_FormGroupOptions<V, P>, T>
) => JSX.Element;

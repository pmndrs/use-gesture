import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { As, PropsWithAs } from "reakit-utils/types";
import { createHook } from "reakit-system/createHook";
import {
  CompositeStateReturn,
  useCompositeState,
} from "../Composite/CompositeState";
import {
  unstable_FormGroupOptions,
  unstable_FormGroupHTMLProps,
  unstable_useFormGroup,
} from "./FormGroup";
import { DeepPath } from "./__utils/types";
import { getInputId } from "./__utils/getInputId";
import { FORM_RADIO_GROUP_KEYS } from "./__keys";

export type unstable_FormRadioGroupOptions<
  V,
  P extends DeepPath<V, P>
> = unstable_FormGroupOptions<V, P> & {
  /**
   * FormRadioGroup's name as in form values.
   */
  name: P;
};

export type unstable_FormRadioGroupHTMLProps = unstable_FormGroupHTMLProps &
  React.FieldsetHTMLAttributes<any>;

export type unstable_FormRadioGroupProps<
  V,
  P extends DeepPath<V, P>
> = unstable_FormRadioGroupOptions<V, P> & unstable_FormRadioGroupHTMLProps;

export const FormRadioGroupContext = React.createContext<CompositeStateReturn | null>(
  null
);

export const unstable_useFormRadioGroup = createHook<
  unstable_FormRadioGroupOptions<any, any>,
  unstable_FormRadioGroupHTMLProps
>({
  name: "FormRadioGroup",
  compose: unstable_useFormGroup as any,
  keys: FORM_RADIO_GROUP_KEYS,

  useOptions(options, { name }) {
    return {
      ...options,
      name: options.name || name,
    };
  },

  useProps(options, { wrapElement: htmlWrapElement, ...htmlProps }) {
    const id = getInputId(options.name, options.baseId);
    const composite = useCompositeState({ baseId: id, loop: true });
    const providerValue = React.useMemo(
      () => composite,
      Object.values(composite)
    );

    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        element = (
          <FormRadioGroupContext.Provider value={providerValue}>
            {element}
          </FormRadioGroupContext.Provider>
        );
        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }
        return element;
      },
      [providerValue, htmlWrapElement]
    );

    return {
      role: "radiogroup",
      wrapElement,
      ...htmlProps,
    };
  },
}) as <V, P extends DeepPath<V, P>>(
  options: unstable_FormRadioGroupOptions<V, P>,
  htmlProps?: unstable_FormRadioGroupHTMLProps
) => unstable_FormRadioGroupHTMLProps;

export const unstable_FormRadioGroup = (createComponent({
  as: "fieldset",
  useHook: unstable_useFormRadioGroup,
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "fieldset">(
  props: PropsWithAs<unstable_FormRadioGroupOptions<V, P>, T>
) => JSX.Element;

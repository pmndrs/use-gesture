import { createComponent } from "reakit-system/createComponent";
import { As, PropsWithAs } from "reakit-utils/types";
import { createHook } from "reakit-system/createHook";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { unstable_FormStateReturn } from "./FormState";
import { unstable_getIn } from "./utils/getIn";
import { getMessageId } from "./__utils/getMessageId";
import { shouldShowError } from "./__utils/shouldShowError";
import { shouldShowMessage } from "./__utils/shouldShowMessage";
import { DeepPath } from "./__utils/types";
import { FORM_MESSAGE_KEYS } from "./__keys";

export type unstable_FormMessageOptions<
  V,
  P extends DeepPath<V, P>
> = RoleOptions &
  Pick<
    unstable_FormStateReturn<V>,
    "baseId" | "touched" | "errors" | "messages"
  > & {
    /**
     * FormInput's name as in form values.
     */
    name: P;
  };

export type unstable_FormMessageHTMLProps = RoleHTMLProps;

export type unstable_FormMessageProps<
  V,
  P extends DeepPath<V, P>
> = unstable_FormMessageOptions<V, P> & unstable_FormMessageHTMLProps;

export const unstable_useFormMessage = createHook<
  unstable_FormMessageOptions<any, any>,
  unstable_FormMessageHTMLProps
>({
  name: "FormMessage",
  compose: useRole,
  keys: FORM_MESSAGE_KEYS,

  useProps(options, htmlProps) {
    let children = shouldShowError(options, options.name)
      ? unstable_getIn(options.errors, options.name as any)
      : undefined;

    children =
      children ||
      (shouldShowMessage(options, options.name)
        ? unstable_getIn(options.messages, options.name as any)
        : undefined);

    return {
      role: "alert",
      id: getMessageId(options.name, options.baseId),
      children,
      ...htmlProps,
    };
  },
}) as <V, P extends DeepPath<V, P>>(
  options: unstable_FormMessageOptions<V, P>,
  htmlProps?: unstable_FormMessageHTMLProps
) => unstable_FormMessageHTMLProps;

export const unstable_FormMessage = (createComponent({
  as: "div",
  memo: true,
  useHook: unstable_useFormMessage,
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "div">(
  props: PropsWithAs<unstable_FormMessageOptions<V, P>, T>
) => JSX.Element;

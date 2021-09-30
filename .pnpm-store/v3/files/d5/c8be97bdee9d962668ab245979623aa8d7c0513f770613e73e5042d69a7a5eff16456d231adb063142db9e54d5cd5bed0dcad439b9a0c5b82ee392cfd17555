import { unstable_FormState } from "../FormState";
import { unstable_getIn } from "../utils/getIn";

export function shouldShowMessage<V>(
  { touched, messages }: Pick<unstable_FormState<V>, "touched" | "messages">,
  name: any
) {
  return !!(unstable_getIn(touched, name) && unstable_getIn(messages, name));
}

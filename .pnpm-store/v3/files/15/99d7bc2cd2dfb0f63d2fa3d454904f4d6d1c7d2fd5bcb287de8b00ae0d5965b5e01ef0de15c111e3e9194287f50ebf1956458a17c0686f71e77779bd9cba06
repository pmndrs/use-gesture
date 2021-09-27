import { unstable_FormState } from "../FormState";
import { unstable_getIn } from "../utils/getIn";

export function shouldShowError<V>(
  { touched, errors }: Pick<unstable_FormState<V>, "touched" | "errors">,
  name: any
) {
  return !!(unstable_getIn(touched, name) && unstable_getIn(errors, name));
}

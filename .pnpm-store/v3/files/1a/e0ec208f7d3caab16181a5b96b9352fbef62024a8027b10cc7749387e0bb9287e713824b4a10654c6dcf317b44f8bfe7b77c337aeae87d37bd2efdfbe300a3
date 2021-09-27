import { CompositeState } from "../CompositeState";
import { findFirstEnabledItem } from "./findFirstEnabledItem";

export function getCurrentId(
  options: Pick<CompositeState, "currentId" | "items">,
  passedId?: CompositeState["currentId"]
) {
  if (passedId || passedId === null) {
    return passedId;
  }
  if (options.currentId || options.currentId === null) {
    return options.currentId;
  }
  return findFirstEnabledItem(options.items || [])?.id;
}

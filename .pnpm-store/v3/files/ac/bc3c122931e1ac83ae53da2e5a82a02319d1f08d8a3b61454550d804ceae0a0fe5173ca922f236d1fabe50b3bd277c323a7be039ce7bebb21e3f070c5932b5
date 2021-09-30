import { formatInputName } from "./formatInputName";

export function getInputId(name: any, baseId: string | undefined, suffix = "") {
  if (baseId) {
    return `${baseId}-${formatInputName(name, "-")}${suffix}`;
  }
  return undefined;
}

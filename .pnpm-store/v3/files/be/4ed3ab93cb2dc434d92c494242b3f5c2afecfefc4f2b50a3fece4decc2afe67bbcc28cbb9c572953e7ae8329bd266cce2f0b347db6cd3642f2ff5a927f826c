import { Orientation } from "./types";

const map = {
  horizontal: "vertical",
  vertical: "horizontal",
} as const;

export function getOppositeOrientation(orientation?: Orientation) {
  return orientation && map[orientation];
}

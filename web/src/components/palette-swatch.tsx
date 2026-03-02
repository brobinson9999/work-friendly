import type { Color } from "../models/colors";
import { div } from "./tags";

interface Props {
  colors: Color[];
}

export function PaletteSwatch({ colors }: Props) {
  return div(
    ["palette-swatch"],
    {},
    colors.map((color) =>
      div(["palette-swatch-item"], {
        "--swatch-item-width": `${100 / colors.length}%`,
        "--swatch-item-color": color.cssValue,
      }),
    ),
  );
}

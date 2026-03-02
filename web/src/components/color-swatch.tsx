import type { Color } from "../models/colors";
import { div } from "./tags";

interface Props {
  color: Color;
}

export function ColorSwatch({ color }: Props) {
  return div(["color-swatch-container"], { "--swatch-color": color.cssValue }, [
    div(["color-swatch-inner"]),
  ]);
}

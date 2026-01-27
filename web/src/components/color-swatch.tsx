import type { Color } from "../models/colors";

interface Props {
  color: Color;
}

export function ColorSwatch({ color }: Props) {
  return (
    <div
      className="color-swatch-container"
      style={{ "--swatch-color": color.cssValue } as React.CSSProperties}
    >
      <div className="color-swatch-inner"></div>
    </div>
  );
}

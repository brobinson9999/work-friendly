import type { Color } from "../models/colors";

interface Props {
  colors: Color[];
}

export function PaletteSwatch({ colors }: Props) {
  return (
    <div className="palette-swatch">
      {colors.map((color, index) => (
        <div
          key={index}
          className="palette-swatch-item"
          style={
            {
              "--swatch-item-width": `${100 / colors.length}%`,
              "--swatch-item-color": color.rgbaString,
            } as React.CSSProperties
          }
        ></div>
      ))}
    </div>
  );
}

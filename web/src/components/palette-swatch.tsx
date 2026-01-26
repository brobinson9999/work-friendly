import type { Color } from "../models/colors";

interface Props {
  colors: Color[];
}

export function PaletteSwatch({ colors }: Props) {
  return (
    <div style={{ display: "flex", height: "20px", border: "1px solid #ccc" }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: `${100 / colors.length}%`,
            backgroundColor: color.rgbaString,
            flex: 1,
          }}
        ></div>
      ))}
    </div>
  );
}

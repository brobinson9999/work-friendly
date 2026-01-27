import type { Color } from "../models/colors";

interface Props {
  color: Color;
}

export function ColorSwatch({ color }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "80px",
        height: "30px",
        background: "linear-gradient(to right, black, white)",
      }}
    >
      <div
        style={{
          backgroundColor: color.rgbaString,
          width: "60px",
          height: "20px",
          borderRadius: "4px",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}

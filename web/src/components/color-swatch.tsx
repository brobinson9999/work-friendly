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
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "white",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "black",
        }}
      ></div>
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

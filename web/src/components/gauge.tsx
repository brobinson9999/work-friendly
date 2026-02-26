export type GaugeProps = {
  label: string;
  indicatorPosition: number;
};

export function linearIndicatorPosition(
  value: number,
  minValue: number,
  maxValue: number,
) {
  return (value - minValue) / (maxValue - minValue);
}

export const Gauge: React.FC<GaugeProps> = ({ label, indicatorPosition }) => {
  return (
    <div className="gauge">
      <div className="gauge-background"></div>
      <div
        className="gauge-indicator"
        style={
          {
            ["--gauge-indicator-position"]: `${indicatorPosition}`,
          } as React.CSSProperties
        }
      ></div>
      <div className="gauge-label">{label}</div>
    </div>
  );
};

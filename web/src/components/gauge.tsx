import { div } from "./tags";

const GaugeClassName = {
  BarGauge: "bar-gauge",
  OneEightySpeedo: "one-eighty-speedo",
  RadioGauge: "radio-gauge",
  TwoSeventySpeedo: "two-seventy-speedo",
  VerticalGauge: "vertical-gauge",
} as const;

export type GaugeClassName =
  (typeof GaugeClassName)[keyof typeof GaugeClassName];

export type GaugeProps = {
  className: GaugeClassName;
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

export const Gauge: React.FC<GaugeProps> = ({
  className,
  label,
  indicatorPosition,
}) => {
  return div(["gauge", className], {}, [
    div(["gauge-background"]),
    div(["gauge-indicator"], {
      "--gauge-indicator-position": indicatorPosition.toString(),
    }),
    div(["gauge-label"], {}, label),
  ]);
};

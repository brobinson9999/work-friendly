import type { ChartAxis } from "./chart-axis";

export type BarChartProps<TData> = {
  data: TData[];
  labelAxis?: ChartAxis<TData>;
  valueAxis: ChartAxis<TData>;
  barHeightAxis?: ChartAxis<TData>;
  colorAxis?: ChartAxis<TData>;
};

// Simple bar chart using SVG
export function BarChart<TData>({
  data,
  labelAxis,
  valueAxis,
  barHeightAxis,
  colorAxis,
}: BarChartProps<TData>) {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Chart dimensions
  const width = 600;
  const barGap = 8;
  const labelWidth = 120;
  const minimumBarWidth = 8;
  const barWidthScale = 16;
  const chartHeight =
    barGap +
    data.reduce(
      (sum, _datum, index) =>
        sum +
        minimumBarWidth +
        (barHeightAxis
          ? barHeightAxis.position(data, index) * barWidthScale
          : barWidthScale) +
        barGap,
      0,
    );

  // Find max value for scaling
  const barMaxWidth = width - labelWidth - 32;

  let y = barGap;

  return (
    <div className="bar-chart">
      <svg width={width} height={chartHeight}>
        {data.map((_datum, index) => {
          const barHeight =
            minimumBarWidth +
            (barHeightAxis
              ? barHeightAxis.position(data, index) * barWidthScale
              : barWidthScale);
          const barWidth = valueAxis.position(data, index) * barMaxWidth;
          const result = (
            <g key={index}>
              {/* Name label */}
              <text
                x={8}
                y={y + barHeight / 2 + 6}
                fontSize={14}
                fill="var(--current-on-color)"
              >
                {labelAxis ? labelAxis.stringValue(data, index) : ""}
              </text>
              {/* Bar */}
              <rect
                x={labelWidth}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colorAxis ? colorAxis.colorValue(data, index) : "#4f8ef7"}
                rx={4}
              />
              {/* Value label */}
              <text
                x={labelWidth + barWidth + 8}
                y={y + barHeight / 2 + 6}
                fontSize={13}
                fill="var(--current-on-color)"
              >
                {valueAxis ? valueAxis.stringValue(data, index) : ""}
              </text>
            </g>
          );
          y += barHeight + barGap;
          return result;
        })}
      </svg>
    </div>
  );
}

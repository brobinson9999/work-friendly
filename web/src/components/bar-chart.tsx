export type BarChartProps<TData> = {
  data: TData[];
  labelAxis?: ChartAxis<TData, string>;
  valueAxis: ChartAxis<TData, number>;
  barHeightAxis?: ChartAxis<TData, number>;
  colorAxis?: ChartAxis<TData, string>;
};

export type ChartAxis<TData, TValue> = {
  label: string;
  getValue: (data: TData) => TValue;
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
  const chartHeight =
    barGap +
    data.reduce(
      (sum, datum) =>
        sum + (barHeightAxis ? barHeightAxis.getValue(datum) : 24) + barGap,
      0,
    );

  // Find max value for scaling
  const maxValue = Math.max(...data.map((s) => valueAxis.getValue(s)));
  const barMaxWidth = width - labelWidth - 32;

  let y = barGap;

  return (
    <div>
      <svg
        width={width}
        height={chartHeight}
        style={{ background: "#f9f9f9", border: "1px solid #ddd" }}
      >
        {data.map((datum, index) => {
          const value = valueAxis.getValue(datum);
          const barHeight = barHeightAxis ? barHeightAxis.getValue(datum) : 24;
          const barWidth = (value / maxValue) * barMaxWidth;
          const result = (
            <g key={index}>
              {/* Name label */}
              <text x={8} y={y + barHeight / 2 + 6} fontSize={14} fill="#333">
                {labelAxis ? labelAxis.getValue(datum) : ""}
              </text>
              {/* Bar */}
              <rect
                x={labelWidth}
                y={y}
                width={barWidth}
                height={barHeightAxis ? barHeightAxis.getValue(datum) : 24}
                fill={colorAxis ? colorAxis.getValue(datum) : "#4f8ef7"}
                rx={4}
              />
              {/* Value label */}
              <text
                x={labelWidth + barWidth + 8}
                y={y + barHeight / 2 + 6}
                fontSize={13}
                fill="#222"
              >
                {value}
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

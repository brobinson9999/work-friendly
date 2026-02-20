import { ColorSwatch } from "./color-swatch";

export type BarChartProps<TData> = {
  data: TData[];
  labelAxis?: ChartAxis<TData>;
  valueAxis: ChartAxis<TData>;
  barHeightAxis?: ChartAxis<TData>;
  colorAxis?: ChartAxis<TData>;
};

export type ChartTick = {
  label: string;
  position: number; // 0 to 1
};

export type ChartAxis<TData> = {
  label: string;
  visible: boolean;
  colorValue(data: TData[], index: number): string;
  stringValue(data: TData[], index: number): string;
  jsxValue(data: TData[], index: number): React.ReactNode;
  position(data: TData[], index: number): number; // 0 to 1 for position along the axis
  ticks(data: TData[]): ChartTick[]; // Optional: for axes that need ticks (like scatter plot)
};

export function nullAxis<TData>(label: string): ChartAxis<TData> {
  return {
    label,
    visible: false,
    colorValue() {
      return "";
    },
    stringValue() {
      return "";
    },
    jsxValue() {
      return <span></span>;
    },
    position() {
      return 1;
    },
    ticks() {
      return [];
    },
  };
}

export function numberAxis<TData>(
  label: string,
  getValue: (data: TData) => number,
  opts?: { min?: number; max?: number },
): ChartAxis<TData> {
  const position = (data: TData[], index: number) => {
    const values = data.map(getValue);
    const min = opts?.min ?? Math.min(...values);
    const max = opts?.max ?? Math.max(...values);
    if (max === min) return 0.5;
    return (getValue(data[index]) - min) / (max - min);
  };

  return {
    label,
    visible: true,
    colorValue(data: TData[], index: number) {
      return `oklch(70% 0.15 ${position(data, index) * 360} / 0.75)`;
    },
    stringValue(data: TData[], index: number) {
      const value = getValue(data[index]);
      return value.toString();
    },
    jsxValue(data: TData[], index: number) {
      const value = getValue(data[index]);
      return <span>{value}</span>;
    },
    position,
    ticks(data: TData[]) {
      const values = data.map(getValue);
      const min = opts?.min ?? Math.min(...values);
      const max = opts?.max ?? Math.max(...values);
      if (max === min) return [{ label: min.toString(), position: 0.5 }];
      const step = (max - min) / 5;
      return Array.from({ length: 6 }, (_, i) => ({
        label: (min + i * step).toString(),
        position: i / 5,
      }));
    },
  };
}

export function dateAxis<TData>(
  label: string,
  getValue: (data: TData) => Date,
  opts?: { min?: Date; max?: Date },
): ChartAxis<TData> {
  const position = (data: TData[], index: number) => {
    const values = data.map(getValue);
    const min =
      opts?.min ?? new Date(Math.min(...values.map((v) => v.getTime())));
    const max =
      opts?.max ?? new Date(Math.max(...values.map((v) => v.getTime())));
    if (max.getTime() === min.getTime()) return 0.5;
    return (
      (getValue(data[index]).getTime() - min.getTime()) /
      (max.getTime() - min.getTime())
    );
  };

  return {
    label,
    visible: true,
    colorValue(data: TData[], index: number) {
      return `oklch(70% 0.15 ${position(data, index) * 360} / 0.75)`;
    },
    stringValue(data: TData[], index: number) {
      return getValue(data[index]).toISOString();
    },
    jsxValue(data: TData[], index: number) {
      return <span>{getValue(data[index]).toISOString()}</span>;
    },
    position,
    ticks(data: TData[]) {
      const values = data.map(getValue);
      const min =
        opts?.min ?? new Date(Math.min(...values.map((v) => v.getTime())));
      const max =
        opts?.max ?? new Date(Math.max(...values.map((v) => v.getTime())));
      if (max.getTime() === min.getTime())
        return [{ label: min.toISOString(), position: 0.5 }];
      const step = (max.getTime() - min.getTime()) / 5;
      return Array.from({ length: 6 }, (_, i) => ({
        label: new Date(min.getTime() + i * step).toISOString(),
        position: i / 5,
      }));
    },
  };
}

export function textAxis<TData>(
  label: string,
  getValue: (data: TData) => string,
): ChartAxis<TData> {
  return {
    label,
    visible: true,
    colorValue(data: TData[], index: number) {
      return getValue(data[index]);
    },
    stringValue(data: TData[], index: number) {
      return getValue(data[index]);
    },
    jsxValue(data: TData[], index: number) {
      return <span>{getValue(data[index])}</span>;
    },
    position(data: TData[], index: number) {
      return index / (data.length - 1);
    },
    ticks(data: TData[]) {
      const values = data.map(getValue);
      return values.map((value, index) => ({
        label: value,
        position: index / (values.length - 1),
      }));
    },
  };
}

export function colorAxis<TData>(
  label: string,
  getValue: (data: TData) => string,
): ChartAxis<TData> {
  return {
    label,
    visible: true,
    colorValue(data: TData[], index: number) {
      return getValue(data[index]);
    },
    stringValue(data: TData[], index: number) {
      return getValue(data[index]);
    },
    jsxValue(data: TData[], index: number) {
      return (
        <ColorSwatch color={{ name: "", cssValue: getValue(data[index]) }} />
      );
    },
    position(data: TData[], index: number) {
      return index / (data.length - 1);
    },
    ticks(data: TData[]) {
      const values = data.map(getValue);
      return values.map((value, index) => ({
        label: value,
        position: index / (values.length - 1),
      }));
    },
  };
}

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
  const barWidthScale = 48;
  const chartHeight =
    barGap +
    data.reduce(
      (sum, _datum, index) =>
        sum +
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
    <div>
      <svg
        width={width}
        height={chartHeight}
        style={{ background: "#f9f9f9", border: "1px solid #ddd" }}
      >
        {data.map((_datum, index) => {
          const barHeight = barHeightAxis
            ? barHeightAxis.position(data, index) * barWidthScale
            : barWidthScale;
          const barWidth = valueAxis.position(data, index) * barMaxWidth;
          const result = (
            <g key={index}>
              {/* Name label */}
              <text x={8} y={y + barHeight / 2 + 6} fontSize={14} fill="#333">
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
                fill="#222"
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

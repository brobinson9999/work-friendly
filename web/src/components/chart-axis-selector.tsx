import type { ChartAxis } from "./bar-chart";

export type ChartAxisSelectorProps<TData> = {
  id: string;
  label: string;
  axes: ChartAxis<TData>[];
  state: number;
  setState: (index: number) => void;
};

// Simple bar chart using SVG
export function ChartAxisSelector<TData>({
  id,
  label,
  axes,
  state,
  setState,
}: ChartAxisSelectorProps<TData>) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <label htmlFor={`${id}-select`}>{label}: </label>
      <select
        id={`${id}-select`}
        value={state}
        onChange={(e) => setState(parseInt(e.target.value))}
      >
        {axes.map((axis, index) => (
          <option key={index} value={index}>
            {axis.label}
          </option>
        ))}
      </select>
    </div>
  );
}

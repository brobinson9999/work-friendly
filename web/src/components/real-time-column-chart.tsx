import { useRef, type JSX } from "react";

import type { ChartAxis } from "./chart-axis";
import { div } from "./tags";

export type RealTimeColumnChartProps<TData> = {
  data: TData[];
  keyAxis: ChartAxis<TData>;
  positiveAxis: ChartAxis<TData>;
  negativeAxis: ChartAxis<TData>;
};

const TIME_WINDOW_MS = 10000; // 10 seconds

export function RealTimeColumnChart<TData>({
  data,
  keyAxis,
  positiveAxis,
  negativeAxis,
}: RealTimeColumnChartProps<TData>) {
  const positiveBars = useRef<Map<string, JSX.Element>>(new Map());
  const negativeBars = useRef<Map<string, JSX.Element>>(new Map());

  data.forEach((_datum, index) => {
    const keyValue = keyAxis.stringValue(data, index);
    const positivePosition = positiveAxis.position(data, index);
    const negativePosition = negativeAxis.position(data, index);

    if (positivePosition < 0) {
      positiveBars.current.delete(keyValue);
    } else if (!positiveBars.current.has(keyValue)) {
      positiveBars.current.set(
        keyValue,
        div(
          ["positive", "timing-bar"],
          {
            "--x-position": `${positivePosition}`,
          },
          [],
          { key: `positive-${keyValue}` },
        ),
      );
    }

    if (negativePosition < 0) {
      negativeBars.current.delete(keyValue);
    } else if (!negativeBars.current.has(keyValue)) {
      negativeBars.current.set(
        keyValue,
        div(
          ["negative", "timing-bar"],
          {
            "--x-position": `${negativePosition}`,
          },
          [],
          { key: `negative-${keyValue}` },
        ),
      );
    }
  });

  return div(
    ["timing-visualization"],
    {
      "--time-window": `${TIME_WINDOW_MS}ms`,
    },
    [...positiveBars.current.values(), ...negativeBars.current.values()],
  );
}

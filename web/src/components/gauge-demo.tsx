import { useEffect, useState } from "react";
import { Gauge, type GaugeClassName } from "./gauge";
import { linearInterpolate } from "../utils/linear-interpolate";

export type GaugeDemoProps = {
  className: GaugeClassName;
};

export const GaugeDemo: React.FC<GaugeDemoProps> = ({ className }) => {
  const minValue = 0;
  const maxValue = 100;

  const [value, setValue] = useState(minValue);

  const indicatorPosition = linearInterpolate(value, minValue, maxValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.round(Math.random() * (maxValue - minValue) + minValue));
    }, 700);
    return () => clearInterval(interval);
  }, [minValue, maxValue]);

  return (
    <>
      <Gauge className={className} label={`0`} indicatorPosition={0} />
      <Gauge className={className} label={`25`} indicatorPosition={0.25} />
      <Gauge className={className} label={`50`} indicatorPosition={0.5} />
      <Gauge className={className} label={`75`} indicatorPosition={0.75} />
      <Gauge className={className} label={`100`} indicatorPosition={1} />
      <Gauge
        className={className}
        label={`${value}`}
        indicatorPosition={indicatorPosition}
      />
    </>
  );
};

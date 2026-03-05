export function linearInterpolate(
  value: number,
  minValue: number,
  maxValue: number,
) {
  return (value - minValue) / (maxValue - minValue);
}

export const range = (start: number, stop?: number, step = 1) => {
  // If only one argument is provided, it's treated as the stop value, and start becomes 0
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  // Calculate the length of the array needed
  const length = Math.ceil((stop - start) / step) + 1;

  // Use Array.from to create the array with the desired length and map the values
  return Array.from({ length }, (_, i) => start + i * step);
};

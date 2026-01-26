import { useState } from "react";

export function useRedraw() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_counter, setCounter] = useState(0);

  return () => setCounter((prevCounter) => prevCounter + 1);
}

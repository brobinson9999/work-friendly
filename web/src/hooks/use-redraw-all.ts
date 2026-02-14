import { useEffect } from "react";
import { useRedraw } from "./use-redraw";

const redraws: (() => void)[] = [];

export function redrawAll() {
  const oldRedraws = [...redraws];
  redraws.length = 0;
  oldRedraws.forEach((redraw) => redraw());
}

export function useRedrawAll(): void {
  const redraw = useRedraw();

  useEffect(() => {
    redraws.push(redraw);

    return () => {
      const index = redraws.indexOf(redraw);
      if (index !== -1) {
        redraws.splice(index, 1);
      }
    };
  }, [redraw]);
}

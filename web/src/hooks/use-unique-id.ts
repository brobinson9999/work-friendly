import { useMemo } from "react";

export function useUniqueId(): string {
  return useMemo(() => crypto.randomUUID(), []);
}

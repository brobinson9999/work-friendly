import { div } from "./tags";

interface ContainerProps {
  children: React.ReactNode;
}

export function SecondaryContainer({ children }: ContainerProps) {
  return div(["secondary"], {}, children);
}

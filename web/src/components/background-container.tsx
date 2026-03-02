import { div } from "./tags";

interface ContainerProps {
  children: React.ReactNode;
}

export function BackgroundContainer({ children }: ContainerProps) {
  return div(["background"], {}, children);
}

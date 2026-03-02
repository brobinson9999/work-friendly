import { div } from "./tags";

interface ContainerProps {
  children: React.ReactNode;
}

export function SurfaceContainer({ children }: ContainerProps) {
  return div(["surface"], {}, children);
}

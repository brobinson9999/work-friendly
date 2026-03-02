import { div } from "./tags";

interface ContainerProps {
  children: React.ReactNode;
}

export function PrimaryContainer({ children }: ContainerProps) {
  return div(["primary"], {}, children);
}

interface ContainerProps {
  children: React.ReactNode;
}

export function SurfaceContainer({ children }: ContainerProps) {
  return <div className="surface">{children}</div>;
}

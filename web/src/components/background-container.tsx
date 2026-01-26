interface ContainerProps {
  children: React.ReactNode;
}

export function BackgroundContainer({ children }: ContainerProps) {
  return <div className="background">{children}</div>;
}

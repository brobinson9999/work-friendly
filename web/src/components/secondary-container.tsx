interface ContainerProps {
  children: React.ReactNode;
}

export function SecondaryContainer({ children }: ContainerProps) {
  return <div className="secondary">{children}</div>;
}

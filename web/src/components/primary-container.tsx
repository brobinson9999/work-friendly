interface ContainerProps {
  children: React.ReactNode;
}

export function PrimaryContainer({ children }: ContainerProps) {
  return <div className="primary">{children}</div>;
}

interface ContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SurfaceContainer({ children, style }: ContainerProps) {
  return (
    <div style={style} className="surface">
      {children}
    </div>
  );
}

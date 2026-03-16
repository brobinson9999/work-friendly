import type { JSX } from "react";

export function br(): JSX.Element {
  return <br />;
}

export function div(
  classes?: string[],
  vars?: Record<string, string | undefined>,
  children?: React.ReactNode,
  opts: { key?: string } = {},
): JSX.Element {
  const className = classes?.join(" ") || "";
  return (
    <div key={opts.key} className={className} style={vars}>
      {children}
    </div>
  );
}

export function tr(
  classes?: string[],
  vars?: Record<string, string | undefined>,
  children?: React.ReactNode,
  opts: { key?: string } = {},
): JSX.Element {
  const className = classes?.join(" ") || "";
  return (
    <tr key={opts.key} className={className} style={vars}>
      {children}
    </tr>
  );
}

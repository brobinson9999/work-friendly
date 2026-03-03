import type { JSX } from "react";
import { useUniqueId } from "../hooks/use-unique-id";

export type FormFieldProps = {
  label: React.ReactNode;
  input: (id: string) => React.ReactNode;
};

export function FormField({ label, input }: FormFieldProps): JSX.Element {
  const uniqueId = useUniqueId();

  return (
    <div className="form-group">
      <label htmlFor={uniqueId} className="form-label">
        {label}
      </label>
      {input(uniqueId)}
    </div>
  );
}

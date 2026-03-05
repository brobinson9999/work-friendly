import type { JSX } from "react";
import { useUniqueId } from "../hooks/use-unique-id";
import type { FormFieldProps } from "./form-field";

export function FormFieldReverse({
  label,
  input,
}: FormFieldProps): JSX.Element {
  const uniqueId = useUniqueId();

  return (
    <div className="form-group">
      {input(uniqueId)}
      <label htmlFor={uniqueId} className="form-label">
        {label}
      </label>
    </div>
  );
}

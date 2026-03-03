import { useState } from "react";
import { FormField } from "../../components/form-field";

interface LogsNewProps {
  submitCommand: (message: string) => void;
}

export function LogsNew({ submitCommand }: LogsNewProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="logs new">
      <FormField
        label="Message"
        input={(id) => (
          <input
            type="text"
            id={id}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="form-input"
          />
        )}
      />

      <button type="submit" className="form-button">
        Write to Log
      </button>
    </form>
  );
}

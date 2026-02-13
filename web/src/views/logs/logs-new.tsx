import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="shell-command-form">
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">
        Write to Log
      </button>
    </form>
  );
}

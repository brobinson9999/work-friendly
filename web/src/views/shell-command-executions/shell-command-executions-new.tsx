import { useState } from "react";

interface ShellCommandExecutionsNewProps {
  submitCommand: (command: string) => void;
}

export function ShellCommandExecutionsNew({
  submitCommand,
}: ShellCommandExecutionsNewProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(command);
    setCommand("");
  };

  return (
    <form onSubmit={handleSubmit} className="shell-command-form">
      <div className="form-group">
        <label htmlFor="command" className="form-label">
          Command
        </label>
        <input
          type="text"
          id="command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">
        Run
      </button>
    </form>
  );
}

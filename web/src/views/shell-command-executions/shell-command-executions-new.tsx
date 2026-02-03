import { useState } from "react";
import { servers } from "../../models/servers";

interface ShellCommandExecutionsNewProps {
  submitCommand: (serverId: string, command: string) => void;
}

export function ShellCommandExecutionsNew({
  submitCommand,
}: ShellCommandExecutionsNewProps) {
  const [serverId, setServerId] = useState(servers[0]?.id ?? "");
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(serverId, command);
    setCommand("");
  };

  return (
    <form onSubmit={handleSubmit} className="shell-command-form">
      <div className="form-group">
        <label htmlFor="serverId" className="form-label">
          Server
        </label>
        <select
          id="serverId"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          required
          className="form-select"
        >
          <option value="" disabled>
            Select server
          </option>
          {servers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id} ({s.hostname}:{s.port})
            </option>
          ))}
        </select>
      </div>
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

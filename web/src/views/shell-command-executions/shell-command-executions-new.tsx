import { useState } from "react";
import { servers } from "../../models/servers";
import { FormField } from "../../components/form-field";

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
    <form onSubmit={handleSubmit} className="shell-command-executions new">
      <FormField
        label="Server"
        input={(id) => (
          <select
            id={id}
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
        )}
      />

      <FormField
        label="Command"
        input={(id) => (
          <input
            type="text"
            id={id}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            required
            className="form-input"
          />
        )}
      />

      <button type="submit" className="form-button">
        Run
      </button>
    </form>
  );
}

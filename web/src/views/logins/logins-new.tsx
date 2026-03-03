import { useState } from "react";
import { servers } from "../../models/servers";
import { FormField } from "../../components/form-field";

interface LoginsNewProps {
  submitCommand: (serverId: string, password: string) => void;
}

export function LoginsNew({ submitCommand }: LoginsNewProps) {
  const [serverId, setServerId] = useState(servers[0]?.id || "");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(serverId, password);
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="logins new">
      <FormField
        label="Server Id"
        input={(id) => (
          <select
            id={id}
            value={serverId}
            onChange={(e) => setServerId(e.target.value)}
            required
            className="form-input"
          >
            {servers.length === 0 ? (
              <option value="" disabled>
                No servers available
              </option>
            ) : (
              servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.id}
                </option>
              ))
            )}
          </select>
        )}
      />

      <FormField
        label="Password"
        input={(id) => (
          <input
            type="password"
            id={id}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        )}
      />

      <button type="submit" className="form-button">
        Log In
      </button>
    </form>
  );
}

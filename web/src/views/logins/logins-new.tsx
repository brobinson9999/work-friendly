import { useState } from "react";
import { servers } from "../../models/servers";

interface LoginsNewProps {
  submitCommand: (serverId: string, password: string) => void;
}

export function LoginsNew({ submitCommand }: LoginsNewProps) {
  const [serverId, setServerId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(serverId, password);
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="shell-command-form">
      <div className="form-group">
        <select
          id="serverId"
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
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <button type="submit" className="form-button">
        Log In
      </button>
    </form>
  );
}

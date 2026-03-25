import { useState } from "react";
import { servers } from "../../models/servers";
import { FormField } from "../../components/form-field";

interface ToDosNewProps {
  submitCommand: (serverId: string, title: string) => void;
}

export function ToDosNew({ submitCommand }: ToDosNewProps) {
  const [serverId, setServerId] = useState(servers[0]?.id ?? "");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(serverId, title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="todos new">
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
        label="Title"
        input={(id) => (
          <input
            type="text"
            id={id}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        )}
      />

      <button type="submit" className="form-button">
        Add ToDo
      </button>
    </form>
  );
}

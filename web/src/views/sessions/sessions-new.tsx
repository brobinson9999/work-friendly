import { useState } from "react";
import { logins } from "../../models/logins";
import { FormField } from "../../components/form-field";

interface SessionsNewProps {
  submitCommand: (loginId: string) => void;
}

export function SessionsNew({ submitCommand }: SessionsNewProps) {
  // Default to first login id if available
  const defaultLoginId = logins.length > 0 ? logins[0].id : "";
  const [loginId, setLoginId] = useState(defaultLoginId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(loginId);
    setLoginId("");
  };

  return (
    <form onSubmit={handleSubmit} className="sessions new">
      <FormField
        label="Login ID"
        input={(id) => (
          <select
            id={id}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
            className="form-input"
          >
            {logins.length === 0 ? (
              <option value="" disabled>
                No logins available
              </option>
            ) : (
              logins.map((login) => (
                <option key={login.id} value={login.id}>
                  {login.id}
                </option>
              ))
            )}
          </select>
        )}
      />

      <button type="submit" className="form-button">
        Create Session
      </button>
    </form>
  );
}

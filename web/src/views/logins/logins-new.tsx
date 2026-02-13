import { useState } from "react";

interface LoginsNewProps {
  submitCommand: (password: string) => void;
}

export function LoginsNew({ submitCommand }: LoginsNewProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand(password);
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="shell-command-form">
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

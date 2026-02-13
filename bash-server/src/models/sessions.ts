import { logins } from './logins.js';

export type SessionParams = {
  loginId: string;
};

export type Session = SessionParams & {
  id: string;
  createdAt: Date;
};

export const sessions: Session[] = [];

export function createSession(params: SessionParams): Session {
  const login = logins.find((login) => login.id === params.loginId);
  if (!login) {
    throw new Error('Invalid login ID');
  }
  if (login.result !== 'success') {
    throw new Error('Login was not successful');
  }

  const newSession: Session = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...params,
  };

  sessions.push(newSession);

  return newSession;
}

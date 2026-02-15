import { InvalidLoginError } from '../errors/invalid-login-error.js';
import { logins } from './logins.js';
import { invalidateCache } from './websockets.js';

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
    throw new InvalidLoginError('Invalid login ID');
  }
  if (login.result !== 'success') {
    throw new InvalidLoginError('Login was not successful');
  }

  const newSession: Session = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...params,
  };

  sessions.push(newSession);
  invalidateCache();

  return newSession;
}

import { invalidateCache } from './websockets.js';

export type LoginParams = {
  password: string;
};

export type Login = {
  id: string;
  createdAt: Date;
  result: 'success' | 'failure';
};

export const logins: Login[] = [];

const debugPassword = 'password123';

export function createLogin(params: LoginParams): Login {
  const result = params.password === debugPassword ? 'success' : 'failure';

  const newLogin: Login = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    result,
  };

  logins.push(newLogin);
  invalidateCache();

  return newLogin;
}

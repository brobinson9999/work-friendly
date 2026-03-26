import { createLogin as createLoginModel } from '../models/logins.js';

export function createLogin(password: string) {
  return createLoginModel({ password });
}

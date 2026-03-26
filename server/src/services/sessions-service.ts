import { createSession as createSessionModel } from '../models/sessions.js';

export function createSession(loginId: string) {
  return createSessionModel({ loginId });
}

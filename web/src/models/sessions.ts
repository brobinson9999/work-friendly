export type SessionParams = {
  loginId: string;
};

export type Session = SessionParams & {
  id: string;
  createdAt: Date;
};

export const sessions: Session[] = [];

export async function createSession(params: SessionParams): Promise<Session> {
  const response = await fetch("http://localhost:3000/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId: params.loginId }),
  });

  const newSession = (await response.json()) as Session;

  sessions.push({ ...newSession, createdAt: new Date(newSession.createdAt) });

  return newSession;
}

export type LoginParams = {
  password: string;
};

export type Login = {
  id: string;
  createdAt: Date;
  result: "success" | "failure";
};

export const logins: Login[] = [];

export async function createLogin(params: LoginParams): Promise<Login> {
  const response = await fetch("http://localhost:3000/logins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: params.password }),
  });

  const newLogin = await response.json();

  logins.push({ ...newLogin, createdAt: new Date(newLogin.createdAt) });

  return newLogin;
}

import { redrawAll } from "../hooks/use-redraw-all";
import { executeRequest } from "./requests";

export type LoginParams = {
  serverId: string;
  password: string;
};

export type Login = {
  id: string;
  createdAt: Date;
  result: "success" | "failure";
};

export const logins: Login[] = [];

export async function createLogin(params: LoginParams): Promise<Login> {
  const request = await executeRequest(params.serverId, "/logins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: params.password }),
  });

  const newLogin = await request.response!.json();

  logins.push({ ...newLogin, createdAt: new Date(newLogin.createdAt) });
  redrawAll();

  return newLogin;
}

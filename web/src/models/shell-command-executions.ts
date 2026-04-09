import type { JsonValue } from "../utils/json-value";
import { executeRequest } from "./requests";
import { servers } from "./servers";
import { stateChanged } from "./state-change";

export type ShellCommandExecution = {
  serverId: string;
  command: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  startTime?: Date;
  endTime?: Date;
};

export const shellCommandExecutions: ShellCommandExecution[] = [];

export function createShellCommandExecution(
  serverId: string,
  command: string,
): ShellCommandExecution {
  const shellCommandExecution = newShellCommandExecution(serverId, command);
  shellCommandExecutions.push(shellCommandExecution);
  stateChanged();
  return shellCommandExecution;
}

export function newShellCommandExecution(
  serverId: string,
  command: string,
): ShellCommandExecution {
  return {
    serverId,
    command,
    stdout: "",
    stderr: "",
    exitCode: null,
  };
}

export async function readFile(
  serverId: string,
  filePath: string,
): Promise<string> {
  const result = await executeRequest(serverId, `/files/${filePath}`, {
    method: "GET",
  });

  return await result.response!.text();
  // const result = await executeShellCommand(serverId, `cat ${filePath}`);
  // if (result.exitCode === 0) {
  //   return result.stdout;
  // } else {
  //   throw new Error(`Failed to read file: ${result.stderr}`);
  // }
}

export async function readJsonFile<T>(
  serverId: string,
  filePath: string,
): Promise<T> {
  const fileContent = await readFile(serverId, filePath);
  try {
    return JSON.parse(fileContent) as T;
  } catch (e) {
    throw new Error(
      `Failed to parse JSON from file: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}

export async function writeFile(
  serverId: string,
  filePath: string,
  content: string,
): Promise<void> {
  await executeRequest(serverId, `/files/${filePath}`, {
    method: "POST",
    body: content,
  });
  // const result = await executeShellCommand(
  //   serverId,
  //   `echo ${content} > ${filePath}`,
  // );
  // if (result.exitCode !== 0) {
  //   throw new Error(`Failed to write file: ${result.stderr}`);
  // }
}

export async function writeJsonFile(
  serverId: string,
  filePath: string,
  data: JsonValue,
): Promise<void> {
  const jsonContent = JSON.stringify(data);
  await writeFile(serverId, filePath, jsonContent);
}

export async function executeShellCommand(
  serverId: string,
  command: string,
): Promise<ShellCommandExecution> {
  const shellCommandExecution = createShellCommandExecution(serverId, command);
  await runShellCommand(shellCommandExecution);
  return shellCommandExecution;
}

export async function runShellCommand(
  shellCommandExecution: ShellCommandExecution,
): Promise<void> {
  const server = servers.find((s) => s.id === shellCommandExecution.serverId);
  if (!server) {
    throw new Error(
      `Server with ID ${shellCommandExecution.serverId} not found`,
    );
  }
  const startTime = new Date();
  shellCommandExecution.startTime = startTime;
  stateChanged();
  try {
    const request = await executeRequest(server.id, "/shell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command: shellCommandExecution.command }),
    });

    const json = await request.response!.json();
    const endTime = new Date();
    shellCommandExecution.stdout = json.stdout || "";
    shellCommandExecution.stderr = json.stderr || "";
    shellCommandExecution.exitCode = json.exitCode || 0;
    shellCommandExecution.endTime = endTime;
  } catch (error) {
    const endTime = new Date();
    shellCommandExecution.stdout = "";
    shellCommandExecution.stderr = "Error: " + (error as Error).message;
    shellCommandExecution.exitCode = null;
    shellCommandExecution.endTime = endTime;
  }

  stateChanged();
}

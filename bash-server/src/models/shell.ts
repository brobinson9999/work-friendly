import { exec, type ExecException } from 'child_process';
import { promisify } from 'util';
import { log } from './logs.js';

const execPromise = promisify(exec);

type ShellCommandResponse = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export async function runShellCommand(
  command: string,
): Promise<ShellCommandResponse> {
  try {
    log(`runShellCommand(${command})`);

    const { stdout, stderr } = await execPromise(command, {
      maxBuffer: 1024 * 1024 * 50,
    });
    return {
      stdout,
      stderr,
      exitCode: 0,
    };
  } catch (error) {
    const execError = error as ExecException;
    return {
      stdout: execError.stdout || '',
      stderr: execError.stderr || execError.message,
      exitCode: execError.code || 1,
    };
  }
}

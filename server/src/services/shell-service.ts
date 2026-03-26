import { runShellCommand as runShellCommandModel } from '../models/shell.js';

export function runShellCommand(command: string) {
  return runShellCommandModel(command);
}

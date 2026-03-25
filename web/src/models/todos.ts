import { stateChanged } from "./state-change";

export type ToDo = {
  id: string;
  serverId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export const toDos: ToDo[] = [];

export function createToDo(serverId: string, title: string): ToDo {
  const newToDo: ToDo = {
    id: crypto.randomUUID(),
    serverId,
    title,
    completed: false,
    createdAt: new Date(),
  };
  toDos.push(newToDo);
  stateChanged();
  return newToDo;
}

export function toggleToDo(id: string) {
  const todo = toDos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    stateChanged();
  }
}

export function deleteToDo(id: string) {
  const index = toDos.findIndex((t) => t.id === id);
  if (index !== -1) {
    toDos.splice(index, 1);
    stateChanged();
  }
}

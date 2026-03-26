import { servers } from "./servers";
import { readJsonFile, writeJsonFile } from "./shell-command-executions";
import { stateChanged } from "./state-change";

export type ToDoData = {
  id: string;
  serverId: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type ToDo = {
  id: string;
  serverId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export const toDos: ToDo[] = [];

servers.forEach((server) => {
  loadToDos(server.id);
});

async function loadToDos(serverId: string) {
  const loadedToDos = await readJsonFile<ToDoData[]>(serverId, "todos.json");
  toDos.push(...loadedToDos.map(loadToDoData));
  stateChanged();
}

function loadToDoData(data: ToDoData): ToDo {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
  };
}

async function saveToDos(serverId: string) {
  const serverToDos = toDos.filter((t) => t.serverId === serverId);
  await writeJsonFile(serverId, "todos.json", serverToDos.map(saveToDoData));
}

function saveToDoData(toDo: ToDo): ToDoData {
  return {
    ...toDo,
    createdAt: toDo.createdAt.toISOString(),
  };
}

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
  saveToDos(serverId);
  return newToDo;
}

export function toggleToDo(id: string) {
  const todo = toDos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    stateChanged();
    saveToDos(todo.serverId);
  }
}

export function deleteToDo(id: string) {
  const index = toDos.findIndex((t) => t.id === id);
  if (index !== -1) {
    const toDo = toDos[index]!;
    toDos.splice(index, 1);
    stateChanged();
    saveToDos(toDo.serverId);
  }
}

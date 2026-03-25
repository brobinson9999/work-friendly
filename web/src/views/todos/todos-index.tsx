import { DataIndex } from "../../components/data-index";
import {
  dateAxis,
  nullAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/chart-axis";
import {
  createToDo,
  deleteToDo,
  toDos,
  toggleToDo,
  type ToDo,
} from "../../models/todos";
import { ToDosNew } from "./todos-new";
import { useState } from "react";

const submitCommand = async (serverId: string, title: string) => {
  createToDo(serverId, title);
};

export function ToDosIndex() {
  const [editingToDo, setEditingToDo] = useState<Set<string>>(new Set());

  const editToDo = (id: string) => {
    setEditingToDo((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const toDosChartAxes: ChartAxis<ToDo>[] = [
    nullAxis<ToDo>("None"),
    widgetAxis<ToDo>("Toggle", (todos, index) => (
      <button onClick={() => toggleToDo(todos[index].id)}>
        {todos[index].completed ? "☑️" : "☐"}
      </button>
    )),
    widgetAxis<ToDo>("Title", (todos, index) =>
      editingToDo.has(todos[index].id) ? (
        <input type="text" value={todos[index].title} />
      ) : (
        <span>{todos[index].title}</span>
      ),
    ),
    widgetAxis<ToDo>("Edit", (todos, index) => (
      <button onClick={() => editToDo(todos[index].id)}>✏️</button>
    )),
    dateAxis<ToDo>("createdAt", "Created At", (todo) => todo.createdAt, {
      min: new Date(0),
      max: new Date(),
    }),
    widgetAxis<ToDo>("Delete", (todos, index) => (
      <button onClick={() => deleteToDo(todos[index].id)}>Delete</button>
    )),
  ];

  return (
    <DataIndex<ToDo>
      title="ToDos"
      data={toDos || []}
      axes={toDosChartAxes}
      newElement={<ToDosNew submitCommand={submitCommand} />}
    />
  );
}

import { br } from "../../components/tags";
import { throttleParallelPromises } from "../../utils/promises";

export type ParallelTask = {
  name: string;
  fn: () => Promise<void>;
};

export async function runParallelTasks(
  render: (output: React.ReactNode) => void,
  tasks: ParallelTask[],
) {
  const outputParts: React.ReactNode[] = [];
  const renderParts = () => render([...outputParts]);

  const append = (output: React.ReactNode) => {
    // console.log("Appending " + output);
    const outputPartIndex = outputParts.length;
    outputParts.push(output);
    renderParts();

    return (replacement: React.ReactNode) => {
      // console.log("Replacing " + output + " with " + replacement);
      outputParts[outputPartIndex] = replacement;
      renderParts();
    };
  };

  const updateFunctions = tasks.map((task, index) => {
    append(`${index}: ${task.name}: `);
    const updateFunction = append("💤");
    append(br());
    return updateFunction;
  });

  const tasksWithUiUpdate = tasks.map((task, index) => async () => {
    const updateTaskOutput = updateFunctions[index];
    updateTaskOutput("⏳");
    await task.fn();
    updateTaskOutput("✅");
  });

  await throttleParallelPromises(tasksWithUiUpdate);
}

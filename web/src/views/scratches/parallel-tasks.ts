import { br } from "../../components/tags";
import { PromiseThrottle } from "../../utils/promise-throttle";

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
    const outputPartIndex = outputParts.length;
    outputParts.push(output);
    renderParts();

    return (replacement: React.ReactNode) => {
      outputParts[outputPartIndex] = replacement;
      renderParts();
    };
  };

  const throttle = new PromiseThrottle(5);
  tasks.forEach(async (task, index) => {
    append(`${index}: ${task.name}: `);
    const updateTaskOutput = append("💤");
    append(br());

    await throttle.throttle(async () => {
      updateTaskOutput("⏳");
      await task.fn();
      updateTaskOutput("✅");
    });
  });
}

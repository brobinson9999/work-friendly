import { DirectRenderComponent } from "../../components/direct-render-component";
import { sleep } from "../../utils/sleep";
import { runParallelTasks, type ParallelTask } from "./parallel-tasks";

export const ScratchParallelTaskTest = () => (
  <DirectRenderComponent fn={scratch} />
);

async function scratch(render: (output: React.ReactNode) => void) {
  const taskCount = 15;
  const tasks: ParallelTask[] = Array.from({ length: taskCount }, (_, i) => ({
    name: `Task ${i + 1}`,
    fn: async () => {
      await sleep(1000 + Math.random() * 2000); // Simulate variable task duration
    },
  }));

  await runParallelTasks(render, tasks);
}

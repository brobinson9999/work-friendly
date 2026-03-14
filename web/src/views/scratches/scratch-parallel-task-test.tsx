import { DirectRenderComponent } from "../../components/direct-render-component";
import { sleep } from "../../utils/sleep";

export const ScratchParallelTaskTest = () => (
  <DirectRenderComponent fn={scratch} />
);

async function scratch(render: (output: React.ReactNode) => void) {
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

  const taskCount = 15;
  const input = Array.from({ length: taskCount }, (_, i) => `Task ${i + 1}`);
  const updateFunctions = input.map((taskName, index) => {
    append(`${index}: ${taskName}: `);
    const updateFunction = append("💤");
    append(<br />);
    return updateFunction;
  });
  const tasks = input.map((_taskName, index) => async () => {
    const updateTaskOutput = updateFunctions[index];
    updateTaskOutput("⏳");
    await sleep(1000 + Math.random() * 2000); // Simulate variable task duration
    updateTaskOutput("✅");
  });

  const parallelTasks = async (tasks: (() => Promise<void>)[]) => {
    let runningPromises = 0;
    const maxConcurrency = 5;
    const promises: Promise<void>[] = [];

    const startTasks = () => {
      while (
        runningPromises < maxConcurrency &&
        promises.length < tasks.length
      ) {
        const promiseIndex = promises.length;
        // console.log(
        //   `Starting task ${promiseIndex}... ${runningPromises} running`,
        // );
        promises.push(
          tasks[promiseIndex]().then(() => {
            runningPromises--;
            startTasks();
          }),
        );
        runningPromises++;
      }
    };

    // console.log(`Starting ${tasks.length} tasks...`);
    startTasks();
    for (let i = 0; i < promises.length; i++) {
      // console.log(
      //   `Waiting for task ${i + 1} to complete... ${runningPromises} running`,
      // );
      await promises[i];
    }
  };

  await parallelTasks(tasks);
}

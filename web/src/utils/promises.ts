export const throttleParallelPromises = async (
  tasks: (() => Promise<void>)[],
) => {
  let runningPromises = 0;
  const maxConcurrency = 5;
  const promises: Promise<void>[] = [];

  const startTasks = () => {
    while (runningPromises < maxConcurrency && promises.length < tasks.length) {
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

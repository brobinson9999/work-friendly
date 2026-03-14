import { useState } from "react";
import { ScratchParallelTaskTest } from "./scratch-parallel-task-test";

export function ScratchesIndex() {
  const [runTimestamp, setRunTimestamp] = useState(0);

  const runScratch = async () => {
    setRunTimestamp(Date.now());
  };

  return (
    <div>
      <h1>Scratch Space</h1>

      <button onClick={runScratch}>Run Scratch</button>

      <div className="scratch-output">
        <h2>Output:</h2>
        {runTimestamp > 0 && <ScratchParallelTaskTest key={runTimestamp} />}
      </div>
    </div>
  );
}

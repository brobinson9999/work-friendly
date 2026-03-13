import { useState } from "react";

export function ScratchesIndex() {
  const [scratchOutput, setScratchOutput] = useState<React.ReactNode>("");
  const [isScratchRunning, setIsScratchRunning] = useState(false);

  const runScratch = async () => {
    setIsScratchRunning(true);
    setScratchOutput("Running scratch...");

    try {
      await scratch(setScratchOutput);
    } catch (error) {
      setScratchOutput(`Error: ${error}`);
    } finally {
      setIsScratchRunning(false);
    }
  };

  return (
    <div>
      <h1>Scratch Space</h1>

      <button onClick={runScratch} disabled={isScratchRunning}>
        {isScratchRunning ? "Running..." : "Run Scratch"}
      </button>

      <div className="scratch-output">
        <h2>Output:</h2>
        {scratchOutput}
      </div>
    </div>
  );
}

async function scratch(setOutput: (output: React.ReactNode) => void) {
  setOutput("Hello from the scratch space!");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  setOutput("Scratch completed!");
}

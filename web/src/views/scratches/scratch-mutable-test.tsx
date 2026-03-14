import { DirectRenderComponent } from "../../components/direct-render-component";
import { sleep } from "../../utils/sleep";

export const ScratchMutableTest = () => <DirectRenderComponent fn={scratch} />;

async function scratch(render: (output: React.ReactNode) => void) {
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

  append("The number is ");
  const updateNumber = append("0");
  append(".");

  for (let i = 1; i <= 5; i++) {
    await sleep(1000);
    updateNumber(i.toString());
  }
}

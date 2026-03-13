import { DirectRenderComponent } from "../../components/direct-render-component";
import { sleep } from "../../utils/sleep";

export const Scratch20260313 = () => <DirectRenderComponent fn={scratch} />;

async function scratch(render: (output: React.ReactNode) => void) {
  render("Hello from the scratch space!");

  await sleep(2000);

  render("Scratch completed!");
}

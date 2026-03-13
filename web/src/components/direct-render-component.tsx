import { useMemo, useState } from "react";

export function DirectRenderComponent({
  fn,
}: {
  fn: (setContent: (content: React.ReactNode) => void) => Promise<void>;
}) {
  const [content, setContent] = useState<React.ReactNode>("");

  useMemo(() => fn(setContent), [fn]);

  return content;
}

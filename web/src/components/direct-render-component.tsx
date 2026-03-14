import { useEffect, useState } from "react";

export function DirectRenderComponent({
  fn,
}: {
  fn: (setContent: (content: React.ReactNode) => void) => Promise<void>;
}) {
  const [content, setContent] = useState<React.ReactNode>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fn(setContent);
    }, 10); // 10ms delay to prevent running twice in development mode with React.StrictMode

    return () => clearTimeout(timer);
  }, [fn]);

  return content;
}

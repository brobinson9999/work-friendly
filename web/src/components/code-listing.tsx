import { useState } from "react";
import { SurfaceContainer } from "./surface-container";
import { ClipboardIcon } from "../icons/clipboard-icon";

interface CodeListingProps {
  content: string;
}

export function CodeListing({ content }: CodeListingProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <SurfaceContainer>
      <div className="code-listing-container">
        <pre className="code-listing">{content}</pre>
        <button
          className="copy-button"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
        >
          <ClipboardIcon />
        </button>
        {showCopied && <div className="copy-toast">Copied to clipboard</div>}
      </div>
    </SurfaceContainer>
  );
}

import { useState } from 'react';

export function useCopyClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return { isCopied, copyToClipboard };
}

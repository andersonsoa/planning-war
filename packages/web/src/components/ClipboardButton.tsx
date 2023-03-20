import { CheckCircle, Copy } from "@phosphor-icons/react";
import { useState } from "react";

interface ClipboardButtonProps {
  text: string;
  children: React.ReactNode;
}

export function ClipboardButton(props: ClipboardButtonProps) {
  const [isClipboardSuccessful, setIsClipboardSuccessful] = useState(false);

  function handleCopyToClicpboard() {
    navigator.clipboard.writeText(props.text).then(() => {
      setIsClipboardSuccessful(true);
      setTimeout(() => setIsClipboardSuccessful(false), 1000);
    });
  }

  return (
    <button
      onClick={handleCopyToClicpboard}
      className="px-2 py-1 flex items-center gap-2 bg-zinc-700 rounded text-sm group hover:bg-zinc-700/80 transition-colors"
    >
      <span className="group-hover:text-green-500 transition-colors">
        {props.children}
      </span>
      {isClipboardSuccessful ? (
        <CheckCircle
          size={20}
          weight="duotone"
          className="text-green-500 transition-colors"
        />
      ) : (
        <Copy
          size={20}
          weight="duotone"
          className="group-hover:text-green-500 transition-colors"
        />
      )}
    </button>
  );
}

"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Copy } from "lucide-react";
import { useState } from "react";

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay = ({ code }: CodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };
  return (
    <div className="relative">
      <CodeEditor
        readOnly={true}
        className="bg-blue-100 dark:bg-blue-950"
        value={code}
        language="js"
        placeholder="Enter your code."
        padding={20}
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />

      <Copy
        className="absolute z-20 transition cursor-pointer top-1 right-1 text-muted-foreground hover:text-current"
        size={15}
        onClick={copyCode}
      />

      {copied && (
        <span className="absolute right-0 mt-3 ml-2 text-xs text-muted-foreground top-3">
          copied!
        </span>
      )}
    </div>
  );
};

export default CodeDisplay;

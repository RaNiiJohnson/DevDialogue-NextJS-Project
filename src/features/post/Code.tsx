"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay = ({ code }: CodeDisplayProps) => {
  return (
    <CodeEditor
      readOnly={true}
      className="bg-slate-200 dark:bg-slate-900"
      value={code}
      language="js"
      placeholder="Please enter JS code."
      padding={15}
      style={{
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
};

export default CodeDisplay;

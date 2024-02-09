"use client";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import React, { useState } from "react";
import AceEditor from "react-ace";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vous pouvez gérer la logique de soumission ici
    console.log("Code soumis :", code);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={(newCode) => setCode(newCode)}
        value={code}
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
        width="100%"
        height="300px"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CodeEditor;

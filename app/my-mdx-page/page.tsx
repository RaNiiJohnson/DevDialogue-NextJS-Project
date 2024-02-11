"use client";

import Markdown from "react-markdown";
const markdown = `
# My article about 

to learn

## how to learn code

1. Learn how to code 
2. Learn how to learn to code

`;

export default function HoverCardDemo() {
  return (
    <div className="prose dark:prose-invert">
      <Markdown>{markdown}</Markdown>
    </div>
  );
}

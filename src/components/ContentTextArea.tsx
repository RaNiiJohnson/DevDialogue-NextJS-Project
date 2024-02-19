"use client";

import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
} from "react";

export const ContentTextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(({ onChange, className, rows = 1, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };
  if (props)
    return (
      <Textarea
        spellCheck={false}
        ref={ref}
        onChange={(e) => {
          handleChange(e);
          onChange?.(e);
        }}
        rows={rows}
        className={clsx(
          className,
          "resize-none w-full bg-transparent outline-none  overflow-y-auto max-h-[180px] textarea"
        )}
        {...props}
      />
    );
});

ContentTextArea.displayName = "ContentTextArea";

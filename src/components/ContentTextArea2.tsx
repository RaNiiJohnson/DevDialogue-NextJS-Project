"use client";

import clsx from "clsx";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
} from "react";

export const ContentTextArea2 = forwardRef<
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
      <textarea
        spellCheck={false}
        ref={ref}
        onChange={(e) => {
          handleChange(e);
          onChange?.(e);
        }}
        rows={rows}
        className={clsx(
          className,
          "textarea resize-none w-full bg-transparent outline-none overflow-y-auto max-h-[180px] text-sm border-b shadow-sm placeholder:text-muted-foreground focus:border-b-primary"
        )}
        {...props}
      />
    );
});

ContentTextArea2.displayName = "ContentTextArea";

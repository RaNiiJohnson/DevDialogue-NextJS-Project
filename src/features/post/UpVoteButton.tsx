"use client";

import { ChevronUp } from "lucide-react";

export const UpVoteButton = ({ postId }: { postId: string }) => {
  return (
    <div className="p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200">
      <ChevronUp />
    </div>
  );
};

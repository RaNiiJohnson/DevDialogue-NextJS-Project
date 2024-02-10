"use client";

import { ChevronDown } from "lucide-react";

export const DownVoteButton = () => {
  return (
    <div className="p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200">
      <ChevronDown />
    </div>
  );
};

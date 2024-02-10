"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronUp } from "lucide-react";
import { upVoteAction } from "./upVote.action";

export const UpVoteButton = ({
  postId,
  upVote,
}: {
  postId: string;
  upVote: boolean;
}) => {
  return (
    <Button
      variant={"outline"}
      className={clsx(
        "p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200",
        {
          "bg-slate-300 dark:bg-slate-500": upVote,
        }
      )}
    >
      <ChevronUp
        onClick={() => {
          upVoteAction(postId);
        }}
      />
    </Button>
  );
};

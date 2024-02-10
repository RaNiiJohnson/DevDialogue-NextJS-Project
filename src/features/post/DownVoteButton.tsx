"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { downVoteAction } from "./downVote.action";

export const DownVoteButton = ({
  postId,
  downVote,
}: {
  postId: string;
  downVote: boolean;
}) => {
  return (
    <Button
      variant={"outline"}
      className={clsx(
        "p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200",
        {
          "bg-slate-300 dark:bg-slate-500": downVote,
        }
      )}
    >
      <ChevronDown onClick={() => downVoteAction(postId)} />
    </Button>
  );
};

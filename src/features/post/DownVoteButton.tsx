"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useTransition } from "react";
import { downVoteAction } from "./downVote.action";

export const DownVoteButton = ({
  postId,
  downVote,
}: {
  postId: string;
  downVote: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant={"outline"}
      onClick={() => startTransition(() => downVoteAction(postId))}
      className={clsx(
        "p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200",
        {
          "bg-slate-300 dark:bg-slate-500": downVote,
        }
      )}
    >
      {isPending ? <Loader size={30} /> : <ChevronDown size={30} />}
    </Button>
  );
};

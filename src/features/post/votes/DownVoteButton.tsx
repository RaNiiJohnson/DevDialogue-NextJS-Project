"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
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
      variant={"secondary"}
      onClick={() =>
        startTransition(async () => {
          const done = await downVoteAction(postId);
          if (done) {
            toast(done.message);
          }
        })
      }
      className={clsx(
        "p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-300",
        {
          "bg-slate-400 dark:bg-slate-500": downVote,
        }
      )}
    >
      {isPending ? <Loader size={20} /> : <ChevronDown size={20} />}
    </Button>
  );
};

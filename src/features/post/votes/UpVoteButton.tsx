"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { ChevronUp } from "lucide-react";
import { useTransition } from "react";
import { upVoteAction } from "./upVote.action";

export const UpVoteButton = ({
  postId,
  upVote,
}: {
  postId: string;
  upVote: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant={"secondary"}
      onClick={() =>
        startTransition(() => {
          upVoteAction(postId);
        })
      }
      className={clsx(
        "p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-300",
        {
          "bg-yellow-400 dark:bg-yellow-800 ": upVote,
        }
      )}
    >
      {isPending ? <Loader size={20} /> : <ChevronUp size={20} />}
    </Button>
  );
};

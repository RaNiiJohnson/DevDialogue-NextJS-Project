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
      variant={"outline"}
      onClick={() =>
        startTransition(() => {
          upVoteAction(postId);
        })
      }
      className={clsx(
        "p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200",
        {
          "bg-slate-300 dark:bg-slate-500": upVote,
        }
      )}
    >
      {isPending ? <Loader size={30} /> : <ChevronUp size={30} />}
    </Button>
  );
};

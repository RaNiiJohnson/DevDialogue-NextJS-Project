"use client";

import { savePost } from "@/features/post/saves/save-post.action";
import clsx from "clsx";
import { Check, CheckCircle2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Session } from "@prisma/client";
import { UserProfile } from "@/query/user.query";

type SaveProps = {
  postId: string;
  saved?: boolean;
  postView?: boolean;
  moreOptions?: boolean;
  profil?: boolean;
};

export function SaveButton({
  postId,
  saved,
  postView,
  moreOptions,
  profil = false,
}: SaveProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {!profil ? (
        <Button
          disabled={isPending}
          size={"sm"}
          variant={postView ? "link" : "outline"}
          className={clsx(
            "flex gap-2 transition",
            {
              "bg-green-300/20 border-green-700": saved && !postView,
            },
            {
              "-ml-3": postView && !moreOptions,
            },
            {
              " text-green-800": saved && postView,
            },
            {
              " w-full gap-4 m-auto text-sm": moreOptions,
            }
          )}
          onClick={() =>
            startTransition(async () => {
              const done = await savePost(postId);

              if (done.discard) toast.warning(done.discard);
              if (done.saved) toast.success(done.saved);
            })
          }
        >
          {saved ? (
            <>
              saved <Check size={17} />
            </>
          ) : (
            "save"
          )}
        </Button>
      ) : (
        <>
          <CheckCircle2
            onClick={() =>
              startTransition(async () => {
                const done = await savePost(postId);

                if (done.discard) toast.warning(done.discard);
                if (done.saved) toast.success(done.saved);
              })
            }
            size={20}
            className={clsx(" transition cursor-pointer", {
              "text-green-600 transition cursor-pointer hover:text-green-800":
                saved,
            })}
          />
        </>
      )}
    </>
  );
}

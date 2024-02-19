"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { DeletePost } from "../delete-post.action";

export const DeleteCommentButton = ({
  postId,
  className,
}: {
  postId: string;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      className={className}
      disabled={isPending}
      variant={"link"}
      size={"icon"}
      onClick={() =>
        startTransition(async () => {
          const post = await DeletePost(postId);

          if (post) {
            toast.success("comment successfully deleted");
          }
        })
      }
    >
      {isPending ? <Loader size={13} /> : <Trash2 size={13} />}
    </Button>
  );
};

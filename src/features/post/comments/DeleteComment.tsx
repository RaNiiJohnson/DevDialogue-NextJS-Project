"use client";
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
    <button
      className={className}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const post = await DeletePost({ postId: postId });

          if (post) {
            toast.success("comment successfully deleted");
          }
        })
      }
    >
      {isPending ? <Loader size={13} /> : <Trash2 size={13} />}
    </button>
  );
};

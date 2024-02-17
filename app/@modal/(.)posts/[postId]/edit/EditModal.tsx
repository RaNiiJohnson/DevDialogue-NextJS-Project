"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { PostHome } from "@/query/post.query";
import { DialogTitle } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { EditPostForm } from "../../../../posts/[postId]/edit/EditPostForm";

export default function EditModal({
  userId,
  post,
}: {
  userId?: string;
  post: PostHome;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname === `/posts/${post.id}/edit`}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="overflow-y-auto max-h-svh ">
        <DialogHeader>
          <DialogTitle>Update your post</DialogTitle>
        </DialogHeader>
        <EditPostForm userId={userId} post={post} />
      </DialogContent>
    </Dialog>
  );
}

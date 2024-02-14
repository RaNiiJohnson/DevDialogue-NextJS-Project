"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostHome } from "@/query/post.query";
import { EyeOff, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeletePost } from "../post/delete-post.action";

type PostProps = {
  post: PostHome;
  parent: boolean;
};

export default function MoreOptions({ post, parent }: PostProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="z-40">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal size={20} />
        </DropdownMenuTrigger>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Button
                variant={"ghost"}
                className="flex justify-between w-full gap-2"
              >
                Hide
                <EyeOff size={17} />
              </Button>
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem asChild>
                <Button
                  variant={"ghost"}
                  className="flex justify-between w-full gap-2 "
                >
                  Delete <Trash2 size={17} />
                </Button>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant={"destructive"}
                onClick={async () => {
                  const postId = await DeletePost(post.id);

                  toast.success("Post successfully deleted");

                  setOpen(false);
                  if (parent) router.push("/");
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </div>
  );
}

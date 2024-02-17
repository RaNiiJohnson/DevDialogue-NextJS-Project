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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostHome } from "@/query/post.query";
import { UserProfile } from "@/query/user.query";
import clsx from "clsx";
import { Edit, MoreHorizontal, SaveAll, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import RedirectionButton from "../layout/auth/RedirectionLoginButton";
import { DeletePost } from "../post/delete-post.action";

type PostProps = {
  post: PostHome;
  parent: boolean;
  user?: UserProfile | null;
};

export default function MoreOptions({ post, parent, user }: PostProps) {
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
              {user && parent ? (
                <Button
                  variant={"ghost"}
                  className="flex justify-between w-full gap-2"
                  onClick={() => {
                    return toast.success("saved");
                  }}
                >
                  Save
                  <SaveAll size={17} />
                </Button>
              ) : (
                <>
                  {!user ? (
                    <RedirectionButton
                      title="Save"
                      action="for saving this question"
                      variantButton="ghost"
                      size="default"
                      className="flex justify-between w-full gap-2"
                    >
                      <SaveAll size={17} />
                    </RedirectionButton>
                  ) : (
                    ""
                  )}
                </>
              )}
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
              {user?.id === post.user.id && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className={clsx(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "flex justify-between w-full "
                      )}
                    >
                      Edit <Edit size={17} />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      onClick={() => {
                        setOpen(true);
                      }}
                      variant={"ghost"}
                      className="flex justify-between w-full gap-2 "
                    >
                      Delete <Trash2 size={17} />
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
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

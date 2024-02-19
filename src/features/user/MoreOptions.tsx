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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostHome } from "@/query/post.query";
import { UserProfile } from "@/query/user.query";
import clsx from "clsx";
import { Edit, MoreHorizontal, SaveAll, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import RedirectionButton from "../layout/auth/RedirectionLoginButton";
import { DeletePost } from "../post/delete-post.action";
import { SaveButton } from "../post/saves/SaveButton";

type PostProps = {
  post: PostHome;
  parent: boolean;
  user?: UserProfile | null;
  reply?: boolean;
  className?: string;
};

export default function MoreOptions({
  post,
  parent,
  user,
  reply,
  className,
}: PostProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal
            size={24}
            className="transition rounded-sm cursor-pointer hover:bg-accent"
          />
        </DropdownMenuTrigger>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              {user && parent ? (
                <SaveButton
                  postView={true}
                  moreOptions={true}
                  postId={post.id}
                  saved={post.save[0]?.type === "saved"}
                />
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
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              {user?.id === post.user.id && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        reply
                          ? `/posts/${post.id}/edit/replies`
                          : `/posts/${post.id}/edit`
                      }
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
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
              <Button
                disabled={isPending}
                variant={"destructive"}
                onClick={() =>
                  startTransition(async () => {
                    const postId = await DeletePost(post.id);

                    reply
                      ? toast.success("response successfully deleted")
                      : toast.success("Post successfully deleted");

                    setOpen(false);
                    if (parent) router.push("/");
                  })
                }
              >
                {isPending ? "Deleting.." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </div>
  );
}

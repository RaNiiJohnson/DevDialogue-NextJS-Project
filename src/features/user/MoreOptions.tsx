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

type PostProps = {
  post: PostHome;
};

export default function MoreOptions({ post }: PostProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal size={20} />
      </DropdownMenuTrigger>
      <AlertDialog>
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
                className="flex justify-between w-full gap-2"
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
            <Button variant={"destructive"}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}

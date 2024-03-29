"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTransition } from "react";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Avatar size="default" className="w-6 h-6 mr-2">
            <AvatarFallback size="default">
              {props.user?.name?.[0]}
            </AvatarFallback>
            {props.user.image && (
              <AvatarImage
                src={props.user.image}
                alt={props.user.name ?? "user picture"}
              />
            )}
          </Avatar>
          {props.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <AlertDialog>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/users/${props.user.id}/`}>
              <User2 size={12} className="mr-2" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <LogOut className="mr-2" size={12} />
              Logout
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
              variant="destructive"
              onClick={() => startTransition(() => signOut())}
            >
              {isPending ? (
                <Loader className="w-4 h-4 mr-2" />
              ) : (
                <LogOut className="w-4 h-4 mr-2" />
              )}{" "}
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};

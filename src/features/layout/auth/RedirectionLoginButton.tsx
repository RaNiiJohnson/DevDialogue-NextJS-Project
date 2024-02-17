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
import { LoginButton } from "./LoginButton";

export default function RedirectionButton({
  children,
  title,
  action,
  variantButton,
  size,
  className,
}: {
  children?: React.ReactNode;
  title: string;
  action: string;
  variantButton:
    | "default"
    | "devDialogueVariant"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} size={"sm"} variant={variantButton}>
          {title}
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{action}, you must be logged.</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoginButton />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

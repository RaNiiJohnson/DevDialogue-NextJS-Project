"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserProfile } from "@/query/user.query";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, PenSquare } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RedirectionButton from "./auth/RedirectionLoginButton";

export const FooterUtils = ({ user }: { user?: UserProfile | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between flex-1 w-full max-w-2xl gap-1 py-2 m-auto border-t max-sm:px-2 sm:container bg-background border-accent">
      <Button
        variant={"ghost"}
        className="flex-1"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft size={16} />
      </Button>
      {user ? (
        <Link
          href="/ask"
          className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
        >
          <PenSquare size={16} />
        </Link>
      ) : (
        <RedirectionButton
          title=""
          action="For asking questions"
          variantButton="ghost"
          size="default"
          className="flex-1"
        >
          <PenSquare size={16} />
        </RedirectionButton>
      )}
      <Button
        variant={"ghost"}
        className="flex-1"
        onClick={() => {
          router.forward();
        }}
      >
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <Button
        onClick={() => {
          startTransition(() => signOut());
        }}
        size="sm"
        variant="destructive"
      >
        {isPending ? (
          <Loader size={12} className="mr-2" />
        ) : (
          <LogOut size={12} className="mr-2" />
        )}
        Logout
      </Button>
    </div>
  );
}

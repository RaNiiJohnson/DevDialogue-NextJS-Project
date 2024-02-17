"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { WritePostForm } from "../../ask/AskPostForm";

export default function AskModal() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname === "/ask"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="overflow-y-auto max-h-svh ">
        <WritePostForm />
      </DialogContent>
    </Dialog>
  );
}

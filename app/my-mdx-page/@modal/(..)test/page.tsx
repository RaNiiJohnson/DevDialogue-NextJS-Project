/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Picture</DialogTitle>
        </DialogHeader>
        testtttt
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PostPlaceholder() {
  return (
    <div className="relative grid grid-cols-12 gap-5 py-3 border-solid border-y">
      <div className="flex flex-col items-end col-span-2 gap-1 py-1 text-sm">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-4/6 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex justify-between col-span-10 gap-2 ">
        <div className="flex flex-col w-full gap-1">
          <Skeleton className="h-10" />
          <Skeleton className="w-8/12 h-6" />
        </div>
        <Skeleton className="w-6 h-2" />
      </div>

      <div className="flex items-center justify-end col-span-12">
        <Skeleton className="w-1/3 h-4" />
      </div>
    </div>
  );
}

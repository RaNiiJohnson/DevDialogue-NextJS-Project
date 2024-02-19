import { Skeleton } from "@/components/ui/skeleton";

export default function loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
        <Skeleton className="w-28 h-28" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-56 h-8" />
          <Skeleton className="h-4 w-96" />
          <div className="pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 mb-2 -mt-2">
              <Skeleton className="h-2 w-28" />
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <Skeleton className="w-32 h-2" />
              <Skeleton className="h-2 w-44" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
    </div>
  );
}

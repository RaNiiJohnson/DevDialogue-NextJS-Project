import { Skeleton } from "@/components/ui/skeleton";
import { PostViewPlaceholder } from "@/features/post/PostSkeleton";

export default function loader() {
  return (
    <div>
      <div className="flex justify-between py-6">
        <Skeleton className="w-1/3 h-8" />
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="relative">
        <div className="pt-5 pb-3 border-b">
          <div className="flex flex-row justify-between">
            <Skeleton className="w-11/12 h-14" />
            <Skeleton className="w-6 h-2" />
          </div>
          <div className="flex flex-row items-center gap-4 py-2 text-xs">
            <Skeleton className="h-4 w-11" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </div>{" "}
      {Array.from({ length: 3 }).map((_, index) => {
        return <PostViewPlaceholder key={index} />;
      })}
    </div>
  );
}

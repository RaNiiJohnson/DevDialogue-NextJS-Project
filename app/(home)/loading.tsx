import { Skeleton } from "@/components/ui/skeleton";
import PostPlaceholder from "@/features/post/PostSkeleton";

export default function loader() {
  return (
    <div>
      <div className="flex justify-between py-6">
        <Skeleton className="w-1/3 h-8" />
        <Skeleton className="h-10 w-28" />
      </div>
      {Array.from({ length: 10 }).map((_, index) => {
        return <PostPlaceholder key={index} />;
      })}
    </div>
  );
}

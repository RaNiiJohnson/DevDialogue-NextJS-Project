import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PostHome } from "@/query/post.query";
import { ChevronDown, ChevronUp } from "lucide-react";

type PostProps = {
  post: PostHome;
};

export function HoverCardDemo({ post }: PostProps) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200">
            <ChevronUp />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div>This question is useful and clear</div>
        </HoverCardContent>
      </HoverCard>
      <span>{post.voteCount}</span>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="p-2 border rounded-full dark:hover:bg-slate-700 hover:bg-slate-200">
            <ChevronDown />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div>This question is unclear or not useful</div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CodeDisplay from "@/features/post/Code";
import { PostHome } from "@/query/post.query";
import { DownVoteButton } from "./DownVoteButton";
import { UpVoteButton } from "./UpVoteButton";

type PostProps = {
  post: PostHome;
};

export default async function PostViewComponent({ post }: PostProps) {
  return (
    <div>
      <h1 className="pb-2 text-2xl border-b">{post.title}</h1>
      <div className="grid grid-cols-12 gap-4 pt-2">
        <span className="flex flex-col items-center col-span-1 gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <UpVoteButton postId={post.id} />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>This question is useful and clear</div>
            </HoverCardContent>
          </HoverCard>
          <span>{post.voteCount}</span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <DownVoteButton postId={post.id} />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>This question is unclear or not useful</div>
            </HoverCardContent>
          </HoverCard>
        </span>
        <span className="col-span-11">
          <p>{post.content}</p>
          {post.code ? <CodeDisplay code={post.code} /> : ""}
        </span>
      </div>
    </div>
  );
}

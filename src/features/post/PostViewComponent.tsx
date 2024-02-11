import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PostHome } from "@/query/post.query";
import { DownVoteButton } from "./DownVoteButton";
import { UpVoteButton } from "./UpVoteButton";

type PostProps = {
  post: PostHome;
};

export default async function PostViewComponent({ post }: PostProps) {
  return (
    <div>
      <div className="pb-2 border-b">
        <h1 className="text-2xl">{post.title}</h1>
        <div>{post?.vueXTime} vue time</div>
      </div>
      <div className="grid grid-cols-12 gap-4 pt-2">
        <span className="flex flex-col items-center col-span-1 gap-1">
          <HoverCard>
            <HoverCardTrigger asChild>
              <span>
                <UpVoteButton
                  postId={post.id}
                  upVote={post.votes[0]?.type === "upvote"}
                />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>This question is useful and clear</div>
            </HoverCardContent>
          </HoverCard>
          <span className="text-lg">{post.voteCount}</span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <span>
                <DownVoteButton
                  postId={post.id}
                  downVote={post.votes[0]?.type === "downvote"}
                />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>This question is unclear or not useful</div>
            </HoverCardContent>
          </HoverCard>
        </span>
        <span className="col-span-11">
          <p>{post.content}</p>
          {/* {post.code ? <CodeDisplay code={post.code} /> : ""} */}
        </span>
      </div>
    </div>
  );
}

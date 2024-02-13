import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import clsx from "clsx";
import Markdown from "react-markdown";
import UserAvatar from "../user/Avatar";
import MoreOptions from "../user/MoreOptions";
import CodeDisplay from "./Code";
import { DownVoteButton } from "./votes/DownVoteButton";
import { UpVoteButton } from "./votes/UpVoteButton";

type PostProps = {
  post: PostHome;
};

export default async function PostViewComponent({ post }: PostProps) {
  return (
    <div className="m-2 ">
      {post.title ? (
        <div className="pb-2 border-b">
          <h1 className="text-3xl">{post.title}</h1>
          <div className="flex gap-4 py-2 text-xs">
            <div>
              <span className="text-muted-foreground">Asked</span>{" "}
              {formatDate(post.createdAt)} ago
            </div>
            <div>
              <span className="text-muted-foreground">Viewed</span>{" "}
              {post?.vueXTime} times
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
          <span className="text-lg font-bold">{post.voteCount}</span>
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
        <span className="flex justify-between col-span-11 gap-3">
          <div className="">
            <Markdown
              className={clsx("prose dark:prose-invert", {
                "bg-muted p-2": post.title,
              })}
            >
              {post.content}
            </Markdown>
            {post.code ? <CodeDisplay code={post.code} /> : ""}
          </div>
          <MoreOptions post={post} />
        </span>
      </div>
      <div className="col-span-12">
        <UserAvatar postView={true} post={post} />
      </div>

      {!post.title && <Separator />}
    </div>
  );
}

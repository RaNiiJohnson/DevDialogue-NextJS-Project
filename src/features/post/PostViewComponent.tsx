import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import clsx from "clsx";
import Markdown from "react-markdown";
import { CommentPostForm } from "../../../app/posts/[postId]/comments/CommentPostForm";
import UserAvatar from "../user/Avatar";
import MoreOptions from "../user/MoreOptions";
import CodeDisplay from "./Code";
import CommentView from "./CommentView";
import HomeLayout from "./HomeLayout";
import { DownVoteButton } from "./votes/DownVoteButton";
import { UpVoteButton } from "./votes/UpVoteButton";
import { UserProfile } from "@/query/user.query";
import { getAuthSession } from "@/lib/auth";

type PostProps = {
  post: PostHome;
  user?: UserProfile | null;
};

export default async function PostViewComponent({ post, user }: PostProps) {
  return (
    <div className="m-2 ">
      {!post.parent && post.title ? (
        <HomeLayout
          title={"/" + post.title.split(" ").slice(0, 2).join(" ") + " ..."}
        >
          <div className="py-3 border-b">
            <h1 className="text-3xl">{post.title}</h1>
            <div className="flex gap-4 py-2 text-xs">
              <div>
                <span className="text-muted-foreground">Asked</span>{" "}
                {formatDate(post.createdAt)}
              </div>
              <div>
                <span className="text-muted-foreground">Viewed</span>{" "}
                {post?.vueXTime} time{post?.vueXTime > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </HomeLayout>
      ) : null}
      <div className="grid grid-cols-12 gap-4 pt-2">
        <span className="flex flex-col items-center col-span-1 row-span-5 gap-1">
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
                "bg-card p-2": post.title,
              })}
            >
              {post.content}
            </Markdown>
            {post.code ? <CodeDisplay code={post.code} /> : ""}
          </div>
          {!post.parent ? (
            <MoreOptions parent={true} post={post} user={user} />
          ) : (
            <MoreOptions parent={false} post={post} user={user} />
          )}
        </span>
        <div className="col-span-11">
          <UserAvatar postView={true} post={post} />
        </div>
        <div className="col-span-11">
          {post.replies &&
            !post.title &&
            post.replies.map((reply, index) => (
              <CommentView
                postId={reply.id}
                length={post.replies.length}
                index={index}
                key={reply.id}
              />
            ))}
        </div>
        {!post.title && (
          <div className="col-span-11 py-2">
            <CommentPostForm post={post} user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

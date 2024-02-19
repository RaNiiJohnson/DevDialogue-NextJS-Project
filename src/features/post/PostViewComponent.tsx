import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import { UserProfile } from "@/query/user.query";
import clsx from "clsx";
import Markdown from "react-markdown";
import UserAvatar from "../user/Avatar";
import MoreOptions from "../user/MoreOptions";
import CodeDisplay from "./Code";
import HomeLayout from "../../components/HomeLayout";
import { CommentPostForm } from "./comments/CommentPostForm";
import CommentView from "./comments/CommentView";
import { SaveButton } from "./saves/SaveButton";
import { DownVoteButton } from "./votes/DownVoteButton";
import { UpVoteButton } from "./votes/UpVoteButton";

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
          <div className="relative">
            <div className="pt-5 pb-3 border-b">
              <div className="absolute top-1 right-1">
                <MoreOptions parent={true} post={post} user={user} />
              </div>
              <h1 className="text-3xl max-md:text-xl">{post.title}</h1>
              <div className="flex items-center gap-4 py-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Asked</span>{" "}
                  {formatDate(post.createdAt)}
                </div>
                <div>
                  <span className="text-muted-foreground">Viewed</span>{" "}
                  {post?.vueXTime} time{post?.vueXTime > 1 ? "s" : ""}
                </div>
                {user && (
                  <SaveButton
                    postView={true}
                    postId={post.id}
                    saved={post.save[0]?.type === "saved"}
                  />
                )}
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
        <span className="col-span-11 gap-3">
          <div className="flex flex-col">
            <div className="flex justify-end">
              {post.parent && (
                <MoreOptions
                  parent={false}
                  reply={true}
                  post={post}
                  user={user}
                />
              )}
            </div>
            <Markdown
              className={clsx("prose dark:prose-invert", {
                "bg-card p-2": post.title,
              })}
            >
              {post.content}
            </Markdown>
            {post.code ? <CodeDisplay code={post.code} /> : ""}
          </div>
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

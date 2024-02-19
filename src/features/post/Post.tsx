"use client";

import { PostHome } from "@/query/post.query";
import Link from "next/link";
import UserAvatar from "../user/Avatar";
import { viewAction } from "./view.action";

import { UserProfile } from "@/query/user.query";
import MoreOptions from "../user/MoreOptions";
import { SaveButton } from "./saves/SaveButton";

export type PostProps = {
  post: PostHome;
  user?: UserProfile | null;
};

const limiterText = (text: string, limiter: number) => {
  const words = text.replace(/[^a-zA-Z\s]/g, "").split("");

  if (words.length > limiter) {
    return words.slice(0, limiter).join("") + "...";
  }

  return text;
};

export const Post = ({ post, user }: PostProps) => {
  return (
    <div className="relative grid grid-cols-12 gap-5 py-3 border-b border-solid max-md:py-1 max-md:gap-1">
      <div className="flex flex-col col-span-2 py-1 text-sm max-md:gap-4 max-sm:gap-2 max-sm:text-xs max-md:col-span-12 max-md:flex-row max-md:items-center text-end">
        <div>
          {post.voteCount} vote{post.voteCount > 1 ? "s" : ""}
        </div>
        <div className="text-muted-foreground ">
          {post._count.replies} answer{post._count.replies > 1 ? "s" : ""}
        </div>
        <div className=" text-muted-foreground">
          {post._count.PostView} view{post._count.PostView > 1 ? "s" : ""}
        </div>
        {user && (
          <SaveButton postId={post.id} saved={post.save[0]?.type === "saved"} />
        )}
      </div>
      <div className="flex justify-between col-span-10 gap-2 max-md:col-span-12 ">
        <div className="flex flex-col gap-1">
          <Link
            onClick={() => viewAction(post.id)}
            className="text-lg text-primary "
            href={`/posts/${post.id}`}
          >
            {post.title}
          </Link>
          <div className="text-sm text-muted-foreground">
            {limiterText(post.content, 50)}
          </div>
        </div>
        <MoreOptions
          className="right-0 top-2 max-md:absolute"
          parent={true}
          post={post}
          user={user}
        />
      </div>

      <div className="col-span-12">
        <UserAvatar postView={false} post={post} />
      </div>
    </div>
  );
};

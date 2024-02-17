"use client";

import { PostHome } from "@/query/post.query";
import Link from "next/link";
import UserAvatar from "../user/Avatar";
import { viewAction } from "./view.action";

import MoreOptions from "../user/MoreOptions";
import { UserProfile } from "@/query/user.query";

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
    <div className="relative grid grid-cols-12 gap-5 py-3 border-b border-solid">
      <div className="flex flex-col col-span-2 py-1 text-sm text-end">
        <div>
          {post.voteCount} vote{post.voteCount > 1 ? "s" : ""}
        </div>
        <div className="text-muted-foreground ">
          {post._count.replies} answer{post._count.replies > 1 ? "s" : ""}
        </div>
        <div className="text-muted-foreground ">
          {post._count.PostView} view{post._count.PostView > 1 ? "s" : ""}
        </div>
      </div>
      <div className="flex justify-between col-span-10 gap-2 ">
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
        <MoreOptions parent={false} post={post} user={user} />
      </div>

      <div className="col-span-12">
        <UserAvatar postView={false} post={post} />
      </div>
    </div>
  );
};

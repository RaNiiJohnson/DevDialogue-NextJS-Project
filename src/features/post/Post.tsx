"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import Link from "next/link";
import { viewAction } from "./view.action";

export type PostProps = {
  post: PostHome;
};

const limiterText = (text: string, limiter: number) => {
  const words = text.replace(/[^a-zA-Z\s]/g, "").split("");

  if (words.length > limiter) {
    return words.slice(0, limiter).join("") + "...";
  }

  return text;
};

export const Post = ({ post }: PostProps) => {
  return (
    <div className="grid grid-cols-12 gap-5 py-2 border-solid border-y">
      <div className="col-span-2 py-1 text-sm text-end">
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
      <div className="flex flex-col col-span-10 gap-1 text-blue-600 ">
        <Link
          onClick={() => viewAction(post.id)}
          className="text-lg"
          href={`/posts/${post.id}`}
        >
          {post.title}
        </Link>
        <div className="text-sm text-muted-foreground">
          {limiterText(post.content, 50)}
        </div>
        <div className="flex items-center justify-end gap-1 text-xs">
          <Avatar size="xs">
            <AvatarFallback>{post.user.username[0]}</AvatarFallback>
            {post.user.image && <AvatarImage src={post.user.image} alt="" />}
          </Avatar>
          <div>{post.user.username}</div>
          <div className="flex gap-1 text-xs text-muted-foreground">
            asked {post.createdAt ? <p> {formatDate(post.createdAt)}</p> : null}{" "}
            ago
          </div>
        </div>
      </div>
    </div>
  );
};

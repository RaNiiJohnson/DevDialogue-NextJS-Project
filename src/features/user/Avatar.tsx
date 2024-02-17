import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateParser, formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import Link from "next/link";

type PostProps = {
  post: PostHome;
  postView: boolean;
};

export default function UserAvatar({ post, postView }: PostProps) {
  return (
    <div className="flex items-center justify-end gap-1 pt-2 text-xs text-primary ">
      {!post.parent?.id && !postView ? (
        <div className="flex items-center gap-1 p-1 rounded-sm bg-accent/50">
          <Link
            href={`/users/${post.user.id}`}
            className="flex items-center gap-1"
          >
            <Avatar size="xs">
              <AvatarFallback size="default">
                {post.user.username[0]}
              </AvatarFallback>
              {post.user.image && <AvatarImage src={post.user.image} alt="" />}
            </Avatar>
            <div>{post.user.username}</div>
          </Link>
          <div className="flex gap-1 text-xs text-muted-foreground">
            asked {formatDate(post.createdAt)}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-2 py-3 rounded-sm bg-accent/50">
          <div className="flex gap-1 text-xs text-muted-foreground">
            {post.title ? "asked" : "answered"} {dateParser(post.createdAt)}
          </div>
          <Link href={`/users/${post.user.id}`} className="flex gap-1">
            <Avatar size="custom">
              <AvatarFallback size="lg" className="text-lg">
                {post.user.username.slice(0, 3)}
              </AvatarFallback>
              {post.user.image && (
                <AvatarImage
                  className="rounded-none"
                  src={post.user.image}
                  alt=""
                />
              )}
            </Avatar>
            <div className="text-sm">{post.user.username}</div>
          </Link>
        </div>
      )}
    </div>
  );
}

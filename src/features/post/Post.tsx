import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import Link from "next/link";

export type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {
  return (
    <div className="grid grid-cols-12 gap-5 border-solid border-y">
      <div className="col-span-2 py-1 text-sm text-end">
        <div>{post.voteCount} votes</div>
        <div className="text-muted-foreground ">
          {post._count.replies} answers
        </div>
        <div className="text-muted-foreground ">
          {post._count.PostView} view
        </div>
      </div>
      <div className="flex flex-col col-span-10 gap-1 text-blue-400 ">
        <Link className="text-lg" href={`/post/${post.id}`}>
          {post.title}
        </Link>
        <div className="flex items-center justify-end gap-1 text-xs">
          <Avatar size="xs">
            <AvatarFallback>{post.user.username[0]}</AvatarFallback>
            {post.user.image && <AvatarImage src={post.user.image} alt="" />}
          </Avatar>
          <div>{post.user.username}</div>
          <div className="flex gap-1 text-sm text-muted-foreground">
            asked {post.createdAt ? <p> {formatDate(post.createdAt)}</p> : null}{" "}
            ago
          </div>
        </div>
      </div>
    </div>
  );
};

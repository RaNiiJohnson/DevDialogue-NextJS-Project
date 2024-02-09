import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import Link from "next/link";

export type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {
  return (
    <div className="grid grid-cols-12 gap-5 border-y border-solid px-6 py-3">
      <div className="col-span-2 text-sm text-end py-1">
        <div>{post._count.votes} votes</div>
        <div className="text-muted-foreground ">
          {post._count.replies} answers
        </div>
        <div className="text-muted-foreground ">
          {post._count.PostView} view
        </div>
      </div>
      <div className=" flex col-span-10 text-blue-400 flex-col gap-1">
        <Link className="text-lg" href={`/post/${post.id}`}>
          {post.title}
        </Link>
        <div className="flex gap-1 text-xs items-center justify-end">
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

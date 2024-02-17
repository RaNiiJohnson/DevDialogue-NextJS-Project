import { Separator } from "@/components/ui/separator";
import { dateParser } from "@/lib/date";
import { getPostView } from "@/query/post.query";
import { getUser } from "@/query/user.query";
import Link from "next/link";
import { notFound } from "next/navigation";

type PostProps = {
  postId: string;
  index: number;
  length: number;
};

export default async function CommentView({
  postId,
  index,
  length,
}: PostProps) {
  const user = await getUser();
  const post = await getPostView(postId, user?.id);

  if (!post) {
    // console.log("not found on post not reply");
    return notFound();
  }

  return (
    <div>
      <div className="grid grid-cols-12 text-xs">
        <p className="col-span-1 ml-2 text-muted-foreground/50">
          {length > 1 ? <>{index + 1}</> : null}{" "}
        </p>
        <p className="items-center w-full col-span-11 ">
          {post.content} --{" "}
          <Link href={`/users/${post.user.id}`} className="text-blue-500">
            {" "}
            {post.user.username}{" "}
          </Link>
          <span className="text-muted-foreground">
            {" "}
            {dateParser(post.createdAt)}{" "}
          </span>
        </p>
      </div>
      <Separator className="my-2" />
    </div>
  );
}

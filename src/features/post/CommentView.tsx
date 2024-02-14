import { Typography } from "@/components/ui/Typography";
import { dateParser } from "@/lib/date";
import { getPostView } from "@/query/post.query";
import { getUser } from "@/query/user.query";
import { notFound } from "next/navigation";

type PostProps = {
  postId: string;
};

export default async function CommentView({ postId }: PostProps) {
  const user = await getUser();
  const post = await getPostView(postId, user.id);

  if (!post) {
    // console.log("not found on post not reply");
    return notFound();
  }

  return (
    <Typography>
      <p className="items-center w-4/5 gap-1 text-xs divide-y divide-primary/10">
        {post.content} --{" "}
        <span className="text-blue-500"> {post.user.username} </span>
        <span className="text-muted-foreground">
          {" "}
          {dateParser(post.createdAt)}{" "}
        </span>
      </p>
    </Typography>
  );
}

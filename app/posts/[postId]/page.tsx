import PostViewComponent from "@/features/post/PostViewComponent";
import { getAuthSession } from "@/lib/auth";
import { getPostView } from "@/query/post.query";
import { notFound } from "next/navigation";
import { ReplyPostForm } from "./ReplyPostForm";

export default async function PostView({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const session = await getAuthSession();
  const post = await getPostView(params.postId, session?.user.id);

  if (!post) {
    console.log("not found on post not reply");
    return notFound();
  }

  return (
    <div>
      <div className="pb-5">
        <PostViewComponent post={post} />
      </div>
      <div className="text-lg">
        {post._count.replies} Answer{post._count.replies > 0 ? "s" : ""}
      </div>
      {post.replies.map((reply) => (
        <PostViewComponent post={reply} key={reply.id} />
      ))}
      <ReplyPostForm post={post} />
    </div>
  );
}

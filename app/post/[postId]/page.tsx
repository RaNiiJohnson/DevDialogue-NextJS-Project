import PostViewComponent from "@/features/post/PostViewComponent";
import { getAuthSession } from "@/lib/auth";
import { getPostView } from "@/query/post.query";
import { notFound } from "next/navigation";

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

  return <PostViewComponent post={post} />;
}

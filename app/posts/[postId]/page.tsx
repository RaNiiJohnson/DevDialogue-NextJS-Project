import PostViewComponent from "@/features/post/PostViewComponent";
import { getAuthSession } from "@/lib/auth";
import { getPostView } from "@/query/post.query";
import { getUserProfile } from "@/query/user.query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReplyPostForm } from "./ReplyPostForm";

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const post = await getPostView(params.postId);

  return {
    title: `${post?.title}`,
  };
};

type PageParams = {
  params: {
    postId: string;
  };
};
export default async function PostView({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const session = await getAuthSession();
  const post = await getPostView(params.postId, session?.user.id);
  const user = await getUserProfile(session?.user.id ?? "");

  if (!post) {
    // console.log("not found on post not reply");
    return notFound();
  }

  return (
    <div>
      <PostViewComponent post={post} user={user} />
      <div className="text-lg">
        {post._count.replies} Answer{post._count.replies > 1 ? "s" : ""}
      </div>
      {post.replies.map((reply) => (
        <PostViewComponent post={reply} key={reply.id} user={user} />
      ))}
      <ReplyPostForm post={post} user={user} />
    </div>
  );
}

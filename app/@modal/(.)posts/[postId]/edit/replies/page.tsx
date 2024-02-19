import { getAuthSession } from "@/lib/auth";
import { getPostView } from "@/query/post.query";
import { getUserProfile } from "@/query/user.query";
import { notFound } from "next/navigation";
import EditReplyModal from "./EditModal";

export default async function Page({ params }: { params: { postId: string } }) {
  const session = await getAuthSession();
  const user = await getUserProfile(session?.user.id ?? "");
  const post = await getPostView(params.postId, session?.user.id ?? "");

  if (!post) {
    return notFound();
  }

  return <EditReplyModal userId={user?.id} post={post} />;
}

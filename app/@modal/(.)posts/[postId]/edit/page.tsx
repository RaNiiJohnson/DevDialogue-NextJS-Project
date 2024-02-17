import { getAuthSession } from "@/lib/auth";
import { getPost } from "@/query/post.query";
import { getUserProfile } from "@/query/user.query";
import EditModal from "./EditModal";

export default async function Page({ params }: { params: { postId: string } }) {
  const session = await getAuthSession();
  const user = await getUserProfile(session?.user.id ?? "");
  const post = await getPost(params.postId, session?.user.id ?? "");

  if (!user || !post) return;

  return <EditModal userId={user.id} post={post} />;
}

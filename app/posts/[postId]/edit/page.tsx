import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getPost } from "@/query/post.query";
import { getUserProfile } from "@/query/user.query";
import { notFound } from "next/navigation";
import { EditPostForm } from "./EditPostForm";

export default async function page({ params }: { params: { postId: string } }) {
  const session = await getAuthSession();
  const user = await getUserProfile(session?.user.id ?? "");
  const post = await getPost(params.postId, session?.user.id ?? "");

  if (!post) {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your post</CardTitle>
      </CardHeader>
      <CardContent>
        <EditPostForm userId={user?.id} post={post} />
      </CardContent>
    </Card>
  );
}

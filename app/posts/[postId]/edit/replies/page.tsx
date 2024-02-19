import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getPostView } from "@/query/post.query";
import { getUserProfile } from "@/query/user.query";
import { notFound } from "next/navigation";
import { EditReplyPostForm } from "./EditReplyPostForm";

export default async function page({ params }: { params: { postId: string } }) {
  const session = await getAuthSession();
  const user = await getUserProfile(session?.user.id ?? "");
  const post = await getPostView(params.postId, session?.user.id ?? "");

  if (!post) {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your response</CardTitle>
      </CardHeader>
      <CardContent>
        <EditReplyPostForm userId={user?.id} post={post} />
      </CardContent>
    </Card>
  );
}

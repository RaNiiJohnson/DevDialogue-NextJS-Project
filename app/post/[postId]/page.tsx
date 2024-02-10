import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CodeDisplay from "@/features/post/Code";
import PostViewComponent from "@/features/post/PostViewComponent";
import { getAuthSession } from "@/lib/auth";
import { getPostView } from "@/query/post.query";
import { ChevronDown, ChevronUp } from "lucide-react";
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

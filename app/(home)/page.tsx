import { Button } from "@/components/ui/button";
import { Post } from "@/features/post/Post";
import { getAuthSession } from "@/lib/auth";
import { getLatestPosts } from "@/query/post.query";
import Link from "next/link";

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await getLatestPosts(session?.user.id);

  return (
    <div>
      <div className="flex justify-between py-6">
        <div className="text-2xl">All Questions</div>
        <Link href="/ask">
          <Button variant={"devDialogueVariant"} size={"sm"}>
            Ask Questions
          </Button>
        </Link>
      </div>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

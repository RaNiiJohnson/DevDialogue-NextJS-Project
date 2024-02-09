import { Post } from "@/features/post/Post";
import { getAuthSession } from "@/lib/auth";
import { getLatestPosts } from "@/query/post.query";

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await getLatestPosts(session?.user.id);

  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
}

import { getAuthSession } from "@/lib/auth";
import { getLatestPosts } from "@/query/post.query";

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await getLatestPosts(session?.user.id);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          {post.content} {post.title}
        </div>
      ))}
    </>
  );
}

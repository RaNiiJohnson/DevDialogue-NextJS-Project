import HomeLayout from "@/components/HomeLayout";
import { Post } from "@/features/post/Post";
import { getAuthSession } from "@/lib/auth";
import { getLatestPosts } from "@/query/post.query";
import { getUserProfile } from "@/query/user.query";

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await getLatestPosts(session?.user.id);
  const user = await getUserProfile(session?.user.id ?? "");
  return (
    <HomeLayout title="All Questions">
      {posts.map((post) => (
        <Post post={post} key={post.id} user={user} />
      ))}
    </HomeLayout>
  );
}

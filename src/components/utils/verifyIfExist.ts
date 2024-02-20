import { PostHome } from "@/query/post.query";
import { getUser } from "@/query/user.query";

export const verifySave = (post: PostHome, userId: string) => {
  return post.save.some((s) => (s.userId = userId));
};

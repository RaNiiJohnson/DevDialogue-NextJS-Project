"use server";
import { prisma } from "@/lib/prisma";
import { getPost } from "@/query/post.query";
import { getUser } from "@/query/user.query";

export const SavePost = async (id: string) => {
  const user = await getUser();

  if (!user) return;

  const post = await getPost(id, user.id);

  if (!post) return;

  const save = await prisma.save.create({
    data: {
      userId: user.id,
      postId: post?.id,
    },
  });
  return save.id;
};

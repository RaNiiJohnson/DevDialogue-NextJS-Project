"use server";

import { prisma } from "@/lib/prisma";
import { PostHome } from "@/query/post.query";

export const editPost = async ({
  post,
  userId,
  formData,
}: {
  post: PostHome;
  userId?: string;
  formData: FormData;
}) => {
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!content) {
    return {
      error: "content is required",
    };
  }

  if (!title) {
    return {
      error: "title is required",
    };
  }

  if (!userId) return;

  await prisma.post.update({
    where: {
      userId,
      id: post.id,
    },
    data: {
      content,
      code,
      title,
    },
  });

  return {
    message: "Post updated successfully",
  };
};

"use server";

import { prisma } from "@/lib/prisma";
import { PostHome } from "@/query/post.query";

export const editReplyPost = async ({
  post,
  userId,
  formData,
}: {
  post: PostHome;
  userId?: string;
  formData: FormData;
}) => {
  const content = formData.get("content") as string;
  const code = formData.get("code") as string;

  if (!content) {
    return {
      error: "content is required",
    };
  }

  if (!userId) return;

  if (typeof content !== "string" || typeof code !== "string")
    throw new Error("Invalid content or code");

  await prisma.post.update({
    where: {
      userId,
      id: post.id,
    },
    data: {
      content,
      code,
    },
  });

  return {
    message: "Post updated successfully",
  };
};

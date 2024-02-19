"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeletePost = async (postId: string) => {
  const session = await getAuthSession();

  if (!session?.user.id) throw new Error("invalid session");
  if (typeof postId !== "string") throw new Error("invalid postId");

  await prisma.post.delete({
    where: {
      id: postId,
      userId: session.user.id,
    },
  });

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
  return {
    ok: "ok",
  };
};

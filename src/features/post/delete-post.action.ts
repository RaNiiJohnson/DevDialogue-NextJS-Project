"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeletePost = async (postId: string) => {
  const session = await getAuthSession();

  if (!session?.user.id) return;

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
};

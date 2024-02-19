"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const DeletePost = authAction(
  z.object({
    postId: z.string(),
  }),
  async ({ postId }, { userId }) => {
    await prisma.post.delete({
      where: {
        id: postId,
        userId: userId,
      },
    });

    revalidatePath("/");
    revalidatePath(`/posts/${postId}`);
    return {
      ok: "ok",
    };
  }
);

"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const viewAction = async (postId: string) => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return;
  }

  const isInView = await prisma.postView.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
  });

  if (isInView) {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        vueXTime: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.postView.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        vueXTime: {
          increment: 1,
        },
      },
    });
  }

  // revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
};

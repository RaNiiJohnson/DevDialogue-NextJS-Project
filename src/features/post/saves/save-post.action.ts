"use server";

import { prisma } from "@/lib/prisma";
import { getPost } from "@/query/post.query";
import { getUser } from "@/query/user.query";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export const savePost = async (postId: string) => {
  const user = await getUser();

  if (!user) return notFound();

  const post = await getPost(postId, user.id);

  const isSaved = await prisma.save.findFirst({
    where: {
      userId: user.id,
      postId: post?.id,
    },
    select: {
      id: true,
    },
  });

  if (isSaved) {
    await prisma.save.delete({
      where: {
        id: isSaved.id,
      },
    });
    revalidatePath("/");
    revalidatePath(`/posts/${post.id}`);
    revalidatePath(`/users/${user.id}/saves`);
    revalidatePath(`/users/${user.id}`);
    return {
      discard: "Discard",
    };
  } else {
    await prisma.save.create({
      data: {
        userId: user.id,
        postId,
        type: "saved",
      },
    });
    revalidatePath("/");
    revalidatePath(`/posts/${post.id}/`);
    revalidatePath(`/users/${user.id}/saves`);
    revalidatePath(`/users/${user.id}`);
    return {
      saved: "Saved",
    };
  }
};

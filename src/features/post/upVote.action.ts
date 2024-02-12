"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const upVoteAction = async (postId: string) => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return;
  }

  const existingVote = await prisma.vote.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
  });

  if (existingVote) {
    // Si l'utilisateur a déjà voté sur ce post
    if (existingVote.type === "upvote") {
      // Si c'était un upvote
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      // Réduisez le nombre de votes sur le post
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          voteCount: {
            decrement: 1,
          },
        },
      });

    } else {
      // Sinon, si c'était un downvote, supprimez-le
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      // Réduisez le nombre de votes sur le post
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          voteCount: {
            increment: 1,
          },
        },
      });
    }
  } else {
    // Si l'utilisateur n'a pas encore voté sur ce post, créez un upvote
    await prisma.vote.create({
      data: {
        postId,
        userId: session.user.id,
        type: "upvote",
      },
    });

    // augmenter le nombre de votes sur le post
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        voteCount: {
          increment: 1,
        },
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
};

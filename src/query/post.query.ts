import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    content: true,
    createdAt: true,
    title: true,
    voteCount: true,
    vueXTime: true,
    PostView: {
      select: {
        postId: true,
        userId: true,
      },
      where: {
        userId: userId ?? "error",
      },
    },
    user: {
      select: {
        image: true,
        username: true,
        id: true,
      },
    },
    votes: {
      select: {
        userId: true,
        type: true,
      },
      where: {
        userId: userId ?? "error",
      },
    },
    _count: {
      select: {
        replies: true,
        PostView: true,
      },
    },
  } satisfies Prisma.PostSelect);

export const getLatestPosts = (userId?: string) =>
  prisma.post.findMany({
    where: {
      parentId: null,
    },
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: postSelectQuery(userId),
  });

export const getPostView = (id: string, userId?: string) =>
  prisma.post.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
      replies: {
        select: postSelectQuery(userId),
      },
      parent: {
        select: postSelectQuery(userId),
      },
    },
  });

export type PostHome = Prisma.PromiseReturnType<typeof getLatestPosts>[number];

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
    code: true,
    parent: {
      select: {
        id: true,
      },
    },
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
    replies: {
      select: {
        id: true,
        content: true,
        user: {
          select: {
            username: true,
          },
        },
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
  prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
      replies: {
        // orderBy: {
        //   voteCount: "desc",
        // },
        select: postSelectQuery(userId),
      },
      parent: {
        select: postSelectQuery(userId),
      },
    },
  });

export const getPost = (id: string, userId: string) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
    },
  });
};

export type PostHome = Prisma.PromiseReturnType<typeof getLatestPosts>[number];

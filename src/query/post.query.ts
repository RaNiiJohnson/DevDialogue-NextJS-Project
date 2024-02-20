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
    save: {
      select: {
        id: true,
        createdAt: true,
        postId: true,
        userId: true,
      },
      where: {
        userId: userId ?? "error",
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

export const getPost = (id: string, userId?: string) =>
  prisma.post.findUniqueOrThrow({
    where: {
      id,
      userId,
      parentId: null,
    },
    select: {
      ...postSelectQuery(userId),
    },
  });
export const getSavedPost = (userId: string) =>
  prisma.save.findMany({
    where: {
      userId,
    },
    select: {
      createdAt: true,
      id: true,
      postId: true,
      userId: true,
      post: {
        select: {
          ...postSelectQuery(userId),
        },
      },
    },
  });

export const getOneSavedPost = (id: string) =>
  prisma.save.findUnique({
    where: {
      id,
    },
    select: {
      createdAt: true,
      id: true,
      postId: true,
      userId: true,
    },
  });

export type PostHome = Prisma.PromiseReturnType<typeof getLatestPosts>[number];
export type PostSaved = Prisma.PromiseReturnType<typeof getSavedPost>[];

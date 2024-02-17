import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import { postSelectQuery } from "./post.query";

const userQuery = {
  image: true,
  username: true,
  link: true,
  bio: true,
  createdAt: true,
  location: true,
  name: true,
  id: true,
  about: true,
} satisfies Prisma.UserSelect;

export const getUser = async () => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      image: true,
    },
  });

  return user;
};

export const getUserProfile = cache(async (userId: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        {
          username: userId,
        },
        {
          id: userId,
        },
      ],
    },
    select: {
      ...userQuery,
      posts: {
        select: postSelectQuery(userId),
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
});

export const getUserEdit = async () => {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("No session");
  }

  return prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: userQuery,
  });
};

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;
export type UserEdit = NonNullable<
  Prisma.PromiseReturnType<typeof getUserEdit>
>;

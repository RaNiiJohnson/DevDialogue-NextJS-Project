"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/query/user.query";
import { WritePostFormValues } from "./AskPostForm";
import { notFound } from "next/navigation";

export const createPost = async (values: WritePostFormValues) => {
  const user = await getUser();

  if (!user) return notFound();

  const post = await prisma.post.create({
    data: {
      content: values.content,
      title: values.title,
      code: values?.code,
      userId: user.id,
    },
  });
  return post.id;
};

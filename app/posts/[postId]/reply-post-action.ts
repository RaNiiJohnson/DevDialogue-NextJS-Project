"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/query/user.query";
import { ReplyPostFormValues } from "./ReplyPostForm";

export const createReply = async (
  postId: string,
  values: ReplyPostFormValues
) => {
  const user = await getUser();

  await prisma.post.create({
    data: {
      content: values.content,
      code: values?.code,
      parentId: postId,
      userId: user.id,
    },
  });

  return postId;
};

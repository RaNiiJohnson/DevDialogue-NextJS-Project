import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUser = async () => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findFirstOrThrow({
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

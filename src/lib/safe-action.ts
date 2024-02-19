import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const session = await getAuthSession();

    if (!session?.user.id) throw new Error("Invalid session");

    return {
      userId: session.user.id,
    };
  },
});

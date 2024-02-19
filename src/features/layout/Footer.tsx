import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/query/user.query";
import { FooterUtils } from "./FooterUtils";

export const Footer = async () => {
  const session = await getAuthSession();
  const user = await getUserProfile(session?.user.id ?? "");
  return <FooterUtils user={user} />;
};

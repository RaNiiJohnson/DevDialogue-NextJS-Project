import { getAuthSession } from "@/lib/auth";
import { LoggedInButton } from "./LoggedInButton";
import { LoginButton } from "./LoginButton";

export const AuthButton = async () => {
  const session = await getAuthSession();

  if (!session) {
    return <LoginButton />;
  }
  return <LoggedInButton user={session.user} />;
};

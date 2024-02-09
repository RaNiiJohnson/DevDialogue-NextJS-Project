import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/auth";
import { LoginButton } from "./LoginButton";

export const AuthButton = async () => {
  const session = await getAuthSession();

  if (!session) {
    return <LoginButton />;
  }
  return (
    <div>
      <Avatar size="sm">
        <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
        {session.user.image && (
          <AvatarImage
            src={session.user.image}
            alt={session.user.name ?? "user picture"}
          />
        )}
      </Avatar>
    </div>
  );
};

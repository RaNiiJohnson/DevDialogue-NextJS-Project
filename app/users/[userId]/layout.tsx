import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/auth";
import { formatProfilDate } from "@/lib/date";
import { getUserProfile } from "@/query/user.query";
import { Calendar, LinkIcon, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import Nav from "./Nav";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

export default async function Profile({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const session = await getAuthSession();
  const currentUser = await getUserProfile(session?.user.id ?? "");
  const user = await getUserProfile(params.userId);

  if (!user) notFound();

  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar size="profil">
          <AvatarFallback size="lg">{user.username.slice(0, 3)}</AvatarFallback>
          {user.image ? (
            <AvatarImage src={user.image} alt=""></AvatarImage>
          ) : (
            ""
          )}
        </Avatar>
        <div className="flex flex-col">
          <div className="text-3xl font-medium">{user.username}</div>
          {user.bio ? (
            <div className="text-lg text-muted-foreground">{user.bio}</div>
          ) : null}
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={15} />
              <span>Member for {formatProfilDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              {user.link ? (
                <>
                  <LinkIcon size={15} />
                  <span>{removeHttp(user.link)}</span>
                </>
              ) : (
                ".;"
              )}
              {user.location ? (
                <>
                  <MapPin size={15} />
                  <span>{user.location}</span>
                </>
              ) : (
                ".."
              )}
            </div>
          </div>
        </div>
      </div>
      <Nav user={user} currentUser={currentUser} />
      {children}
    </div>
  );
}

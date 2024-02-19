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
      <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
        <Avatar size="profil">
          <AvatarFallback size="lg">{user.username.slice(0, 3)}</AvatarFallback>
          {user.image ? (
            <AvatarImage src={user.image} alt=""></AvatarImage>
          ) : (
            ""
          )}
        </Avatar>
        <div className="flex flex-col">
          <div className="text-3xl font-medium max-sm:text-xl">
            {user.username}
          </div>
          {user.bio ? (
            <div className="text-lg max-sm:text-sm text-accent-foreground/80">
              {user.bio}
            </div>
          ) : null}
          <div className="pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={15} />
              <span>Member for {formatProfilDate(user.createdAt)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {user.link ? (
                <span className="flex gap-1">
                  <LinkIcon size={15} />
                  {removeHttp(user.link)}
                </span>
              ) : (
                ".;"
              )}
              {user.location ? (
                <span className="flex gap-1">
                  <MapPin size={15} />
                  {user.location}
                </span>
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

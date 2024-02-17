import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatProfilDate } from "@/lib/date";
import { UserProfile } from "@/query/user.query";
import { Calendar, LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

export const Profile = ({
  user,
  children,
}: PropsWithChildren<{ user: UserProfile }>) => {
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
          <div className="text-3xl font-medium">{user.name}</div>
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
      <nav>
        <Link href={`${user.id}/invoices`}>navigate</Link>
      </nav>
    </div>
  );
};

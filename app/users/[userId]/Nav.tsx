"use client";
import { buttonVariants } from "@/components/ui/button";
import { UserProfile } from "@/query/user.query";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({
  user,
  currentUser,
}: {
  user: UserProfile;
  currentUser?: UserProfile | null;
}) {
  const pathname = usePathname();
  const activeProfile = pathname === `/users/${user.id}`;
  const activeSaves = pathname === `/users/${user.id}/saves`;
  const activeSettings = pathname === `/users/${user.id}/settings`;

  return (
    <nav className="flex gap-2 py-4">
      <Link
        className={
          activeProfile
            ? buttonVariants({ variant: "default" })
            : buttonVariants({ variant: "ghost" })
        }
        href={`/users/${user.id}/`}
      >
        Profile
      </Link>
      {currentUser?.id === user.id && (
        <>
          {" "}
          <Link
            className={
              activeSaves
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "ghost" })
            }
            href={`/users/${user.id}/saves`}
          >
            Saves
          </Link>
          <Link
            className={
              activeSettings
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "ghost" })
            }
            href={`/users/${user.id}/settings`}
          >
            Settings
          </Link>
        </>
      )}
    </nav>
  );
}

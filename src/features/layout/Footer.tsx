import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, PenSquare } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FooterUtils } from "./FooterUtils";
import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/query/user.query";

export const Footer = async () => {
  const session = await getAuthSession();
  const user = await getUserProfile(session?.user.id ?? "");
  return <FooterUtils user={user} />;
};

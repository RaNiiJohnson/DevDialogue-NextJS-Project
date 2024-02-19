import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import RedirectionButton from "../features/layout/auth/RedirectionLoginButton";

export default async function HomeLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const session = await getAuthSession();
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="text-2xl">{title}</div>
          {session ? (
            <Link
              className={buttonVariants({
                variant: "default",
                size: "sm",
              })}
              href="/ask"
            >
              Ask Questions
            </Link>
          ) : (
            <RedirectionButton
              title="Ask Questions"
              action="For asking questions"
              variantButton="default"
              size="sm"
            />
          )}
        </div>
        <Separator className="mt-6 " />
        {children}
      </div>
    </div>
  );
}

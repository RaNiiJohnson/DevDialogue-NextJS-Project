import { Typography } from "@/components/ui/Typography";
import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/query/user.query";
import { notFound } from "next/navigation";
import FormProfile from "./SettingsFormProfile";

export default async function page({ params }: { params: { userId: string } }) {
  const session = await getAuthSession();
  const currentUser = await getUserProfile(session?.user.id ?? "");
  const user = await getUserProfile(params.userId);
  if (!user) return notFound();

  return (
    <div>
      <Typography className="ml-2" variant={"code"}>
        {currentUser ? <>Edit your profile</> : <>Are you absolutely sure?</>}
      </Typography>
      <FormProfile user={user} currentUser={currentUser} />
    </div>
  );
}

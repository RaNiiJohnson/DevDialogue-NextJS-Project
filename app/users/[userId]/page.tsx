import { Typography } from "@/components/ui/Typography";
import { getUserProfile } from "@/query/user.query";
import { notFound } from "next/navigation";

type PageParams = {
  params: {
    userId: string;
  };
};

export default async function UserPage({ params }: PageParams) {
  const user = await getUserProfile(params.userId);

  if (!user) notFound();

  return (
    <div>
      <div>
        <Typography variant={"h2"}>About</Typography>
        <Typography>{user.about}</Typography>
      </div>
      <div>
        <Typography variant={"h2"}>Posts</Typography>
        <Typography>post</Typography>
      </div>
    </div>
  );
}

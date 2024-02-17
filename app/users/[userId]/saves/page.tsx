import { getAuthSession } from "@/lib/auth";
import { getUser } from "@/query/user.query";
import { notFound } from "next/navigation";

export default async function page() {
  const user = getUser();
  // const post = await getPost();

  return <div>activity</div>;
}

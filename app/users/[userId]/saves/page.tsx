import { Typography } from "@/components/ui/Typography";
import { Table, TableBody } from "@/components/ui/table";
import { getSavedPost } from "@/query/post.query";
import { getUser } from "@/query/user.query";
import { notFound } from "next/navigation";
import { TableProfil } from "../TableProfil";

export default async function page() {
  const user = await getUser();

  if (!user) return notFound();

  const postSaved = await getSavedPost(user.id);

  return (
    <div>
      <Typography className="ml-2" variant={"code"}>
        {postSaved.length === 0 ? "No" : postSaved.length} question
        {postSaved.length > 1 ? "s" : ""} saved
      </Typography>
      <Table className="">
        <TableBody>
          {postSaved.map((save) => (
            <TableProfil user={user} post={save.post} key={save.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { Typography } from "@/components/ui/Typography";
import { Table, TableBody } from "@/components/ui/table";
import { getUser, getUserProfile } from "@/query/user.query";
import Markdown from "react-markdown";
import { TableProfil } from "./TableProfil";

type PageParams = {
  params: {
    userId: string;
  };
};

export default async function UserPage({ params }: PageParams) {
  const currentUser = await getUser();
  const user = await getUserProfile(params.userId);

  const postUser = user?.posts.filter((post) => post.parent === null);
  return (
    <div>
      <div>
        <Typography className="ml-2" variant={"code"}>
          About
        </Typography>
        <Markdown className="my-3 prose dark:prose-invert">
          {user?.about}
        </Markdown>
      </div>
      <div>
        <Typography className="mb-3 ml-2" variant={"code"}>
          {postUser?.length === 0 ? "No" : postUser?.length} post
          {postUser?.length && postUser?.length > 1 ? "s" : ""}
        </Typography>
        <div className="mt-3">
          <Table>
            <TableBody>
              {postUser?.map((post) => (
                <TableProfil user={currentUser} key={post.id} post={post} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

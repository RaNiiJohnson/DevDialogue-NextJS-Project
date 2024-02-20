import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { getUser, getUserProfile } from "@/query/user.query";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import { TableProfil } from "./TableProfil";

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const user = await getUserProfile(params.userId);

  return {
    title: `${user?.name} (${user?.username})`,
  };
};

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
        {user?.about && (
          <Markdown className="my-3 prose dark:prose-invert">
            {user.about}
          </Markdown>
        )}{" "}
        {currentUser?.id === user?.id && !user?.about && (
          <Card className="h-32 my-3">
            <CardContent>
              <div className="text-center prose prose-invert justify-center text-sm flex items-center my-auto h-32 flex-wrap">
                <p>
                  Your about me section is currently blank. Would you like to
                  add one?
                  <Link
                    className="ml-1 text-primary"
                    href={`/users/${user?.id}/settings`}
                  >
                    Edit profil
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {currentUser?.id !== user?.id && !user?.about && (
          <Card className="h-16 my-3">
            <CardContent>
              <div className="text-center prose prose-invert justify-center text-sm flex items-center my-auto h-16 text-muted-foreground flex-wrap">
                <p>Blank</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div>
        <Typography className="mb-3 ml-2" variant={"code"}>
          {postUser?.length === 0 ? "No" : postUser?.length} question
          {postUser?.length && postUser?.length > 1 ? "s" : ""}
        </Typography>
        {postUser?.length !== 0 && (
          <div className="mt-3">
            <Table>
              <TableBody>
                {postUser?.map((post) => (
                  <TableProfil user={currentUser} key={post.id} post={post} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {currentUser?.id === user?.id && !user?.posts && (
          <Card className="h-32 my-3">
            <CardContent>
              <div className="text-center prose prose-invert justify-center text-sm flex items-center my-auto h-32 flex-wrap">
                <p>
                  You have not asked any questions!.
                  <Link className="ml-1 text-primary" href={"/ask"}>
                    Ask question
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {currentUser?.id !== user?.id && !user?.posts && (
          <Card className="h-16 my-3">
            <CardContent>
              <div className="text-center text-muted-foreground prose prose-invert justify-center text-sm flex items-center my-auto h-16 flex-wrap">
                <p>Blank</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import { TableCell, TableRow } from "@/components/ui/table";
import { SaveButton } from "@/features/post/saves/SaveButton";
import { dateParser } from "@/lib/date";
import { PostHome } from "@/query/post.query";
import { UserCurrent } from "@/query/user.query";
import Link from "next/link";

export const TableProfil = ({
  post,
  user,
}: {
  post: PostHome;
  user?: UserCurrent | null;
}) => {
  return (
    <TableRow key={post.id}>
      {user && (
        <TableCell>
          <SaveButton
            postId={post.id}
            profil={true}
            saved={post.save[0]?.type === "saved"}
          />
        </TableCell>
      )}
      <TableCell>
        <Link
          href={`/posts/${post.id}`}
          className="flex w-full h-full text-primary"
        >
          {post.title}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          href={`/posts/${post.id}`}
          className="flex w-full h-full text-primary"
        >
          <div className="text-xs text-muted-foreground">
            {dateParser(post.createdAt).split("at")[0]}
          </div>
        </Link>
      </TableCell>
    </TableRow>
  );
};

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Pagetest() {
  return (
    <Link
      className={buttonVariants({ variant: "devDialogueVariant" })}
      href="my-mdx-page/test"
    >
      test
    </Link>
  );
}

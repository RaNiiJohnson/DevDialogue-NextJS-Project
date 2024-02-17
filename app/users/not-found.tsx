import Link from "next/link";

import { BackButton } from "@/components/BackButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>404 - Not found</CardTitle>
        <CardDescription>No user found</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Home
        </Link>
        <BackButton />
      </CardContent>
    </Card>
  );
}

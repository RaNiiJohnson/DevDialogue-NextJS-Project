import { Typography } from "@/components/ui/Typography";
import { WritePostForm } from "./WritePostForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AskQuestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Typography variant={"h2"}>Your Question</Typography>{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WritePostForm />
      </CardContent>
    </Card>
  );
}

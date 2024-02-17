import { WritePostForm } from "./AskPostForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AskQuestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div>Your Question</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WritePostForm />
      </CardContent>
    </Card>
  );
}

"use client";

// Error components must be Client Components
import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="border-destructive bg-destructive/50">
      <CardHeader>
        <CardTitle>Not logged</CardTitle>
      </CardHeader>
      <CardContent>You must be logged in to access this page.</CardContent>
    </Card>
  );
}

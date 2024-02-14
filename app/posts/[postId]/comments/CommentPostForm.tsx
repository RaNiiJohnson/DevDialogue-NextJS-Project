"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ContentTextArea2 } from "@/features/post/ContentTextArea2";
import { PostHome } from "@/query/post.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createReply } from "../reply-post-action";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  code: z.string().optional(),
});

export type ReplyPostFormValues = z.infer<typeof formSchema>;

type PostProps = {
  post: PostHome;
};

export function CommentPostForm({ post }: PostProps) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postId = await createReply(post.id, values);
    if (postId) {
      router.refresh();
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between gap-1">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ContentTextArea2
                    {...field}
                    className="border-none "
                    placeholder="add comment..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"secondary"} size="sm" type="submit">
            Comment
          </Button>
        </div>
      </form>
    </Form>
  );
}

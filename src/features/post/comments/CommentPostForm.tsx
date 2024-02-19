"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import RedirectionButton from "@/features/layout/auth/RedirectionLoginButton";
import { ContentTextArea2 } from "@/components/ContentTextArea2";
import { PostHome } from "@/query/post.query";
import { UserProfile } from "@/query/user.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createReply } from "../../../../app/posts/[postId]/reply-post-action";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  code: z.string().optional(),
});

export type ReplyPostFormValues = z.infer<typeof formSchema>;

type PostProps = {
  post: PostHome;
  user?: UserProfile | null;
};

export function CommentPostForm({ post, user }: PostProps) {
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
      toast.success("comment added successfully");
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full gap-1 ">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ContentTextArea2
                    autoCorrect="false"
                    {...field}
                    placeholder="add comment..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user ? (
            <Button
              disabled={form.formState.isSubmitting}
              variant={"secondary"}
              size="sm"
              type="submit"
            >
              {form.formState.isSubmitting ? "Add comment.." : "Comment"}
            </Button>
          ) : (
            <RedirectionButton
              size="sm"
              variantButton="secondary"
              title="Comment"
              action="To comment this post"
            />
          )}
        </div>
      </form>
    </Form>
  );
}

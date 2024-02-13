"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ContentTextArea } from "@/features/post/ContentTextArea";
import { PostHome } from "@/query/post.query";
import { zodResolver } from "@hookform/resolvers/zod";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createReply } from "./reply-post-action";

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

export function ReplyPostForm({ post }: PostProps) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      code: "",
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>You have any advice?</FormLabel>
              <FormControl>
                <ContentTextArea
                  {...field}
                  spellCheck="false"
                  placeholder="your text (Markdown syntax allowed)."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <FormLabel>Code</FormLabel>
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormControl>
                      <CodeEditor
                        {...field}
                        className="bg-slate-200 dark:bg-slate-900"
                        language="js"
                        placeholder="Enter your code."
                        padding={15}
                        style={{
                          fontFamily:
                            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      If applicable, include any specific code.
                    </FormDescription>
                    <FormMessage />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />
        <Button variant={"devDialogueVariant"} type="submit">
          Reply
        </Button>
      </form>
    </Form>
  );
}

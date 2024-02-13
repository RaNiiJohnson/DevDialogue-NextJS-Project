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
import { Input } from "@/components/ui/input";
import { ContentTextArea } from "@/features/post/ContentTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createPost } from "./write-post-action";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  code: z.string().optional(),
});

export type WritePostFormValues = z.infer<typeof formSchema>;

export function WritePostForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      code: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postId = await createPost(values);
    if (postId) {
      // window.location.href = `${window.location.origin}/posts/${postId}`;

      router.push(`/posts/${postId}`);
      // router.refresh();
      toast.success("Post published successfully");
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Be precise, as if you were posing a question to someone else."
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                Be precise, as if you were posing a question to someone else.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are the specifics of your issue?</FormLabel>
              <FormControl>
                <ContentTextArea
                  {...field}
                  spellCheck="false"
                  placeholder="your text (Markdown syntax allowed)."
                />
              </FormControl>
              <FormDescription>
                Explain how you encountered the problem you’re trying to solve,
                and any difficulties that have prevented you from solving it
                yourself.
              </FormDescription>
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
                      Please provide the code where you encountered the issue,
                      if you have any code to show.
                    </FormDescription>
                    <FormMessage />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />
        <Button variant={"devDialogueVariant"} type="submit">
          Poster
        </Button>
      </form>
    </Form>
  );
}

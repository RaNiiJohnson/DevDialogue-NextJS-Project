"use client";
import { ContentTextArea } from "@/components/ContentTextArea";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import RedirectionButton from "@/features/layout/auth/RedirectionLoginButton";
import { PostHome } from "@/query/post.query";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { editPost } from "./edit-post.action";

export const EditPostForm = ({
  userId,
  post,
}: {
  userId?: string;
  post: PostHome;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onsubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!post) return;

    setIsLoading(true);

    const result = await editPost({ post, userId, formData });

    setIsLoading(false);

    if (!result) return;

    if (result.error) {
      toast.error(result.error);
      return;
    }

    form.focus();

    // window.location.href = `${window.location.origin}/posts/${post.id}`;

    // router.push(`/posts/${post.id}`);
    router.back();
    // router.refresh();
    toast.success(result.message);
  };

  return (
    <form onSubmit={onsubmit}>
      <Input
        name="title"
        defaultValue={post.title ?? ""}
        placeholder="Be precise, as if you were posing a question to someone else."
      />
      <ContentTextArea
        className="my-5"
        name="content"
        defaultValue={post.content}
        placeholder="your text (Markdown syntax allowed)."
      />
      <CodeEditor
        className="bg-slate-200 dark:bg-slate-900"
        language="js"
        placeholder="Enter your code."
        padding={15}
        name="code"
        value={post.code ?? ""}
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
      {userId ? (
        <SubmitButton className="mt-5" type="submit">
          Update
        </SubmitButton>
      ) : (
        <RedirectionButton
          className="mt-5"
          action="oh oh! you can't update this post"
          title="Update"
          size="default"
          variantButton="default"
        />
      )}
    </form>
  );
};

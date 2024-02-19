"use client";
import { SubmitButton } from "@/components/SubmitButton";
import RedirectionButton from "@/features/layout/auth/RedirectionLoginButton";
import { ContentTextArea } from "@/features/post/ContentTextArea";
import { PostHome } from "@/query/post.query";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { editReplyPost } from "./edit-reply-post.action";

export const EditReplyPostForm = ({
  userId,
  post,
}: {
  userId?: string;
  post: PostHome;
}) => {
  const router = useRouter();
  const onsubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!post) return;

    const result = await editReplyPost({ post, userId, formData });

    if (!result) return;

    if (result.error) {
      toast.error(result.error);
      return;
    }

    form.reset();
    form.focus();

    router.back();

    // window.location.href = `${window.location.origin}/posts/${post.id}`;

    // router.push(`/posts/${post.id}`);
    router.refresh();

    toast.success(result.message);
  };

  return (
    <form onSubmit={onsubmit}>
      <ContentTextArea
        autoCorrect="false"
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

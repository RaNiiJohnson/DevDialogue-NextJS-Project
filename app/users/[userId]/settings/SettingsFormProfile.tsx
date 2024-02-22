"use client";
import { Typography } from "@/components/ui/Typography";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import RedirectionButton from "@/features/layout/auth/RedirectionLoginButton";
import { UserProfile } from "@/query/user.query";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { editProfile } from "./edit-profile.action";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
  location: z
    .string()
    .min(2, {
      message: "location must be at least 2 characters.",
    })
    .optional(),
  bio: z
    .string()
    .min(2, {
      message: "bio must be at least 2 characters.",
    })
    .optional(),

  about: z
    .string()
    .min(10, {
      message: "about must be at least 10 characters.",
    })
    .optional(),

  link: z
    .string()
    .min(2, {
      message: "Link must be at least 5 characters.",
    })
    .optional(),
});

export type ProfileFormType = z.infer<typeof formSchema>;

function FormProfile({
  user,
  currentUser,
}: {
  user: UserProfile;
  currentUser?: UserProfile | null;
}) {
  const router = useRouter();

  return (
    <div className="">
      <Card>
        <CardHeader>
          {/* <CardTitle>title</CardTitle> */}
          <CardDescription>
            <Typography variant={"h3"}>Set up your profile</Typography>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AutoForm
            formSchema={formSchema}
            onSubmit={async (value) => {
              const url = await editProfile(value);
              if (url) {
                router.push(url);
                // window.location.href = url;
                router.refresh();
              }
            }}
            fieldConfig={{
              username: {
                inputProps: {
                  defaultValue: user.username,
                  autoFocus: true,
                  autoCorrect: "false",
                  autoCapitalize: "true",
                },
              },
              location: {
                inputProps: {
                  defaultValue: user.location ?? "",
                },
              },
              bio: {
                inputProps: {
                  defaultValue: user.bio ?? "",
                },
              },
              about: {
                fieldType: "textarea",
                inputProps: {
                  value: "",
                  defaultValue: user.about ?? "",
                  autoCorrect: "false",
                  spellCheck: "false",
                },
              },
              link: {
                inputProps: {
                  defaultValue: user.link ?? "",
                },
              },
            }}
          >
            {currentUser?.id === user.id ? (
              <AutoFormSubmit>Edit profile</AutoFormSubmit>
            ) : (
              <RedirectionButton
                title="Edit profile"
                size={"default"}
                variantButton="default"
                action="kkkk"
              />
            )}
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormProfile;

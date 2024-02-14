import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { env } from "./env";
import { prisma } from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_ID,
      clientSecret: env.FACEBOOK_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

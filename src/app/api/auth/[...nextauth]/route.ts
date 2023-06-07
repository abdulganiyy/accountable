import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const OPTIONS: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    } as any),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      // console.log("User:", user);
      // console.log("Account:", account);
      // console.log("Profile:", profile);

      if (account.provider === "google") {
        // const response = await fetch(
        //   "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" +
        //     account.access_token
        // );
        // const data = await response.json();

        // if (data && response.ok) { }
        user.accessToken = account.access_token;
      }

      return true;
    },
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  } as any,
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };

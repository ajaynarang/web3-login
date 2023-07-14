import { kv } from "@vercel/kv";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

export default async function auth(req: any, res: any) {
  let providers = [
    CredentialsProvider({
      id: "web3login",
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const message = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");
          const result = await message.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });
          if (result.success) {
            return {
              id: message.address,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "web2login",
      name: "web2login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("web2login", credentials);

          if (
            credentials?.username == "narangajay" &&
            credentials.password == "ajay"
          ) {
            return {
              id: credentials.username,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  if (isDefaultSigninPage) {
    providers = [];
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        console.log("token", token);

        const user = await kv.get<{ id: string; name: string }>(token.sub);

        session.address = token.sub;
        session.user.id = token.sub;
        session.user.name = user?.name || undefined;

        console.log("session", session);
        return session;
      },
    },
  });
}

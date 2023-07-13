import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
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
          console.log("credentials", credentials?.message);
          console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);

          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

          console.log("nextAuthUrl", nextAuthUrl);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });
          console.log("result", result);

          if (result.success) {
            return {
              id: siwe.address,
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

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.user.image = "https://www.fillmurray.com/128/128";
        return session;
      },
    },
  });
}

// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { getCsrfToken } from "next-auth/react";
// import { SiweMessage } from "siwe";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Ethereum",
//       credentials: {
//         message: {
//           label: "Message",
//           type: "text",
//           placeholder: "0x0",
//         },
//         signature: {
//           label: "Signature",
//           type: "text",
//           placeholder: "0x0",
//         },
//       },
//       async authorize(credentials) {
//         try {
//           console.log("credentials", credentials);
//           const siwe = new SiweMessage(
//             JSON.parse(credentials?.message || "{}")
//           );
//           const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

//           const result = await siwe.verify({
//             signature: credentials?.signature || "",
//             domain: nextAuthUrl.host,
//             nonce: await getCsrfToken(),
//           });

//           if (result.success) {
//             return {
//               id: siwe.address,
//             };
//           }
//           return null;
//         } catch (e) {
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, token }: { session: any; token: any }) {
//       session.address = token.sub;
//       session.user.name = token.sub;
//       return session;
//     },
//     // async jwt({ token, user }) {
//     //   token.id = user?.id;
//     //   return token;
//     //   //   const dbUser = await db.user.findFirst({
//     //   //     where: {
//     //   //       email: token.email,
//     //   //     },
//     //   //   });

//     //   //   if (!dbUser) {
//     //   //     if (user) {
//     //   //       token.id = user?.id;
//     //   //     }
//     //   //     return token;
//     //   //   }

//     //   //   return {
//     //   //     id: dbUser.id,
//     //   //     name: dbUser.name,
//     //   //     email: dbUser.email,
//     //   //     picture: dbUser.image,
//     //   //   };
//     // },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

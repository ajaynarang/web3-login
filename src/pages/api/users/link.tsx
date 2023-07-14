/* eslint-disable import/no-anonymous-default-export */
// This is an example of how to read a JSON Web Token from an API route
import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { USER_PREFIX } from "./user-prefix";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session: any = await getSession({ req });
    const { walletId } = req.body;

    if (walletId && session?.user) {
      let user: any = await kv.get<{
        id: string;
        username: string;
        name: string;
        password: string;
        walletId: string;
      }>(USER_PREFIX + session?.user?.id || "");

      user = { ...user, walletId };

      await kv.set(USER_PREFIX + session?.user?.username, user);
      const result = await kv.set(USER_PREFIX + walletId, user);

      return res.status(200).json({ result });
    }

    res.status(400);
  }

  res.status(405);
};

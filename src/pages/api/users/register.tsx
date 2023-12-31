/* eslint-disable import/no-anonymous-default-export */
import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";
import { USER_PREFIX } from "./user-prefix";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user } = req.body;

    if (!user) {
      return res.status(400);
    }

    user.id = user.id ||  user.username;

    const result = await kv.set(USER_PREFIX + user.id, { ...user });
    return res.status(200).json({ result });
  }

  return res.status(405);
};

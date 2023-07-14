/* eslint-disable import/no-anonymous-default-export */
// This is an example of how to read a JSON Web Token from an API route
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

    console.log("register",user);
    const result = await kv.set(USER_PREFIX + user.id, { ...user });
    console.log(result);
    return res.status(200).json({ result });
  }

  return res.status(405);
};

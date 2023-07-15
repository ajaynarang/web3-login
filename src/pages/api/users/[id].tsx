/* eslint-disable import/no-anonymous-default-export */
import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";
import { USER_PREFIX } from "./user-prefix";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id }: { id?: string } = req.query; //wallet id or user id

    const user = await kv.get<{
      id: string;
      username: string;
      name: string;
      password: string;
      walletId: string;
    }>(USER_PREFIX + id || "");

    return res.status(200).json({ ...user });
  }
  return res.status(405);
};

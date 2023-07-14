/* eslint-disable import/no-anonymous-default-export */
// This is an example of how to read a JSON Web Token from an API route
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  res.send(JSON.stringify(token, null, 2));
};

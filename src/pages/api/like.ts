import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import prisma from '../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret, raw: true });

  if (!token) {
    return res.status(400).json({ message: 'No token!!!' });
  }
  const { email, roomId } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const like = await prisma.like.create({
    data: {
      roomId,
      userId: user ? (user?.id as number) : 0,
    },
  });

  return res.status(201).json({ message: 'like room...!', id: like.id });
}

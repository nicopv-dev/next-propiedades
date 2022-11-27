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
  const { likeId } = req.body;

  await prisma.like.delete({
    where: {
      id: likeId,
    },
  });

  return res.status(202).json({ message: 'Unlike' });
}

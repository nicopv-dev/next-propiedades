import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const wishlistId: string = req.query?.wishlistId
    ? (req.query?.wishlistId as string)
    : '';

  if (req.method === 'GET') {
    res.status(200).json({ message: 'GET Method' });
  }

  if (req.method === 'PUT') {
    const result = await prisma.wishlist.update({
      where: {
        id: wishlistId,
      },
      data: {
        title: req.body?.title ? (req.body?.title as string) : '',
      },
    });

    if (result) {
      res.status(200).send({ message: 'Title uploaded' });
    } else {
      res.status(400).send({ message: 'Error' });
      return;
    }
  }

  res.status(405).send({ message: 'Only GET, PUT Methods' });
}

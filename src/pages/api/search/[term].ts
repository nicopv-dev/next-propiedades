import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const term: string = query.term ? (query.term as string) : '';

  const results = await prisma.room.findMany({
    where: {
      published: true,
      OR: [
        {
          address: {
            contains: term,
            mode: 'insensitive',
          },
        },
        {
          pais: {
            title: {
              contains: term,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      category: {
        select: {
          title: true,
        },
      },
      images: {
        select: {
          image: true,
        },
      },
      pais: true,
    },
  });

  return res.status(200).json({ results, query: query?.term });
}

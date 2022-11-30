import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST')
    return res.status(400).json({ message: 'Metodo no soportado' });

  const data = req.body;

  const propiedad = await prisma.room.create({
    data,
    include: {
      category: true,
      pais: true,
    },
  });

  return res.status(200).json({ message: 'Propiedad creada', propiedad });
}

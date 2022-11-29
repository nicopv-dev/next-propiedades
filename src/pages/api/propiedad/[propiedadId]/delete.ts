import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = nc().put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { propiedadId } = req.query;

  try {
    await prisma.room.update({
      where: {
        id: Number(propiedadId),
      },
      data: {
        published: false,
      },
    });

    return res.status(200).json({ message: 'Estado cambiado' });
  } catch (err) {
    return res.status(400).json({ message: 'Error en el servidor' });
  }
});

export default handler;

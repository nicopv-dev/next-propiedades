import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = nc().put(async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  const { propiedadId } = req.query;

  try {
    await prisma.room.update({
      where: {
        id: Number(propiedadId),
      },
      data,
    });

    return res.status(200).json({ message: 'Propiedad actualizada' });
  } catch (err) {
    return res.status(400).json({ message: 'Error en el servidor' });
  }
});

export default handler;

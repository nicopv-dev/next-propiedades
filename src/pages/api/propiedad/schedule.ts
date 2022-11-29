import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST')
    return res.status(400).json({ message: 'Metodo no soportado' });

  const data = req.body;

  try {
    const schedule = await prisma.schedule.create({
      data,
    });
    return res.status(200).json({ message: 'Hora agendad', schedule });
  } catch (err) {
    return res.status(400).json({ message: 'Error en el servidor' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import SendEmailService from '../../../services/SendEmailService';
import { formatDate } from '../../../utils/moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST')
    return res.status(400).json({ message: 'Metodo no soportado' });

  const data = req.body;
  const sendEmailService = new SendEmailService();

  try {
    const schedule = await prisma.schedule.create({
      data,
      include: {
        room: true,
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    const { success } = await sendEmailService.send(
      user?.email,
      'Hora Agendada',
      `Haz agendado una hora para la propiedad "${
        schedule.room.title
      }" el dia ${formatDate(schedule.date)}`
    );

    if (!success)
      return res
        .status(401)
        .jons({ message: `Error al enviar notificacion a ${user?.email}` });

    return res.status(200).json({ message: 'Hora agendada', schedule });
  } catch (err) {
    return res.status(400).json({ message: 'Error en el servidor' });
  }
}

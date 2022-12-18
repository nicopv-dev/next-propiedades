import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import SendEmailService from '../../../../services/SendEmailService';

const handler = nc().put(async (req: NextApiRequest, res: NextApiResponse) => {
  const sendEmailService = new SendEmailService();
  try {
    const update = await prisma.documentSchedule.update({
      where: {
        id: Number(req.query.documentId),
      },
      data: {
        status: true,
      },
      include: {
        schedule: {
          select: {
            room: true,
            user: true,
          },
        },
      },
    });
    const { success } = await sendEmailService.send(
      update.schedule.user.email,
      'Documento Aprobado',
      `FELICIDADES, el documento ha sido aprobado para la propiedad "${update.schedule.room.title}"`
    );

    if (!success)
      return res.status(401).json({ message: 'Error al enviar el correo' });

    return res
      .status(200)
      .json({ message: 'Documento aprobado', document: update });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Error en el servidor' });
  }
});

export default handler;

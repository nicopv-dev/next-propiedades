import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  try {
    const schedules = await prisma.schedule.findMany({
      where: {
        room: {
          authorId: Number(userId),
        },
      },
      include: {
        room: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const result = schedules.map((schedule) => {
      return {
        ...schedule,
        start: schedule.date,
        end: schedule.date,
        title: `${schedule.user.name} / ${schedule.room.title}`,
        allDay: true,
      };
    });

    return res.status(200).json({ message: 'Agenda', result });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Error en el servidor' });
  }
});

export default handler;

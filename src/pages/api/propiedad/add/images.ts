import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = nc().post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomId, images } = req.body;
  console.log(req.body);
  try {
    await Promise.all(
      images.map(async (image) => {
        await prisma.imageOnRooms.create({
          data: {
            roomId,
            imageId: image.id,
          },
        });
      })
    );

    return res
      .status(200)
      .json({ message: 'Imagenes agregadas', data: req.body });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Error en el servidor' });
  }
});

export default handler;

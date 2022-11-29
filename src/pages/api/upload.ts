import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { upload } from '../../lib/multer';
import { uploadS3 } from '../../lib/s3';
import prisma from '../../lib/prisma';

const handler = nc()
  .use(upload.array('file', 2))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const files = req.files;
    const folder = req.body?.folder;
    try {
      const results = await uploadS3(folder, files);
      const data = results.map((file) => {
        const { Location } = file;
        return {
          path: Location,
        };
      });
      const images = await Promise.all(
        data.map(async (item) => {
          const image = await prisma.image.create({
            data: {
              path: item.path,
            },
          });
          return image;
        })
      );

      return res.status(200).json({ message: 'Imagen subidas', images });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Error al subir imagen' });
    }
    return res.status(200).json({ folder, files });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

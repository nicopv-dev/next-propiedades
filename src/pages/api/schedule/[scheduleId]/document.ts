import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
//import SendEmailService from '../../../../services/SendEmailService';
import { uploadS3 } from '../../../../lib/s3';
import { upload } from '../../../../lib/multer';

const handler = nc()
  .use(upload.array('file', 2))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const files = req.files;

    try {
      const results = await uploadS3('archivos', files);
      const data = results.map((file) => {
        const { Location } = file;
        return {
          file: Location,
        };
      });

      const document = await prisma.documentSchedule.create({
        data: {
          scheduleId: Number(req.query.scheduleId),
          file: data[0].file,
          status: false,
        },
      });

      return res.status(200).json({ message: 'Documento creado', document });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Error en el servidor' });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

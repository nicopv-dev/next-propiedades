import { NextApiRequest, NextApiResponse } from 'next';
import SendEmailService from '../../services/SendEmailService';
import nc from 'next-connect';

const handler = nc().post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  const sendEmailService = new SendEmailService();

  const { success } = await sendEmailService.send(email);

  if (!success)
    return res.status(400).json({ message: 'Error al enviar correo' });

  return res.status(200).json({ message: 'Email emviado' });
});

export default handler;

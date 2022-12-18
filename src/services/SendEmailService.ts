import { transporter } from '../lib/mailer';

class SendEmailService {
  async send(email: string, subject: string, text: string) {
    try {
      const mailData = {
        from: process.env.GOOGLE_EMAIL_USER,
        to: email,
        subject,
        html: `<div>${text}</div>`,
      };
      await transporter.sendMail(mailData);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }
}

export default SendEmailService;

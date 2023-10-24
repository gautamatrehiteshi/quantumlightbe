import * as nodemailer from 'nodemailer';
export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    // service: process.env.EMAIL_SERVICE,
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  });
};

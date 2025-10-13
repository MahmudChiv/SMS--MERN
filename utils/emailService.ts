// utils/emailService.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendLoginEmail = async (to: string, password: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Login to the school portal",
    text: `Welcome onboard,visit ${process.env.WEB_URL} and setup your account. Your login details include: - Email: ${to} - Password: ${password}`,
  };

  return transporter.sendMail(mailOptions);
};

import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '../config/constants';

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const emailService = {
  async sendReturnReminder(to: string, bookTitle: string, dueDate: Date) {
    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject: 'Book Return Reminder',
      text: `Dear library member,\n\nThis is a reminder that the book "${bookTitle}" is due to be returned on ${dueDate.toDateString()}. Please ensure you return it on time to avoid any late fees.\n\nBest regards,\nYour Library Team`,
      html: `
        <h1>Book Return Reminder</h1>
        <p>Dear library member,</p>
        <p>This is a reminder that the book "<strong>${bookTitle}</strong>" is due to be returned on <strong>${dueDate.toDateString()}</strong>.</p>
        <p>Please ensure you return it on time to avoid any late fees.</p>
        <p>Best regards,<br>Your Library Team</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Return reminder sent to ${to} for book "${bookTitle}"`);
    } catch (error) {
      console.error('Error sending return reminder:', error);
    }
  },
};


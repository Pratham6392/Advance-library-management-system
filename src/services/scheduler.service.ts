import cron from 'node-cron';
import { prisma } from '../index';
import { emailService } from  "./email.service";
import { REMINDER_DAYS_BEFORE_DUE } from '../config/constants';

export const schedulerService = {
  startReturnReminderScheduler() {
    // Run every day at midnight
    cron.schedule('0 0 * * *', async () => {
      console.log('Running return reminder scheduler...');

      const reminderDate = new Date();
      reminderDate.setDate(reminderDate.getDate() + REMINDER_DAYS_BEFORE_DUE);

      const borrowedBooks = await prisma.borrowedBook.findMany({
        where: {
          dueDate: {
            equals: reminderDate,
          },
          returnDate: null,
        },
        include: {
          user: true,
          book: true,
        },
      });

      for (const borrowedBook of borrowedBooks) {
        await emailService.sendReturnReminder(
          borrowedBook.user.email,
          borrowedBook.book.title,
          borrowedBook.dueDate
        );
      }

      console.log(`Sent ${borrowedBooks.length} return reminders.`);
    });

    console.log('Return reminder scheduler started.');
  },
};


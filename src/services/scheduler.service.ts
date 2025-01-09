import cron from 'node-cron';
import { prisma } from '../index';
import { emailService } from './email.service';
import { websocketService } from './websocket.service';
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

        // Send real-time notification
        websocketService.sendNotificationToUser(Number(borrowedBook.user.id), {
          type: 'BOOK_RETURN_REMINDER',
          message: `The book "${borrowedBook.book.title}" is due in ${REMINDER_DAYS_BEFORE_DUE} days.`,
          bookId: borrowedBook.book.id,
          dueDate: borrowedBook.dueDate,
        });
      }

      console.log(`Sent ${borrowedBooks.length} return reminders.`);
    });

    console.log('Return reminder scheduler started.');
  },
};


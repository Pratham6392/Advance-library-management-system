import { number } from 'joi';
import prisma from '../config/database';

export class BorrowService {
  static async borrowBook(userId: string, bookId: string) {
    // Check if user is verified
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        borrowedBooks: {
          where: { returnDate: null }
        }
      }
    });

    if (!user?.isVerified) {
      throw new Error('User email must be verified to borrow books');
    }

    // Check borrowing limit
    if (user.borrowedBooks.length >= 3) {
      throw new Error('Maximum borrowing limit reached (3 books)');
    }

    // Check book availability
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book || book.availableCopies < 1) {
      throw new Error('Book not available');
    }

    // Create borrowing record and update book copies
    return prisma.$transaction([
      prisma.borrowedBook.create({
        data: {
          userId,
          bookId,
          dueDate: new Date(new Date().setDate(new Date().getDate() + 14)) // setting due date to 14 days from now
        }
      }),
      prisma.book.update({
        where: { id: bookId },
        data: {
          availableCopies: { decrement: 1 }
        }
      })
    ]);
  }

  static async returnBook(borrowedBookId: string) {
    const borrowedBook = await prisma.borrowedBook.findUnique({
      where: { id: borrowedBookId },
      include: { book: true }
    });

    if (!borrowedBook) {
      throw new Error('Borrowed book record not found');
    }

    if (borrowedBook.returnDate) {
      throw new Error('Book already returned');
    }

    const dueDate = new Date(borrowedBook.dueDate);
    const returnDate = new Date();
    let fineAmount = 0;

    // Calculate fine if returned late ($1 per day)
    if (returnDate > dueDate) {
      const daysLate = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      fineAmount = daysLate;
    }

    return prisma.$transaction([
      prisma.borrowedBook.update({
        where: { id: borrowedBookId },
        data: {
          returnDate,
            fineAmount
        }
      }),
      prisma.book.update({
        where: { id: borrowedBook.bookId },
        data: {
          availableCopies: { increment: 1 }
        }
      })
    ]);
  }
}
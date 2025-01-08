import prisma from '../config/database';

export class AnalyticsService {
  static async getMostBorrowedBooks({ startDate, endDate }: { 
    startDate?: string; 
    endDate?: string; 
  }) {
    const dateFilter: any = {
      AND: [
        startDate ? { borrowDate: { gte: new Date(startDate) } } : {},
        endDate ? { borrowDate: { lte: new Date(endDate) } } : {}
      ]
    };

    const borrowings = await prisma.borrowedBook.groupBy({
      by: ['bookId'],
      where: dateFilter,
      _count: {
        bookId: true
      },
      orderBy: {
        _count: {
          bookId: 'desc'
        }
      },
      take: 10
    });

    const bookIds = borrowings.map(b => b.bookId);
    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds
        }
      },
      include: {
        authors: true,
        categories: true
      }
    });

    return borrowings.map(borrowing => ({
      book: books.find(b => b.id === borrowing.bookId),
      borrowCount: borrowing._count.bookId
    }));
  }

  static async generateMonthlyReport(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const [
      totalBorrowings,
      totalReturns,
      totalFines,
      totalActiveUsers,
      overdueBorrowings
    ] = await Promise.all([
      // Total borrowings
      prisma.borrowedBook.count({
        where: {
          dueDate: {
            gte: startDate,
            lte: endDate
          }
        }
      }),

      // Total returns
      prisma.borrowedBook.count({
        where: {
          returnDate: {
            gte: startDate,
            lte: endDate
          }
        }
      }),

      // Total fines collected
      prisma.transaction.aggregate({
        where: {
          type: 'FINE',
          status: 'COMPLETED',
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        _sum: {
          amount: true
        }
      }),

      // Active users (users who borrowed at least one book)
      prisma.user.count({
        where: {
          borrowedBooks: {
            some: {
              borrowDate: {
                gte: startDate,
                lte: endDate
              }
            }
          }
        }
      }),

      // Overdue borrowings
      prisma.borrowedBook.count({
        where: {
          dueDate: {
            lt: endDate
          },
          returnDate: null
        }
      })
    ]);

    return {
      period: {
        year,
        month
      },
      statistics: {
        totalBorrowings,
        totalReturns,
        totalFinesCollected: totalFines._sum.amount || 0,
        totalActiveUsers,
        overdueBorrowings
      }
    };
  }
}
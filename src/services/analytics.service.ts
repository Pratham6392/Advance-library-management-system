import { prisma } from '../index';
import { redisService } from './redis.service';
import { CACHE_EXPIRATION } from '../config/constants';

export const analyticsService = {
  async getMostBorrowedBooks(limit = 10) {
    const cacheKey = `analytics:most-borrowed:${limit}`;
    const cachedResults = await redisService.get(cacheKey);

    if (cachedResults) {
      return JSON.parse(cachedResults);
    }

    const books = await prisma.book.findMany({
      take: limit,
      orderBy: {
        borrowedBooks: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: { borrowedBooks: true }
        }
      }
    });

    await redisService.set(cacheKey, JSON.stringify(books), CACHE_EXPIRATION);

    return books;
  },

  async getMonthlyUsageReport(year: number, month: number) {
    const cacheKey = `analytics:monthly-report:${year}-${month}`;
    const cachedReport = await redisService.get(cacheKey);

    if (cachedReport) {
      return JSON.parse(cachedReport);
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const borrowCount = await prisma.borrowedBook.count({
      where: {
        dueDate: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    const returnCount = await prisma.borrowedBook.count({
      where: {
        returnDate: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    const totalFines = await prisma.transaction.aggregate({
      where: {
        type: 'FINE',
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        amount: true
      }
    });

    const report = {
      year,
      month,
      borrowCount,
      returnCount,
      newUsers,
      totalFines: totalFines._sum.amount || 0
    };

    await redisService.set(cacheKey, JSON.stringify(report), CACHE_EXPIRATION);

    return report;
  }
};


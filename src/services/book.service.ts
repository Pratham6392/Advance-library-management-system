import { prisma } from '../index';
import { redisService } from './redis.service';
import { CACHE_EXPIRATION } from '../config/constants';

export const bookService = {
  async addBook(data: any) {
    const book = await prisma.book.create({ data });
    await redisService.del('books:all');
    return book;
  },

  async updateBook(id: string, data: any) {
    const book = await prisma.book.update({ where: { id }, data });
    await redisService.del(`book:${id}`);
    await redisService.del('books:all');
    return book;
  },

  async deleteBook(id: string) {
    const book = await prisma.book.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    await redisService.del(`book:${id}`);
    await redisService.del('books:all');
    return book;
  },

  async getBookByIsbn(isbn: string) {
    const cacheKey = `book:isbn:${isbn}`;
    const cachedBook = await redisService.get(cacheKey);
    
    if (cachedBook) {
      return JSON.parse(cachedBook);
    }

    const book = await prisma.book.findUnique({ where: { isbn } });
    
    if (book) {
      await redisService.set(cacheKey, JSON.stringify(book), CACHE_EXPIRATION);
    }

    return book;
  },

  async searchBooks(query: string) {
    const cacheKey = `books:search:${query}`;
    const cachedResults = await redisService.get(cacheKey);

    if (cachedResults) {
      return JSON.parse(cachedResults);
    }

    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { authors: { some: { author: { name: { contains: query, mode: 'insensitive' } } } } },
          { categories: { some: { category: { name: { contains: query, mode: 'insensitive' } } } } }
        ],
        deletedAt: null
      },
      include: {
        authors: { include: { author: true } },
        categories: { include: { category: true } }
      }
    });

    await redisService.set(cacheKey, JSON.stringify(books), CACHE_EXPIRATION);

    return books;
  }
};


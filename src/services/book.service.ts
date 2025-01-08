import prisma from '../config/database';

export class BookService {
  static async createBook(data: any) {
    return prisma.book.create({
      data: {
        ...data,
        authors: {
          create: data.authors.map((authorId: string) => ({
            authorId
          }))
        },
        categories: {
          create: data.categories.map((categoryId: string) => ({
            categoryId
          }))
        }
      },
      include: {
        authors: true,
        categories: true
      }
    });
  }

  static async updateBook(id: string, data: any) {
    return prisma.book.update({
      where: { id },
      data: {
        ...data,
        authors: data.authors ? {
          deleteMany: {},
          create: data.authors.map((authorId: string) => ({
            authorId
          }))
        } : undefined,
        categories: data.categories ? {
          deleteMany: {},
          create: data.categories.map((categoryId: string) => ({
            categoryId
          }))
        } : undefined
      },
      include: {
        authors: true,
        categories: true
      }
    });
  }

  static async deleteBook(id: string) {
    return prisma.book.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  static async searchBooks(filters: any) {
    const where: any = {
      deletedAt: null
    };

    if (filters.isbn) where.isbn = filters.isbn;
    if (filters.title) where.title = { contains: filters.title, mode: 'insensitive' };
    if (filters.category) where.categories = { some: { categoryId: filters.category } };
    if (filters.author) where.authors = { some: { authorId: filters.author } };
    if (filters.onlyAvailable) where.availableCopies = { gt: 0 };

    return prisma.book.findMany({
      where,
      include: {
        authors: true,
        categories: true
      }
    });
  }
}
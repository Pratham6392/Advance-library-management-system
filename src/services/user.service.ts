import prisma from '../config/database';

export class UserService {
  static async getUserDetails(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        borrowedBooks: {
          where: { returnDate: null },
          include: { book: true }
        }
      }
    });
  }

  static async updateUser(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  static async getUserBorrowings(id: string) {
    return prisma.borrowedBook.findMany({
      where: {
        userId: id,
        returnDate: null
      },
      include: {
        book: true
      }
    });
  }

  static async disableUser(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
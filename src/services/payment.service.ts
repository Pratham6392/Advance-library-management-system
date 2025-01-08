import prisma from '../config/database';

export class PaymentService {
  static async createPayment(userId: string, data: { amount: number, borrowedBookId: string }) {
    const borrowedBook = await prisma.borrowedBook.findUnique({
      where: { id: data.borrowedBookId }
    });

    if (!borrowedBook) {
      throw new Error('Borrowed book record not found');
    }

    if (borrowedBook.userId !== userId) {
      throw new Error('Unauthorized to pay for this fine');
    }

    if (data.amount !== borrowedBook.fineAmount) {
      throw new Error('Payment amount does not match fine amount');
    }

    return prisma.transaction.create({
      data: {
        userId,
        amount: data.amount,
        type: 'FINE',
        status: 'COMPLETED'
      }
    });
  }

  static async generateInvoice(transactionId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        user: true
      }
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return {
      invoiceNumber: `INV-${transaction.id.slice(0, 8)}`,
      date: transaction.createdAt,
      amount: transaction.amount,
      status: transaction.status,
      user: {
        name: `${transaction.user.firstName} ${transaction.user.lastName}`,
        email: transaction.user.email
      }
    };
  }
}
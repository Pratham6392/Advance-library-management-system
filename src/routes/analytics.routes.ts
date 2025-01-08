import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/roleCheck.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
  '/most-borrowed',
  authenticate,
  checkRole([UserRole.ADMIN, UserRole.LIBRARIAN]),
  AnalyticsController.getMostBorrowedBooks
);

router.get(
  '/monthly-report',
  authenticate,
  checkRole([UserRole.ADMIN]),
  AnalyticsController.getMonthlyReport
);

export default router;
import { Router } from 'express';
import authRoutes from './analytics.routes';
import bookRoutes from './book.routes';
import userRoutes from './user.routes';
import borrowRoutes from './borrow.routes';
import paymentRoutes from './payment.routes';
import analyticsRoutes from './analytics.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/borrow', borrowRoutes);
router.use('/payments', paymentRoutes);
router.use('/analytics', analyticsRoutes);

export default router;


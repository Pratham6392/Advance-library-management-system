import { Router } from 'express';
import { BorrowController } from '../controllers/borrow.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/borrow', authenticate, BorrowController.borrowBook);
router.post('/return', authenticate, BorrowController.returnBook);

export default router;
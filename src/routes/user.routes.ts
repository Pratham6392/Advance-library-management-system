import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/roleCheck.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

router.get('/:id', authenticate, UserController.getUserDetails);
router.put('/:id', authenticate, checkRole([UserRole.ADMIN]), UserController.updateUser);
router.get('/:id/borrowings', authenticate, UserController.getUserBorrowings);
router.post('/:id/disable', authenticate, checkRole([UserRole.ADMIN]), UserController.disableUser);

export default router;
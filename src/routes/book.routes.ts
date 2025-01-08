import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/roleCheck.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// Admin only routes
router.post('/', authenticate, checkRole([UserRole.ADMIN]), BookController.createBook);
router.put('/:id', authenticate, checkRole([UserRole.ADMIN]), BookController.updateBook);
router.delete('/:id', authenticate, checkRole([UserRole.ADMIN]), BookController.deleteBook);

// Public routes
router.get('/search', BookController.searchBooks);

export default router;
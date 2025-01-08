import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, PaymentController.createPayment);
router.get('/:transactionId/invoice', authenticate, PaymentController.getInvoice);

export default router;
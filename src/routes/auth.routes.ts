import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { apiLimiter } from '../middlewares/rateLimiter.middleware';

const router = Router();

router.post('/register', apiLimiter, AuthController.register);
router.post('/login', apiLimiter, AuthController.login);

export default router;
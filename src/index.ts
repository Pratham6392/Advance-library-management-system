import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import routes from './routes';
import { errorHandler} from "./middlewares/error.middleware"
import { requestLogger } from "./middlewares/requestLogger"
import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import { REDIS_URL } from './config/constants';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const redis = new Redis(REDIS_URL);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,    // 15 minutes
  max: 100                     // limit each IP to 100 requests per windowMs
});

app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.use('/api', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { prisma, redis };





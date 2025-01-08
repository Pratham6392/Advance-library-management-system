export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const EMAIL_VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
export const MAX_BORROWED_BOOKS = 3;
export const BORROW_DURATION_DAYS = 14;
export const FINE_PER_DAY = 1; // 1 USD per day
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const CACHE_EXPIRATION = 60 * 5; // 5 minutes


export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const EMAIL_VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
export const MAX_BORROWED_BOOKS = 3;
export const BORROW_DURATION_DAYS = 14;
export const FINE_PER_DAY = 1; // 1 USD per day
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const CACHE_EXPIRATION = 60 * 5; // 5 minutes

// New constants for email service
export const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.example.com';
export const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
export const EMAIL_USER = process.env.EMAIL_USER || 'khatripratham349@gmail.com';
export const EMAIL_PASS = process.env.EMAIL_PASS || 'password';
export const REMINDER_DAYS_BEFORE_DUE = 2; // Send reminder 2 days before due date

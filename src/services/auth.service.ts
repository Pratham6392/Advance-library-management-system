import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { UserRole } from '@prisma/client';

export class AuthService {
  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });

    const token = this.generateToken(user.id);
    return { user, token };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    const token = this.generateToken(user.id);
    return { user, token };
  }

  private static generateToken(userId: string) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
  }
}
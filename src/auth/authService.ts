// src/auth/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../dal/prismaClient';
import { User } from '@prisma/client';

export class AuthService {
  static async validateUser(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  static generateToken(user: User): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }

  static async getUserFromToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
      return await prisma.user.findUnique({
        where: { id: decoded.sub as string }
      });
    } catch {
      return null;
    }
  }
}

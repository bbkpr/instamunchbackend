// src/auth/tokenService.ts
import jwt from 'jsonwebtoken';
import { prisma } from '../dal/prismaClient';

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.sub as string;

    return await prisma.user.findUnique({
      where: { id: userId }
    });
  } catch (error) {
    return null;
  }
}
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface CreateUserInput {
  email: string;
  name: string;
  password?: string;
  image?: string;
  provider?: string;
}

interface PaginationInput {
  skip?: number;
  take?: number;
}

interface UpdateUserInput {
  userId: string;
  email?: string;
  name?: string;
  password?: string;
  image?: string;
}

export async function createNewUser({ email, name, password, image, provider }: CreateUserInput) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: provider ? provider : await bcrypt.hash(password || '', 10),
        image: image || null,
        role: UserRole.USER,
      },
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function getUserByAccountId(accountId: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        accounts: {
          some: {
            accountId,
          },
        },
      },
      include: {
        accounts: true,
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users by accountId:', error);
    throw new Error('Failed to fetch users by accountId');
  }
}

export async function getAllUsers({ skip = 0, take = 10 }: PaginationInput = {}) {
  try {
    const users = await prisma.user.findMany({
      skip,
      take,
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function updateUser({ userId, email, name, password, image }: UpdateUserInput) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: email || undefined,
        name: name || undefined,
        password: password || undefined,
        image: image || undefined,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(userId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

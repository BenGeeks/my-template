import { Role, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

import { prisma } from '@/lib/prisma';

interface CreateAccountInput {
  accountName: string;
  userEmail: string;
  userName: string;
  userPassword?: string;
  userImage?: string;
  userRole?: UserRole;
  accountRole?: Role;
  provider: string;
}

interface Return {
  success: boolean;
  message: string;
  data?: any;
}

export async function createNewAccount({ accountName, userEmail, userName, userPassword, userImage, provider }: CreateAccountInput): Promise<Return> {
  try {
    let user;
    let account;
    await prisma.$transaction(async (prisma) => {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
          password: provider === 'credentials' ? await bcrypt.hash(userPassword, 10) : provider,
          image: userImage,
          role: 'USER',
        },
      });

      const account = await prisma.account.create({
        data: {
          accountName,
        },
      });

      await prisma.userAccount.create({
        data: {
          userId: user.id,
          accountId: account.id,
          role: 'OWNER',
        },
      });
    });
    return { success: true, message: 'User and account created successfully', data: { user, account } };
  } catch (error) {
    console.error('Error creating account and user:', error);
    return { success: true, message: 'Error creating account and user:' };
  }
}

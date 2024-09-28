import type { DefaultUser } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import NextAuth from 'next-auth';
import { createNewUser, getUserByEmail } from '@/db/user';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Email Address',
      credentials: {
        email: { label: 'Email Address', type: 'text', placeholder: 'email address' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = { id: '123', email: 'b3nhur77@gmail.com', password: 'Iamgroot2024!', name: 'Ben', address: 'B19 L23', role: 'ADMIN' };

        if (credentials?.email === user.email && credentials?.password === user.password) {
          console.log('LOG IN SUCCESSFUL: ', user);
          return user;
        } else {
          console.log('LOG IN FAILED!!!');
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/user/login',
    signOut: '/user/logout',
    newUser: '/user/signup',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: { maxAge: 60 * 60 * 24 * 30 },

  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email as string;
      const existingUser = await getUserByEmail(email);
      console.log('EXISTING USER: ', existingUser);

      if (!existingUser) {
        await createNewUser({
          email: user.email as string,
          name: user.name as string,
          image: user.image as string,
          provider: account?.provider as string,
        });
      }

      return true;
    },
    async jwt({ token, user, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

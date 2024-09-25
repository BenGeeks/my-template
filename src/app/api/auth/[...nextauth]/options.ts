import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
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
        username: { label: 'Email Address', type: 'text', placeholder: 'email address' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = { id: '123', username: 'b3nhur77@gmail.com', password: 'Iamgroot2024!' };

        if (credentials?.username === user.username && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default options;

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : '',
      clientSecret: process.env?.GOOGLE_CLIENT_SECRET
        ? process.env?.GOOGLE_CLIENT_SECRET
        : '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email?.includes('@gmail.com')) return '/login';
      else return true;
    },
    async session({ session }) {
      if (session) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user?.email,
          },
        });

        session.user.role = user?.role;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
});

import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs"; // untuk verifikasi password hash, install dulu dengan: npm install bcryptjs

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Cari user di database berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null; // user tidak ditemukan
        }

        // Cek password pakai bcrypt
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          return null; // password salah
        }

        // Jika valid, kembalikan objek user (yang ingin disimpan di session)
        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],

  session: {
    strategy: SessionStrategy.JWT,
    maxAge: 30 * 24 * 60 * 60 // 30 hari
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },

  pages: {
    signIn: "/auth/login" // halaman login custom
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

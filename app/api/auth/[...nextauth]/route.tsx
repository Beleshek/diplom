import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import  db  from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          
          const user = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(credentials.email);
          
          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          return isValid ? { 
            id: user.id, 
            email: user.email, 
            name: user.name 
          } : null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/loging/signin",
    signOut: "/loging/signin",
    error: "/loging/error"
  },
  debug: true // Включите для отладки
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnection } from "../../../../../config/dbConnection";
import nextAuthSchema from "../../../../../models/nextAuthSchema/nextAuthSchema";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("emailAPi===", email);
        console.log("passwordAPi===", password);
        try {
          await dbConnection();
          const user = await nextAuthSchema.findOne({ email });

          console.log('user', user)
          if (!user) {
            console.log("user not found");
          }

          const comparePassword = await bcrypt.compare(password, user.password);
          console.log("comparePassword", comparePassword);
          if (!comparePassword) {
            console.log("password not found from db");
          }
          return user;
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  // use to login
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

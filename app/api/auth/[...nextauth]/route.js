import User from "@/models/User";
import { connectMongoDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        gmail: {},
        username: {},
        password: {},
      },

      async authorize(credentials) {
        console.log("Credentials: ", credentials);
        const {gmail, username, password} = credentials;

        try {
            await connectMongoDB();

            const user = await User.findOne({gmail});
            if(!user) {
                return null;
            }
           const passwordMatch = await bcrypt.compare(password, user.password);

           if(!passwordMatch) {
            return null;
           }
           return user;
        } catch (error) {
            console.log(error);
            return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

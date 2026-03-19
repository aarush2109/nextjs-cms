import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                await connectDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("User not found or signed up with Google");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Check if user exists for OAuth
            if (account?.provider === "google") {
                await connectDB();
                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    const newUser = await User.create({
                        name: user.name,
                        email: user.email,
                        avatar: user.image,
                    });
                    user.id = newUser._id.toString();
                } else {
                    user.id = existingUser._id.toString();
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login", // Redirect to login on error
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

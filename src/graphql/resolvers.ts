// import { Context } from "@/pages/api/graphql";
import { prisma } from "../../prisma/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    getUser: async (root: any, args: any, context: any) => {
      // return context.currentUser;
      const currentUser = await prisma.user.findUnique({
        where: {
          email: "horpeelo@gmail.com",
        },
      });

      return currentUser;
    },
  },

  Mutation: {
    register: async (root: any, args: any) => {
      const { name, email, password } = args;

      const hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          emailVerified: false,
          phoneVerified: false,
          onboarded: false,
        },
      });

      return user;
    },
    login: async (root: any, args: any) => {
      const { email, password } = args;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return jwt.sign({ email, id: user?.id }, "SIGN_KEY");
    },
  },
};

import { ApolloError } from "apollo-server-express";
import bcrypt from "bcryptjs";

import { MyContext } from "../MyContext";
import { createToken } from "../auth";

type RegisterArgs = {
  email: string;
  password: string;
  name: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

type AuthPayload = {
  token: string;
  expiresIn: string;
};

export const Mutation = {
  register: async (
    _: any,
    args: RegisterArgs,
    { User }: MyContext
  ): Promise<AuthPayload> => {
    const { email, password, name } = args;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new ApolloError("User already exists");
    }

    // Perform validations -->

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    const savedUser = await user.save();
    return createToken({ _id: savedUser._id.toString() });
  },
  login: async (
    _: any,
    args: LoginArgs,
    { User }: MyContext
  ): Promise<AuthPayload> => {
    const { email, password } = args;
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApolloError("No such user");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new ApolloError("Incorrect password");
    }

    return createToken({ _id: user._id.toString() });
  }
};

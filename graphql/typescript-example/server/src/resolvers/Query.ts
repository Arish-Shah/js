import { AuthenticationError } from "apollo-server-express";
import { Context } from "../Context";

export const Query = {
  todos: (_: any, __: any, { user }: Context) => {
    if (!user) throw new AuthenticationError("Unauthenticated");
    return user.todos;
  }
};

import { MyContext } from "../MyContext";

export const Query = {
  todos: async (_: any, __: any, { User, userId }: MyContext) => {
    const user = await User.findById(userId);
    return user?.todos;
  }
};

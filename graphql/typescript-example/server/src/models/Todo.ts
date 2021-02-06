import mongoose, { Schema, Document } from "mongoose";

import User, { IUser } from "./User";

export interface ITodo extends Document {
  title: string;
  done: boolean;
  creator: IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      required: true,
      default: false
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

todoSchema.post("save", async (doc: ITodo) => {
  // add todo to user's todos
  const user = await User.findById(doc.creator);
  user?.todos.unshift(doc);
  await user?.save();
});

todoSchema.post("remove", async (doc: ITodo) => {
  // remove todo from user's todos
});

export default mongoose.model<ITodo>("Todo", todoSchema);

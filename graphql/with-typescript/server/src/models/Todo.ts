import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./User";

export interface ITodo extends Document {
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  creator: IUser["_id"];
}

const TodoSchema = new Schema({
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
    ref: "User"
  }
});

export default mongoose.model<ITodo>("Todo", TodoSchema);

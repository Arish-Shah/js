import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface ITodo extends Document {
  title: string;
  done: boolean;
  creator: IUser["_id"];
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

export default mongoose.model<ITodo>("Todo", todoSchema);

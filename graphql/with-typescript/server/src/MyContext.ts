import { Request, Response } from "express";
import mongoose from "mongoose";

import { IUser } from "./models/User";
import { ITodo } from "./models/Todo";

export interface MyContext {
  req: Request;
  res: Response;
  User: mongoose.Model<IUser>;
  Todo: mongoose.Model<ITodo>;
  userId?: string;
}

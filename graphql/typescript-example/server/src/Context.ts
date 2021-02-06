import { Request, Response } from "express";
import mongoose from "mongoose";

import { IUser } from "./models/User";

export interface Context {
  req: Request;
  res: Response;
  User: mongoose.Model<IUser>;
}

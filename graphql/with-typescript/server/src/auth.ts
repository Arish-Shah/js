import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

type AuthData = {
  _id: string;
};

export const createToken = (data: AuthData) => {
  const token = jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "1h"
  });
  return {
    token,
    expiresIn: "1h"
  };
};

export const getUserId = (authHeader: string): string => {
  if (!authHeader) {
    throw new AuthenticationError("Unauthenticated");
  }
  const token = authHeader.replace("Bearer ", "");
  const authData = jwt.verify(token, process.env.JWT_SECRET!) as AuthData;

  if (authData?._id) {
    return authData._id;
  }

  throw new AuthenticationError("Unauthenticated");
};

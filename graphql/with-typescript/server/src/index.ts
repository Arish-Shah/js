import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import resolvers from "./resolvers";
import User from "./models/User";
import Todo from "./models/Todo";
import { getUserId } from "./auth";

dotenv.config();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "..", "src", "schema.graphql"),
  "utf-8"
);

async function main() {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const authHeader = req.headers.authorization || "";
      const userId = getUserId(authHeader);
      return { req, res, User, Todo, userId };
    }
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server listening on http://localhost:4000/graphql");
  });
}

main().catch(error => {
  console.error(error);
});

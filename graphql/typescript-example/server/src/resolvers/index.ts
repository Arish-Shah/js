import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query,
  Mutation
};

export default resolvers;

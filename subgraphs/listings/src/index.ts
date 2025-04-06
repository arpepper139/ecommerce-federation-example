import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";

const typeDefs = gql(readFileSync("./src/schema.graphql", "utf-8"));

const resolvers = {
  Query: {
    listings: () => [
      { id: "1", name: "Chair", price: 29.99 },
      { id: "2", name: "Table", price: 59.99 },
    ],
  },
  Listing: {
    __resolveReference: ({ id }: { id: string }) => ({
      id,
      name: "Chair",
      price: 29.99,
    }),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`🚀 Listings subgraph ready at ${url}`);
});

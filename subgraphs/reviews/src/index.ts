import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

const typeDefs = gql(readFileSync('./src/schema.graphql', 'utf-8'));

const resolvers = {
  Query: {
    reviews: () => [
      { id: '1', body: 'Amazing!', product: { id: '1' } },
      { id: '2', body: 'Terrible.', product: { id: '2' } },
    ],
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => {
  console.log(`🚀 Reviews subgraph ready at ${url}`);
});
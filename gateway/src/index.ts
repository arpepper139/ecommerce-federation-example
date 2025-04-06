import { ApolloServer } from "@apollo/server";
import { ApolloGateway } from "@apollo/gateway";
import { startStandaloneServer } from "@apollo/server/standalone";

const gateway = new ApolloGateway({
  serviceList: [
    { name: "listings", url: "http://localhost:4001" },
    { name: "reviews", url: "http://localhost:4002" },
  ],
});

const server = new ApolloServer({
  gateway,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});

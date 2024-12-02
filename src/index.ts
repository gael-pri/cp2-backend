import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from "type-graphql";
import { CountryResolver } from './resolvers/CountryResolver';

async function startApolloServer() {

    const schema = await buildSchema({
      resolvers: [CountryResolver],
    });

    const server = new ApolloServer({
      schema,
    });
  
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
  
    console.log(`🚀 Server ready at: ${url}`);
  }
  
  startApolloServer().catch((err) => {
    console.error("Error starting Apollo Server:", err);
  });
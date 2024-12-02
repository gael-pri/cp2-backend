import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { CountryResolver } from "./resolvers/CountryResolver";
import { initializeCountries } from "./initData";

async function startApolloServer() {

    await AppDataSource.initialize();
    console.log("📦 Base de données initialisée");
  
    await initializeCountries();
  
    const schema = await buildSchema({
      resolvers: [CountryResolver],
    });
  
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
  
    console.log(`🚀 Serveur prêt à l'adresse : ${url}`);
  }
  
  startApolloServer().catch((err) => {
    console.error("Erreur au démarrage du serveur Apollo:", err);
  });
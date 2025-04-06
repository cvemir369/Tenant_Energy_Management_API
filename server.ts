// added after starter code + dotenv
import dotenv from "dotenv";

//starter code
// server.ts
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { TenantResolver } from "./resolvers/TenantResolver";

// ENVIRONMENT VARIABLES
dotenv.config();
const { TYPE, HOST, PORT, USERNAME, PASSWORD, DATABASE } = process.env;
if (!TYPE || !HOST || !PORT || !USERNAME || !PASSWORD || !DATABASE) {
  throw new Error("Missing environment variables for database connection.");
}

async function bootstrap() {
  // Create database connection
  await createConnection({
    type: TYPE,
    host: HOST,
    port: parseInt(PORT),
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    entities: [__dirname + "/entity/*.ts"],
    synchronize: true,
    logging: false,
    extra: {
      options: "--timescaledb.restoring=on",
    },
  });

  // Create GraphQL server
  const schema = await buildSchema({
    resolvers: [TenantResolver],
  });

  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
}

bootstrap();

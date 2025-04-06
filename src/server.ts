// added after starter code + dotenv
import dotenv from "dotenv";

// server.ts
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { TenantResolver } from "./resolvers/TentantResolver";

// ENVIRONMENT VARIABLES
dotenv.config();

async function bootstrap() {
  // Create database connection
  await createConnection({
    type: process.env.TYPE as "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.PORT || "5432"),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + "/entities/*.ts"],
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

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
});

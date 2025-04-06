# Practice Coding Challenge for FullStack Engineer Role

Based on the job description, here's a realistic practice challenge that reflects their tech stack and requirements:

## Challenge: Tenant Energy Management API

**Time limit:** 2 hours
**Tech stack to use:** TypeScript, Node.js, PostgreSQL (with TimeScaleDB for time series), GraphQL

### Task Description

Create a microservice that manages tenant energy data and billing calculations. The service should:

1. **Process energy consumption data** (time series)
2. **Calculate monthly bills** based on consumption and tariff rates
3. **Provide GraphQL API** for querying the data

### Requirements

1. **Database Setup**:

   - Create a PostgreSQL database with TimeScaleDB extension
   - Design tables for:
     - Tenants (id, name, apartment_id)
     - EnergyConsumption (timestamp, tenant_id, kWh_used) - should be a hypertable
     - Tariffs (id, rate_per_kWh, start_date, end_date)

2. **GraphQL API**:

   - Implement the following queries:
     - Get all tenants
     - Get energy consumption for a tenant between dates
     - Calculate monthly bill for a tenant (sum of kWh \* rate for the period)

3. **Business Logic**:
   - Write a function that calculates the correct tariff rate for a given date
   - Implement monthly billing calculation that:
     - Sums consumption for the month
     - Applies the correct tariff rate
     - Returns the total amount

### Starter Code

```typescript
// server.ts
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { TenantResolver } from "./resolvers/TenantResolver";

async function bootstrap() {
  // Create database connection
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "energy",
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
```

### Expected Deliverables

1. Complete TypeScript implementation with:

   - Entity definitions
   - GraphQL resolvers
   - Database repository/service layer
   - Business logic for billing calculations

2. Sample queries to test your implementation

3. Brief documentation (in code comments) explaining:
   - Your database design choices
   - Any assumptions you made
   - How to run the service

### Evaluation Criteria

- Correct implementation of time-series data handling
- Proper GraphQL schema design
- Efficient database queries
- Clean, maintainable code structure
- Appropriate error handling
- Documentation quality

### Tips

1. Focus on the core functionality first (energy data storage and billing calculation)
2. Use TypeScript interfaces/types extensively
3. Keep your database queries efficient (especially for time-series data)
4. Write clear, concise documentation
5. Manage your time carefully - 2 hours goes quickly!

Would you like me to provide a sample solution or any specific part explained in more detail?

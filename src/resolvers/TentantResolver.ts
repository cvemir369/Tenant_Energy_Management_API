import { Query, Resolver } from "type-graphql";
import { Tenant } from "../entities/Tenant";
import { getRepository } from "typeorm";

@Resolver()
export class TenantResolver {
  @Query(() => [Tenant])
  async tenants(): Promise<Tenant[]> {
    return getRepository(Tenant).find();
  }
}
// This resolver handles the GraphQL query for retrieving a list of tenants from the database.
// It uses the `@Query` decorator to define a GraphQL query named `tenants` that returns an array of `Tenant` objects.
// The `async` function retrieves the list of tenants from the database using the `Tenant.find()` method and returns it as a promise.
// The `@Resolver` decorator marks this class as a GraphQL resolver, and the `@Query` decorator defines the query that can be executed in a GraphQL request.
// The `() => [Tenant]` syntax indicates that the query returns an array of `Tenant` objects.
// The `Promise<Tenant[]>` type indicates that the function returns a promise that resolves to an array of `Tenant` objects.
// This allows the GraphQL server to return the list of tenants in response to a query request.

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

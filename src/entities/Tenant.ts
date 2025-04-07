import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType() // <-- Add this TypeGraphQL decorator
@Entity()
export class Tenant {
  @Field(() => ID) // <-- Add this for GraphQL
  @PrimaryGeneratedColumn()
  id!: number;

  @Field() // <-- Add this for GraphQL
  @Column()
  name!: string;

  @Field() // <-- Add this for GraphQL
  @Column()
  apartment_id!: string;
}

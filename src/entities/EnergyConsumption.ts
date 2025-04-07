import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class EnergyConsumption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tenant_id!: number;

  @Column("float")
  kWh_used!: number;

  @Column({ type: "timestamp" })
  timestamp!: Date;
}

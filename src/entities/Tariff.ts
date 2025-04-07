import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tariff {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal", { precision: 10, scale: 4 })
  rate_per_kWh!: number;

  @Column({ type: "date" })
  start_date!: Date;

  @Column({ type: "date", nullable: true })
  end_date!: Date | null;
}

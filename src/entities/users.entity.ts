import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import { Vehicle, Transaction } from "../entities";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column("float")
  balance!: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.user)
  vehicleType!: Vehicle;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction!: Transaction[];

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;
}

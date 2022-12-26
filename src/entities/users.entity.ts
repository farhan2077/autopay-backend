import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Transaction } from "../entities";

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

  @Column()
  balance!: number;

  @Column()
  vehicleType!: string;

  @Column()
  vehicleId!: string;

  @Column("float")
  tollRate!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transaction!: Transaction[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Transaction } from ".";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  balance!: number;

  @Column()
  vehicleType!: string;

  @Column("float")
  tollRate!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction!: Transaction[];
}

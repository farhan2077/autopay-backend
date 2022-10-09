import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { User, Vehicle } from "../entities";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  paymentStatus!: string;

  @Column("float")
  tollRate!: number;

  @ManyToOne(() => User, (user) => user.transaction)
  user!: User;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "../entities";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  paymentStatus!: string;

  @ManyToOne(() => User, (user) => user.transaction, {
    onDelete: "CASCADE",
  })
  user!: User;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;

  // @CreateDateColumn()
  // createdAt!: Date;
}

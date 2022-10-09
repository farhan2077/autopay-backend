import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { User } from "../entities";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  vehicleType!: string;

  @Column("float")
  tollRate!: number;

  @OneToMany(() => User, (user) => user.vehicleType)
  user!: User[];
}

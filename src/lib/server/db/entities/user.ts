import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm";
import { Admin } from "./admin";
import { Customer } from "./customer";
import { Landlord } from "./landlord";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn("text")
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "boolean", default: false })
  emailVerified!: boolean;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  image!: string | null;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  lastName!: string;

  @Column({ type: "text" })
  phoneNumber!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // one user may have one customer profile
  @OneToOne(
    () => Customer,
    (customer) => customer.user,
  )
  customer!: Relation<Customer> | null;

  // one user may have one landlord profile
  @OneToOne(
    () => Landlord,
    (landlord) => landlord.user,
  )
  landlord!: Relation<Landlord> | null;

  // one user may have one admin profile
  @OneToOne(
    () => Admin,
    (admin) => admin.user,
  )
  admin!: Relation<Admin> | null;
}
